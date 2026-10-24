import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/currency';
import {
  Heart,
  Eye,
  ShoppingBag,
  Star,
  Scale,
  Zap,
  Sparkles,
  BellRing
} from 'lucide-react';

export const ProductCard = ({ product }) => {
  const {
    currency,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    setQuickViewProduct,
    setIsRestockModalOpen,
    setRestockModalProduct
  } = useStore();

  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors[0]?.name ? product.colors[0].name : 'Default'
  );
  const [isHovered, setIsHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const isSaved = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="glass-panel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal)',
        transform: isHovered ? 'translateY(-6px)' : 'none',
        boxShadow: isHovered
          ? 'var(--shadow-lg)'
          : 'var(--shadow-md)',
        borderColor: isHovered ? 'var(--border-glow)' : 'var(--border-subtle)',
        background: 'var(--bg-card)'
      }}
    >
      {/* Top Media Container */}
      <div
        onClick={() => setQuickViewProduct(product)}
        style={{
          position: 'relative',
          aspectRatio: '4 / 3.3',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-tertiary)',
          cursor: 'pointer'
        }}
      >
        {!imgLoaded && !imgError && (
          <div
            className="image-skeleton"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1
            }}
          />
        )}

        {imgError ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              color: 'var(--text-muted)',
              backgroundColor: 'var(--bg-tertiary)',
              padding: '1rem',
              textAlign: 'center'
            }}
          >
            <Sparkles size={28} style={{ color: 'var(--accent-secondary)' }} />
            <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{product.name}</span>
          </div>
        ) : (
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
              opacity: imgLoaded ? 1 : 0
            }}
          />
        )}

        {/* Top Badges */}
        <div
          style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            zIndex: 3
          }}
        >
          {product.badge && (
            <span
              className={`badge ${
                product.badgeType === 'hot'
                  ? 'badge-hot'
                  : product.badgeType === 'new'
                  ? 'badge-new'
                  : product.badgeType === 'sale'
                  ? 'badge-sale'
                  : 'badge-brand'
              }`}
            >
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                backgroundColor: 'var(--accent-pink)',
                color: '#fff',
                padding: '0.15rem 0.45rem',
                borderRadius: 'var(--radius-xs)',
                alignSelf: 'flex-start'
              }}
            >
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Action Buttons Overlay (Wishlist, Compare, QuickView) */}
        <div
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.45rem',
            zIndex: 4
          }}
        >
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: isSaved ? 'var(--accent-pink)' : 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(8px)',
              color: isSaved ? '#fff' : 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: 'var(--shadow-sm)',
              transform: isSaved ? 'scale(1.05)' : 'none'
            }}
            title={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
          </button>

          {/* Compare Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(product);
            }}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: isCompared ? 'var(--accent-secondary)' : 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(8px)',
              color: isCompared ? '#fff' : 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: 'var(--shadow-sm)'
            }}
            title={isCompared ? 'In Compare List' : 'Add to Compare'}
          >
            <Scale size={16} />
          </button>
        </div>

        {/* Quick View Button (Reveals on hover) */}
        <div
          style={{
            position: 'absolute',
            bottom: '0.75rem',
            left: '0.75rem',
            right: '0.75rem',
            zIndex: 3,
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
            pointerEvents: isHovered ? 'auto' : 'none'
          }}
        >
          <button
            onClick={() => setQuickViewProduct(product)}
            style={{
              width: '100%',
              backgroundColor: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(10px)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.55rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'
            }}
          >
            <Eye size={15} />
            <span>Quick Spec View</span>
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div
        style={{
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between'
        }}
      >
        <div>
          {/* Category & Rating */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.4rem',
              fontSize: '0.76rem'
            }}
          >
            <span
              style={{
                textTransform: 'uppercase',
                color: 'var(--accent-secondary)',
                fontWeight: 700,
                letterSpacing: '0.04em'
              }}
            >
              {product.category}
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                color: 'var(--accent-amber)',
                fontWeight: 700
              }}
            >
              <Star size={13} fill="currentColor" />
              <span>{product.rating}</span>
              <span style={{ color: 'var(--text-muted)' }}>({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h4
            onClick={() => setQuickViewProduct(product)}
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              marginBottom: '0.35rem',
              cursor: 'pointer',
              lineHeight: 1.35
            }}
          >
            {product.name}
          </h4>

          {/* Tagline */}
          <p
            style={{
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              marginBottom: '0.85rem',
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {product.tagline}
          </p>

          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                marginBottom: '0.85rem'
              }}
            >
              {product.colors.map((color) => {
                const isColorSelected = selectedColor === color.name;
                return (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: color.hex,
                      border: isColorSelected
                        ? '2px solid var(--accent-primary)'
                        : '2px solid var(--border-light)',
                      boxShadow: isColorSelected ? '0 0 0 2px var(--bg-card), 0 0 0 4px var(--accent-primary)' : 'none',
                      cursor: 'pointer',
                      transform: isColorSelected ? 'scale(1.15)' : 'none',
                      transition: 'transform var(--transition-fast)'
                    }}
                  />
                );
              })}
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: '0.2rem' }}>
                {selectedColor}
              </span>
            </div>
          )}

          {/* Urgency Stock Badge */}
          {product.inStock <= 0 ? (
            <div
              style={{
                fontSize: '0.72rem',
                color: 'var(--accent-secondary)',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                marginBottom: '0.85rem'
              }}
            >
              <BellRing size={12} />
              <span>Sold Out — Priority Restock Waitlist Open</span>
            </div>
          ) : product.inStock <= 6 ? (
            <div
              style={{
                fontSize: '0.72rem',
                color: '#f43f5e',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                marginBottom: '0.85rem'
              }}
            >
              <Zap size={12} />
              <span>Only {product.inStock} left in stock - order soon</span>
            </div>
          ) : null}
        </div>

        {/* Price & Add to Cart Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--border-subtle)',
            marginTop: '0.5rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {formatPrice(product.price, currency)}
              </span>
              {product.originalPrice && (
                <span
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                    textDecoration: 'line-through'
                  }}
                >
                  {formatPrice(product.originalPrice, currency)}
                </span>
              )}
            </div>
          </div>

          {product.inStock <= 0 ? (
            <button
              onClick={() => {
                setRestockModalProduct(product);
                setIsRestockModalOpen(true);
              }}
              className="btn-secondary"
              style={{
                padding: '0.55rem 0.85rem',
                fontSize: '0.8rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                borderColor: 'var(--accent-secondary)',
                color: 'var(--accent-secondary)'
              }}
            >
              <BellRing size={13} />
              <span>Waitlist</span>
            </button>
          ) : (
            <button
              onClick={() => addToCart(product, 1, selectedColor)}
              className="btn-primary"
              style={{
                padding: '0.55rem 0.95rem',
                fontSize: '0.82rem'
              }}
            >
              <ShoppingBag size={14} />
              <span>Bag</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
