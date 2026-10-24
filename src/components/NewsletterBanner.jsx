import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import confetti from 'canvas-confetti';
import { Mail, ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

export const NewsletterBanner = () => {
  const { applyCoupon, addToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(() => {
    return typeof window !== 'undefined' && localStorage.getItem('lumina_newsletter') === 'subscribed';
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast({ title: 'Invalid Email', message: 'Please enter a valid email address.', type: 'warning' });
      return;
    }

    setSubscribed(true);
    localStorage.setItem('lumina_newsletter', 'subscribed');
    applyCoupon('VIBE20');

    try {
      confetti({ particleCount: 75, spread: 60, origin: { y: 0.7 } });
    } catch {}

    addToast({
      title: 'Welcome to the Syndicate! ⚡',
      message: 'Code VIBE20 (20% OFF) has been auto-applied to your bag!',
      type: 'success'
    });
  };

  return (
    <section
      style={{
        maxWidth: '1360px',
        margin: '4rem auto',
        padding: '0 1.25rem'
      }}
    >
      <div
        className="glass-panel"
        style={{
          borderRadius: 'var(--radius-xl)',
          padding: '3rem 2rem',
          background: 'radial-gradient(ellipse at top right, rgba(92, 58, 33, 0.08), transparent 70%), var(--bg-secondary)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-md)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center'
        }}
      >
        {/* Left Copy */}
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--accent-primary)',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              marginBottom: '0.75rem',
              textTransform: 'uppercase'
            }}
          >
            <Sparkles size={14} />
            <span>INNER CIRCLE PRIVILEGES</span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.15 }}>
            Never Miss a Curated <span className="text-gradient">Seasonal Release.</span>
          </h2>

          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: '480px', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            Subscribe for zero-spam alerts before new release launches,
            atelier design invites, and an instant 20% discount coupon.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <ShieldCheck size={14} style={{ color: '#10b981' }} /> No spam guarantee
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle2 size={14} style={{ color: 'var(--accent-secondary)' }} /> 1-Click unsubscribe
            </span>
          </div>
        </div>

        {/* Right Form */}
        <div>
          {subscribed ? (
            <div
              className="animate-scale-up"
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.85rem auto'
                }}
              >
                <CheckCircle2 size={24} />
              </div>
              <h4 style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                Access Cleared! Welcome Aboard.
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                We've auto-applied code <strong>VIBE20</strong> (20% OFF) to your active shopping bag!
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                maxWidth: '440px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-light)',
                  padding: '0.4rem 0.5rem 0.4rem 1rem',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <Mail size={18} style={{ color: 'var(--text-muted)', marginRight: '0.65rem' }} />
                <input
                  type="email"
                  placeholder="Enter your personal email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '0.88rem'
                  }}
                />
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
                >
                  <span>Join</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', paddingLeft: '0.5rem' }}>
                By signing up you agree to LUMINA's encrypted privacy charter.
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
