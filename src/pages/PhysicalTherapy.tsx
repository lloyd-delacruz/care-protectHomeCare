import { Link } from 'react-router-dom';
import CTAStrip from '../components/CTAStrip';
import FAQ from '../components/FAQ';
import Icon from '../components/Icon';
import SEO from '../seo/SEO';
import { breadcrumbSchema, faqSchema, serviceSchema } from '../seo/jsonld';
import { canonical } from '../seo/siteConfig';
import './ServicePage.css';

const focusAreas = [
  { icon: 'therapeutic' as const, title: 'Therapeutic exercises', body: 'Activities designed to improve strength, endurance and function.' },
  { icon: 'balance' as const, title: 'Balance training', body: 'Strategies to support stability and reduce fall risk at home.' },
  { icon: 'movement' as const, title: 'Movement and mobility', body: 'Techniques to improve movement patterns and overall mobility.' },
  { icon: 'manual' as const, title: 'Manual therapy', body: 'Hands-on techniques to address stiffness, improve movement and support function.' },
  { icon: 'pain' as const, title: 'Pain management strategies', body: 'Approaches to help manage pain and support participation in daily activities.' },
  { icon: 'daily' as const, title: 'Safe return to daily activities', body: 'Guidance to help you move more safely and confidently in everyday life.' },
];

const seekSupport = [
  { icon: 'recovery' as const, title: 'Recovering from surgery', body: 'Support during recovery so you can regain strength, mobility and confidence.' },
  { icon: 'stroke' as const, title: 'Recovering from injury', body: 'Guidance to help you move safely and rebuild function as you heal.' },
  { icon: 'chronic' as const, title: 'Managing a chronic condition', body: 'Practical strategies to manage symptoms and support daily function.' },
];

const faqs = [
  { q: 'What happens before therapy begins?', a: "We start with a conversation about your goals and any concerns, then arrange the first in-home visit that fits your schedule." },
  { q: 'Is the plan personalized?', a: 'Yes — every plan is shaped around your goals, environment and pace of progress.' },
  { q: 'Is each plan personalized?', a: 'Absolutely. Your therapist tailors exercises and techniques to your specific needs and adjusts as you improve.' },
  { q: 'Where is physical therapy at home?', a: 'Your therapist visits you where you live, working with the space and support that is already part of your daily life.' },
];

export default function PhysicalTherapy() {
  return (
    <>
      <SEO
        title="In-home Physical Therapy — Strength, Mobility, Recovery"
        description="In-home physical therapy in Carson, CA and the greater Los Angeles area. Personalized plans for post-surgery recovery, injury rehabilitation, balance, pain management and chronic conditions."
        path="/services/physical-therapy"
        keywords={[
          'in-home physical therapy',
          'physical therapy Carson CA',
          'post-surgery rehab at home',
          'fall prevention therapy',
        ]}
        jsonLd={[
          breadcrumbSchema([
            { name: 'Home', url: canonical('/') },
            { name: 'Services', url: canonical('/services') },
            { name: 'Physical Therapy', url: canonical('/services/physical-therapy') },
          ]),
          serviceSchema({
            name: 'In-home Physical Therapy',
            description:
              'Personalized in-home physical therapy for strength, mobility, balance, pain management and recovery after surgery or injury.',
            url: canonical('/services/physical-therapy'),
            serviceType: 'PhysicalTherapy',
          }),
          faqSchema(faqs),
        ]}
      />
      <section className="svc-hero svc-hero--pt" aria-labelledby="pt-hero">
        <figure className="svc-hero__figure" aria-hidden="true">
          <img
            src="/images/therapy-walking.png"
            alt=""
            width="1440" height="1080"
            loading="eager" fetchPriority="high"
          />
        </figure>
        <div className="container svc-hero__inner">
          <div className="svc-hero__copy">
            <p className="eyebrow">Physical Therapy at Home</p>
            <h1 id="pt-hero">
              Build strength, restore mobility, move with <em>greater confidence.</em>
            </h1>
            <p className="svc-hero__lede">
              Comprehensive physical therapy that helps people recovering from surgery or injury,
              or managing a chronic condition, regain independence in the home they already know.
            </p>
            <div className="svc-hero__ctas">
              <Link to="/contact" className="btn btn--forest svc-hero__cta">
                Begin a conversation <Icon name="arrow-right" size={16} />
              </Link>
              <Link to="/services" className="svc-hero__link">
                All services <Icon name="arrow-right" size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="focus-heading">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Areas of Focus</p>
            <h2 id="focus-heading">What physical therapy may focus on</h2>
          </div>
          <div className="grid-2 focus-grid">
            {focusAreas.map(item => (
              <div key={item.title} className="focus-item">
                <div className="focus-item__icon"><Icon name={item.icon} size={22} /></div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-cream" aria-labelledby="approach-heading">
        <div className="container">
          <div className="two-col">
            <div>
              <p className="eyebrow">Care Approach</p>
              <h2 id="approach-heading">Care shaped around your goals</h2>
              <p>
                We create customized treatment plans based on your unique needs and goals. Our approach uses evidence-based
                techniques to support your recovery, function and independence in the place that matters most.
              </p>
            </div>
            <aside className="callout">
              <div className="callout__icon"><Icon name="heart" size={22} /></div>
              <p><strong>Your goals</strong> guide our care.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="who-heading">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Who this may support</p>
            <h2 id="who-heading">When people seek support</h2>
            <p>Physical Therapy at home can be helpful for people navigating a range of needs.</p>
          </div>
          <div className="grid-3">
            {seekSupport.map(item => (
              <div key={item.title} className="who-card">
                <Icon name={item.icon} size={26} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-cream" aria-labelledby="faq-heading">
        <div className="container container--narrow">
          <div className="section-head">
            <p className="eyebrow">Common questions</p>
            <h2 id="faq-heading">Frequently asked questions</h2>
          </div>
          <FAQ items={faqs} />
        </div>
      </section>

      <CTAStrip
        headline="Where is physical therapy at home?"
        copy="Take the next step toward greater strength, mobility and independence."
      />
    </>
  );
}
