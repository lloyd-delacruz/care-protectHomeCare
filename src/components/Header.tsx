import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Icon from './Icon';
import './Header.css';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  {
    to: '/services',
    label: 'Services',
    children: [
      { to: '/services/physical-therapy', label: 'Physical Therapy' },
      { to: '/services/occupational-therapy', label: 'Occupational Therapy' },
      { to: '/services/speech-therapy', label: 'Speech Therapy' },
    ],
  },
  { to: '/blog', label: 'Journal' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className="site-header">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand" aria-label="Care and Protect Homecare — home">
          <img src="/logo.svg" alt="Care and Protect Homecare" width="220" height="64" />
        </Link>

        <nav className="site-header__nav" aria-label="Primary">
          <ul className="nav-list">
            {NAV.map((item) => (
              item.children ? (
                <li key={item.to} className="nav-item nav-item--has-menu" ref={dropdownRef}>
                  <button
                    className="nav-link"
                    onClick={() => setServicesOpen(v => !v)}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <Icon name="chevron-down" size={16} />
                  </button>
                  <ul className={`nav-submenu ${servicesOpen ? 'is-open' : ''}`}>
                    <li>
                      <NavLink to={item.to} end className="nav-sublink">All Services</NavLink>
                    </li>
                    {item.children.map(sub => (
                      <li key={sub.to}>
                        <NavLink to={sub.to} className="nav-sublink">{sub.label}</NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.to} className="nav-item">
                  <NavLink to={item.to} end={item.to === '/'} className="nav-link">
                    {item.label}
                  </NavLink>
                </li>
              )
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <button
            type="button"
            className="hamburger"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(v => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div id="mobile-nav" className={`mobile-nav ${open ? 'is-open' : ''}`} role="dialog" aria-label="Mobile navigation">
        <ul className="mobile-nav__list">
          {NAV.map((item) => (
            <li key={item.to} className="mobile-nav__item">
              <NavLink to={item.to} end={item.to === '/'} className="mobile-nav__link">
                {item.label}
              </NavLink>
              {item.children && (
                <ul className="mobile-nav__sublist">
                  {item.children.map(sub => (
                    <li key={sub.to}>
                      <NavLink to={sub.to} className="mobile-nav__sublink">{sub.label}</NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
