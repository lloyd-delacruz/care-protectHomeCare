import { Link } from 'react-router-dom';
import './Footer.css';

const ADDRESS_LINES = ['140 E 227th St', 'Carson, California 90745, USA'];
const PHONES = [
  { display: '+1 (310) 854 2559', href: 'tel:+13108542559' },
  { display: '+1 (216) 699 8727', href: 'tel:+12166998727' },
  { display: '+1 (216) 626 4943', href: 'tel:+12166264943' },
];
const EMAIL = 'careandprotectrehab@gmail.com';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <img src="/logo.svg" alt="Care and Protect Homecare" width="220" height="64" />
          <p>A stronger tomorrow, at home.</p>
        </div>

        <nav aria-label="Footer navigation" className="site-footer__cols">
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Our Services</h4>
            <ul>
              <li><Link to="/services/physical-therapy">Physical Therapy</Link></li>
              <li><Link to="/services/occupational-therapy">Occupational Therapy</Link></li>
              <li><Link to="/services/speech-therapy">Speech Therapy</Link></li>
            </ul>
          </div>
          <div className="site-footer__contact">
            <h4>Get in touch</h4>
            <address className="site-footer__address">
              {ADDRESS_LINES.map(line => <span key={line}>{line}</span>)}
            </address>
            <ul>
              {PHONES.map(({ display, href }) => (
                <li key={href}><a href={href}>{display}</a></li>
              ))}
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-inner">
          <span>© {new Date().getFullYear()} Care and Protect Homecare. All rights reserved.</span>
          <span>People. Purpose. Possibilities.</span>
        </div>
      </div>
    </footer>
  );
}
