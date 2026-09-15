import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useConsent } from '../consent/ConsentContext';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

function injectGtag(id: string) {
  if (document.getElementById('ga4-script')) return;

  const s = document.createElement('script');
  s.id = 'ga4-script';
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', id, { send_page_view: false, anonymize_ip: true });
}

function clearGaCookies() {
  if (typeof document === 'undefined') return;
  const host = window.location.hostname;
  const domainParts = host.split('.');
  const baseDomain = domainParts.length > 1 ? `.${domainParts.slice(-2).join('.')}` : host;
  const kill = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${host}`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${baseDomain}`;
  };
  document.cookie.split(';').forEach((raw) => {
    const name = raw.split('=')[0]?.trim();
    if (name && (name === '_ga' || name.startsWith('_ga_') || name === '_gid')) kill(name);
  });
}

export default function GoogleAnalytics() {
  const location = useLocation();
  const { decisions } = useConsent();
  const initialized = useRef(false);
  const analyticsAllowed = decisions.analytics;

  useEffect(() => {
    if (!MEASUREMENT_ID) return;
    if (typeof navigator !== 'undefined' && navigator.doNotTrack === '1') return;

    if (!analyticsAllowed) {
      // Consent withdrawn or never granted — disable GA and clear its cookies.
      window[`ga-disable-${MEASUREMENT_ID}`] = true;
      clearGaCookies();
      return;
    }

    window[`ga-disable-${MEASUREMENT_ID}`] = false;

    if (!initialized.current) {
      injectGtag(MEASUREMENT_ID);
      initialized.current = true;
    }

    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [analyticsAllowed, location.pathname, location.search]);

  return null;
}
