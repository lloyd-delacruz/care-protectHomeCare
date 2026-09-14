import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="section" style={{ padding: '96px 0', textAlign: 'center' }}>
      <div className="container container--narrow">
        <p className="eyebrow">404</p>
        <h1>The page you're looking for isn't here.</h1>
        <p>It may have moved. Head back to explore our services.</p>
        <Link to="/" className="btn btn--forest" style={{ marginTop: 16 }}>Return home</Link>
      </div>
    </section>
  );
}
