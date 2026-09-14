import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import CTAStrip from '../components/CTAStrip';
import { POSTS, type BlogPost } from './blogData';
import './Blog.css';

const CATEGORIES: Array<BlogPost['category'] | 'All'> = [
  'All',
  'Physical Therapy',
  'Occupational Therapy',
  'Speech Therapy',
  'Family & Caregivers',
  'Wellness at Home',
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function Blog() {
  useReveal();
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>('All');

  const filtered = useMemo(
    () => (active === 'All' ? POSTS : POSTS.filter((p) => p.category === active)),
    [active]
  );

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      {/* HERO */}
      <section className="blog-hero" aria-labelledby="blog-hero-heading">
        <div className="container blog-hero__inner">
          <p className="eyebrow reveal">Journal</p>
          <h1 id="blog-hero-heading" className="blog-hero__title reveal reveal--delay-1">
            Notes on care, <em>from the home.</em>
          </h1>
          <p className="blog-hero__lede reveal reveal--delay-2">
            Quiet essays, practical guides, and clinical perspective from our therapists — written
            for the families we serve.
          </p>
        </div>
      </section>

      {/* FILTER */}
      <section className="blog-filter" aria-label="Filter posts by category">
        <div className="container">
          <div className="blog-filter__row" role="tablist">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={active === c}
                className={`blog-filter__chip ${active === c ? 'is-active' : ''}`}
                onClick={() => setActive(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {featured && (
        <section className="blog-featured" aria-label="Featured post">
          <div className="container">
            <Link to={`/blog/${featured.slug}`} className="blog-featured__card reveal">
              <div className="blog-featured__media">
                <img
                  src={featured.image}
                  alt={featured.imageAlt}
                  loading="eager"
                  width={1600}
                  height={1000}
                />
              </div>
              <div className="blog-featured__copy">
                <div className="blog-meta">
                  <span className="blog-meta__cat">{featured.category}</span>
                  <span className="blog-meta__dot" aria-hidden>·</span>
                  <span className="blog-meta__read">{featured.readTime}</span>
                </div>
                <h2 className="blog-featured__title">{featured.title}</h2>
                <p className="blog-featured__excerpt">{featured.excerpt}</p>
                <span className="blog-featured__cta">
                  Read the essay <Icon name="arrow-right" size={16} />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* GRID */}
      <section className="section blog-grid-section" aria-label="All journal posts">
        <div className="container">
          <div className="blog-grid">
            {rest.map((post, i) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className={`blog-card reveal ${i % 3 === 1 ? 'reveal--delay-1' : i % 3 === 2 ? 'reveal--delay-2' : ''}`}
              >
                <div className="blog-card__media">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    loading="lazy"
                    width={800}
                    height={560}
                  />
                </div>
                <div className="blog-card__body">
                  <div className="blog-meta">
                    <span className="blog-meta__cat">{post.category}</span>
                    <span className="blog-meta__dot" aria-hidden>·</span>
                    <span className="blog-meta__read">{post.readTime}</span>
                  </div>
                  <h3 className="blog-card__title">{post.title}</h3>
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                  <span className="blog-card__cta">
                    Read <Icon name="arrow-right" size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip
        headline="Have a question we haven't answered?"
        copy="We'd rather hear from you than guess. Reach out anytime."
      />
    </>
  );
}
