import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useConsent } from './ConsentContext';
import { DISCLOSURES } from './disclosures';
import type { ConsentDecisions } from './disclosures';
import './CookieBanner.css';

type Toggles = Omit<ConsentDecisions, 'essential'>;

export default function CookieBanner() {
  const { bannerOpen, closeBanner, acceptAll, rejectAll, save, decisions, status } = useConsent();
  const [showPrefs, setShowPrefs] = useState(false);
  const [draft, setDraft] = useState<Toggles>({
    analytics: decisions.analytics,
    preferences: decisions.preferences,
    marketing: decisions.marketing,
  });
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (bannerOpen) {
      setDraft({
        analytics: decisions.analytics,
        preferences: decisions.preferences,
        marketing: decisions.marketing,
      });
      setShowPrefs(status === 'set');
    }
  }, [bannerOpen, decisions, status]);

  useEffect(() => {
    if (!bannerOpen) return;
    firstFocusRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && status === 'set') closeBanner();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [bannerOpen, closeBanner, status]);

  if (!bannerOpen) return null;

  const toggle = (key: keyof Toggles) =>
    setDraft((d) => ({ ...d, [key]: !d[key] }));

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      ref={dialogRef}
    >
      <div className="cookie-banner__panel">
        {!showPrefs ? (
          <>
            <div className="cookie-banner__body">
              <h2 id="cookie-banner-title" className="cookie-banner__title">
                Your privacy choice
              </h2>
              <p id="cookie-banner-desc" className="cookie-banner__text">
                This site uses cookies only when you agree. Essential cookies keep the site working.
                Analytics and third-party embeds (like the Google Map on our Contact page) are off
                until you turn them on. Read our{' '}
                <Link to="/cookies" className="cookie-banner__link">
                  Cookie Notice
                </Link>{' '}
                for details.
              </p>
            </div>
            <div className="cookie-banner__actions" role="group" aria-label="Cookie choices">
              <button
                type="button"
                className="cookie-banner__btn"
                onClick={rejectAll}
                ref={firstFocusRef}
              >
                Reject All
              </button>
              <button
                type="button"
                className="cookie-banner__btn"
                onClick={() => setShowPrefs(true)}
                aria-expanded={showPrefs}
                aria-controls="cookie-prefs"
              >
                Manage Preferences
              </button>
              <button type="button" className="cookie-banner__btn" onClick={acceptAll}>
                Accept All
              </button>
            </div>
          </>
        ) : (
          <div id="cookie-prefs" className="cookie-prefs">
            <div className="cookie-prefs__head">
              <h2 id="cookie-banner-title" className="cookie-banner__title">
                Cookie preferences
              </h2>
              <p className="cookie-banner__text">
                Choose which categories you allow. You can change this at any time from the{' '}
                <Link to="/cookies" className="cookie-banner__link">
                  Cookie Notice
                </Link>{' '}
                or the "Cookie settings" link in the footer.
              </p>
            </div>

            <ul className="cookie-prefs__list">
              {DISCLOSURES.map((cat) => {
                const isEssential = cat.id === 'essential';
                const checked = isEssential ? true : draft[cat.id as keyof Toggles];
                return (
                  <li key={cat.id} className="cookie-prefs__item">
                    <label className="cookie-prefs__row">
                      <span className="cookie-prefs__meta">
                        <span className="cookie-prefs__label">{cat.label}</span>
                        {isEssential && (
                          <span className="cookie-prefs__badge">Always active</span>
                        )}
                      </span>
                      <span className="cookie-prefs__switch">
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={isEssential}
                          onChange={() =>
                            !isEssential && toggle(cat.id as keyof Toggles)
                          }
                          aria-label={`${cat.label} cookies`}
                        />
                        <span className="cookie-prefs__track" aria-hidden="true">
                          <span className="cookie-prefs__thumb" />
                        </span>
                      </span>
                    </label>
                    <p className="cookie-prefs__desc">{cat.summary}</p>
                    {cat.services.length > 0 && (
                      <ul className="cookie-prefs__services">
                        {cat.services.map((svc) => (
                          <li key={svc.name}>
                            <strong>{svc.name}</strong> — {svc.provider}. {svc.purpose}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="cookie-banner__actions" role="group" aria-label="Preference actions">
              <button type="button" className="cookie-banner__btn" onClick={rejectAll}>
                Reject All
              </button>
              <button
                type="button"
                className="cookie-banner__btn"
                onClick={() => save(draft)}
              >
                Save Choices
              </button>
              <button type="button" className="cookie-banner__btn" onClick={acceptAll}>
                Accept All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
