import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { soundManager } from '../utils/sound';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  ArrowLeft,
  Truck,
  RotateCcw,
  Zap,
  ShoppingBag,
  Star
} from 'lucide-react';

export const LoginView = () => {
  const {
    login,
    register,
    quickLoginDemo,
    setCurrentView,
    pendingCheckout,
    addToast
  } = useStore();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('customer'); // 'customer' | 'admin'
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const isLogin = mode === 'login';

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      addToast({
        title: 'Missing Fields',
        message: 'Please provide both your email and passcode to proceed.',
        type: 'warning'
      });
      return;
    }

    if (!isLogin && !name.trim()) {
      addToast({
        title: 'Full Name Required',
        message: 'Please enter your full name to set up your atelier profile.',
        type: 'warning'
      });
      return;
    }

    setIsSubmitting(true);
    soundManager.playClick();

    setTimeout(() => {
      let success = false;
      if (isLogin) {
        success = login(email, password);
      } else {
        success = register({ name, email, password, role });
      }

      setIsSubmitting(false);

      if (success) {
        soundManager.playSuccess();
        // Redirect to the main shopping dashboard where user can buy products!
        setCurrentView('shop');
      }
    }, 400);
  };

  const handleQuickDemo = (targetRole) => {
    soundManager.playPop();
    quickLoginDemo(targetRole);
    // Directly navigate to the shopping dashboard where products can be browsed and purchased!
    setCurrentView('shop');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      addToast({
        title: 'Email Required',
        message: 'Please provide your account email to receive reset instructions.',
        type: 'warning'
      });
      return;
    }

    setResetSent(true);
    soundManager.playSuccess();
    addToast({
      title: 'Reset Instructions Dispatched',
      message: `A secure passkey reset link was sent to ${resetEmail}.`,
      type: 'success'
    });
    setTimeout(() => {
      setForgotModalOpen(false);
      setResetSent(false);
      setResetEmail('');
    }, 2500);
  };

  return (
    <div className="login-view-container animate-fade-in" style={{ padding: '2rem 1.25rem 4rem 1.25rem' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Navigation Bar / Breadcrumb back to Store */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <button
            onClick={() => {
              soundManager.playClick();
              setCurrentView('shop');
            }}
            className="btn-ghost"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.88rem',
              fontWeight: 600,
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={16} />
            <span>Return to Product Catalog</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-emerald)',
                boxShadow: '0 0 8px var(--accent-emerald)'
              }}
            />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              256-Bit SSL Atelier Gateway
            </span>
          </div>
        </div>

        {/* Pending Checkout Alert Banner if redirected from buying */}
        {pendingCheckout && (
          <div
            className="animate-slide-down"
            style={{
              backgroundColor: 'rgba(197, 143, 93, 0.12)',
              border: '1px solid var(--accent-secondary)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem'
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-primary)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <ShoppingBag size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.94rem', color: 'var(--text-primary)' }}>
                Sign In to Complete Your Purchase 🛒
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Like Amazon, signing in links your order with instant live tracking, VIP patronage benefits, and secure payment processing.
              </div>
            </div>
          </div>
        )}

        {/* Main Split Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start'
          }}
        >
          {/* LEFT COLUMN: Haute Branding, Trust & Buyer Perks */}
          <div
            className="glass-panel"
            style={{
              padding: '2.5rem 2rem',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Subtle luxury ambient glow */}
            <div
              style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                background: 'var(--gradient-glow)',
                filter: 'blur(30px)',
                pointerEvents: 'none',
                opacity: 0.8
              }}
            />

            {/* Atelier Brand Identity */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <span
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px 3px 10px 3px',
                  background: 'var(--accent-primary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '0.85rem'
                }}
              >
                ✦
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.45rem', letterSpacing: '-0.02em' }}>
                LUMINA<span style={{ color: 'var(--accent-secondary)' }}>.</span>
              </span>
            </div>

            <div
              style={{
                display: 'inline-block',
                fontSize: '0.74rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--accent-primary)',
                backgroundColor: 'rgba(92, 58, 33, 0.1)',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                marginBottom: '1rem'
              }}
            >
              VIP Patronage & Client Portal
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.15rem',
                lineHeight: 1.2,
                fontWeight: 800,
                marginBottom: '1rem',
                color: 'var(--text-primary)'
              }}
            >
              Welcome to the Atelier Shopping Dashboard
            </h1>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Sign in to access your curated product catalog, claim exclusive drop reservations, enjoy instant 1-click buying, and track international DHL Express dispatches in real-time.
            </p>

            {/* Key Buyer Privileges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginBottom: '2.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(92, 58, 33, 0.08)',
                    color: 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Zap size={17} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                    Immediate Dashboard Access & 1-Click Buy
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Instant access to live stock inventory, saved addresses, and frictionless multi-currency checkout.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(197, 143, 93, 0.12)',
                    color: 'var(--accent-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Truck size={17} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                    Complimentary DHL Express Air Delivery
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Tamper-sealed Pelican-style clean-room unboxing with guaranteed door delivery within 36-48 hours.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(95, 122, 97, 0.12)',
                    color: 'var(--accent-emerald)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <RotateCcw size={17} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                    14-Day Zero-Question Return Guarantee
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Pre-printed courier labels and 2-year comprehensive titanium hardware warranty included on all orders.
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof & Metrics */}
            <div
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#f59e0b', marginBottom: '0.2rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" />
                  ))}
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-primary)', marginLeft: '0.35rem' }}>
                    4.94 / 5.0
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Trusted by 50,000+ verified collectors & connoisseurs
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={22} style={{ color: 'var(--accent-emerald)' }} />
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Verified Merchant
                </span>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div style={{ marginTop: '1.5rem', fontStyle: 'italic', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              "LUMINA Atelier delivers consumer electronics like fine mechanical watches. The purchasing experience is as extraordinary as the products."
              <div style={{ fontStyle: 'normal', fontWeight: 700, marginTop: '0.35rem', color: 'var(--text-primary)', fontSize: '0.8rem' }}>
                — Marcus Vance, Industrial Designer
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Login & Registration Form */}
          <div
            className="glass-panel"
            style={{
              padding: '2.5rem 2.25rem',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-xl)',
              position: 'relative'
            }}
          >
            {/* Mode Switcher Tabs */}
            <div
              style={{
                display: 'flex',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-full)',
                padding: '0.3rem',
                marginBottom: '1.75rem',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setMode('login');
                }}
                style={{
                  flex: 1,
                  padding: '0.65rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  backgroundColor: isLogin ? 'var(--bg-card)' : 'transparent',
                  color: isLogin ? 'var(--accent-primary)' : 'var(--text-muted)',
                  fontWeight: isLogin ? 800 : 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  boxShadow: isLogin ? 'var(--shadow-sm)' : 'none',
                  transition: 'all var(--transition-fast)'
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setMode('register');
                }}
                style={{
                  flex: 1,
                  padding: '0.65rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  backgroundColor: !isLogin ? 'var(--bg-card)' : 'transparent',
                  color: !isLogin ? 'var(--accent-primary)' : 'var(--text-muted)',
                  fontWeight: !isLogin ? 800 : 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  boxShadow: !isLogin ? 'var(--shadow-sm)' : 'none',
                  transition: 'all var(--transition-fast)'
                }}
              >
                Create Account
              </button>
            </div>

            {/* Quick 1-Click Demo Profiles (Super convenient for testing!) */}
            <div
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                marginBottom: '1.75rem'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.65rem'
                }}
              >
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--accent-secondary)'
                  }}
                >
                  ⚡ Instant 1-Click Demo Logins
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  No typing required
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('customer')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.6rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-light)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <span
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-primary)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.75rem',
                      flexShrink: 0
                    }}
                  >
                    AM
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                      Buyer Demo
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Alexander (Gold VIP)
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemo('admin')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.6rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid rgba(217, 119, 6, 0.3)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <span
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #d97706, #b45309)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.75rem',
                      flexShrink: 0
                    }}
                  >
                    SV
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#d97706' }}>
                      Director Demo
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Sarah (Admin)
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                margin: '1.25rem 0',
                color: 'var(--text-muted)',
                fontSize: '0.78rem'
              }}
            >
              <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-subtle)' }} />
              <span>or continue with credentials</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-subtle)' }} />
            </div>

            {/* Standard Authentication Form */}
            <form onSubmit={handleFormSubmit} method="post" action="#" style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {/* Full Name for Registration */}
              {!isLogin && (
                <div>
                  <label
                    htmlFor="atelier-reg-name"
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      marginBottom: '0.4rem',
                      color: 'var(--text-primary)'
                    }}
                  >
                    Full Name
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User
                      size={18}
                      style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-muted)'
                      }}
                    />
                    <input
                      id="atelier-reg-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="e.g. Alexander Mercer"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.75rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-light)',
                        backgroundColor: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                        outline: 'none',
                        transition: 'border-color var(--transition-fast)'
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Email Address */}
              <div>
                <label
                  htmlFor="atelier-login-email"
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    marginBottom: '0.4rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail
                    size={18}
                    style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-muted)'
                    }}
                  />
                  <input
                    id="atelier-login-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="username"
                    autoCorrect="off"
                    autoCapitalize="none"
                    required
                    placeholder="alex.mercer@cyberlumina.io"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-light)',
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'border-color var(--transition-fast)'
                    }}
                  />
                </div>
              </div>

              {/* Passcode / Password */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label
                    htmlFor="atelier-login-password"
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)'
                    }}
                  >
                    Passcode / Password
                  </label>
                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => setForgotModalOpen(true)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--accent-primary)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      Forgot passcode?
                    </button>
                  )}
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock
                    size={18}
                    style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-muted)'
                    }}
                  />
                  <input
                    id="atelier-login-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                    required
                    placeholder="Enter your confidential passcode"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 2.85rem 0.75rem 2.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-light)',
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'border-color var(--transition-fast)'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide passcode' : 'Show passcode'}
                    style={{
                      position: 'absolute',
                      right: '0.85rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '0.2rem'
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Role Picker on Register */}
              {!isLogin && (
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      marginBottom: '0.4rem',
                      color: 'var(--text-primary)'
                    }}
                  >
                    Select Profile Type
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                    <button
                      type="button"
                      onClick={() => setRole('customer')}
                      style={{
                        padding: '0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        border: `1px solid ${role === 'customer' ? 'var(--accent-primary)' : 'var(--border-light)'}`,
                        backgroundColor: role === 'customer' ? 'rgba(92, 58, 33, 0.08)' : 'var(--bg-secondary)',
                        color: role === 'customer' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor: 'pointer'
                      }}
                    >
                      Client / Buyer
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('admin')}
                      style={{
                        padding: '0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        border: `1px solid ${role === 'admin' ? '#d97706' : 'var(--border-light)'}`,
                        backgroundColor: role === 'admin' ? 'rgba(217, 119, 6, 0.1)' : 'var(--bg-secondary)',
                        color: role === 'admin' ? '#d97706' : 'var(--text-secondary)',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor: 'pointer'
                      }}
                    >
                      ✦ Atelier Director
                    </button>
                  </div>
                </div>
              )}

              {/* Remember Me Checkbox */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ accentColor: 'var(--accent-primary)', width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <span>Remember this terminal for 30 days</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.55rem',
                  marginTop: '0.5rem',
                  boxShadow: 'var(--shadow-glow)',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? (
                  <>
                    <div
                      className="spinner"
                      style={{
                        width: '18px',
                        height: '18px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTopColor: '#fff',
                        borderRadius: '50%'
                      }}
                    />
                    <span>Authenticating Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>{isLogin ? 'Sign In & Open Product Dashboard' : 'Create Profile & Start Buying'}</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>

              {/* Guest Shopping Option */}
              <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setCurrentView('shop');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Continue browsing products as guest →
                </button>
              </div>
            </form>

            {/* Social Authentication Simulation */}
            <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ textAlign: 'center', fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                Enterprise Single Sign-On & Passkey
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    handleQuickDemo('customer');
                  }}
                  style={{
                    padding: '0.55rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleQuickDemo('customer');
                  }}
                  style={{
                    padding: '0.55rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <span>Apple</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleQuickDemo('admin');
                  }}
                  style={{
                    padding: '0.55rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <span>Passkey</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Passcode Interactive Dialog Modal */}
      {forgotModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Passcode Recovery"
          className="modal-overlay animate-fade-in"
          onClick={() => setForgotModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 2500,
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
              maxWidth: '420px',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-xl)',
              padding: '2rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(92, 58, 33, 0.1)',
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <HelpCircle size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Passcode Recovery</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Default demo passcodes: <code>password123</code> (Buyer) or <code>admin123</code> (Director)
                </p>
              </div>
            </div>

            {resetSent ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <CheckCircle2 size={44} style={{ color: 'var(--accent-emerald)', margin: '0 auto 0.75rem auto' }} />
                <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '0.35rem' }}>
                  Reset Dispatch Confirmed
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  A one-time cryptographic authorization link has been routed to your registered terminal.
                </div>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Enter your verified client email. We will dispatch a recovery passkey token to reset your password.
                </p>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="alex.mercer@cyberlumina.io"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-light)',
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="btn-secondary"
                    style={{ flex: 1, padding: '0.7rem', fontSize: '0.85rem' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ flex: 1, padding: '0.7rem', fontSize: '0.85rem' }}
                  >
                    Send Reset Token
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginView;
