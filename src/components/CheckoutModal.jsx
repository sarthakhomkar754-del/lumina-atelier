import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/currency';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle,
  Truck,
  Lock,
  ArrowRight,
  ArrowLeft,
  Printer,
  Copy,
  Gift,
  LogIn,
  KeyRound
} from 'lucide-react';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    calculateCartTotals,
    currency,
    placeOrder,
    setIsTrackingOpen,
    setInvoiceOrder,
    addToast,
    savedAddresses = [],
    currentUser,
    login,
    register,
    quickLoginDemo,
    cart
  } = useStore();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Delivery Speed, 3: Payment, 4: Confirmed
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [isGift, setIsGift] = useState(false);
  const [useStoreBalance, setUseStoreBalance] = useState(false);

  // Auth gate state (when user is not logged in inside checkout)
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [isAuthRegister, setIsAuthRegister] = useState(false);

  // Initial state derived cleanly without useEffect
  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    const defaultAddr = savedAddresses.find((a) => a.isDefault) || savedAddresses[0];
    return defaultAddr ? defaultAddr.id : null;
  });

  const [shippingForm, setShippingForm] = useState(() => {
    const defaultAddr = savedAddresses.find((a) => a.isDefault) || savedAddresses[0];
    const nameParts = (currentUser?.name || '').split(' ');
    const fName = nameParts[0] || '';
    const lName = nameParts.slice(1).join(' ') || '';

    if (defaultAddr) {
      return {
        firstName: defaultAddr.firstName || fName,
        lastName: defaultAddr.lastName || lName,
        email: defaultAddr.email || currentUser?.email || '',
        phone: defaultAddr.phone || currentUser?.phone || '',
        address: defaultAddr.address || '',
        city: defaultAddr.city || '',
        state: defaultAddr.state || '',
        zip: defaultAddr.zip || '',
        country: defaultAddr.country || 'United States'
      };
    }
    return {
      firstName: fName,
      lastName: lName,
      email: currentUser?.email || '',
      phone: currentUser?.phone || '+1 (555) 234-5678',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: 'United States'
    };
  });

  const [shippingMethod, setShippingMethod] = useState('express'); // 'standard' | 'express' | 'overnight'
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'store_balance' | 'upi' | 'cod'

  const [cardDetails, setCardDetails] = useState(() => ({
    number: '•••• •••• •••• 4242',
    name: currentUser ? currentUser.name.toUpperCase() : 'ALEXANDER MERCER',
    expiry: '12/28',
    cvv: '888'
  }));

  const [isProcessing, setIsProcessing] = useState(false);

  // Pre-calculated Amazon delivery dates (pure state initializer)
  const [sessionStartTime] = useState(() => Date.now());
  const deliveryDates = useMemo(() => {
    const oneDay = 24 * 60 * 60 * 1000;
    const formatDay = (time) =>
      new Date(time).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    return {
      overnight: `Tomorrow by 9:00 AM (${formatDay(sessionStartTime + oneDay)})`,
      express: `In 2 Days (${formatDay(sessionStartTime + 2 * oneDay)})`,
      standard: `In 4-5 Days (${formatDay(sessionStartTime + 4 * oneDay)})`
    };
  }, [sessionStartTime]);

  if (!isCheckoutOpen) return null;

  const baseTotals = calculateCartTotals();
  const storeCreditAvailable = 250.0;
  const storeCreditUsed = useStoreBalance ? Math.min(storeCreditAvailable, baseTotals.total) : 0;
  const finalTotal = Math.max(0, baseTotals.total - storeCreditUsed);

  // Handle Amazon-style Address Selection
  const handleSelectAddress = (addr) => {
    setSelectedAddressId(addr.id);
    setShowNewAddressForm(false);
    setShippingForm({
      firstName: addr.firstName || (currentUser?.name?.split(' ')[0] || ''),
      lastName: addr.lastName || (currentUser?.name?.split(' ').slice(1).join(' ') || ''),
      email: addr.email || currentUser?.email || '',
      phone: addr.phone || currentUser?.phone || '',
      address: addr.address || '',
      city: addr.city || '',
      state: addr.state || '',
      zip: addr.zip || '',
      country: addr.country || 'United States'
    });
    addToast({
      title: 'Delivery Address Selected',
      message: `Delivering to ${addr.label || addr.address}`,
      type: 'info'
    });
  };

  const handleCardNumberChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardDetails((prev) => ({ ...prev, number: formatted || '•••• •••• •••• 4242' }));
  };

  const handleExpiryChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      setCardDetails((prev) => ({ ...prev, expiry: `${digits.slice(0, 2)}/${digits.slice(2)}` }));
    } else {
      setCardDetails((prev) => ({ ...prev, expiry: digits }));
    }
  };

  const handleCvvChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardDetails((prev) => ({ ...prev, cvv: digits }));
  };

  const handleInlineAuthSubmit = (e) => {
    e.preventDefault();
    if (!authEmail.trim() || !authPassword.trim()) {
      addToast({ title: 'Missing Credentials', message: 'Please enter your email and password.', type: 'warning' });
      return;
    }
    if (isAuthRegister) {
      if (!authName.trim()) {
        addToast({ title: 'Name Required', message: 'Please enter your full name.', type: 'warning' });
        return;
      }
      register({ name: authName, email: authEmail, password: authPassword, role: 'customer' });
    } else {
      login(authEmail, authPassword);
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const order = placeOrder({
        shipping: shippingForm,
        paymentMethod: useStoreBalance && finalTotal === 0 ? 'Amazon / Atelier Balance' : paymentMethod,
        shippingMethod: shippingMethod,
        cardLast4: cardDetails.number.replace(/\s/g, '').slice(-4) || '4242',
        notes: isGift ? 'Gift packaging requested' : ''
      });

      setConfirmedOrder(order);
      setIsProcessing(false);
      setStep(4);

      // Trigger Confetti explosion
      try {
        confetti({
          particleCount: 140,
          spread: 85,
          origin: { y: 0.6 }
        });
      } catch {}
    }, 1200);
  };

  const copyOrderId = (id) => {
    navigator.clipboard.writeText(id);
    addToast({ title: 'Order ID Copied!', message: id, type: 'info' });
  };

  return (
    <div
      className="modal-overlay"
      onClick={() => !isProcessing && setIsCheckoutOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Amazon-Style Secure Checkout"
      style={{
        zIndex: 2100,
        backgroundColor: 'rgba(15, 12, 10, 0.78)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
    >
      <div
        className="glass-panel animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '920px',
          width: '100%',
          maxHeight: '94dvh',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          position: 'relative',
          padding: '1.75rem 2rem',
          boxShadow: 'var(--shadow-xl)'
        }}
      >
        {/* Amazon-Style Minimalist Checkout Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border-subtle)',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}
        >
          {/* Logo & Checkout Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px 2px 8px 2px',
                background: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 800
              }}
            >
              ✦
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '0.02em' }}>
                  LUMINA<span style={{ color: 'var(--accent-secondary)' }}>.</span>
                </span>
                <span style={{ color: 'var(--text-muted)' }}>|</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
                  {step === 4 ? 'Order Confirmed' : `Checkout (${cart.reduce((s, i) => s + i.quantity, 0)} items)`}
                </h3>
              </div>
            </div>
          </div>

          {/* Amazon Security & User Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              className="hide-mobile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.76rem',
                color: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                fontWeight: 700
              }}
            >
              <Lock size={13} />
              <span>Amazon 256-Bit SSL Encrypted</span>
            </div>

            {!isProcessing && (
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="icon-btn"
                style={{ width: '32px', height: '32px' }}
                aria-label="Close checkout"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* MANDATORY LOGIN GATE (LIKE AMAZON WEBSITE)               */}
        {/* If the customer is not logged in, checkout is locked!    */}
        {/* ======================================================== */}
        {!currentUser && (
          <div
            className="animate-fade-in"
            style={{
              padding: '1.75rem',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid #f59e0b',
              marginBottom: '1.5rem',
              boxShadow: '0 8px 30px rgba(245, 158, 11, 0.12)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(245, 158, 11, 0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#d97706',
                  flexShrink: 0
                }}
              >
                <Lock size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                  Sign In Required to Place Order
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  Just like Amazon, LUMINA requires you to be signed in to verify delivery address eligibility, apply VIP discounts, and guarantee package tracking.
                </p>
              </div>
            </div>

            {/* 1-Click Fast Demo Logins for Instant Evaluation */}
            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                border: '1px solid var(--border-light)',
                marginBottom: '1.25rem'
              }}
            >
              <div
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--accent-secondary)',
                  marginBottom: '0.6rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <KeyRound size={13} />
                <span>Instant 1-Click Checkout as Verified Account</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => quickLoginDemo('customer')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(92, 58, 33, 0.08)',
                    border: '1px solid rgba(92, 58, 33, 0.28)',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-primary)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.78rem'
                    }}
                  >
                    AM
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: '0.84rem' }}>Alexander Mercer</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--accent-secondary)' }}>VIP Gold Patron (Prime Member)</div>
                  </div>
                  <ArrowRight size={14} style={{ color: 'var(--accent-primary)' }} />
                </button>

                <button
                  type="button"
                  onClick={() => quickLoginDemo('admin')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(217, 119, 6, 0.08)',
                    border: '1px solid rgba(217, 119, 6, 0.3)',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #d97706, #b45309)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.78rem'
                    }}
                  >
                    SV
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: '0.84rem' }}>Sarah Vance</div>
                    <div style={{ fontSize: '0.72rem', color: '#d97706', fontWeight: 700 }}>✦ Atelier Director (Admin)</div>
                  </div>
                  <ArrowRight size={14} style={{ color: '#d97706' }} />
                </button>
              </div>
            </div>

            {/* Standard Amazon Sign In / Sign Up Form */}
            <form onSubmit={handleInlineAuthSubmit}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
                Or sign in with your email & password:
              </div>

              {isAuthRegister && (
                <div style={{ marginBottom: '0.75rem' }}>
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem 0.8rem', fontSize: '0.85rem' }}
                    required
                  />
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <input
                  type="email"
                  placeholder="Email address"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem 0.8rem', fontSize: '0.85rem' }}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem 0.8rem', fontSize: '0.85rem' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    backgroundColor: '#f59e0b',
                    color: '#1a1005',
                    fontWeight: 800,
                    padding: '0.6rem 1.4rem',
                    fontSize: '0.86rem',
                    border: '1px solid #d97706'
                  }}
                >
                  <LogIn size={15} />
                  <span>{isAuthRegister ? 'Create Account & Continue' : 'Sign In & Continue Checkout'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsAuthRegister(!isAuthRegister)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-secondary)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  {isAuthRegister ? 'Already have an account? Sign In' : 'New to Lumina? Create an account'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* When Logged In: Show Amazon Verified Customer Strip */}
        {currentUser && step < 4 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.65rem 1rem',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '1.5rem',
              fontSize: '0.82rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <CheckCircle size={15} style={{ color: '#10b981' }} />
              <span>
                Signed in as <strong>{currentUser.name}</strong> ({currentUser.email})
              </span>
              <span
                style={{
                  fontSize: '0.66rem',
                  fontWeight: 800,
                  backgroundColor: currentUser.role === 'admin' ? 'rgba(217, 119, 6, 0.15)' : 'rgba(92, 58, 33, 0.12)',
                  color: currentUser.role === 'admin' ? '#d97706' : 'var(--accent-primary)',
                  padding: '0.1rem 0.45rem',
                  borderRadius: 'var(--radius-full)'
                }}
              >
                {currentUser.role === 'admin' ? '✦ Atelier Director' : (currentUser.vipTier || 'Prime Patron')}
              </span>
            </div>

            <button
              onClick={() => quickLoginDemo(currentUser.role === 'admin' ? 'customer' : 'admin')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-secondary)',
                fontSize: '0.78rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Switch Account
            </button>
          </div>
        )}

        {/* Amazon-Style Step Indicator */}
        {currentUser && step < 4 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}
          >
            {[
              { num: 1, label: '1. Delivery Address' },
              { num: 2, label: '2. Delivery Speed' },
              { num: 3, label: '3. Payment & Review' }
            ].map((s, idx) => (
              <React.Fragment key={s.num}>
                <div
                  onClick={() => s.num < step && setStep(s.num)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    cursor: s.num < step ? 'pointer' : 'default'
                  }}
                >
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: step >= s.num ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                      color: step >= s.num ? '#fff' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 700
                    }}
                  >
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <span
                    style={{
                      fontSize: '0.84rem',
                      fontWeight: step === s.num ? 800 : 500,
                      color: step === s.num ? 'var(--text-primary)' : 'var(--text-muted)'
                    }}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < 2 && <div style={{ width: '30px', height: '1px', backgroundColor: 'var(--border-subtle)' }} />}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 1: AMAZON-STYLE DELIVERY ADDRESS SELECTION          */}
        {/* ======================================================== */}
        {currentUser && step === 1 && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Select a delivery address</h4>
              <button
                type="button"
                onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-secondary)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {showNewAddressForm ? 'Cancel New Address' : '+ Add a new address'}
              </button>
            </div>

            {/* Existing Saved Addresses as Amazon Cards */}
            {!showNewAddressForm && savedAddresses.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem', marginBottom: '1.5rem' }}>
                {savedAddresses.map((addr) => {
                  const isSelected = selectedAddressId === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => handleSelectAddress(addr)}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        border: isSelected ? '2px solid #f59e0b' : '1px solid var(--border-subtle)',
                        backgroundColor: isSelected ? 'rgba(245, 158, 11, 0.08)' : 'var(--bg-card)',
                        boxShadow: isSelected ? '0 0 14px rgba(245, 158, 11, 0.2)' : 'var(--shadow-xs)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                        position: 'relative'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                          <input
                            type="radio"
                            name="delivery_address"
                            checked={isSelected}
                            onChange={() => handleSelectAddress(addr)}
                            style={{ accentColor: '#f59e0b', cursor: 'pointer' }}
                          />
                          <strong style={{ fontSize: '0.9rem' }}>{addr.label || 'Residence'}</strong>
                        </div>
                        {addr.isDefault && (
                          <span
                            style={{
                              fontSize: '0.64rem',
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              backgroundColor: 'rgba(16, 185, 129, 0.12)',
                              color: '#10b981',
                              padding: '0.15rem 0.45rem',
                              borderRadius: 'var(--radius-xs)'
                            }}
                          >
                            Default
                          </span>
                        )}
                      </div>

                      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.4', paddingLeft: '1.4rem' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                          {addr.firstName || currentUser.name.split(' ')[0]} {addr.lastName || currentUser.name.split(' ').slice(1).join(' ')}
                        </div>
                        <div>{addr.address}</div>
                        <div>{addr.city}, {addr.state} {addr.zip}</div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                          Phone: {addr.phone || currentUser.phone || '+1 (555) 019-2834'}
                        </div>
                      </div>

                      {isSelected && (
                        <div
                          style={{
                            marginTop: '0.85rem',
                            paddingTop: '0.65rem',
                            borderTop: '1px solid rgba(245, 158, 11, 0.2)',
                            fontSize: '0.74rem',
                            fontWeight: 800,
                            color: '#d97706',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                          }}
                        >
                          <CheckCircle size={13} />
                          <span>Delivering to this address</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Add New Address Form (or when user toggles "+ Add a new address") */}
            {(showNewAddressForm || savedAddresses.length === 0) && (
              <div
                style={{
                  padding: '1.25rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  marginBottom: '1.5rem'
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '0.88rem', marginBottom: '0.85rem' }}>
                  Enter a new delivery address
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '0.85rem' }}>
                  <div>
                    <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>First Name</label>
                    <input
                      type="text"
                      value={shippingForm.firstName}
                      onChange={(e) => setShippingForm({ ...shippingForm, firstName: e.target.value })}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', fontSize: '0.84rem' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Last Name</label>
                    <input
                      type="text"
                      value={shippingForm.lastName}
                      onChange={(e) => setShippingForm({ ...shippingForm, lastName: e.target.value })}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', fontSize: '0.84rem' }}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '0.85rem' }}>
                  <div>
                    <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Email</label>
                    <input
                      type="email"
                      value={shippingForm.email}
                      onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', fontSize: '0.84rem' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Phone Number</label>
                    <input
                      type="tel"
                      value={shippingForm.phone}
                      onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', fontSize: '0.84rem' }}
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '0.85rem' }}>
                  <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Street Address</label>
                  <input
                    type="text"
                    placeholder="Street address, P.O. box, company name, c/o"
                    value={shippingForm.address}
                    onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                    style={{ width: '100%', padding: '0.55rem 0.75rem', fontSize: '0.84rem' }}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>City</label>
                    <input
                      type="text"
                      value={shippingForm.city}
                      onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', fontSize: '0.84rem' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>State</label>
                    <input
                      type="text"
                      value={shippingForm.state}
                      onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', fontSize: '0.84rem' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>ZIP Code</label>
                    <input
                      type="text"
                      value={shippingForm.zip}
                      onChange={(e) => setShippingForm({ ...shippingForm, zip: e.target.value })}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', fontSize: '0.84rem' }}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Amazon Yellow Action Button */}
            <button
              onClick={() => {
                if (!shippingForm.firstName.trim() || !shippingForm.address.trim()) {
                  addToast({
                    title: 'Address Incomplete',
                    message: 'Please select a saved address or fill in required street address details.',
                    type: 'warning'
                  });
                  return;
                }
                setStep(2);
              }}
              style={{
                width: '100%',
                padding: '0.85rem',
                backgroundColor: '#f59e0b',
                color: '#1a1005',
                fontSize: '0.94rem',
                fontWeight: 800,
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #d97706',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)'
              }}
            >
              <span>Use this address & Continue</span>
              <ArrowRight size={17} />
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 2: AMAZON-STYLE DELIVERY OPTIONS & PRIME SPEED      */}
        {/* ======================================================== */}
        {currentUser && step === 2 && (
          <div className="animate-fade-in">
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Choose your Amazon delivery option
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Guaranteed delivery times backed by LUMINA Express Global Courier tracking.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
              {[
                {
                  id: 'express',
                  name: 'Atelier Prime Two-Day Air',
                  date: deliveryDates.express,
                  cost: 'FREE with Prime',
                  badge: 'prime',
                  description: 'Complimentary two-day express air with tamper-evident seal.'
                },
                {
                  id: 'overnight',
                  name: 'Prime Priority Overnight Morning',
                  date: deliveryDates.overnight,
                  cost: formatPrice(25, currency),
                  badge: 'OVERNIGHT',
                  description: 'Guaranteed delivery before 9:00 AM tomorrow via Dedicated Air Courier.'
                },
                {
                  id: 'standard',
                  name: 'Standard Eco Courier',
                  date: deliveryDates.standard,
                  cost: baseTotals.isFreeShipping ? 'FREE' : formatPrice(15, currency),
                  badge: 'ECO',
                  description: 'Carbon-neutral consolidated delivery in 4-5 business days.'
                }
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setShippingMethod(opt.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.1rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: shippingMethod === opt.id ? '2px solid #f59e0b' : '1px solid var(--border-subtle)',
                    backgroundColor: shippingMethod === opt.id ? 'rgba(245, 158, 11, 0.08)' : 'var(--bg-card)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                    <input
                      type="radio"
                      name="shipping_speed"
                      checked={shippingMethod === opt.id}
                      onChange={() => setShippingMethod(opt.id)}
                      style={{ marginTop: '0.2rem', accentColor: '#f59e0b', cursor: 'pointer' }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.94rem' }}>{opt.name}</span>
                        {opt.badge === 'prime' ? (
                          <span
                            style={{
                              fontFamily: 'sans-serif',
                              fontSize: '0.72rem',
                              fontWeight: 900,
                              fontStyle: 'italic',
                              color: '#0284c7',
                              backgroundColor: 'rgba(2, 132, 199, 0.1)',
                              padding: '0.1rem 0.4rem',
                              borderRadius: 'var(--radius-xs)'
                            }}
                          >
                            prime
                          </span>
                        ) : (
                          <span className="badge badge-brand" style={{ fontSize: '0.62rem' }}>{opt.badge}</span>
                        )}
                      </div>
                      <div style={{ color: '#10b981', fontWeight: 700, fontSize: '0.84rem', marginBottom: '0.15rem' }}>
                        Guaranteed: {opt.date}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{opt.description}</div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.96rem', color: opt.cost.includes('FREE') ? '#10b981' : 'var(--text-primary)' }}>
                      {opt.cost}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Amazon Gift Options Checkbox */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.85rem 1rem',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '1.5rem',
                cursor: 'pointer'
              }}
              onClick={() => setIsGift(!isGift)}
            >
              <input
                type="checkbox"
                checked={isGift}
                onChange={(e) => setIsGift(e.target.checked)}
                style={{ accentColor: '#f59e0b', width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.84rem' }}>
                <Gift size={16} style={{ color: 'var(--accent-secondary)' }} />
                <span><strong>This order contains a gift</strong> — Don't show prices on packing slip and include luxury gift pouch.</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-secondary"
                style={{ padding: '0.85rem 1.4rem' }}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                style={{
                  flex: 1,
                  padding: '0.85rem',
                  backgroundColor: '#f59e0b',
                  color: '#1a1005',
                  fontSize: '0.94rem',
                  fontWeight: 800,
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid #d97706',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)'
                }}
              >
                <span>Continue to Payment & Review</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 3: AMAZON PAYMENT METHOD & FINAL ORDER PLACEMENT     */}
        {/* ======================================================== */}
        {currentUser && step === 3 && (
          <div className="animate-fade-in">
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.4rem' }}>
              Select a payment method
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Lumina Atelier accepts all major international cards, Amazon Pay balance, and cash on delivery.
            </p>

            {/* Amazon / Atelier Store Balance Card (1-Click Apply) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.9rem 1.25rem',
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input
                  type="checkbox"
                  checked={useStoreBalance}
                  onChange={(e) => setUseStoreBalance(e.target.checked)}
                  style={{ accentColor: '#10b981', width: '17px', height: '17px', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#10b981' }}>
                    Use Lumina / Amazon Pay Balance
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                    Available credit: <strong>{formatPrice(storeCreditAvailable, currency)}</strong> (Instant 1-Click apply)
                  </div>
                </div>
              </div>

              {useStoreBalance && (
                <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#10b981' }}>
                  -{formatPrice(storeCreditUsed, currency)} Applied
                </div>
              )}
            </div>

            {/* Payment Method Tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.65rem', marginBottom: '1.25rem' }}>
              {[
                { id: 'card', label: 'Credit Card', icon: '💳' },
                { id: 'store_balance', label: 'Amazon Pay', icon: '⚡' },
                { id: 'upi', label: 'UPI / NetBank', icon: '📱' },
                { id: 'cod', label: 'Pay on Delivery', icon: '💵' }
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPaymentMethod(p.id)}
                  style={{
                    padding: '0.75rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    border: paymentMethod === p.id ? '2px solid #f59e0b' : '1px solid var(--border-subtle)',
                    backgroundColor: paymentMethod === p.id ? 'rgba(245, 158, 11, 0.08)' : 'var(--bg-card)',
                    fontSize: '0.8rem',
                    fontWeight: paymentMethod === p.id ? 800 : 500,
                    color: paymentMethod === p.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.35rem',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{p.icon}</span>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>

            {/* Credit Card Input Form */}
            {paymentMethod === 'card' && (
              <div
                style={{
                  padding: '1.25rem',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '1.5rem'
                }}
              >
                {/* 3D Visual Card Preview */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, #1c1510 0%, #2e231c 60%, #5c3a21 100%)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.25rem 1.5rem',
                    color: '#fff',
                    marginBottom: '1.25rem',
                    boxShadow: '0 8px 24px rgba(28, 21, 16, 0.25)',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em' }}>LUMINA BLACK // PLATINUM PRIME</div>
                    <div style={{ fontSize: '1rem', fontWeight: 900 }}>VISA</div>
                  </div>
                  <div style={{ fontSize: '1.2rem', letterSpacing: '0.15em', fontFamily: 'monospace', marginBottom: '1rem' }}>
                    {cardDetails.number}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                    <div>
                      <div style={{ fontSize: '0.58rem', color: '#94a3b8' }}>CARDHOLDER</div>
                      <div style={{ fontWeight: 700 }}>{cardDetails.name || currentUser.name.toUpperCase()}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.58rem', color: '#94a3b8' }}>EXPIRES</div>
                      <div style={{ fontWeight: 700 }}>{cardDetails.expiry}</div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.85rem', marginBottom: '0.85rem' }}>
                  <div>
                    <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Card Number</label>
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                      value={cardDetails.number}
                      onChange={handleCardNumberChange}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>CVV</label>
                    <input
                      type="text"
                      placeholder="888"
                      maxLength={4}
                      value={cardDetails.cvv}
                      onChange={handleCvvChange}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Name on Card</label>
                    <input
                      type="text"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value.toUpperCase() })}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Expiry (MM/YY)</label>
                    <input
                      type="text"
                      placeholder="12/28"
                      maxLength={5}
                      value={cardDetails.expiry}
                      onChange={handleExpiryChange}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div
                style={{
                  padding: '1.25rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.5rem',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)'
                }}
              >
                💵 <strong>Pay on Delivery (Cash/UPI):</strong> You can pay in cash or via QR scan (Google Pay, Apple Pay, PhonePe) to the delivery agent when your order arrives.
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div
                style={{
                  padding: '1.25rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.5rem',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)'
                }}
              >
                📱 <strong>UPI & NetBanking:</strong> Instant redirection to authenticate via your preferred banking app upon clicking Place Order.
              </div>
            )}

            {/* Amazon-Style Detailed Order Summary Box */}
            <div
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                border: '1px solid var(--border-light)',
                marginBottom: '1.5rem'
              }}
            >
              <div style={{ fontWeight: 800, fontSize: '0.94rem', marginBottom: '0.75rem' }}>
                Order Summary
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.84rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Items ({cart.reduce((s, i) => s + i.quantity, 0)}):</span>
                  <span>{formatPrice(baseTotals.subtotal, currency)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Shipping & handling:</span>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>
                    {shippingMethod === 'overnight' ? formatPrice(25, currency) : 'FREE'}
                  </span>
                </div>

                {baseTotals.discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: 700 }}>
                    <span>Promotion Applied:</span>
                    <span>-{formatPrice(baseTotals.discountAmount, currency)}</span>
                  </div>
                )}

                {storeCreditUsed > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: 700 }}>
                    <span>Lumina / Amazon Balance:</span>
                    <span>-{formatPrice(storeCreditUsed, currency)}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Estimated Tax:</span>
                  <span>{formatPrice(baseTotals.tax, currency)}</span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontWeight: 900,
                    fontSize: '1.2rem',
                    color: 'var(--text-primary)',
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '0.65rem',
                    marginTop: '0.35rem'
                  }}
                >
                  <span>Order Total:</span>
                  <span style={{ color: '#d97706' }}>{formatPrice(finalTotal, currency)}</span>
                </div>
              </div>
            </div>

            {/* Amazon Golden Place Order Button */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-secondary"
                style={{ padding: '0.85rem 1.4rem' }}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>

              <button
                id="place-order-and-pay-btn"
                type="button"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                style={{
                  flex: 1,
                  padding: '0.95rem',
                  backgroundColor: '#f59e0b',
                  color: '#1a1005',
                  fontSize: '1rem',
                  fontWeight: 900,
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid #d97706',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {isProcessing ? (
                  <span>Processing Amazon Secure Authorization...</span>
                ) : (
                  <>
                    <Lock size={17} />
                    <span>Place your order and pay ({formatPrice(finalTotal, currency)})</span>
                  </>
                )}
              </button>
            </div>

            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.85rem' }}>
              By placing your order, you agree to Lumina's Conditions of Use, Privacy Notice, and Prime terms.
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 4: CELEBRATORY ORDER CONFIRMATION RECEIPT           */}
        {/* ======================================================== */}
        {step === 4 && confirmedOrder && (
          <div className="animate-fade-in" style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                boxShadow: '0 0 25px rgba(16, 185, 129, 0.4)'
              }}
            >
              <CheckCircle size={36} />
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.35rem' }}>
              Thank You! Your Order has been Placed.
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              We've sent a confirmation email to <strong>{confirmedOrder.customerEmail || confirmedOrder.shippingDetails?.email}</strong>.
            </p>

            {/* Receipt Summary Card */}
            <div
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                textAlign: 'left',
                border: '1px solid var(--border-subtle)',
                marginBottom: '1.75rem'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid var(--border-subtle)'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>AMAZON ORDER #</div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent-primary)' }}>
                    {confirmedOrder.orderId}
                  </div>
                </div>
                <button
                  onClick={() => copyOrderId(confirmedOrder.orderId)}
                  className="btn-secondary"
                  style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                >
                  <Copy size={13} />
                  <span>Copy ID</span>
                </button>
              </div>

              {/* Items in order */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                {confirmedOrder.items.map((item) => (
                  <div key={item.cartItemId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                    <span>{item.quantity}x {item.product.name} ({item.selectedColor})</span>
                    <span style={{ fontWeight: 700 }}>{formatPrice(item.product.price * item.quantity, currency)}</span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '0.75rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 800,
                  fontSize: '1.05rem'
                }}
              >
                <span>Paid via {confirmedOrder.paymentMethod.toUpperCase()}:</span>
                <span className="text-gradient">{formatPrice(confirmedOrder.summary.total, currency)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setIsTrackingOpen(true);
                }}
                className="btn-primary"
                style={{ padding: '0.75rem 1.4rem' }}
              >
                <Truck size={16} />
                <span>Track Package Status</span>
              </button>
              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setInvoiceOrder(confirmedOrder);
                }}
                className="btn-secondary"
                style={{ padding: '0.75rem 1.4rem' }}
              >
                <Printer size={16} />
                <span>View & Print Invoice</span>
              </button>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="btn-secondary"
                style={{ padding: '0.75rem 1.4rem' }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
