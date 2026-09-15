import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import SEO from '../seo/SEO';
import { breadcrumbSchema, medicalBusinessSchema } from '../seo/jsonld';
import { canonical } from '../seo/siteConfig';
import { useConsent } from '../consent/ConsentContext';
import './Contact.css';

type Method = 'email' | 'phone' | '';

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  method: Method;
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

const initial: FormState = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
  method: 'email',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\d\s-]{7,}$/;

const ADDRESS = '140 E 227th St, Carson, California 90745, USA';
const MAP_QUERY = '140+E+227th+St+Carson+California+90745';
const MAP_LINK = `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`;
const MAP_EMBED = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;

const PHONES = [
  '+1 (310) 854 2559',
  '+1 (216) 699 8727',
  '+1 (216) 626 4943',
];

const EMAIL = 'careandprotectrehab@gmail.com';

export default function Contact() {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const { decisions, openBanner } = useConsent();
  const mapAllowed = decisions.marketing;

  function validate(v: FormState) {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!v.name.trim()) e.name = 'Please share your name.';

    if (v.method === 'email') {
      if (!v.email.trim()) e.email = 'Please enter an email so we can reply.';
      else if (!EMAIL_RE.test(v.email)) e.email = 'That email looks incomplete.';
      if (v.phone && !PHONE_RE.test(v.phone)) e.phone = 'Please enter a valid phone number.';
    } else if (v.method === 'phone') {
      if (!v.phone.trim()) e.phone = 'Please enter a phone number so we can call you back.';
      else if (!PHONE_RE.test(v.phone)) e.phone = 'Please enter a valid phone number.';
      if (v.email && !EMAIL_RE.test(v.email)) e.email = 'That email looks incomplete.';
    }

    if (!v.message.trim()) e.message = 'A short message helps us understand how to help.';
    return e;
  }

  function handleChange<K extends keyof FormState>(key: K, val: FormState[K]) {
    setValues(prev => ({ ...prev, [key]: val }));
    if (errors[key]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'submitting') return;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0] as keyof FormState;
      const el = document.getElementById(firstKey);
      if (el) el.focus();
      return;
    }

    setStatus('submitting');
    try {
      // Placeholder integration point — preserves the existing "console" submission
      // behaviour used by the previous version. Wire real endpoint here when available.
      await new Promise(resolve => setTimeout(resolve, 700));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  const isSubmitting = status === 'submitting';

  return (
    <>
      <SEO
        title="Contact Care and Protect Homecare — Carson, CA"
        description="Reach Care and Protect Homecare for in-home Physical, Occupational and Speech Therapy in Carson, Long Beach, Torrance and the greater Los Angeles area. Call, email or send a message."
        path="/contact"
        keywords={[
          'contact care and protect homecare',
          'homecare Carson CA',
          'in-home therapy contact',
        ]}
        jsonLd={[
          breadcrumbSchema([
            { name: 'Home', url: canonical('/') },
            { name: 'Contact', url: canonical('/contact') },
          ]),
          medicalBusinessSchema(),
        ]}
      />
      {/* 1. Compact hero */}
      <section className="contact-hero" aria-labelledby="contact-hero-heading">
        <div className="container contact-hero__inner">
          <p className="eyebrow">Get in touch</p>
          <h1 id="contact-hero-heading" className="contact-hero__title">
            Tell us how we can support you<br />
            <em>or your loved one.</em>
          </h1>
          <p className="contact-hero__lede">
            Send a message and share the best way to reach you.
            A member of our team will follow up personally.
          </p>
        </div>
      </section>

      {/* 2. Two-column contact + form */}
      <section className="contact-main" aria-labelledby="contact-main-heading">
        <div className="container contact-main__grid">
          {/* Left column: verified contact information */}
          <aside className="contact-info" aria-label="Contact details">
            <h2 id="contact-main-heading" className="contact-info__title">
              Reach us directly
            </h2>
            <p className="contact-info__lede">
              Prefer to talk right away? Call, email, or drop by our Carson office —
              whichever feels easiest.
            </p>

            <ul className="contact-info__list">
              <li>
                <span className="contact-info__icon" aria-hidden="true">
                  <Icon name="map-pin" size={20} />
                </span>
                <div>
                  <span className="contact-info__label">Visit</span>
                  <a
                    className="contact-info__value"
                    href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ADDRESS}
                  </a>
                </div>
              </li>

              <li>
                <span className="contact-info__icon" aria-hidden="true">
                  <Icon name="phone" size={20} />
                </span>
                <div>
                  <span className="contact-info__label">Call</span>
                  <ul className="contact-info__phones">
                    {PHONES.map(num => (
                      <li key={num}>
                        <a
                          className="contact-info__value"
                          href={`tel:${num.replace(/[^\d+]/g, '')}`}
                        >
                          {num}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li>
                <span className="contact-info__icon" aria-hidden="true">
                  <Icon name="mail" size={20} />
                </span>
                <div>
                  <span className="contact-info__label">Email</span>
                  <a className="contact-info__value" href={`mailto:${EMAIL}`}>
                    {EMAIL}
                  </a>
                </div>
              </li>
            </ul>

            <div className="contact-emergency" role="note">
              <span className="contact-emergency__badge" aria-hidden="true">
                <Icon name="shield" size={18} />
              </span>
              <div>
                <strong>Not for emergencies.</strong>{' '}
                If you or someone you care for is in a medical emergency,
                please call your local emergency services.
              </div>
            </div>
          </aside>

          {/* Right column: inquiry form */}
          <div className="contact-form-wrap">
            <div className="contact-form-card">
              <h2 className="contact-form__title">Send a message</h2>
              <p className="contact-form__sub">
                Share a little about your situation and we'll be in touch.
              </p>

              {status === 'success' ? (
                <div className="contact-thanks" role="status" aria-live="polite">
                  <span className="contact-thanks__badge" aria-hidden="true">
                    <Icon name="check" size={22} />
                  </span>
                  <h3>Thank you — your message is on its way.</h3>
                  <p>
                    We'll follow up at the {values.method === 'phone' ? 'number' : 'email'} you shared.
                  </p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="contact-form__row">
                    <label htmlFor="name">
                      Full name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={values.name}
                      onChange={e => handleChange('name', e.target.value)}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <span id="name-error" className="contact-form__error">{errors.name}</span>
                    )}
                  </div>

                  <div className="contact-form__pair">
                    <div className="contact-form__row">
                      <label htmlFor="email">
                        Email address
                        {values.method === 'email' && <span aria-hidden="true"> *</span>}
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={e => handleChange('email', e.target.value)}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        disabled={isSubmitting}
                        required={values.method === 'email'}
                      />
                      {errors.email && (
                        <span id="email-error" className="contact-form__error">{errors.email}</span>
                      )}
                    </div>

                    <div className="contact-form__row">
                      <label htmlFor="phone">
                        Phone number
                        {values.method === 'phone' && <span aria-hidden="true"> *</span>}
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={values.phone}
                        onChange={e => handleChange('phone', e.target.value)}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        disabled={isSubmitting}
                        required={values.method === 'phone'}
                      />
                      {errors.phone && (
                        <span id="phone-error" className="contact-form__error">{errors.phone}</span>
                      )}
                    </div>
                  </div>

                  <div className="contact-form__row">
                    <label htmlFor="service">Service of interest</label>
                    <select
                      id="service"
                      name="service"
                      value={values.service}
                      onChange={e => handleChange('service', e.target.value)}
                      disabled={isSubmitting}
                    >
                      <option value="">Select an option</option>
                      <option value="physical">Physical Therapy</option>
                      <option value="occupational">Occupational Therapy</option>
                      <option value="speech">Speech Therapy</option>
                      <option value="not-sure">Not sure yet</option>
                    </select>
                  </div>

                  <div className="contact-form__row">
                    <label htmlFor="message">
                      Message <span aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={values.message}
                      onChange={e => handleChange('message', e.target.value)}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      disabled={isSubmitting}
                    />
                    {errors.message && (
                      <span id="message-error" className="contact-form__error">{errors.message}</span>
                    )}
                  </div>

                  <fieldset
                    className="contact-form__row contact-form__methods"
                    aria-describedby="method-help"
                  >
                    <legend>Preferred contact method</legend>
                    <p id="method-help" className="contact-form__hint">
                      We'll only require the details for the option you choose.
                    </p>
                    <div className="contact-form__radios">
                      <label className="contact-form__radio">
                        <input
                          type="radio"
                          name="method"
                          value="email"
                          checked={values.method === 'email'}
                          onChange={() => handleChange('method', 'email')}
                          disabled={isSubmitting}
                        />
                        <span>Email</span>
                      </label>
                      <label className="contact-form__radio">
                        <input
                          type="radio"
                          name="method"
                          value="phone"
                          checked={values.method === 'phone'}
                          onChange={() => handleChange('method', 'phone')}
                          disabled={isSubmitting}
                        />
                        <span>Phone</span>
                      </label>
                    </div>
                  </fieldset>

                  {status === 'error' && (
                    <div className="contact-form__alert" role="alert">
                      Something went wrong sending your message. Please try again,
                      or reach us directly at{' '}
                      <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                    </div>
                  )}

                  <div className="contact-form__actions">
                    <button
                      type="submit"
                      className="btn btn--forest contact-form__submit"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="contact-form__spinner" aria-hidden="true" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message <Icon name="arrow-right" size={16} />
                        </>
                      )}
                    </button>
                    <p className="contact-form__privacy">
                      We use your details only to reply to your inquiry.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Map + directions */}
      <section className="contact-map" aria-labelledby="contact-map-heading">
        <div className="container contact-map__grid">
          <div className="contact-map__meta">
            <p className="eyebrow">Find us</p>
            <h2 id="contact-map-heading">Our Carson office</h2>
            <address className="contact-map__address">{ADDRESS}</address>
            <a
              className="contact-map__link"
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions
              <Icon name="arrow-right" size={16} />
            </a>
          </div>

          <div className="contact-map__frame">
            {mapAllowed ? (
              <iframe
                title={`Map of Care and Protect Homecare at ${ADDRESS}`}
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="contact-map__consent" role="group" aria-label="Map placeholder">
                <p className="contact-map__consent-title">Interactive map is off</p>
                <p className="contact-map__consent-text">
                  We embed Google Maps to show our Carson office. Google may set its
                  own cookies when the map loads, so we keep it off until you agree.
                </p>
                <div className="contact-map__consent-actions">
                  <button
                    type="button"
                    className="btn btn--forest"
                    onClick={openBanner}
                  >
                    Load map &amp; allow marketing cookies
                  </button>
                  <a
                    className="btn btn--ghost"
                    href={MAP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Compact services link */}
      <section className="contact-services-link" aria-label="Explore services">
        <div className="container contact-services-link__inner">
          <p>
            Looking for details on what we offer?
          </p>
          <Link to="/services" className="btn btn--ghost">
            Explore our therapy services <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
