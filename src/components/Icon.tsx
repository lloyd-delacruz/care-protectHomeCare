import type { SVGProps } from 'react';

type IconName =
  | 'physical' | 'occupational' | 'speech'
  | 'heart' | 'leaf' | 'home' | 'shield'
  | 'check' | 'arrow-right' | 'chevron-down' | 'menu' | 'close'
  | 'phone' | 'mail' | 'map-pin'
  | 'balance' | 'movement' | 'therapeutic' | 'manual' | 'pain' | 'daily'
  | 'dressing' | 'grooming' | 'meal' | 'management' | 'equipment' | 'cognitive'
  | 'language' | 'swallow' | 'voice' | 'feeding' | 'clarity'
  | 'clipboard' | 'plan' | 'begin'
  | 'safety' | 'independence'
  | 'recovery' | 'chronic' | 'stroke' | 'delay';

interface Props extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

/* Every icon is a stroke-based line drawing to match the calm, editorial feel.
   Colors inherit from currentColor. */
export default function Icon({ name, size = 24, ...rest }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    ...rest,
  };

  switch (name) {
    case 'physical': // running figure
      return (
        <svg {...common}>
          <circle cx="14" cy="5" r="1.6" />
          <path d="M15 8l-2.6 3 1.8 2.2 1.2 5" />
          <path d="M12.4 11L8.5 12.5 6.5 16.5" />
          <path d="M14.4 13.2l3.6-0.5 2 3.3" />
        </svg>
      );
    case 'occupational': // hand + heart
      return (
        <svg {...common}>
          <path d="M8 12v-4a1.4 1.4 0 1 1 2.8 0v3" />
          <path d="M10.8 11V6.5a1.4 1.4 0 1 1 2.8 0V11" />
          <path d="M13.6 11V7.5a1.4 1.4 0 1 1 2.8 0V13" />
          <path d="M16.4 10.5a1.4 1.4 0 1 1 2.8 0v3.5c0 3-2.4 5-5.5 5s-5-1.4-6.5-4l-1.6-2.7c-.6-1 .5-2 1.4-1.4L8 12" />
        </svg>
      );
    case 'speech':
      return (
        <svg {...common}>
          <path d="M4 6h13a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-4l-4 3v-3H4z" />
          <path d="M8 11h8M8 14h5" />
        </svg>
      );
    case 'heart':
      return (
        <svg {...common}>
          <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
        </svg>
      );
    case 'leaf':
      return (
        <svg {...common}>
          <path d="M20 4c0 8-6 14-14 14 0-8 6-14 14-14z" />
          <path d="M6 18l7-7" />
        </svg>
      );
    case 'home':
      return (
        <svg {...common}>
          <path d="M4 11l8-7 8 7" />
          <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
          <path d="M10 20v-5h4v5" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 3l8 3v6c0 4.5-3.4 8.4-8 9-4.6-.6-8-4.5-8-9V6l8-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case 'check':
      return (
        <svg {...common}>
          <path d="M5 12l4 4 10-10" />
        </svg>
      );
    case 'arrow-right':
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case 'chevron-down':
      return (
        <svg {...common}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      );
    case 'menu':
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case 'close':
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    case 'phone':
      return (
        <svg {...common}>
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
      );
    case 'mail':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      );
    case 'map-pin':
      return (
        <svg {...common}>
          <path d="M12 21s-7-6.4-7-12a7 7 0 0 1 14 0c0 5.6-7 12-7 12z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      );
    case 'balance':
      return (
        <svg {...common}>
          <path d="M12 4v16" />
          <path d="M4 8h16" />
          <path d="M7 8l-2 5a3 3 0 0 0 6 0z" />
          <path d="M17 8l-2 5a3 3 0 0 0 6 0z" />
        </svg>
      );
    case 'movement':
      return (
        <svg {...common}>
          <circle cx="8" cy="5" r="1.4" />
          <path d="M9 8l-2 4 3 3-1 5" />
          <path d="M10 11l4 1 2 3" />
          <path d="M17 6l3 2-2 3" />
        </svg>
      );
    case 'therapeutic':
      return (
        <svg {...common}>
          <path d="M4 12h16" />
          <path d="M8 8v8M16 8v8" />
          <path d="M2 10v4M22 10v4" />
        </svg>
      );
    case 'manual':
      return (
        <svg {...common}>
          <path d="M6 12V6.5a1.5 1.5 0 0 1 3 0V12" />
          <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11" />
          <path d="M12 11V7a1.5 1.5 0 0 1 3 0v6" />
          <path d="M15 13v-2a1.5 1.5 0 0 1 3 0v5c0 3-2 5-5 5-3.5 0-5-2-6-4l-2-3c-.5-.8.5-1.7 1.3-1.1L8 15" />
        </svg>
      );
    case 'pain':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l3 2" />
        </svg>
      );
    case 'daily':
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path d="M8 3v4M16 3v4M4 10h16" />
          <path d="M9 14l2 2 4-4" />
        </svg>
      );
    case 'dressing':
      return (
        <svg {...common}>
          <path d="M8 4l-3 3 2 3 2-1v11h10V9l2 1 2-3-3-3-3 2h-6z" />
        </svg>
      );
    case 'grooming':
      return (
        <svg {...common}>
          <rect x="6" y="4" width="12" height="9" rx="2" />
          <path d="M10 13v3M14 13v3" />
          <path d="M7 20h10" />
        </svg>
      );
    case 'meal':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 5v14M9 9l6 6M15 9l-6 6" />
        </svg>
      );
    case 'management':
      return (
        <svg {...common}>
          <path d="M4 8l8-4 8 4-8 4z" />
          <path d="M4 12l8 4 8-4" />
          <path d="M4 16l8 4 8-4" />
        </svg>
      );
    case 'equipment':
      return (
        <svg {...common}>
          <circle cx="7" cy="18" r="2.5" />
          <circle cx="17" cy="18" r="2.5" />
          <path d="M9 18h6" />
          <path d="M12 15V5h3" />
          <path d="M12 8h-3" />
        </svg>
      );
    case 'cognitive':
      return (
        <svg {...common}>
          <path d="M9 5a3 3 0 0 0-3 3v1a2 2 0 0 0-1 3.5A2.5 2.5 0 0 0 6 16v1a3 3 0 0 0 6 0V5a2 2 0 0 0-3 0z" />
          <path d="M15 5a3 3 0 0 1 3 3v1a2 2 0 0 1 1 3.5A2.5 2.5 0 0 1 18 16v1a3 3 0 0 1-6 0" />
        </svg>
      );
    case 'language':
      return (
        <svg {...common}>
          <path d="M4 6h9v9H8l-4 3z" />
          <path d="M11 12h9v6l-3-2h-6" />
        </svg>
      );
    case 'swallow':
      return (
        <svg {...common}>
          <path d="M8 4c4 0 8 3 8 8s-4 8-8 8" />
          <path d="M8 8c2 0 4 2 4 4s-2 4-4 4" />
        </svg>
      );
    case 'voice':
      return (
        <svg {...common}>
          <rect x="9" y="3" width="6" height="12" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0" />
          <path d="M12 18v3" />
        </svg>
      );
    case 'feeding':
      return (
        <svg {...common}>
          <path d="M5 3v8a3 3 0 0 0 6 0V3" />
          <path d="M8 11v10" />
          <path d="M17 3v18" />
          <path d="M14 3v6a3 3 0 0 0 6 0V3" />
        </svg>
      );
    case 'clarity':
      return (
        <svg {...common}>
          <path d="M5 12c3-4 11-4 14 0-3 4-11 4-14 0z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case 'clipboard':
      return (
        <svg {...common}>
          <rect x="6" y="5" width="12" height="16" rx="2" />
          <path d="M9 5V3h6v2" />
          <path d="M9 11h6M9 15h4" />
        </svg>
      );
    case 'plan':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9 9l2 2 4-4" />
          <path d="M9 15h8" />
        </svg>
      );
    case 'begin':
      return (
        <svg {...common}>
          <path d="M4 12h12" />
          <path d="M12 6l6 6-6 6" />
          <circle cx="4" cy="12" r="1.5" />
        </svg>
      );
    case 'safety':
      return (
        <svg {...common}>
          <path d="M12 3l8 3v6c0 4.5-3.4 8.4-8 9-4.6-.6-8-4.5-8-9V6l8-3z" />
          <path d="M12 8v4M12 15v.01" />
        </svg>
      );
    case 'independence':
      return (
        <svg {...common}>
          <circle cx="12" cy="6" r="2" />
          <path d="M6 20l3-8h6l3 8" />
          <path d="M9 12l-1 4M15 12l1 4" />
        </svg>
      );
    case 'recovery':
      return (
        <svg {...common}>
          <path d="M4 12a8 8 0 1 1 3 6.2" />
          <path d="M4 20v-4h4" />
        </svg>
      );
    case 'chronic':
      return (
        <svg {...common}>
          <path d="M3 12h4l2-5 4 10 2-5h6" />
        </svg>
      );
    case 'stroke':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M8 12l3 3 5-6" />
        </svg>
      );
    case 'delay':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l2 2" />
        </svg>
      );
    default:
      return null;
  }
}
