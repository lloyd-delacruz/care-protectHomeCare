import { Link } from 'react-router-dom';
import CTAStrip from '../components/CTAStrip';
import Icon from '../components/Icon';
import SEO from '../seo/SEO';
import { breadcrumbSchema, serviceSchema } from '../seo/jsonld';
import { canonical } from '../seo/siteConfig';
import './Services.css';

const services = [
  {
    icon: 'physical' as const,
    title: 'Restore strength, mobility and confidence.',
    body: 'Physical Therapy can support recovery after surgery or injury, help manage chronic conditions, and focus on strength, balance and pain management.',
    to: '/services/physical-therapy',
    cta: 'Explore Physical Therapy',
  },
  {
    icon: 'occupational' as const,
    title: 'Make everyday activities feel possible again.',
    body: 'Occupational Therapy helps with dressing, grooming, meal preparation, home management and the use of adaptive equipment — while also supporting motor skills and cognitive function.',
    to: '/services/occupational-therapy',
    cta: 'Explore Occupational Therapy',
  },
  {
    icon: 'speech' as const,
    title: 'Build clearer communication and safer swallowing.',
    body: 'Speech Therapy can support stroke recovery, developmental delay and speech disorders — with a focus on speech, language, voice, cognitive-communication and swallowing.',
    to: '/services/speech-therapy',
    cta: 'Explore Speech Therapy',
  },
];

export default function Services() {
  return (
    <>
      <SEO
        title="In-home Therapy Services — Physical, Occupational & Speech"
        description="Explore in-home Physical, Occupational and Speech Therapy from Care and Protect Homecare. Personalized, evidence-based care delivered in Carson, Long Beach, Torrance and the wider Los Angeles area."
        path="/services"
        keywords={[
          'in-home therapy services',
          'physical therapy at home',
          'occupational therapy at home',
          'speech therapy at home',
        ]}
        jsonLd={[
          breadcrumbSchema([
            { name: 'Home', url: canonical('/') },
            { name: 'Services', url: canonical('/services') },
          ]),
          serviceSchema({
            name: 'In-home Physical Therapy',
            description:
              'Personalized in-home physical therapy to build strength, improve mobility and balance, manage pain and support recovery.',
            url: canonical('/services/physical-therapy'),
            serviceType: 'PhysicalTherapy',
          }),
          serviceSchema({
            name: 'In-home Occupational Therapy',
            description:
              'In-home occupational therapy for dressing, grooming, meal preparation, home management and adaptive equipment.',
            url: canonical('/services/occupational-therapy'),
            serviceType: 'OccupationalTherapy',
          }),
          serviceSchema({
            name: 'In-home Speech Therapy',
            description:
              'In-home speech therapy for speech, language, voice, cognitive-communication and swallowing.',
            url: canonical('/services/speech-therapy'),
            serviceType: 'SpeechTherapy',
          }),
        ]}
      />
      <section className="services-hero" aria-labelledby="svc-hero">
        <figure className="services-hero__figure" aria-hidden="true">
          <img
            src="/images/therapy-strength.png"
            alt=""
            width="1440" height="1080"
            loading="eager" fetchPriority="high"
          />
        </figure>
        <div className="container services-hero__inner">
          <div className="services-hero__copy">
            <p className="eyebrow">Our Services</p>
            <h1 id="svc-hero">
              In-home therapy for movement, daily life and <em>communication.</em>
            </h1>
            <p className="services-hero__lede">
              Care and Protect Homecare provides physical, occupational and speech therapy delivered in the place
              that matters most — the comfort of the home you already know.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="services-list">
        <div className="container">
          <h2 id="services-list" className="visually-hidden">Our therapy services</h2>
          <div className="services-stack">
            {services.map((s, i) => (
              <article key={s.to} className={`service-row ${i % 2 === 1 ? 'service-row--alt' : ''}`}>
                <div className="service-row__icon">
                  <Icon name={s.icon} size={32} />
                </div>
                <div className="service-row__body">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <Link to={s.to} className="btn btn--ghost">
                    {s.cta} <Icon name="arrow-right" size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip
        headline="Not sure where to start?"
        copy="Tell us what support you're looking for and we'll help identify the most relevant therapy to discuss."
      />
    </>
  );
}
