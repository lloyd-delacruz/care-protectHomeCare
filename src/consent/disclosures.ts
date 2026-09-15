export type ConsentCategory = 'essential' | 'analytics' | 'preferences' | 'marketing';

export interface ConsentDecisions {
  essential: true;
  analytics: boolean;
  preferences: boolean;
  marketing: boolean;
}

export interface CategoryDisclosure {
  id: ConsentCategory;
  label: string;
  summary: string;
  services: ServiceDisclosure[];
}

export interface ServiceDisclosure {
  name: string;
  provider: string;
  purpose: string;
  cookies: string;
  retention: string;
}

/**
 * Factual disclosure of exactly which services this website uses.
 * Update this list whenever a new third-party is added.
 */
export const DISCLOSURES: CategoryDisclosure[] = [
  {
    id: 'essential',
    label: 'Essential',
    summary:
      'Required for the website to work. Includes remembering your cookie choice so we do not ask again on every visit.',
    services: [
      {
        name: 'Cookie preferences',
        provider: 'Care and Protect Homecare (this website)',
        purpose: 'Stores your consent choice so we do not re-prompt.',
        cookies: 'Local storage entry: cnp-consent-v1',
        retention: '12 months, or until you clear browser storage.',
      },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    summary:
      'Helps us understand which pages people visit so we can improve the site. We only enable this if you agree.',
    services: [
      {
        name: 'Google Analytics 4',
        provider: 'Google LLC',
        purpose:
          'Anonymous, aggregated measurement of page visits and referral sources.',
        cookies: '_ga, _ga_<measurement-id>',
        retention: 'Up to 2 years (Google default).',
      },
    ],
  },
  {
    id: 'preferences',
    label: 'Preferences',
    summary:
      'Remembers optional choices you make on the site, such as display or language preferences. No services in this category are active on this website today.',
    services: [],
  },
  {
    id: 'marketing',
    label: 'Marketing',
    summary:
      'Third-party content that may set its own cookies when embedded on the page. We only load these if you agree.',
    services: [
      {
        name: 'Google Maps embed',
        provider: 'Google LLC',
        purpose:
          'Displays an interactive map of our Carson, CA location on the Contact page.',
        cookies:
          'Cookies set by google.com when the iframe loads (e.g. NID, SIDCC).',
        retention: 'Managed by Google; typically 6 months.',
      },
    ],
  },
];
