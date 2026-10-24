import React from 'react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/currency';
import { X, Scale, ShoppingBag, Star } from 'lucide-react';

export const CompareModal = () => {
  const {
    isCompareOpen,
    setIsCompareOpen,
    compareList,
    toggleCompare,
    setCompareList,
    addToCart,
    currency
  } = useStore();

  if (!isCompareOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={() => setIsCompareOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Compare Specifications"
    >
      <div
        className="glass-panel animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '1000px',
          width: '100%',
          maxHeight: '85dvh',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          padding: '1.75rem',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Scale size={22} style={{ color: 'var(--accent-secondary)' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Side-by-Side Comparison</h3>
            <span
              style={{
                fontSize: '0.75rem',
                backgroundColor: 'var(--bg-tertiary)',
                padding: '0.15rem 0.5rem',
                borderRadius: 'var(--radius-full)'
              }}
            >
              {compareList.length}/3 Items
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {compareList.length > 0 && (
              <button
                onClick={() => setCompareList([])}
                style={{ fontSize: '0.78rem', color: '#f43f5e', fontWeight: 600 }}
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsCompareOpen(false)}
              className="icon-btn"
              style={{ width: '34px', height: '34px' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {compareList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'var(--text-muted)' }}>
            <Scale size={36} style={{ margin: '0 auto 1rem auto', color: 'var(--accent-secondary)' }} />
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
              No items selected for comparison
            </h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Click the scale icon on any product card to compare specs, prices, and features side by side.
            </p>
            <button
              onClick={() => setIsCompareOpen(false)}
              className="btn-primary"
              style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
            >
              Explore Drops
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                minWidth: '600px',
                fontSize: '0.84rem'
              }}
            >
              <tbody>
                {/* Product Card Row */}
                <tr>
                  <td style={{ padding: '1rem', width: '160px', color: 'var(--text-muted)', fontWeight: 700 }}>
                    PRODUCT
                  </td>
                  {compareList.map((product) => (
                    <td key={product.id} style={{ padding: '1rem', verticalAlign: 'top', minWidth: '200px' }}>
                      <div style={{ position: 'relative', marginBottom: '0.65rem' }}>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          style={{
                            width: '100%',
                            height: '140px',
                            objectFit: 'cover',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border-subtle)'
                          }}
                        />
                        <button
                          onClick={() => toggleCompare(product)}
                          style={{
                            position: 'absolute',
                            top: '6px',
                            right: '6px',
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          title="Remove from compare"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.3rem' }}>
                        {product.name}
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>
                        {formatPrice(product.price, currency)}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Rating Row */}
                <tr style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                    RATING
                  </td>
                  {compareList.map((product) => (
                    <td key={product.id} style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent-amber)', fontWeight: 700 }}>
                        <Star size={14} fill="currentColor" />
                        <span>{product.rating}</span>
                        <span style={{ color: 'var(--text-muted)' }}>({product.reviewCount} reviews)</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Category Row */}
                <tr style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                    CATEGORY
                  </td>
                  {compareList.map((product) => (
                    <td key={product.id} style={{ padding: '0.85rem 1rem', textTransform: 'capitalize' }}>
                      {product.category}
                    </td>
                  ))}
                </tr>

                {/* In Stock Row */}
                <tr style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                    AVAILABILITY
                  </td>
                  {compareList.map((product) => (
                    <td key={product.id} style={{ padding: '0.85rem 1rem', color: '#10b981', fontWeight: 600 }}>
                      ✓ In Stock ({product.inStock} units)
                    </td>
                  ))}
                </tr>

                {/* Key Specs Row */}
                <tr style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                    SPECIFICATIONS
                  </td>
                  {compareList.map((product) => (
                    <td key={product.id} style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem' }}>
                        {product.specs &&
                          Object.entries(product.specs).slice(0, 3).map(([k, v]) => (
                            <div key={k}>
                              <strong style={{ color: 'var(--text-secondary)' }}>{k}:</strong> {v}
                            </div>
                          ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Add to Bag Action Row */}
                <tr style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                    ACTION
                  </td>
                  {compareList.map((product) => (
                    <td key={product.id} style={{ padding: '1rem' }}>
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="btn-primary"
                        style={{ width: '100%', padding: '0.55rem', fontSize: '0.82rem' }}
                      >
                        <ShoppingBag size={14} />
                        <span>Add to Bag</span>
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareModal;
