import { SITE } from './siteConfig';

type JsonLd = Record<string, unknown>;

export function organizationSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: SITE.logo,
    email: SITE.business.email,
    telephone: SITE.business.phones[0],
  };
}

export function websiteSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { '@id': `${SITE.url}/#organization` },
    inLanguage: 'en-US',
  };
}

export function medicalBusinessSchema(): JsonLd {
  const a = SITE.business.address;
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': `${SITE.url}/#business`,
    name: SITE.name,
    url: SITE.url,
    logo: SITE.logo,
    image: SITE.ogImage,
    email: SITE.business.email,
    telephone: SITE.business.phones[0],
    priceRange: SITE.business.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.streetAddress,
      addressLocality: a.addressLocality,
      addressRegion: a.addressRegion,
      postalCode: a.postalCode,
      addressCountry: a.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.business.geo.latitude,
      longitude: SITE.business.geo.longitude,
    },
    areaServed: SITE.business.areaServed.map((name) => ({
      '@type': 'AdministrativeArea',
      name,
    })),
    medicalSpecialty: ['PhysicalTherapy', 'OccupationalTherapy', 'SpeechTherapy'],
    contactPoint: SITE.business.phones.map((tel) => ({
      '@type': 'ContactPoint',
      telephone: tel,
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: ['English'],
    })),
    availableService: [
      { '@type': 'MedicalTherapy', name: 'In-home Physical Therapy', url: `${SITE.url}/services/physical-therapy` },
      { '@type': 'MedicalTherapy', name: 'In-home Occupational Therapy', url: `${SITE.url}/services/occupational-therapy` },
      { '@type': 'MedicalTherapy', name: 'In-home Speech Therapy', url: `${SITE.url}/services/speech-therapy` },
    ],
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: input.url,
    serviceType: input.serviceType,
    provider: { '@id': `${SITE.url}/#business` },
    areaServed: SITE.business.areaServed.map((name) => ({
      '@type': 'AdministrativeArea',
      name,
    })),
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(faqs: Array<{ q: string; a: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function blogPostingSchema(input: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  author: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: input.url,
    headline: input.title,
    description: input.description,
    image: input.image,
    datePublished: input.datePublished,
    author: { '@type': 'Organization', name: input.author },
    publisher: { '@id': `${SITE.url}/#organization` },
  };
}
