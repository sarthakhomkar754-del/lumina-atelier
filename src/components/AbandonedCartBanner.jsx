import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/currency';
import {
  X,
  ArrowRight,
  Clock
} from 'lucide-react';

export const AbandonedCartBanner = () => {
  const {
    cart,
    isCartOpen,
    isCheckoutOpen,
    isAbandonedCartDismissed,
    dismissAbandonedCart,
    applyCoupon,
    currency,
    startCheckout
  } = useStore();

  const [timerPassed, setTimerPassed] = useState(false);

  useEffect(() => {
    if (cart.length === 0 || isAbandonedCartDismissed) return;

    const timer = setTimeout(() => {
      setTimerPassed(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, [cart.length, isAbandonedCartDismissed]);

  const shouldShow =
    timerPassed &&
    cart.length > 0 &&
    !isAbandonedCartDismissed &&
    !isCartOpen &&
    !isCheckoutOpen;

  if (!shouldShow) return null;

  const featuredItem = cart[0];

  const handleResumeCheckout = () => {
    applyCoupon('DROP10');
    dismissAbandonedCart();
    startCheckout();
  };

  return (
    <div
      className="glass-panel"
      style={{
        position: 'fixed',
        bottom: '1.25rem',
        right: '1.25rem',
        zIndex: 80,
        maxWidth: '420px',
        backgroundColor: 'var(--bg-secondary)',
        border: '1.5px solid var(--accent-secondary)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-2xl)',
        padding: '1rem',
        animation: 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <img
          src={featuredItem.product.images[0]}
          alt={featuredItem.product.name}
          style={{
            width: '50px',
            height: '50px',
            objectFit: 'cover',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            flexShrink: 0
          }}
        />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                color: 'var(--accent-secondary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <Clock size={11} />
              <span>Cart Reserved for 10:00</span>
            </span>

            <button
              onClick={dismissAbandonedCart}
              aria-label="Dismiss banner"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '0.1rem'
              }}
            >
              <X size={14} />
            </button>
          </div>

          <div
            style={{
              fontSize: '0.84rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {featuredItem.product.name}
          </div>

          <p style={{ margin: '0.2rem 0 0.65rem 0', fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
            Complete your order with code <strong style={{ color: 'var(--accent-primary)' }}>DROP10</strong> for an extra 10% off!
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={handleResumeCheckout}
              className="btn-primary"
              style={{
                padding: '0.4rem 0.85rem',
                fontSize: '0.78rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <span>Resume Checkout</span>
              <ArrowRight size={13} />
            </button>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-primary)', marginLeft: 'auto' }}>
              {formatPrice(featuredItem.product.price * featuredItem.quantity, currency)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbandonedCartBanner;
