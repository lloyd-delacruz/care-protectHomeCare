import { Link } from 'react-router-dom';
import HeroSlideshow from '../components/HeroSlideshow';
import ServiceCard from '../components/ServiceCard';
import CTAStrip from '../components/CTAStrip';
import Icon from '../components/Icon';
import SEO from '../seo/SEO';
import {
  medicalBusinessSchema,
  organizationSchema,
  websiteSchema,
} from '../seo/jsonld';
import './Home.css';

export default function Home() {
  return (
    <>
      <SEO
        title="In-home Physical, Occupational and Speech Therapy in Carson, CA"
        description="Care and Protect Homecare provides personalized in-home physical, occupational and speech therapy across Carson, Long Beach, Torrance and Los Angeles County. Compassionate, evidence-based care delivered where daily life happens."
        path="/"
        keywords={[
          'in-home physical therapy',
          'in-home occupational therapy',
          'in-home speech therapy',
          'home health therapy Carson CA',
          'home therapy Los Angeles',
          'homecare rehabilitation',
        ]}
        jsonLd={[organizationSchema(), websiteSchema(), medicalBusinessSchema()]}
      />
      {/* HERO */}
      <section className="home-hero" aria-labelledby="hero-heading">
        <div className="home-hero__media" aria-hidden="true">
          <HeroSlideshow
            slides={[
              { src: '/images/therapy-strength.png', alt: 'Home therapist supporting a seated patient during a strength exercise in a bright living room' },
              { src: '/images/therapy-walking.png',  alt: 'Home therapist walking beside a smiling patient in his living room' },
              { src: '/images/therapy-speech.png',   alt: 'Speech therapist practicing sounds with a patient using picture cards at a dining table' },
            ]}
          />
        </div>

        <div className="container home-hero__inner">
          <div className="home-hero__copy">
            <p className="eyebrow">
              <span className="eyebrow__mark" aria-hidden />
              In-home therapy · Care and Protect
            </p>
            <h1 id="hero-heading">
              A quieter path to <em>strength,</em> <br className="hide-sm" />
              independence and everyday <em>ease.</em>
            </h1>
            <p className="home-hero__lede">
              Personalized physical, occupational and speech therapy delivered with compassion —
              in the comfort of the home you already know.
            </p>
            <div className="home-hero__ctas">
              <Link to="/contact" className="btn btn--forest home-hero__cta">
                Begin a conversation <Icon name="arrow-right" size={16} />
              </Link>
              <Link to="/services" className="home-hero__link">
                Explore our services
                <Icon name="arrow-right" size={14} />
              </Link>
            </div>

            <ul className="home-hero__meta" aria-label="What we care for">
              <li><span>01</span> Physical Therapy</li>
              <li><span>02</span> Occupational Therapy</li>
              <li><span>03</span> Speech Therapy</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section bg-cream" aria-labelledby="services-heading">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Our Services</p>
            <h2 id="services-heading">Expert care for meaningful progress</h2>
            <p>
              We provide in-home physical, occupational and speech therapy to help you or your loved one build skills,
              regain abilities, and live more independently.
            </p>
          </div>
          <div className="grid-3">
            <ServiceCard
              icon="physical"
              title="Physical Therapy"
              body="Build strength, improve mobility and balance, manage pain, and recover after surgery or injury."
              to="/services/physical-therapy"
            />
            <ServiceCard
              icon="occupational"
              title="Occupational Therapy"
              body="Everyday living, meal preparation, home management, adaptive equipment, and motor and cognitive function."
              to="/services/occupational-therapy"
            />
            <ServiceCard
              icon="speech"
              title="Speech Therapy"
              body="Address speech, language, voice, cognitive-communication and swallowing."
              to="/services/speech-therapy"
            />
          </div>
        </div>
      </section>

      {/* GOALS / PROCESS */}
      <section className="section bg-panel" aria-labelledby="process-heading">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Our Process</p>
            <h2 id="process-heading">Care built around your goals.</h2>
            <p>
              We make personalized treatment plans based on your unique needs and goals. Our approach uses evidence-based
              techniques to support your recovery — all in the comfort of home.
            </p>
          </div>
          <ol className="process">
            <li>
              <div className="process__icon"><Icon name="clipboard" size={22} /></div>
              <div>
                <p className="process__step">Step 01</p>
                <h3>Tell us what you need</h3>
                <p>Share a little about the person receiving therapy and what they'd like to work toward.</p>
              </div>
            </li>
            <li>
              <div className="process__icon"><Icon name="plan" size={22} /></div>
              <div>
                <p className="process__step">Step 02</p>
                <h3>Choose a personalized plan</h3>
                <p>We'll match you with a therapist and design an approach shaped around goals and preferences.</p>
              </div>
            </li>
            <li>
              <div className="process__icon"><Icon name="begin" size={22} /></div>
              <div>
                <p className="process__step">Step 03</p>
                <h3>Begin care at home</h3>
                <p>Your therapist arrives at your home ready to help you progress at a steady, sustainable pace.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="section bg-cream" aria-label="Testimonial">
        <div className="container container--narrow">
          <blockquote className="quote">
            <p>“The PT was fantastic. He does exercises with them, and they are able to do them on their own between visits.”</p>
            <cite>— Family caregiver</cite>
          </blockquote>
        </div>
      </section>

      <CTAStrip
        headline="Let's talk about the support you need."
        copy="We're here to help you take the next step toward greater independence and a fuller quality of life at home."
      />
    </>
  );
}
