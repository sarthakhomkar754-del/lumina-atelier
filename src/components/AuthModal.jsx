import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  KeyRound
} from 'lucide-react';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    login,
    register,
    quickLoginDemo,
    pendingCheckout
  } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('customer'); // 'customer' | 'admin'
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const isLogin = authModalMode === 'login';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      let success = false;
      if (isLogin) {
        success = login(email, password);
      } else {
        if (!name.trim()) {
          setIsSubmitting(false);
          return;
        }
        success = register({ name, email, password, role });
      }
      setIsSubmitting(false);
      if (success) {
        setEmail('');
        setPassword('');
        setName('');
      }
    }, 250);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Atelier Authentication Portal"
      className="modal-overlay"
      onClick={() => setIsAuthModalOpen(false)}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.72)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 2200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem'
      }}
    >
      <div
        className="glass-panel animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.5rem 1.75rem 1.25rem 1.75rem',
            borderBottom: '1px solid var(--border-subtle)',
            position: 'relative',
            backgroundColor: 'var(--bg-card)'
          }}
        >
          <button
            onClick={() => setIsAuthModalOpen(false)}
            aria-label="Close authentication modal"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '0.4rem',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px 2px 8px 2px',
                background: 'var(--accent-primary)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '0.78rem'
              }}
            >
              ✦
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
              LUMINA<span style={{ color: 'var(--accent-secondary)' }}>.</span>
            </span>
          </div>

          <h3 style={{ fontSize: '1.18rem', fontWeight: 800, marginTop: '0.2rem' }}>
            {isLogin ? 'Sign In to Atelier' : 'Create Client Profile'}
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            {isLogin
              ? 'Access your personal drops, live order tracking, and VIP benefits.'
              : 'Join the LUMINA circle for complimentary express air and curated drops.'}
          </p>
        </div>

        {/* Amazon-Style Checkout Gate Alert Banner */}
        {pendingCheckout && (
          <div
            style={{
              padding: '0.75rem 1.75rem',
              backgroundColor: 'rgba(217, 119, 6, 0.12)',
              borderBottom: '1px solid rgba(217, 119, 6, 0.28)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem'
            }}
          >
            <Lock size={16} style={{ color: '#d97706', flexShrink: 0 }} />
            <div style={{ fontSize: '0.78rem', color: 'var(--text-primary)', lineHeight: 1.35 }}>
              <strong style={{ color: '#d97706', fontWeight: 800, display: 'block' }}>Amazon-Style Secure Checkout Gate</strong>
              Sign in or create an account to proceed with your order and select delivery.
            </div>
          </div>
        )}

        {/* 1-Click Fast Demo Credentials Bar */}
        <div
          style={{
            padding: '0.85rem 1.75rem',
            backgroundColor: 'rgba(92, 58, 33, 0.05)',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <div
            style={{
              fontSize: '0.7rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--accent-secondary)',
              marginBottom: '0.45rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <KeyRound size={12} />
            <span>Instant 1-Click Demo Logins</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
            <button
              id="demo-login-customer-btn"
              type="button"
              onClick={() => quickLoginDemo('customer')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.55rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid rgba(197, 143, 93, 0.3)',
                color: 'var(--text-primary)',
                fontSize: '0.76rem',
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'var(--gradient-brand)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  flexShrink: 0
                }}
              >
                AM
              </div>
              <div>
                <div style={{ lineHeight: 1.2 }}>Demo Customer</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Alex (VIP Gold)</div>
              </div>
            </button>

            <button
              id="demo-login-admin-btn"
              type="button"
              onClick={() => quickLoginDemo('admin')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.55rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(92, 58, 33, 0.12)',
                border: '1px solid var(--accent-primary)',
                color: 'var(--text-primary)',
                fontSize: '0.76rem',
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-primary)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  flexShrink: 0
                }}
              >
                🛡️
              </div>
              <div>
                <div style={{ lineHeight: 1.2, color: 'var(--accent-primary)' }}>Atelier Admin</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Store Director</div>
              </div>
            </button>
          </div>
        </div>

        {/* Tab Toggle */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-card)'
          }}
        >
          <button
            type="button"
            onClick={() => setAuthModalMode('login')}
            style={{
              flex: 1,
              padding: '0.75rem',
              fontSize: '0.84rem',
              fontWeight: isLogin ? 800 : 500,
              color: isLogin ? 'var(--accent-primary)' : 'var(--text-muted)',
              borderBottom: isLogin ? '2px solid var(--accent-primary)' : '2px solid transparent',
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setAuthModalMode('register')}
            style={{
              flex: 1,
              padding: '0.75rem',
              fontSize: '0.84rem',
              fontWeight: !isLogin ? 800 : 500,
              color: !isLogin ? 'var(--accent-primary)' : 'var(--text-muted)',
              borderBottom: !isLogin ? '2px solid var(--accent-primary)' : '2px solid transparent',
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer'
            }}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem 1.75rem' }}>
          {!isLogin && (
            <>
              {/* Full Name */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                  Full Name
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    padding: '0.55rem 0.85rem'
                  }}
                >
                  <User size={16} style={{ color: 'var(--text-muted)', marginRight: '0.65rem' }} />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julian Hayes"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      boxShadow: 'none',
                      fontSize: '0.86rem',
                      color: 'var(--text-primary)',
                      padding: 0
                    }}
                  />
                </div>
              </div>

              {/* Account Role Selector */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                  Profile Permission
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  <button
                    type="button"
                    onClick={() => setRole('customer')}
                    style={{
                      padding: '0.55rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.78rem',
                      fontWeight: role === 'customer' ? 800 : 500,
                      backgroundColor: role === 'customer' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                      color: role === 'customer' ? '#ffffff' : 'var(--text-secondary)',
                      border: `1px solid ${role === 'customer' ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                      cursor: 'pointer'
                    }}
                  >
                    Client (Customer)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    style={{
                      padding: '0.55rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.78rem',
                      fontWeight: role === 'admin' ? 800 : 500,
                      backgroundColor: role === 'admin' ? 'var(--accent-secondary)' : 'var(--bg-tertiary)',
                      color: role === 'admin' ? '#000000' : 'var(--text-secondary)',
                      border: `1px solid ${role === 'admin' ? 'var(--accent-secondary)' : 'var(--border-subtle)'}`,
                      cursor: 'pointer'
                    }}
                  >
                    Atelier Director (Admin)
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Email Address */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
              Email Address
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                padding: '0.55rem 0.85rem'
              }}
            >
              <Mail size={16} style={{ color: 'var(--text-muted)', marginRight: '0.65rem' }} />
              <input
                type="email"
                required
                placeholder={isLogin ? 'alex.mercer@cyberlumina.io' : 'your.email@domain.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  boxShadow: 'none',
                  fontSize: '0.86rem',
                  color: 'var(--text-primary)',
                  padding: 0
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <label style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                Passcode
              </label>
              {isLogin && (
                <span
                  style={{ fontSize: '0.72rem', color: 'var(--accent-secondary)', cursor: 'pointer' }}
                  onClick={() => {
                    setEmail('alex.mercer@cyberlumina.io');
                    setPassword('password123');
                  }}
                >
                  Auto-fill demo?
                </span>
              )}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                padding: '0.55rem 0.85rem'
              }}
            >
              <Lock size={16} style={{ color: 'var(--text-muted)', marginRight: '0.65rem' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  boxShadow: 'none',
                  fontSize: '0.86rem',
                  color: 'var(--text-primary)',
                  padding: 0
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, display: 'flex' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: 800
            }}
          >
            <span>{isLogin ? 'Enter Atelier Profile' : 'Authorize & Join LUMINA'}</span>
            <ArrowRight size={16} />
          </button>

          {/* Footer note */}
          <div
            style={{
              textAlign: 'center',
              marginTop: '1.15rem',
              fontSize: '0.76rem',
              color: 'var(--text-muted)'
            }}
          >
            {isLogin ? (
              <>
                New client?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalMode('register')}
                  style={{ color: 'var(--accent-primary)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Create client account
                </button>
              </>
            ) : (
              <>
                Existing client?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalMode('login')}
                  style={{ color: 'var(--accent-primary)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Sign in here
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
