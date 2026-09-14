import { Link } from 'react-router-dom';
import Icon from './Icon';
import './ServiceCard.css';

interface Props {
  icon: 'physical' | 'occupational' | 'speech';
  title: string;
  body: string;
  to: string;
  cta?: string;
}

export default function ServiceCard({ icon, title, body, to, cta = 'Explore therapy' }: Props) {
  return (
    <article className="service-card">
      <div className="service-card__icon"><Icon name={icon} size={28} /></div>
      <h3>{title}</h3>
      <p>{body}</p>
      <Link to={to} className="service-card__link">
        {cta} <Icon name="arrow-right" size={16} />
      </Link>
    </article>
  );
}
