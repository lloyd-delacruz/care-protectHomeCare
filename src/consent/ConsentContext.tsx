import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { ConsentDecisions } from './disclosures';

const STORAGE_KEY = 'cnp-consent-v1';
const CONSENT_VERSION = 1;

type Status = 'unset' | 'set';

interface StoredConsent {
  version: number;
  status: Status;
  decisions: ConsentDecisions;
  timestamp: number;
}

const DEFAULT_DECISIONS: ConsentDecisions = {
  essential: true,
  analytics: false,
  preferences: false,
  marketing: false,
};

interface ConsentContextValue {
  status: Status;
  decisions: ConsentDecisions;
  bannerOpen: boolean;
  openBanner: () => void;
  closeBanner: () => void;
  acceptAll: () => void;
  rejectAll: () => void;
  save: (partial: Partial<Omit<ConsentDecisions, 'essential'>>) => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

function readStored(): StoredConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      ...parsed,
      decisions: { ...DEFAULT_DECISIONS, ...parsed.decisions, essential: true },
    };
  } catch {
    return null;
  }
}

function writeStored(state: StoredConsent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage may be disabled — silent no-op */
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<Status>('unset');
  const [decisions, setDecisions] = useState<ConsentDecisions>(DEFAULT_DECISIONS);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    const stored = readStored();
    if (stored && stored.status === 'set') {
      setStatus('set');
      setDecisions(stored.decisions);
    } else {
      setBannerOpen(true);
    }
  }, []);

  const persist = useCallback((next: ConsentDecisions) => {
    const record: StoredConsent = {
      version: CONSENT_VERSION,
      status: 'set',
      decisions: next,
      timestamp: Date.now(),
    };
    writeStored(record);
    setDecisions(next);
    setStatus('set');
    setBannerOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    persist({ essential: true, analytics: true, preferences: true, marketing: true });
  }, [persist]);

  const rejectAll = useCallback(() => {
    persist({ essential: true, analytics: false, preferences: false, marketing: false });
  }, [persist]);

  const save = useCallback(
    (partial: Partial<Omit<ConsentDecisions, 'essential'>>) => {
      persist({
        essential: true,
        analytics: partial.analytics ?? decisions.analytics,
        preferences: partial.preferences ?? decisions.preferences,
        marketing: partial.marketing ?? decisions.marketing,
      });
    },
    [persist, decisions]
  );

  const value = useMemo<ConsentContextValue>(
    () => ({
      status,
      decisions,
      bannerOpen,
      openBanner: () => setBannerOpen(true),
      closeBanner: () => setBannerOpen(false),
      acceptAll,
      rejectAll,
      save,
    }),
    [status, decisions, bannerOpen, acceptAll, rejectAll, save]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used inside <ConsentProvider>');
  return ctx;
}
