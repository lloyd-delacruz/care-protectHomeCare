import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import SEO from '../seo/SEO';
import { breadcrumbSchema } from '../seo/jsonld';
import { canonical } from '../seo/siteConfig';
import './About.css';

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
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function About() {
  useReveal();

  return (
    <>
      <SEO
        title="About Care and Protect Homecare — Compassionate In-home Therapy"
        description="Meet the team behind Care and Protect Homecare. We deliver physical, occupational and speech therapy in the home, shaped around each person's routines, environment and goals."
        path="/about"
        keywords={[
          'about care and protect homecare',
          'in-home therapy team',
          'homecare providers Carson CA',
        ]}
        jsonLd={breadcrumbSchema([
          { name: 'Home', url: canonical('/') },
          { name: 'About', url: canonical('/about') },
        ])}
      />
      {/* HERO — compact editorial, one photograph, balanced two columns */}
      <section className="about-hero" aria-labelledby="about-hero-heading">
        <div className="container about-hero__inner">
          <div className="about-hero__copy">
            <p className="eyebrow reveal">About Care and Protect</p>
            <h1 id="about-hero-heading" className="about-hero__title reveal reveal--delay-1">
              Compassionate care, <em>shaped around the person.</em>
            </h1>
            <p className="about-hero__lede reveal reveal--delay-2">
              We deliver physical, occupational and speech therapy in the home —
              supporting comfort, independence and the ordinary moments that make
              up daily life.
            </p>
            <div className="about-hero__ctas reveal reveal--delay-2">
              <Link to="/contact" className="btn btn--forest">
                Contact Us <Icon name="arrow-right" size={16} />
              </Link>
              <Link to="/services" className="about-hero__link">
                Explore our services <Icon name="arrow-right" size={14} />
              </Link>
            </div>
          </div>

          <figure className="about-hero__figure reveal reveal--delay-2">
            <img
              src="/images/daily-life.png"
              alt="Illustration of an older woman preparing a fresh meal in her sunlit kitchen at home"
              width={1200}
              height={900}
              loading="eager"
              fetchPriority="high"
            />
          </figure>
        </div>
      </section>

      {/* MISSION / PURPOSE — copy driven, editorial two-column */}
      <section className="section about-mission" aria-labelledby="mission-heading">
        <div className="container about-mission__grid">
          <div className="about-mission__lead reveal">
            <p className="eyebrow">Our Purpose</p>
            <h2 id="mission-heading">
              Therapy that meets people where <em>daily life</em> happens.
            </h2>
          </div>
          <div className="about-mission__body reveal reveal--delay-1">
            <p>
              Care and Protect Homecare provides in-home physical, occupational
              and speech therapy for adults recovering after surgery or injury,
              managing a chronic condition, or working to preserve independence
              as needs change.
            </p>
            <p>
              We come to the place that matters most — the kitchen, the hallway,
              the front step. Therapy fits into real routines, and progress is
              measured in the everyday: the cup of coffee made without help, the
              walk to the mailbox, a clearer conversation with a grandchild.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES — editorial three-column, vertical dividers, no cards */}
      <section className="section bg-cream about-values" aria-labelledby="values-heading">
        <div className="container">
          <div className="section-head about-values__head reveal">
            <p className="eyebrow">Our Values</p>
            <h2 id="values-heading">A steady approach to care.</h2>
            <p>
              Three principles shape every visit and every plan we build with
              you and your family.
            </p>
          </div>

          <ul className="values-grid">
            <li className="reveal">
              <div className="values-grid__icon"><Icon name="heart" size={22} /></div>
              <h3>Personalized</h3>
              <p>
                Plans are built around each person's goals, history and home —
                not a template. As needs change, the plan changes with them.
              </p>
            </li>
            <li className="reveal reveal--delay-1">
              <div className="values-grid__icon"><Icon name="home" size={22} /></div>
              <h3>Practical</h3>
              <p>
                Therapy takes place where daily life happens, so skills carry
                straight into the environment where they matter most.
              </p>
            </li>
            <li className="reveal reveal--delay-2">
              <div className="values-grid__icon"><Icon name="leaf" size={22} /></div>
              <h3>Compassionate</h3>
              <p>
                Steady, unhurried support for clients and for the family members
                who walk alongside them.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* DISCIPLINES — three therapies, subtle links, no imagery */}
      <section className="section about-disciplines" aria-labelledby="disciplines-heading">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Therapy Disciplines</p>
            <h2 id="disciplines-heading">
              Three services. <em>One focus:</em> a fuller life at home.
            </h2>
          </div>

          <ul className="disciplines">
            <li className="reveal">
              <span className="disciplines__icon"><Icon name="physical" size={22} /></span>
              <div>
                <h3>Physical Therapy</h3>
                <p>Movement, strength and mobility — for recovery, chronic conditions and everyday confidence.</p>
                <Link to="/services/physical-therapy" className="disciplines__link">
                  Explore Physical Therapy <Icon name="arrow-right" size={14} />
                </Link>
              </div>
            </li>
            <li className="reveal reveal--delay-1">
              <span className="disciplines__icon"><Icon name="occupational" size={22} /></span>
              <div>
                <h3>Occupational Therapy</h3>
                <p>Daily activities and independence — dressing, meal preparation, home management and adaptive equipment.</p>
                <Link to="/services/occupational-therapy" className="disciplines__link">
                  Explore Occupational Therapy <Icon name="arrow-right" size={14} />
                </Link>
              </div>
            </li>
            <li className="reveal reveal--delay-2">
              <span className="disciplines__icon"><Icon name="speech" size={22} /></span>
              <div>
                <h3>Speech Therapy</h3>
                <p>Communication and swallowing — supporting clearer speech, cognitive-communication and safer eating.</p>
                <Link to="/services/speech-therapy" className="disciplines__link">
                  Explore Speech Therapy <Icon name="arrow-right" size={14} />
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* HOW CARE WORKS — four steps, numbered editorial, no cards */}
      <section className="section bg-panel about-process" aria-labelledby="process-heading">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">How Care Works</p>
            <h2 id="process-heading">A steady path from first call to lasting progress.</h2>
          </div>

          <ol className="process-steps">
            <li className="reveal">
              <span className="process-steps__num">01</span>
              <div>
                <h3>Listen and understand</h3>
                <p>
                  We begin with a conversation — about goals, history and the
                  rhythm of daily life at home.
                </p>
              </div>
            </li>
            <li className="reveal reveal--delay-1">
              <span className="process-steps__num">02</span>
              <div>
                <h3>Create a personalized plan</h3>
                <p>
                  A therapist matched to the person builds a plan around the
                  goals that matter most and the home you already know.
                </p>
              </div>
            </li>
            <li className="reveal reveal--delay-2">
              <span className="process-steps__num">03</span>
              <div>
                <h3>Deliver care at home</h3>
                <p>
                  Sessions happen in the living room, the kitchen, the hallway —
                  wherever daily life actually takes place.
                </p>
              </div>
            </li>
            <li className="reveal reveal--delay-3">
              <span className="process-steps__num">04</span>
              <div>
                <h3>Review progress together</h3>
                <p>
                  Plans evolve as progress does — with clear communication for
                  clients and the family members who support them.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* FINAL CTA — sage panel, distinct from deep evergreen footer */}
      <section className="about-cta" aria-labelledby="about-cta-heading">
        <div className="container about-cta__inner">
          <div className="about-cta__copy">
            <h2 id="about-cta-heading">Ready to bring care home?</h2>
            <p>
              Tell us a little about the person you're caring for, and we'll
              help identify the right next step.
            </p>
          </div>
          <Link to="/contact" className="btn btn--forest about-cta__btn">
            Contact Us <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
