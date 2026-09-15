import { Link } from 'react-router-dom';
import CTAStrip from '../components/CTAStrip';
import FAQ from '../components/FAQ';
import Icon from '../components/Icon';
import SEO from '../seo/SEO';
import { breadcrumbSchema, faqSchema, serviceSchema } from '../seo/jsonld';
import { canonical } from '../seo/siteConfig';
import './ServicePage.css';

const areas = [
  { icon: 'clarity' as const, title: 'Speech clarity', body: 'Support for clearer, more confident speech.' },
  { icon: 'language' as const, title: 'Language', body: 'Help with understanding and using language for daily communication.' },
  { icon: 'cognitive' as const, title: 'Cognitive-communication', body: 'Support for attention, memory and problem-solving in communication.' },
  { icon: 'swallow' as const, title: 'Swallowing function', body: 'Strategies to help with safer, more comfortable swallowing.' },
  { icon: 'voice' as const, title: 'Voice', body: 'Support for healthy, effective voice use in everyday life.' },
  { icon: 'feeding' as const, title: 'Feeding safety', body: 'Strategies to support safer feeding and eating routines.' },
];

const supports = [
  { icon: 'stroke' as const, title: 'Recovering from stroke', body: 'Support to rebuild communication skills after a stroke.' },
  { icon: 'delay' as const, title: 'Managing a developmental delay', body: 'Support tailored to the way each person communicates and connects.' },
  { icon: 'speech' as const, title: 'Addressing a speech disorder', body: 'Personalized strategies for speech clarity and confident communication.' },
];

const faqs = [
  { q: 'What can speech therapy address?', a: 'Speech therapy can help improve communication, cognitive-communication, voice, and safer swallowing.' },
  { q: 'Can therapy support swallowing?', a: 'Yes — speech therapy includes evaluation, strategies and exercises to support safer swallowing.' },
  { q: 'Is each plan personalized?', a: 'Yes. Every plan is individualized based on your specific needs, goals, speech and hearing.' },
];

export default function SpeechTherapy() {
  return (
    <>
      <SEO
        title="In-home Speech Therapy — Communication & Swallowing"
        description="In-home speech therapy in Carson, CA and greater Los Angeles. Support for speech, language, voice, cognitive-communication and swallowing — including stroke recovery, developmental delay and speech disorders."
        path="/services/speech-therapy"
        keywords={[
          'in-home speech therapy',
          'speech therapy Carson CA',
          'swallowing therapy at home',
          'stroke speech rehabilitation',
        ]}
        jsonLd={[
          breadcrumbSchema([
            { name: 'Home', url: canonical('/') },
            { name: 'Services', url: canonical('/services') },
            { name: 'Speech Therapy', url: canonical('/services/speech-therapy') },
          ]),
          serviceSchema({
            name: 'In-home Speech Therapy',
            description:
              'In-home speech therapy for speech, language, voice, cognitive-communication and swallowing — supporting stroke recovery, developmental delay and speech disorders.',
            url: canonical('/services/speech-therapy'),
            serviceType: 'SpeechTherapy',
          }),
          faqSchema(faqs),
        ]}
      />
      <section className="svc-hero svc-hero--sp" aria-labelledby="sp-hero">
        <figure className="svc-hero__figure" aria-hidden="true">
          <img
            src="/images/therapy-speech.png"
            alt=""
            width="1440" height="1080"
            loading="eager" fetchPriority="high"
          />
        </figure>
        <div className="container svc-hero__inner">
          <div className="svc-hero__copy">
            <p className="eyebrow">Speech Therapy at Home</p>
            <h1 id="sp-hero">
              Communicate, connect and swallow with <em>greater confidence.</em>
            </h1>
            <p className="svc-hero__lede">
              Personalized speech therapy that supports communication, cognitive-communication and safer swallowing —
              delivered at your table, in your language, at your pace.
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

      <section className="section" aria-labelledby="sp-focus">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Areas of Focus</p>
            <h2 id="sp-focus">Areas speech therapy may address</h2>
            <p>Speech therapy can support a wide range of communication and swallowing needs, including:</p>
          </div>
          <div className="grid-2 focus-grid">
            {areas.map(item => (
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

      <section className="section bg-cream" aria-labelledby="sp-approach">
        <div className="container">
          <div className="two-col">
            <div>
              <p className="eyebrow">Personalized care</p>
              <h2 id="sp-approach">Personalized, one-on-one support</h2>
              <p>
                Our Speech Therapy services use advanced techniques and evidence-based approaches to help you meet
                meaningful goals. Our therapists integrate speech, voice and swallowing work, and delivered in the comfort
                of home so therapy fits your life.
              </p>
            </div>
            <aside className="callout">
              <div className="callout__icon"><Icon name="heart" size={22} /></div>
              <p><strong>Support</strong> for confident conversations every day.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="sp-who">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Who this may support</p>
            <h2 id="sp-who">When people seek support</h2>
          </div>
          <div className="grid-3">
            {supports.map(item => (
              <div key={item.title} className="who-card">
                <Icon name={item.icon} size={26} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-cream" aria-labelledby="sp-faq">
        <div className="container container--narrow">
          <div className="section-head">
            <p className="eyebrow">Common questions</p>
            <h2 id="sp-faq">Frequently asked questions</h2>
          </div>
          <FAQ items={faqs} />
        </div>
      </section>

      <CTAStrip
        headline="Ready to talk about communication or swallowing support?"
      />
    </>
  );
}
