import { useState } from 'react';
import Icon from './Icon';
import './FAQ.css';

interface Item { q: string; a: string; }
interface Props { items: Item[]; }

export default function FAQ({ items }: Props) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
            <button
              type="button"
              className="faq__q"
              aria-expanded={isOpen}
              aria-controls={`faq-a-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{item.q}</span>
              <Icon name="chevron-down" size={20} className="faq__chevron" />
            </button>
            <div id={`faq-a-${i}`} className="faq__a" role="region" aria-hidden={!isOpen}>
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
