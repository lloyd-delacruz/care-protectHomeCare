import { Link } from 'react-router-dom';
import Icon from './Icon';
import './CTAStrip.css';

interface Props {
  headline: string;
  copy?: string;
  ctaLabel?: string;
  ctaTo?: string;
}

export default function CTAStrip({
  headline,
  copy,
  ctaLabel = 'Contact Us',
  ctaTo = '/contact',
}: Props) {
  return (
    <section className="cta-strip">
      <div className="container cta-strip__inner">
        <div>
          <h2>{headline}</h2>
          {copy && <p>{copy}</p>}
        </div>
        <Link to={ctaTo} className="btn btn--primary cta-strip__btn">
          {ctaLabel} <Icon name="arrow-right" size={16} />
        </Link>
      </div>
    </section>
  );
}
