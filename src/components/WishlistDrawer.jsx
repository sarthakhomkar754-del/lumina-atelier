import React from 'react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/currency';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    currency,
    setQuickViewProduct
  } = useStore();

  if (!isWishlistOpen) return null;

  const handleMoveAllToCart = () => {
    wishlist.forEach((product) => {
      addToCart(product, 1);
    });
    setIsWishlistOpen(false);
  };

  return (
    <div
      className="drawer-overlay"
      onClick={() => setIsWishlistOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Saved Collection"
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
        {/* Header */}
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
            <Heart size={20} style={{ color: 'var(--accent-pink)' }} fill="var(--accent-pink)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Saved Collection</h3>
            <span
              style={{
                fontSize: '0.75rem',
                backgroundColor: 'rgba(225, 29, 72, 0.1)',
                color: 'var(--accent-pink)',
                padding: '0.15rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700
              }}
            >
              {wishlist.length}
            </span>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="icon-btn"
            style={{ width: '32px', height: '32px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Wishlist Items List */}
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
          {wishlist.length === 0 ? (
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
                  color: 'var(--accent-pink)'
                }}
              >
                <Heart size={28} />
              </div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                Your wishlist is empty
              </h4>
              <p style={{ fontSize: '0.84rem', marginBottom: '1.25rem' }}>
                Save products you like to track drops, restocks, and prices.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="btn-primary"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
              >
                Discover Drops
              </button>
            </div>
          ) : (
            wishlist.map((product) => (
              <div
                key={product.id}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '0.85rem',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  alignItems: 'center'
                }}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  onClick={() => {
                    setQuickViewProduct(product);
                    setIsWishlistOpen(false);
                  }}
                  style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: 'var(--radius-sm)',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: '1px solid var(--border-subtle)'
                  }}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <h5
                    onClick={() => {
                      setQuickViewProduct(product);
                      setIsWishlistOpen(false);
                    }}
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      cursor: 'pointer',
                      marginBottom: '0.2rem'
                    }}
                  >
                    {product.name}
                  </h5>

                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    {formatPrice(product.price, currency)}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => {
                        addToCart(product, 1);
                        toggleWishlist(product);
                      }}
                      className="btn-primary"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.76rem' }}
                    >
                      <ShoppingBag size={13} />
                      <span>Move to Bag</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="btn-secondary"
                      style={{ padding: '0.35rem 0.65rem', fontSize: '0.76rem', color: '#f43f5e' }}
                      title="Remove from Wishlist"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderTop: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-card)'
            }}
          >
            <button
              onClick={handleMoveAllToCart}
              className="btn-glow"
              style={{ width: '100%', padding: '0.75rem', justifyContent: 'center' }}
            >
              <span>Move All to Bag ({wishlist.length})</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistDrawer;
