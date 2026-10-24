import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/currency';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck
} from 'lucide-react';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    calculateCartTotals,
    currency,
    startCheckout
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const totals = calculateCartTotals();
  const freeShippingProgress = Math.min(100, Math.round((totals.subtotal / 99) * 100));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput.trim());
    if (success) setCouponInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    startCheckout();
  };

  return (
    <div
      className="drawer-overlay"
      onClick={() => setIsCartOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
    >
      <div
        className="drawer-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-primary)'
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-card)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} style={{ color: 'var(--accent-primary)' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Your Shopping Bag</h3>
            <span
              style={{
                fontSize: '0.75rem',
                backgroundColor: 'var(--bg-tertiary)',
                padding: '0.15rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700
              }}
            >
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '0.72rem',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  marginLeft: '0.5rem'
                }}
              >
                Clear
              </button>
            )}
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="icon-btn"
            style={{ width: '32px', height: '32px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div
          style={{
            padding: '0.85rem 1.5rem',
            backgroundColor: totals.isFreeShipping
              ? 'rgba(95, 122, 97, 0.12)'
              : 'rgba(92, 58, 33, 0.06)',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.76rem',
              fontWeight: 600,
              marginBottom: '0.4rem',
              color: totals.isFreeShipping ? '#10b981' : 'var(--text-secondary)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Truck size={14} />
              <span>
                {totals.isFreeShipping
                  ? '🎉 Qualified for FREE Express Delivery!'
                  : `Add ${formatPrice(totals.amountUntilFreeShipping, currency)} more for FREE Shipping`}
              </span>
            </div>
            <span>{freeShippingProgress}%</span>
          </div>
          <div
            style={{
              height: '5px',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${freeShippingProgress}%`,
                background: totals.isFreeShipping
                  ? '#10b981'
                  : 'var(--gradient-brand)',
                borderRadius: 'var(--radius-full)',
                transition: 'width 0.4s ease'
              }}
            />
          </div>
        </div>

        {/* Items List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '3rem 1rem',
                color: 'var(--text-muted)'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto',
                  color: 'var(--text-muted)'
                }}
              >
                <ShoppingBag size={28} />
              </div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                Your bag is empty
              </h4>
              <p style={{ fontSize: '0.84rem', marginBottom: '1.25rem' }}>
                Explore our cyber drops and add your favorite gear.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-primary"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
              >
                Start Exploring
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartItemId}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '0.85rem',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: 'var(--radius-sm)',
                    objectFit: 'cover',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)'
                  }}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '0.2rem'
                    }}
                  >
                    <h5
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        paddingRight: '0.5rem'
                      }}
                    >
                      {item.product.name}
                    </h5>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      style={{
                        color: 'var(--text-muted)',
                        padding: '0.2rem',
                        display: 'flex',
                        transition: 'color var(--transition-fast)'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#f43f5e')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                      title="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    {item.selectedColor} • {item.selectedSize}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    {/* Stepper */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'var(--bg-tertiary)',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border-subtle)',
                        padding: '0.15rem'
                      }}
                    >
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--text-primary)'
                        }}
                      >
                        <Minus size={12} />
                      </button>
                      <span
                        style={{
                          width: '26px',
                          textAlign: 'center',
                          fontSize: '0.82rem',
                          fontWeight: 700
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--text-primary)'
                        }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Total item price */}
                    <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                      {formatPrice(item.product.price * item.quantity, currency)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Coupon & Checkout */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderTop: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-card)'
            }}
          >
            {/* Quick Available Promo Badges */}
            <div style={{ marginBottom: '0.75rem' }}>
              <div
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '0.35rem'
                }}
              >
                Instant Deals (Click to apply):
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {['VIBE20', 'DROP10', 'FREESHIP'].map((c) => (
                  <button
                    key={c}
                    onClick={() => applyCoupon(c)}
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: appliedCoupon?.code === c ? 'rgba(92, 58, 33, 0.12)' : 'var(--bg-tertiary)',
                      color: appliedCoupon?.code === c ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      border: appliedCoupon?.code === c ? '1px solid var(--accent-primary)' : '1px dashed var(--border-light)'
                    }}
                  >
                    🏷️ {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Enter promo code"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.45rem 0.75rem',
                  fontSize: '0.82rem',
                  textTransform: 'uppercase'
                }}
              />
              <button
                type="submit"
                className="btn-secondary"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
              >
                Apply
              </button>
            </form>

            {/* Active Coupon Banner */}
            {appliedCoupon && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.76rem',
                  color: '#10b981',
                  marginBottom: '1rem'
                }}
              >
                <span>🎉 Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.label})</span>
                <button
                  onClick={removeCoupon}
                  style={{ color: '#f43f5e', fontWeight: 700, fontSize: '0.72rem' }}
                >
                  Remove
                </button>
              </div>
            )}

            {/* Price Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.82rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>{formatPrice(totals.subtotal, currency)}</span>
              </div>

              {totals.discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                  <span>Discount</span>
                  <span>-{formatPrice(totals.discountAmount, currency)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Shipping</span>
                <span>{totals.shipping === 0 ? 'FREE' : formatPrice(totals.shipping, currency)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Estimated Tax (8%)</span>
                <span>{formatPrice(totals.tax, currency)}</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  paddingTop: '0.5rem',
                  borderTop: '1px solid var(--border-subtle)',
                  marginTop: '0.2rem'
                }}
              >
                <span>Total</span>
                <span className="text-gradient">{formatPrice(totals.total, currency)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              id="proceed-to-checkout-btn"
              onClick={handleProceedToCheckout}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '0.85rem',
                fontSize: '0.95rem',
                justifyContent: 'center'
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
