import { useConsent } from '../consent/ConsentContext';
import { DISCLOSURES } from '../consent/disclosures';
import './CookiePolicy.css';

export default function CookiePolicy() {
  const { openBanner } = useConsent();

  return (
    <section className="section cookie-policy" aria-labelledby="cookie-policy-heading">
      <div className="container container--narrow">
        <p className="eyebrow">Cookie Notice</p>
        <h1 id="cookie-policy-heading">How this website uses cookies</h1>

        <p className="cookie-policy__lede">
          We keep tracking to a minimum. This page describes exactly what
          <em> this website</em> does today — no boilerplate, no invented claims.
          You can change your choice at any time using the button below.
        </p>

        <div className="cookie-policy__actions">
          <button type="button" className="btn btn--forest" onClick={openBanner}>
            Change cookie preferences
          </button>
        </div>

        <h2>What we do without asking</h2>
        <p>
          When you open the site, your browser downloads HTML, CSS, JavaScript,
          images and web fonts. None of these downloads set browser cookies.
          When you agree to a cookie choice, we store your decision in your
          browser&rsquo;s local storage (<code>cnp-consent-v1</code>) so we do
          not ask again on every visit.
        </p>

        <h2>What we only do if you agree</h2>
        <p>
          The categories below are off by default. They turn on only if you
          select them.
        </p>

        <div className="cookie-policy__categories">
          {DISCLOSURES.map((cat) => (
            <section key={cat.id} aria-labelledby={`cat-${cat.id}`}>
              <h3 id={`cat-${cat.id}`}>{cat.label}</h3>
              <p>{cat.summary}</p>
              {cat.services.length > 0 ? (
                <div className="cookie-policy__table-wrap">
                  <table className="cookie-policy__table">
                    <thead>
                      <tr>
                        <th scope="col">Service</th>
                        <th scope="col">Provider</th>
                        <th scope="col">Purpose</th>
                        <th scope="col">Cookies / storage</th>
                        <th scope="col">Retention</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cat.services.map((svc) => (
                        <tr key={svc.name}>
                          <td>{svc.name}</td>
                          <td>{svc.provider}</td>
                          <td>{svc.purpose}</td>
                          <td>{svc.cookies}</td>
                          <td>{svc.retention}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="cookie-policy__empty">
                  No services in this category are active on this website today.
                </p>
              )}
            </section>
          ))}
        </div>

        <h2>How to clear cookies</h2>
        <p>
          You can revoke consent at any time using the button above. You can
          also delete cookies through your browser&rsquo;s settings — search for
          &ldquo;clear cookies&rdquo; in your browser&rsquo;s help.
        </p>

        <h2>Questions</h2>
        <p>
          Write to us at{' '}
          <a href="mailto:careandprotectrehab@gmail.com">
            careandprotectrehab@gmail.com
          </a>{' '}
          with any question about this notice or the data this website handles.
        </p>
      </div>
    </section>
  );
}
