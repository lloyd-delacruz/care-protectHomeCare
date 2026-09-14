import { Link } from 'react-router-dom';
import CTAStrip from '../components/CTAStrip';
import FAQ from '../components/FAQ';
import Icon from '../components/Icon';
import './ServicePage.css';

const supportAreas = [
  { icon: 'dressing' as const, title: 'Dressing', body: 'Build skills and strategies to make dressing safer and more comfortable in your daily routine.' },
  { icon: 'grooming' as const, title: 'Grooming', body: 'Techniques to support ease in personal grooming and hand hygiene.' },
  { icon: 'meal' as const, title: 'Meal preparation', body: 'Practical support to prepare and enjoy meals with more independence.' },
  { icon: 'management' as const, title: 'Home management', body: 'Skills, routines and adaptive tools that make home life feel more manageable.' },
  { icon: 'equipment' as const, title: 'Adaptive equipment', body: 'Recommendations and training on equipment that supports daily tasks safely.' },
  { icon: 'cognitive' as const, title: 'Motor and cognitive function', body: 'Work on movement, thinking and problem-solving to support everyday participation.' },
];

const supports = [
  { icon: 'recovery' as const, title: 'Recovering from injury', body: 'Regain confidence in daily tasks after an injury impacts routine.' },
  { icon: 'stroke' as const, title: 'Recovering from surgery', body: 'Support to safely return to the routines and roles that matter most.' },
  { icon: 'chronic' as const, title: 'Managing a chronic condition', body: 'Practical strategies to conserve energy and reduce impact on daily life.' },
];

const goals = [
  { icon: 'safety' as const, title: 'Safety return to familiar routines', body: 'Work toward the daily tasks that shape independence in a way that feels safe and steady.' },
  { icon: 'independence' as const, title: 'Promote lasting independence', body: 'Build habits and adaptations that support participation in the routines you value.' },
];

const faqs = [
  { q: 'What does occupational therapy focus on?', a: "Occupational therapy focuses on the everyday tasks that matter to you — bathing, dressing, cooking and moving through your home safely." },
  { q: 'Is the plan personalized?', a: 'Yes — your therapist designs an approach around your goals, environment and the routines that shape your day.' },
  { q: 'Can therapy address memory concerns?', a: 'Occupational therapy can include strategies to support memory, planning and problem-solving in daily activities.' },
];

export default function OccupationalTherapy() {
  return (
    <>
      <section className="svc-hero svc-hero--ot" aria-labelledby="ot-hero">
        <figure className="svc-hero__figure" aria-hidden="true">
          <img
            src="/images/daily-life.png"
            alt=""
            width="1440" height="1080"
            loading="eager" fetchPriority="high"
          />
        </figure>
        <div className="container svc-hero__inner">
          <div className="svc-hero__copy">
            <p className="eyebrow">Occupational Therapy at Home</p>
            <h1 id="ot-hero">
              Reclaim confidence in the activities that shape <em>everyday life.</em>
            </h1>
            <p className="svc-hero__lede">
              Practical therapy that meets you at the kitchen counter, the front step and the morning routine —
              working on the moments that make daily life feel like your own.
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

      <section className="section" aria-labelledby="ot-focus">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Support for everyday living</p>
            <h2 id="ot-focus">Where occupational therapy may help</h2>
          </div>
          <div className="grid-2 focus-grid">
            {supportAreas.map(item => (
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

      <section className="section bg-cream" aria-labelledby="ot-practical">
        <div className="container">
          <div className="two-col">
            <div>
              <p className="eyebrow">In-place support</p>
              <h2 id="ot-practical">Practical therapy in the place daily life happens.</h2>
              <p>
                Occupational therapy is hands-on and goal-focused. Your therapist helps you practice real-life skills,
                introduces adaptive equipment when helpful, and shares strategies to support the activities that matter to you.
              </p>
            </div>
            <aside className="callout">
              <div className="callout__icon"><Icon name="home" size={22} /></div>
              <p><strong>Small steps.</strong> Brighter days.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="ot-who">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Who this may support</p>
            <h2 id="ot-who">People we often work with</h2>
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

      <section className="section bg-panel" aria-labelledby="ot-goals">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Goals of occupational therapy</p>
            <h2 id="ot-goals">Goals of occupational therapy</h2>
          </div>
          <div className="grid-2">
            {goals.map(item => (
              <div key={item.title} className="who-card">
                <Icon name={item.icon} size={26} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-cream" aria-labelledby="ot-faq">
        <div className="container container--narrow">
          <div className="section-head">
            <p className="eyebrow">Common questions</p>
            <h2 id="ot-faq">Frequently asked questions</h2>
          </div>
          <FAQ items={faqs} />
        </div>
      </section>

      <CTAStrip
        headline="Let's discuss the daily activities that matter to you."
      />
    </>
  );
}
