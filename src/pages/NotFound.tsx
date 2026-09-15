import { Link } from 'react-router-dom';
import SEO from '../seo/SEO';

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page not found (404)"
        description="The page you're looking for isn't here. Head back to Care and Protect Homecare to explore our in-home therapy services."
        path="/404"
        noindex
      />
      <section className="section" style={{ padding: '96px 0', textAlign: 'center' }}>
        <div className="container container--narrow">
          <p className="eyebrow">404</p>
          <h1>The page you're looking for isn't here.</h1>
          <p>It may have moved. Head back to explore our services.</p>
          <Link to="/" className="btn btn--forest" style={{ marginTop: 16 }}>Return home</Link>
        </div>
      </section>
    </>
  );
}
