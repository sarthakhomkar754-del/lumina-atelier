import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Timer, Flame, Tag } from 'lucide-react';

export const FlashSaleCountdown = () => {
  const { applyCoupon } = useStore();

  // 12-hour recurring countdown simulation
  const [timeLeft, setTimeLeft] = useState({
    hours: 7,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatUnit = (num) => String(num).padStart(2, '0');

  return (
    <div
      style={{
        maxWidth: '1360px',
        margin: '1.5rem auto',
        padding: '0 1.25rem'
      }}
    >
      <div
        className="glass-panel"
        style={{
          background: 'linear-gradient(135deg, rgba(92, 58, 33, 0.04) 0%, rgba(197, 143, 93, 0.06) 100%), var(--bg-secondary)',
          border: '1px solid var(--border-light)',
          padding: '1.25rem 1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        {/* Left: Flame Icon & Promo Text */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '16px 4px 16px 4px',
              background: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fbf8f3',
              boxShadow: '0 4px 14px rgba(92, 58, 33, 0.22)'
            }}
          >
            <Flame size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.01em', fontFamily: 'var(--font-display)' }}>
                CURATED SEASONAL SALE // LIMITED FLASH ALLOCATION
              </span>
              <span className="badge badge-sale" style={{ fontSize: '0.68rem' }}>
                UP TO 30% OFF
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Claim extra savings before the current allocation replenishes. Limited units available.
            </p>
          </div>
        </div>

        {/* Center: Countdown Timer Boxes */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 600 }}>
            <Timer size={16} style={{ color: 'var(--accent-primary)' }} />
            <span>ENDS IN:</span>
          </div>

          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <div
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                padding: '0.4rem 0.65rem',
                borderRadius: '8px 2px 8px 2px',
                fontWeight: 800,
                fontSize: '1.1rem',
                border: '1px solid var(--border-light)',
                minWidth: '40px',
                textAlign: 'center'
              }}
            >
              {formatUnit(timeLeft.hours)}
              <span style={{ display: 'block', fontSize: '0.55rem', color: 'var(--text-muted)', fontWeight: 600 }}>HRS</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--accent-primary)', alignSelf: 'center' }}>:</span>
            <div
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                padding: '0.4rem 0.65rem',
                borderRadius: '8px 2px 8px 2px',
                fontWeight: 800,
                fontSize: '1.1rem',
                border: '1px solid var(--border-light)',
                minWidth: '40px',
                textAlign: 'center'
              }}
            >
              {formatUnit(timeLeft.minutes)}
              <span style={{ display: 'block', fontSize: '0.55rem', color: 'var(--text-muted)', fontWeight: 600 }}>MIN</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--accent-primary)', alignSelf: 'center' }}>:</span>
            <div
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                padding: '0.4rem 0.65rem',
                borderRadius: '8px 2px 8px 2px',
                fontWeight: 800,
                fontSize: '1.1rem',
                border: '1px solid rgba(92, 58, 33, 0.35)',
                minWidth: '40px',
                textAlign: 'center',
                color: 'var(--accent-primary)'
              }}
            >
              {formatUnit(timeLeft.seconds)}
              <span style={{ display: 'block', fontSize: '0.55rem', color: 'var(--text-muted)', fontWeight: 600 }}>SEC</span>
            </div>
          </div>
        </div>

        {/* Right: Quick Apply Button */}
        <div>
          <button
            onClick={() => {
              applyCoupon('VIBE20');
              const el = document.getElementById('catalog-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary"
            style={{
              padding: '0.65rem 1.25rem',
              fontSize: '0.84rem'
            }}
          >
            <Tag size={15} />
            <span>Apply Coupon "VIBE20"</span>
          </button>
        </div>
      </div>
    </div>
  );
};
