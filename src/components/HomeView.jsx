import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { HeroBanner } from './HeroBanner';
import { FlashSaleCountdown } from './FlashSaleCountdown';
import { CategoryPills } from './CategoryPills';
import { ProductCard } from './ProductCard';
import { NewsletterBanner } from './NewsletterBanner';
import { RecentlyViewedShelf } from './RecentlyViewedShelf';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Users,
  Award
} from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Marcus Vance',
    role: 'Industrial Designer, Studio Neo',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    comment: 'The Blade Pro OLED chassis tolerance is unlike any consumer laptop. True aerospace unibody metallurgy with zero flex.',
    rating: 5,
    drop: 'Blade Pro 16" Liquid Titanium'
  },
  {
    name: 'Elena Rostova',
    role: 'Music Producer & Sound Engineer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    comment: 'The beryllium acoustic drivers in the Sonic Pro ANC give clean flat frequency response with sub-bass extension that rival $2000 studio monitors.',
    rating: 5,
    drop: 'Sonic Pro ANC Headphones'
  },
  {
    name: 'Kenji Takahashi',
    role: 'Tech Creator & Collector',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    comment: 'Every drop feels like an artifact from 2045. Packaging arrived in tamper-sealed Pelican-style unboxing with DHL Express in 36 hours.',
    rating: 5,
    drop: 'Matrix Fold 7 Cybernetic'
  }
];

export const HomeView = () => {
  const { setCurrentView, products } = useStore();

  // Curated spotlight of top 6 flagship featured drops using dynamic catalog
  const catalogList = products && products.length > 0 ? products : PRODUCTS;
  const featuredDrops = catalogList.filter((p) => p.featured).slice(0, 6);

  return (
    <div className="home-view">
      {/* 1. Kinetic Hero Showcase */}
      <HeroBanner />

      {/* 2. Real-time Ticking Flash Sale Bar */}
      <FlashSaleCountdown />

      {/* 3. Category Selector Pills */}
      <CategoryPills />

      {/* 4. Curated Flagship Spotlight Drops */}
      <section
        style={{
          maxWidth: '1360px',
          margin: '3rem auto 4rem auto',
          padding: '0 1.25rem'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.78rem',
                fontWeight: 800,
                color: 'var(--accent-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '0.35rem'
              }}
            >
              <Sparkles size={14} />
              <span>HAND-CRAFTED ATELIER RELEASES</span>
            </div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
              Flagship Drops & Innovations
            </h2>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              Limited production hardware crafted from liquid titanium, beryllium diaphragms, and ballistic nylon.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('shop')}
            className="btn-primary"
            style={{
              padding: '0.65rem 1.35rem',
              fontSize: '0.84rem'
            }}
          >
            <span>Explore All 44 Drops</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Featured 6 Products Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {featuredDrops.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Brand Value Props & Engineering Pillars */}
      <section
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '4rem 1.25rem',
          margin: '3rem 0'
        }}
      >
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2.5rem'
          }}
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px 4px 14px 4px',
                background: 'rgba(92, 58, 33, 0.08)',
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Truck size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.35rem' }}>
                48-Hour Global Dispatch
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Direct air express dispatches via DHL Express and FedEx with live GPS satellite waybills.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px 4px 14px 4px',
                background: 'rgba(197, 143, 93, 0.12)',
                color: 'var(--accent-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.35rem' }}>
                2-Year Full Coverage
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Zero-hassle replacement guarantee covering hardware components, sensors, and battery health.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(5, 150, 105, 0.1)',
                color: 'var(--accent-emerald)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <RotateCcw size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.35rem' }}>
                30-Day Risk-Free Trial
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Experience the acoustics and feel firsthand. If not fully captivated, return for an immediate 100% refund.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Award size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.35rem' }}>
                Verified Authenticity
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Every unit carries a cryptographic laser-engraved serial ID and tamper-sealed unboxing container.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Customer Testimonials & Creator Proof */}
      <section
        style={{
          maxWidth: '1360px',
          margin: '4rem auto',
          padding: '0 1.25rem'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.78rem',
              fontWeight: 800,
              color: 'var(--accent-secondary)',
              textTransform: 'uppercase',
              marginBottom: '0.5rem'
            }}
          >
            <Users size={14} />
            <span>GLOBAL COMMUNITY STORIES</span>
          </div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 900 }}>
            Endorsed by Designers, Producers & Collectors
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto' }}>
            Hear from verified collectors across Tokyo, London, San Francisco, and Berlin.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '1.75rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', color: 'var(--accent-amber)', marginBottom: '0.85rem' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem', fontStyle: 'italic' }}>
                  "{t.comment}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{t.name}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{t.role}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--accent-primary)', fontWeight: 600, marginTop: '0.1rem' }}>
                    Purchased: {t.drop}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Recently Viewed Shelf */}
      <RecentlyViewedShelf />

      {/* 8. Newsletter VIP Club */}
      <NewsletterBanner />
    </div>
  );
};

export default HomeView;
