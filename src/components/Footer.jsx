import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShieldCheck,
  Truck,
  Zap,
  Globe,
  Lock,
  Package,
  HelpCircle
} from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = () => {
  const { setSelectedCategory, setCurrentView, setIsSpinWheelOpen } = useStore();

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setCurrentView('shop');
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '4rem 1.25rem 2rem 1.25rem',
        marginTop: '4rem',
        color: 'var(--text-secondary)',
        fontSize: '0.85rem'
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}
      >
        {/* Col 1: Brand Info */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 800,
              fontSize: '1.25rem',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}
          >
            <span
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                background: 'var(--gradient-brand)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '0.85rem'
              }}
            >
              ⚡
            </span>
            <span>
              LUMINA<span style={{ color: 'var(--accent-primary)', fontWeight: 400 }}>//</span>
            </span>
          </div>
          <p style={{ lineHeight: 1.6, marginBottom: '1.25rem', color: 'var(--text-muted)' }}>
            Next-gen atelier combining aerospace metallurgy, acoustic science, and modern streetwear aesthetics.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.74rem', color: '#10b981' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            <span>All Global Dispatches Operational (DHL / FedEx)</span>
          </div>
        </div>

        {/* Col 2: Drops & Gear */}
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Featured Collections
          </div>
          <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <li>
              <button
                onClick={() => handleCategoryClick('computing')}
                style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
              >
                Laptops & Phones
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick('gaming')}
                style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
              >
                Gaming & VR
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick('footwear')}
                style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
              >
                Sneakers & Kicks
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick('audio')}
                style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
              >
                Acoustics & Spatial
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick('wearables')}
                style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
              >
                Cyber Wearables
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick('camera')}
                style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
              >
                Cameras & Drones
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick('streetwear')}
                style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
              >
                Tech Streetwear
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick('living')}
                style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
              >
                Aesthetic Living
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Customer Care & Telemetry */}
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Client Services
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <li>
              <button
                onClick={() => setCurrentView('track')}
                style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <Truck size={14} style={{ color: 'var(--accent-secondary)' }} />
                <span>Track Package & Dispatches</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('orders')}
                style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <Package size={14} style={{ color: 'var(--accent-primary)' }} />
                <span>Order History & Invoices</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('help')}
                style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <HelpCircle size={14} style={{ color: '#10b981' }} />
                <span>Help Center & FAQs</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsSpinWheelOpen(true)}
                style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <Zap size={14} style={{ color: 'var(--accent-amber)' }} />
                <span>VIP Mystery Prize Wheel</span>
              </button>
            </li>
            <li>
              <span style={{ color: 'var(--text-muted)' }}>Official 2-Year Hardware Warranty</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Encrypted Security & Payments */}
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Encrypted & Certified
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
            All checkout orders processed via 256-bit AES end-to-end tokenization.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {['VISA', 'MASTERCARD', 'AMEX', 'APPLE PAY', 'GOOGLE PAY', 'PAYPAL'].map((pm) => (
              <span
                key={pm}
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  backgroundColor: 'var(--bg-tertiary)',
                  padding: '0.25rem 0.5rem',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)'
                }}
              >
                {pm}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <span style={{ color: 'var(--text-muted)' }}><Globe size={18} /></span>
            <span style={{ color: 'var(--text-muted)' }}><Lock size={18} /></span>
            <span style={{ color: 'var(--text-muted)' }}><ShieldCheck size={18} /></span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          paddingTop: '2rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.78rem',
          color: 'var(--text-muted)'
        }}
      >
        <div>
          © {CURRENT_YEAR} LUMINA ATELIER INC. All rights reserved. Precision craftsmanship.
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
          <span style={{ cursor: 'pointer' }}>Terms of Service</span>
          <span style={{ cursor: 'pointer' }}>Security Protocol</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
