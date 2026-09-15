import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Icon from '../components/Icon';
import CTAStrip from '../components/CTAStrip';
import SEO from '../seo/SEO';
import { blogPostingSchema, breadcrumbSchema } from '../seo/jsonld';
import { canonical } from '../seo/siteConfig';
import { POSTS } from './blogData';
import './Blog.css';

function isoDate(human: string): string {
  const d = new Date(human);
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

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

export default function BlogPost() {
  const { slug } = useParams();
  useReveal();

  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;

  const idx = POSTS.findIndex((p) => p.slug === slug);
  const related = POSTS.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3);
  const prev = idx > 0 ? POSTS[idx - 1] : null;
  const next = idx < POSTS.length - 1 ? POSTS[idx + 1] : null;

  const postUrl = canonical(`/blog/${post.slug}`);
  const publishedIso = isoDate(post.date);

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.image}
        type="article"
        publishedTime={publishedIso}
        keywords={[post.category, 'homecare', 'in-home therapy']}
        jsonLd={[
          breadcrumbSchema([
            { name: 'Home', url: canonical('/') },
            { name: 'Journal', url: canonical('/blog') },
            { name: post.title, url: postUrl },
          ]),
          blogPostingSchema({
            title: post.title,
            description: post.excerpt,
            url: postUrl,
            image: post.image,
            datePublished: publishedIso,
            author: post.author,
          }),
        ]}
      />
      {/* HERO */}
      <article>
        <header className="post-hero">
          <div className="container post-hero__inner">
            <nav className="post-crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden>/</span>
              <Link to="/blog">Journal</Link>
              <span aria-hidden>/</span>
              <span aria-current="page">{post.category}</span>
            </nav>
            <p className="eyebrow reveal">{post.category}</p>
            <h1 className="post-hero__title reveal reveal--delay-1">{post.title}</h1>
            <div className="post-hero__meta reveal reveal--delay-2">
              <span>{post.author}</span>
              <span aria-hidden>·</span>
              <span>{post.date}</span>
              <span aria-hidden>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        {/* COVER */}
        <div className="post-cover">
          <div className="container">
            <img
              src={post.image}
              alt={post.imageAlt}
              loading="eager"
              width={1600}
              height={900}
            />
          </div>
        </div>

        {/* BODY */}
        <section className="post-body-section">
          <div className="container post-body-grid">
            <aside className="post-aside" aria-label="Key takeaways">
              <div className="post-aside__card reveal">
                <p className="eyebrow">Takeaways</p>
                <ul>
                  {post.takeaways.map((t) => (
                    <li key={t}>
                      <Icon name="check" size={16} />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="post-body reveal">
              {post.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              <div className="post-signature">
                <p className="script">— The Care and Protect Team</p>
              </div>
            </div>
          </div>
        </section>

        {/* PREV / NEXT */}
        <nav className="post-nav" aria-label="More posts">
          <div className="container post-nav__row">
            {prev ? (
              <Link to={`/blog/${prev.slug}`} className="post-nav__link post-nav__link--prev">
                <Icon name="arrow-right" size={16} />
                <span className="post-nav__label">Previous</span>
                <span className="post-nav__title">{prev.title}</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link to={`/blog/${next.slug}`} className="post-nav__link post-nav__link--next">
                <span className="post-nav__label">Next</span>
                <span className="post-nav__title">{next.title}</span>
                <Icon name="arrow-right" size={16} />
              </Link>
            ) : <span />}
          </div>
        </nav>

        {/* RELATED */}
        {related.length > 0 && (
          <section className="section post-related">
            <div className="container">
              <div className="section-head reveal">
                <p className="eyebrow">Keep reading</p>
                <h2>More from {post.category}</h2>
              </div>
              <div className="blog-grid">
                {related.map((r, i) => (
                  <Link
                    key={r.slug}
                    to={`/blog/${r.slug}`}
                    className={`blog-card reveal ${i === 1 ? 'reveal--delay-1' : i === 2 ? 'reveal--delay-2' : ''}`}
                  >
                    <div className="blog-card__media">
                      <img src={r.image} alt={r.imageAlt} loading="lazy" width={800} height={560} />
                    </div>
                    <div className="blog-card__body">
                      <div className="blog-meta">
                        <span className="blog-meta__cat">{r.category}</span>
                        <span className="blog-meta__dot" aria-hidden>·</span>
                        <span className="blog-meta__read">{r.readTime}</span>
                      </div>
                      <h3 className="blog-card__title">{r.title}</h3>
                      <p className="blog-card__excerpt">{r.excerpt}</p>
                      <span className="blog-card__cta">
                        Read <Icon name="arrow-right" size={14} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <CTAStrip
        headline="Care that meets you at home."
        copy="Talk with our team about what a plan could look like for your family."
      />
    </>
  );
}
