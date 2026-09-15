export const SITE = {
  name: 'Care and Protect Homecare',
  url: 'https://careandprotecthomecare.com',
  defaultTitle: 'Care and Protect Homecare — In-home Physical, Occupational and Speech Therapy',
  defaultDescription:
    'Care and Protect Homecare delivers personalized in-home Physical, Occupational and Speech Therapy — helping people move better, live more independently, and communicate with confidence.',
  ogImage: 'https://careandprotecthomecare.com/og-image.png',
  twitterHandle: '',
  locale: 'en_US',
  themeColor: '#123F35',
  logo: 'https://careandprotecthomecare.com/logo.svg',
  business: {
    legalName: 'Care and Protect Homecare',
    email: 'careandprotectrehab@gmail.com',
    phones: ['+1-310-854-2559', '+1-216-699-8727', '+1-216-626-4943'],
    address: {
      streetAddress: '140 E 227th St',
      addressLocality: 'Carson',
      addressRegion: 'CA',
      postalCode: '90745',
      addressCountry: 'US',
    },
    geo: {
      latitude: 33.8163,
      longitude: -118.2467,
    },
    priceRange: '$$',
    areaServed: [
      'Carson, CA',
      'Long Beach, CA',
      'Torrance, CA',
      'Los Angeles County, CA',
    ],
  },
} as const;

export const canonical = (path: string): string => {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.url}${clean === '/' ? '' : clean.replace(/\/+$/, '')}`;
};
