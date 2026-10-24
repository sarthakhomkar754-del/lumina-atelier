import React from 'react';
import { useStore } from '../context/StoreContext';
import { CURRENCIES } from '../utils/currency';
import { Sparkles, Sun, Moon, Volume2, VolumeX, Zap } from 'lucide-react';

export const AnnouncementBar = () => {
  const { theme, toggleTheme, soundEnabled, toggleSound, currency, setCurrency, applyCoupon, setIsSpinWheelOpen } = useStore();

  return (
    <aside aria-label="Store Announcements" style={{
      backgroundColor: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-subtle)',
      fontSize: '0.78rem',
      padding: '0.45rem 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      zIndex: 50,
      flexWrap: 'wrap',
      gap: '0.5rem'
    }}>
      {/* Promo Ticker */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
        <span className="badge badge-brand" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
          <Zap size={11} /> FLASH DROP
        </span>
        <span style={{ color: 'var(--text-secondary)' }}>
          Get <strong>20% OFF</strong> today with code{' '}
          <button
            onClick={() => applyCoupon('VIBE20')}
            title="Click to copy & apply VIBE20"
            style={{
              background: 'rgba(92, 58, 33, 0.08)',
              color: 'var(--accent-primary)',
              padding: '0.1rem 0.45rem',
              borderRadius: 'var(--radius-xs)',
              fontWeight: 700,
              letterSpacing: '0.04em',
              border: '1px dashed var(--accent-primary)'
            }}
          >
            VIBE20
          </button>
        </span>
        <span style={{ color: 'var(--border-light)' }}>•</span>
        <span style={{ color: 'var(--text-muted)' }} className="hide-mobile">
          Free Express Courier on orders over $99
        </span>
      </div>

      {/* Controls & Quick Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto' }}>
        {/* Spin & Win Trigger */}
        <button
          onClick={() => setIsSpinWheelOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            color: 'var(--accent-primary)',
            fontWeight: 600,
            fontSize: '0.76rem'
          }}
          title="Spin the prize wheel"
        >
          <Sparkles size={13} />
          <span>Spin & Win</span>
        </button>

        <span style={{ color: 'var(--border-subtle)' }}>|</span>

        {/* Currency Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <label htmlFor="currency-select" style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
            Region:
          </label>
          <select
            id="currency-select"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={{
              padding: '0.15rem 0.4rem',
              fontSize: '0.74rem',
              borderRadius: 'var(--radius-xs)',
              background: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            {Object.entries(CURRENCIES).map(([code, info]) => (
              <option key={code} value={code}>
                {info.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          title={soundEnabled ? 'Disable Tactile Sound' : 'Enable Tactile Sound'}
          style={{ color: soundEnabled ? 'var(--accent-primary)' : 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
        >
          {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </aside>
  );
};
