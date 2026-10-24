import React from 'react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/currency';
import { History, Eye, ShoppingBag, Trash2 } from 'lucide-react';

export const RecentlyViewedShelf = () => {
  const { recentlyViewed, currency, setQuickViewProduct, addToCart, clearRecentlyViewed } = useStore();

  if (!recentlyViewed || recentlyViewed.length === 0) return null;

  return (
    <section
      style={{
        maxWidth: '1360px',
        margin: '3rem auto 1rem auto',
        padding: '0 1.25rem'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <History size={18} style={{ color: 'var(--accent-primary)' }} />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Recently Viewed by You</h3>
          <span
            style={{
              fontSize: '0.75rem',
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-muted)',
              padding: '0.15rem 0.5rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 700
            }}
          >
            {recentlyViewed.length}
          </span>
        </div>

        <button
          onClick={clearRecentlyViewed}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            padding: '0.25rem 0.5rem',
            borderRadius: 'var(--radius-xs)',
            transition: 'color var(--transition-fast)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-pink)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <Trash2 size={13} />
          <span>Clear History</span>
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.25rem'
        }}
      >
        {recentlyViewed.slice(0, 5).map((product) => (
          <div
            key={product.id}
            className="glass-panel"
            style={{
              padding: '0.85rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform var(--transition-fast)'
            }}
          >
            <div>
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '1',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  marginBottom: '0.75rem',
                  cursor: 'pointer'
                }}
                onClick={() => setQuickViewProduct(product)}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ fontSize: '0.7rem', color: 'var(--accent-secondary)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.2rem' }}>
                {product.category}
              </div>

              <h5
                onClick={() => setQuickViewProduct(product)}
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  marginBottom: '0.35rem',
                  lineHeight: 1.3,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {product.name}
              </h5>

              <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                {formatPrice(product.price, currency)}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button
                onClick={() => setQuickViewProduct(product)}
                className="btn-secondary"
                style={{
                  flex: 1,
                  padding: '0.45rem',
                  fontSize: '0.76rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.3rem'
                }}
              >
                <Eye size={13} />
                <span>Specs</span>
              </button>
              <button
                onClick={() => addToCart(product, 1)}
                className="btn-primary"
                style={{
                  padding: '0.45rem 0.75rem',
                  fontSize: '0.76rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Quick Add to Bag"
              >
                <ShoppingBag size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewedShelf;
