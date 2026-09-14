import { useEffect, useState } from 'react';
import './HeroSlideshow.css';

interface Slide {
  src: string;
  alt: string;
}

interface Props {
  slides: Slide[];
  interval?: number;
}

export default function HeroSlideshow({ slides, interval = 6500 }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || slides.length < 2) return;
    const id = window.setInterval(() => {
      setIndex(i => (i + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [slides.length, interval]);

  return (
    <div className="hero-slides" aria-live="off" aria-atomic="true">
      {slides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className={`hero-slide ${i === index ? 'is-active' : ''}`}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={i === 0 ? 'high' : 'low'}
          width={1200}
          height={1200}
        />
      ))}
      <div className="hero-slides__dots" role="tablist" aria-label="Choose slide">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`hero-slides__dot ${i === index ? 'is-active' : ''}`}
            aria-label={`Show slide ${i + 1}`}
            aria-selected={i === index}
            role="tab"
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
