import React from 'react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/currency';
import { PRODUCTS } from '../data/products';
import {
  ArrowDownRight,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Eye
} from 'lucide-react';

export const HeroBanner = () => {
  const { currency, setQuickViewProduct, setIsSpinWheelOpen, products } = useStore();

  const catalogList = products && products.length > 0 ? products : PRODUCTS;

  // 5 Signature Flagship Pieces for the Arched Leaf Showcase (LUMINA Core Tech & Modern Living)
  const showcaseProducts = [
    catalogList.find((p) => p.id === 'lumina-blade-oled-laptop') || catalogList[0],
    catalogList.find((p) => p.id === 'cyber-matrix-phone-ultra') || catalogList[1],
    catalogList.find((p) => p.id === 'lumina-sonic-pro') || catalogList[2],
    catalogList.find((p) => p.id === 'chronopulse-matrix-watch') || catalogList[3],
    catalogList.find((p) => p.id === 'retro-bass-tube-speaker') || catalogList[4]
  ];

  const handleScrollToShop = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '3.5rem 1.25rem 4.5rem 1.25rem',
        backgroundColor: 'var(--bg-primary)'
      }}
    >
      {/* Subtle Warm Amber / Cream Ambient Background Blooms */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '780px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(197, 143, 93, 0.12) 0%, rgba(92, 58, 33, 0.04) 50%, transparent 80%)',
          filter: 'blur(70px)',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Editorial Header Section */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}>
          {/* Eyebrow Label */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(92, 58, 33, 0.06)',
              border: '1px solid rgba(92, 58, 33, 0.14)',
              padding: '0.35rem 0.95rem',
              borderRadius: 'var(--radius-full)',
              marginBottom: '1.25rem'
            }}
          >
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)' }}>✦</span>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: 'var(--accent-primary)',
                textTransform: 'uppercase'
              }}
            >
              LUMINA ATELIER // FLAGSHIP EDIT 2026
            </span>
          </div>

          {/* High-Elegance Editorial Serif Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5.2vw, 4.4rem)',
              lineHeight: 1.12,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              marginBottom: '1.25rem'
            }}
          >
            Aesthetics Meet Pure <br />
            <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Everyday</span> Precision
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              color: 'var(--text-secondary)',
              maxWidth: '640px',
              margin: '0 auto 2.25rem auto',
              lineHeight: 1.68
            }}
          >
            Engineered acoustics, Grade-5 titanium devices, and architectural lifestyle essentials.
            Handcrafted for creative minds, digital creators, and modern spaces.
          </p>

          {/* Action Button Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '3.5rem'
            }}
          >
            <button
              onClick={handleScrollToShop}
              className="btn-organic"
              aria-label="Explore Product Collection"
            >
              <span>Explore Products</span>
              <ArrowDownRight size={18} />
            </button>

            <button
              onClick={() => setIsSpinWheelOpen(true)}
              className="btn-secondary"
              style={{
                borderRadius: '20px 4px 20px 4px',
                padding: '0.85rem 1.6rem',
                fontSize: '0.92rem',
                letterSpacing: '0.02em'
              }}
            >
              <Sparkles size={16} style={{ color: 'var(--accent-secondary)' }} />
              <span>Spin Mystery Wheel</span>
            </button>
          </div>
        </div>

        {/* 5-Item Organic Leaf Arched Showcase Gallery (Clean Core Tech & Audio) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3.5rem'
          }}
        >
          {showcaseProducts.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setQuickViewProduct(item)}
              className="leaf-card-frame group"
              style={{
                height: '310px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                boxShadow: '0 8px 24px rgba(44, 30, 21, 0.08)'
              }}
              title={`Click to view ${item.name}`}
            >
              {/* Product Image */}
              <img
                src={item.images[0]}
                alt={item.name}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="hero-gallery-img"
              />

              {/* Gentle Gradient Scrim for Legibility */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(23, 19, 16, 0.88) 0%, rgba(23, 19, 16, 0.35) 45%, transparent 70%)',
                  zIndex: 2,
                  transition: 'opacity 0.3s ease'
                }}
              />

              {/* Top Index Marker */}
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  zIndex: 3,
                  backgroundColor: 'rgba(251, 248, 243, 0.9)',
                  backdropFilter: 'blur(8px)',
                  color: 'var(--accent-primary)',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  padding: '0.2rem 0.55rem',
                  borderRadius: '12px 3px 12px 3px',
                  letterSpacing: '0.05em'
                }}
              >
                0{idx + 1}
              </div>

              {/* Hover Quick View Pill */}
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  zIndex: 3,
                  backgroundColor: 'rgba(92, 58, 33, 0.85)',
                  color: '#fff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
              >
                <Eye size={14} />
              </div>

              {/* Bottom Details Overlay */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 3,
                  padding: '1.15rem 1rem',
                  color: '#ffffff'
                }}
              >
                <div
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--accent-secondary)',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    marginBottom: '0.25rem'
                  }}
                >
                  {item.category}
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.02rem',
                    fontWeight: 600,
                    lineHeight: 1.25,
                    marginBottom: '0.35rem',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {item.name}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.98rem', fontWeight: 800, color: '#fbf8f3' }}>
                    {formatPrice(item.price, currency)}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.76rem', color: '#fbbf24' }}>
                    <Star size={12} fill="currentColor" />
                    <span>{item.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quiet Trust Guarantees Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-subtle)',
            maxWidth: '1000px',
            margin: '0 auto'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '14px 4px 14px 4px',
                backgroundColor: 'rgba(92, 58, 33, 0.08)',
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Truck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                48h Dispatch & Tracking
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                Insured courier to 120+ countries
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '14px 4px 14px 4px',
                backgroundColor: 'rgba(197, 143, 93, 0.12)',
                color: 'var(--accent-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                2-Year Atelier Guarantee
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                Direct exchange & repair support
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '14px 4px 14px 4px',
                backgroundColor: 'rgba(184, 93, 67, 0.1)',
                color: 'var(--accent-pink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <RotateCcw size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                30-Day Risk-Free Trial
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                Hassle-free returns & refunds
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
