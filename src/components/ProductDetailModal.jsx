import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/currency';
import { PRODUCTS } from '../data/products';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  Plus,
  Minus,
  Send,
  Users,
  Share2,
  CheckCircle,
  MapPin,
  Sparkles,
  BellRing,
  ThumbsUp,
  Camera
} from 'lucide-react';

// Inner component where all hooks run unconditionally
const ProductDetailContent = ({ product, onClose }) => {
  const {
    currency,
    addToCart,
    toggleWishlist,
    isInWishlist,
    startCheckout,
    addToast,
    addUserReview,
    voteReviewHelpful,
    getProductReviews,
    products,
    currentUser,
    setIsRestockModalOpen,
    setRestockModalProduct
  } = useStore();

  const isSaved = isInWishlist(product.id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loadedSrc, setLoadedSrc] = useState('');
  const [errorSrc, setErrorSrc] = useState('');

  const currentImgSrc = product.images[activeImageIndex] || product.images[0];
  const isCurrentImgLoaded = loadedSrc === currentImgSrc;
  const isCurrentImgError = errorSrc === currentImgSrc;
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors[0]?.name ? product.colors[0].name : 'Default'
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes[0] ? product.sizes[0] : 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'shipping' | 'reviews'

  // ZIP Code Delivery Estimator
  const [zipCode, setZipCode] = useState('');
  const [estimatedArrival, setEstimatedArrival] = useState(null);

  // Companion product for "Frequently Bought Together" bundle from dynamic catalog
  const companionProduct = useMemo(() => {
    const list = products && products.length > 0 ? products : PRODUCTS;
    return list.find((p) => p.id !== product.id && p.category !== product.category) || list[0];
  }, [product, products]);
  const [includeCompanion, setIncludeCompanion] = useState(true);

  // Reviews from StoreContext (persisted user reviews + default mock reviews)
  const reviewsList = getProductReviews(product);
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | 5 | 4 | 'photos'
  const [reviewPhoto, setReviewPhoto] = useState(null);

  // Review submission state (pre-filled with currentUser if available)
  const [newReviewAuthor, setNewReviewAuthor] = useState(currentUser?.name || '');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  const ratingStats = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviewsList.forEach((r) => {
      const star = Math.min(5, Math.max(1, Math.round(r.rating || 5)));
      counts[star] = (counts[star] || 0) + 1;
    });
    const total = reviewsList.length || 1;
    return { counts, total };
  }, [reviewsList]);

  const filteredReviews = useMemo(() => {
    if (reviewFilter === 'all') return reviewsList;
    if (reviewFilter === 'photos') return reviewsList.filter((r) => r.photos && r.photos.length > 0);
    return reviewsList.filter((r) => Math.round(r.rating) === reviewFilter);
  }, [reviewsList, reviewFilter]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        addToast({ title: 'Image Too Large', message: 'Please select an image under 2MB', type: 'warning' });
        return;
      }
      const reader = new FileReader();
      reader.onload = () => setReviewPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      addToast({
        title: 'Incomplete Review',
        message: 'Please provide both your name and review comments.',
        type: 'warning'
      });
      return;
    }

    const reviewObj = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: 'Just now (Verified Buyer)',
      title: 'Verified Customer Experience',
      comment: newReviewComment.trim(),
      photos: reviewPhoto ? [reviewPhoto] : [],
      helpfulCount: 0
    };

    addUserReview(product.id, reviewObj);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setReviewPhoto(null);
    addToast({
      title: 'Review Published! ⭐',
      message: 'Your verified review is now live on the product page.',
      type: 'success'
    });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    onClose();
    startCheckout();
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}${window.location.pathname}#product=${product.id}`;
      navigator.clipboard.writeText(url);
      addToast({
        title: 'Direct Link Copied! 🔗',
        message: 'Product link copied to clipboard.',
        type: 'info'
      });
    }
  };

  const handleCheckDelivery = (e) => {
    e.preventDefault();
    if (!zipCode.trim() || zipCode.trim().length < 3) {
      addToast({ title: 'Invalid ZIP', message: 'Enter a valid postal code', type: 'warning' });
      return;
    }
    setEstimatedArrival(`Express Delivery to ${zipCode}: Guaranteed within 48 Hours via DHL Air`);
  };

  const handleAddBundle = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    if (includeCompanion && companionProduct) {
      addToCart(companionProduct, 1);
    }
    addToast({
      title: 'Bundle Added to Bag! 🎁',
      message: `${product.name} + ${companionProduct.name}`,
      type: 'success'
    });
  };

  const bundleTotal = (product.price + (includeCompanion ? companionProduct.price : 0)) * 0.9; // 10% bundle discount

  return (
    <div
      className="glass-panel animate-scale-up"
      onClick={(e) => e.stopPropagation()}
      style={{
        maxWidth: '960px',
        width: '100%',
        maxHeight: '92dvh',
        overflowY: 'auto',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative'
      }}
    >
      {/* Top Bar Actions: Copy Link & Close Button */}
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <button
          onClick={handleCopyLink}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title="Share Direct Link"
        >
          <Share2 size={16} />
        </button>

        <button
          onClick={onClose}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title="Close Modal (Esc)"
        >
          <X size={18} />
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          padding: '2.5rem 2rem 2rem 2rem'
        }}
      >
        {/* Left: Gallery, Thumbnails, & Live Badge */}
        <div>
          {/* Main Active Image with Glow Border */}
          <div
            style={{
              position: 'relative',
              aspectRatio: '1',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              backgroundColor: 'var(--bg-tertiary)',
              marginBottom: '1rem',
              border: '1px solid var(--border-subtle)'
            }}
          >
            {!isCurrentImgLoaded && !isCurrentImgError && (
              <div className="image-skeleton" style={{ position: 'absolute', inset: 0, zIndex: 1 }} />
            )}

            {isCurrentImgError ? (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  color: 'var(--text-muted)',
                  backgroundColor: 'var(--bg-tertiary)',
                  padding: '2rem',
                  textAlign: 'center'
                }}
              >
                <Sparkles size={36} style={{ color: 'var(--accent-secondary)' }} />
                <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{product.name}</span>
              </div>
            ) : (
              <img
                src={currentImgSrc}
                alt={product.name}
                onLoad={() => setLoadedSrc(currentImgSrc)}
                onError={() => setErrorSrc(currentImgSrc)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: isCurrentImgLoaded ? 1 : 0,
                  transition: 'opacity 0.25s ease'
                }}
              />
            )}

            {/* Badges */}
            <div style={{ position: 'absolute', top: '0.85rem', left: '0.85rem', display: 'flex', gap: '0.4rem' }}>
              {product.badge && <span className="badge badge-brand">{product.badge}</span>}
              {product.originalPrice && (
                <span className="badge badge-sale">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Live Viewers Indicator */}
            <div
              style={{
                position: 'absolute',
                bottom: '0.85rem',
                left: '0.85rem',
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(8px)',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.74rem',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
              }}
            >
              <Users size={13} style={{ color: '#10b981' }} />
              <span>{product.viewingCount || 42} browsing right now</span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    border: activeImageIndex === idx ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                    boxShadow: activeImageIndex === idx ? '0 0 0 2px var(--bg-card), 0 0 0 3px var(--accent-primary)' : 'none',
                    cursor: 'pointer',
                    padding: 0,
                    opacity: activeImageIndex === idx ? 1 : 0.7,
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}

          {/* Postal Code Delivery Checker */}
          <div
            style={{
              marginTop: '1.5rem',
              backgroundColor: 'var(--bg-tertiary)',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              <MapPin size={14} style={{ color: 'var(--accent-secondary)' }} />
              <span>Estimate Delivery Speed</span>
            </div>
            <form onSubmit={handleCheckDelivery} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Enter ZIP / Postal Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.4rem 0.65rem',
                  fontSize: '0.8rem',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xs)',
                  color: 'var(--text-primary)'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '0.4rem 0.85rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  backgroundColor: 'var(--accent-primary)',
                  color: '#fff',
                  borderRadius: 'var(--radius-xs)',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Check
              </button>
            </form>
            {estimatedArrival && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.76rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle size={13} />
                <span>{estimatedArrival}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Product Info, Options, Buy Now */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {product.category}
            </span>
            <span style={{ color: 'var(--text-muted)' }}>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-amber)', fontSize: '0.82rem', fontWeight: 700 }}>
              <Star size={14} fill="currentColor" />
              <span>{product.rating}</span>
              <span style={{ color: 'var(--text-muted)' }}>({reviewsList.length} verified reviews)</span>
            </div>
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.4rem', lineHeight: 1.25 }}>
            {product.name}
          </h2>

          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.55 }}>
            {product.description}
          </p>

          {/* Price Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.75rem',
              backgroundColor: 'var(--bg-tertiary)',
              padding: '0.85rem 1.15rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.25rem',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <span style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)' }}>
              {formatPrice(product.price, currency)}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                {formatPrice(product.originalPrice, currency)}
              </span>
            )}
            {product.inStock <= 8 && (
              <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#f43f5e', fontWeight: 700 }}>
                ⚡ Only {product.inStock} units left in stock
              </span>
            )}
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                Finish: <span style={{ color: 'var(--text-primary)' }}>{selectedColor}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                {product.colors.map((c) => {
                  const isSelected = selectedColor === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        padding: '0.35rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: isSelected ? 'var(--bg-tertiary)' : 'transparent',
                        border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                        fontSize: '0.78rem',
                        color: 'var(--text-primary)',
                        cursor: 'pointer'
                      }}
                    >
                      <span
                        style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          backgroundColor: c.hex,
                          display: 'inline-block',
                          border: '1px solid rgba(255,255,255,0.2)'
                        }}
                      />
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Variant / Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                Configuration / Tier:
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {product.sizes.map((s) => {
                  const isSelected = selectedSize === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      style={{
                        padding: '0.45rem 0.95rem',
                        borderRadius: 'var(--radius-xs)',
                        backgroundColor: isSelected ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                        color: isSelected ? '#fff' : 'var(--text-primary)',
                        border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Stepper + Add to Bag + Buy Now */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            {product.inStock <= 0 ? (
              <button
                onClick={() => {
                  setRestockModalProduct(product);
                  setIsRestockModalOpen(true);
                }}
                className="btn-glow"
                style={{
                  flex: 1,
                  padding: '0.85rem 1.5rem',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <BellRing size={16} />
                <span>Sold Out — Join Priority Restock Waitlist</span>
              </button>
            ) : (
              <>
                {/* Stepper */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-subtle)',
                    padding: '0.2rem'
                  }}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-primary)',
                      cursor: 'pointer'
                    }}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ width: '32px', textAlign: 'center', fontWeight: 800, fontSize: '0.9rem' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-primary)',
                      cursor: 'pointer'
                    }}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={() => addToCart(product, quantity, selectedColor, selectedSize)}
                  className="btn-primary"
                  style={{ flex: 1, padding: '0.75rem 1.25rem' }}
                >
                  <ShoppingBag size={16} />
                  <span>Add to Bag</span>
                </button>

                {/* Buy Now */}
                <button
                  onClick={handleBuyNow}
                  className="btn-glow"
                  style={{ padding: '0.75rem 1.25rem', fontSize: '0.88rem' }}
                >
                  Buy Now
                </button>
              </>
            )}

            {/* Wishlist */}
            <button
              onClick={() => toggleWishlist(product)}
              className="icon-btn"
              style={{
                width: '46px',
                height: '46px',
                backgroundColor: isSaved ? 'var(--accent-pink)' : 'var(--bg-tertiary)',
                color: isSaved ? '#fff' : 'var(--text-primary)'
              }}
              title={isSaved ? 'In Wishlist' : 'Add to Wishlist'}
            >
              <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Guarantees Box */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.65rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              paddingTop: '0.85rem',
              borderTop: '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Truck size={14} style={{ color: 'var(--accent-secondary)' }} />
              <span>48h Global Express Air</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={14} style={{ color: 'var(--accent-primary)' }} />
              <span>Official 2-Year Full Coverage</span>
            </div>
          </div>

          {/* Frequently Bought Together Bundle */}
          {companionProduct && (
            <div
              style={{
                marginTop: '1.25rem',
                backgroundColor: 'rgba(92, 58, 33, 0.05)',
                border: '1px solid rgba(92, 58, 33, 0.18)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '0.65rem' }}>
                <Sparkles size={14} />
                <span>FREQUENTLY BOUGHT TOGETHER (SAVE 10%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.75rem' }}>
                <img
                  src={companionProduct.images[0]}
                  alt={companionProduct.name}
                  style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: 'var(--radius-xs)' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {companionProduct.name}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--accent-secondary)' }}>
                    + {formatPrice(companionProduct.price, currency)}
                  </div>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={includeCompanion}
                    onChange={(e) => setIncludeCompanion(e.target.checked)}
                  />
                  <span>Include</span>
                </label>
              </div>
              <button
                onClick={handleAddBundle}
                style={{
                  width: '100%',
                  padding: '0.55rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--accent-primary)',
                  borderRadius: 'var(--radius-xs)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                Add Both to Bag for {formatPrice(bundleTotal, currency)}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs: Technical Specs, Shipping, Verified Reviews */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', padding: '1.5rem 2rem 2.5rem 2rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '1.5rem' }}>
          {[
            { id: 'specs', label: 'Technical Specifications' },
            { id: 'shipping', label: 'Shipping & Warranty' },
            { id: 'reviews', label: `Verified Reviews (${reviewsList.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                paddingBottom: '0.75rem',
                fontSize: '0.88rem',
                fontWeight: activeTab === tab.id ? 800 : 500,
                color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-muted)',
                borderBottom: activeTab === tab.id ? '2px solid var(--accent-primary)' : '2px solid transparent',
                transition: 'all var(--transition-fast)',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Specs */}
        {activeTab === 'specs' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {product.specs &&
              Object.entries(product.specs).map(([specKey, specVal]) => (
                <div
                  key={specKey}
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {specKey}
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                    {specVal}
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Tab 2: Shipping */}
        {activeTab === 'shipping' && (
          <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            <p style={{ marginBottom: '0.85rem' }}>
              🚀 <strong>Express Courier:</strong> Orders dispatched within 48 hours via DHL Express or FedEx Air with real-time tracking numbers and SMS delivery alerts.
            </p>
            <p style={{ marginBottom: '0.85rem' }}>
              🛡️ <strong>Zero-Hassle 2-Year Warranty:</strong> All items include comprehensive manufacturer coverage against internal defects or hardware failures.
            </p>
            <p>
              🔄 <strong>30-Day Evaluation:</strong> If you are not completely captivated by the product, initiate a free return within 30 days for a 100% full refund with prepaid return shipping labels.
            </p>
          </div>
        )}

        {/* Tab 3: Reviews */}
        {activeTab === 'reviews' && (
          <div>
            {/* Rating Breakdown & Distribution Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '2rem',
                backgroundColor: 'var(--bg-tertiary)',
                padding: '1.25rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                border: '1px solid var(--border-subtle)',
                alignItems: 'center'
              }}
            >
              <div style={{ textAlign: 'center', minWidth: '110px' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>
                  {product.rating || '4.9'}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--accent-amber)', margin: '0.4rem 0' }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  {reviewsList.length} Verified Reviews
                </div>
              </div>

              {/* Breakdown Bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = ratingStats.counts[star] || 0;
                  const pct = Math.round((count / ratingStats.total) * 100);
                  return (
                    <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.76rem' }}>
                      <span style={{ width: '32px', color: 'var(--text-secondary)', fontWeight: 600 }}>{star} ★</span>
                      <div
                        style={{
                          flex: 1,
                          height: '6px',
                          backgroundColor: 'var(--bg-secondary)',
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}
                      >
                        <div
                          style={{
                            width: `${pct}%`,
                            height: '100%',
                            backgroundColor: 'var(--accent-amber)',
                            borderRadius: '3px',
                            transition: 'width 0.4s ease'
                          }}
                        />
                      </div>
                      <span style={{ width: '30px', textAlign: 'right', color: 'var(--text-muted)' }}>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'All Reviews' },
                { id: 5, label: '5 Stars ★' },
                { id: 4, label: '4 Stars ★' },
                { id: 'photos', label: '📷 With Photos' }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setReviewFilter(pill.id)}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.78rem',
                    fontWeight: reviewFilter === pill.id ? 700 : 500,
                    backgroundColor: reviewFilter === pill.id ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                    color: reviewFilter === pill.id ? '#fff' : 'var(--text-secondary)',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer'
                  }}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Add Review Form */}
            <form
              onSubmit={handleAddReview}
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.75rem',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ fontWeight: 800, fontSize: '0.92rem', marginBottom: '0.75rem' }}>
                Write a Verified Community Review
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', marginBottom: '0.75rem' }}>
                <input
                  type="text"
                  placeholder="Your Name / Verified Buyer Handle"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  style={{
                    padding: '0.55rem 0.85rem',
                    fontSize: '0.84rem',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--text-primary)'
                  }}
                />
                {/* Star rating selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setNewReviewRating(s)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.1rem',
                        color: s <= newReviewRating ? 'var(--accent-amber)' : 'var(--text-muted)'
                      }}
                    >
                      <Star size={20} fill={s <= newReviewRating ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                rows="2"
                placeholder="Share your experience regarding craftsmanship, acoustic accuracy, ergonomics, or battery endurance..."
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  fontSize: '0.84rem',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xs)',
                  color: 'var(--text-primary)',
                  marginBottom: '0.75rem'
                }}
              />

              {/* Photo Upload & Preview Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <label
                  style={{
                    padding: '0.4rem 0.75rem',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xs)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <Camera size={14} />
                  <span>Attach Unboxing Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    style={{ display: 'none' }}
                  />
                </label>

                {/* 1-click sample demo photo */}
                <button
                  type="button"
                  onClick={() => setReviewPhoto('https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80')}
                  style={{
                    padding: '0.4rem 0.65rem',
                    fontSize: '0.74rem',
                    background: 'none',
                    border: '1px dashed var(--accent-secondary)',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--accent-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  + Add Demo Photo
                </button>

                {reviewPhoto && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <img
                      src={reviewPhoto}
                      alt="Review preview"
                      style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                    <button
                      type="button"
                      onClick={() => setReviewPhoto(null)}
                      style={{ background: 'none', border: 'none', color: '#f43f5e', cursor: 'pointer', fontSize: '0.75rem' }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.82rem' }}
              >
                <Send size={13} />
                <span>Submit Verified Review</span>
              </button>
            </form>

            {/* Reviews Feed */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {filteredReviews.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                  No reviews match this filter. Be the first to submit a review!
                </div>
              ) : (
                filteredReviews.map((rev) => (
                  <div
                    key={rev.id}
                    style={{
                      padding: '1rem 1.15rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.88rem' }}>{rev.author}</span>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{rev.date}</span>
                    </div>
                    <div style={{ display: 'flex', color: 'var(--accent-amber)', marginBottom: '0.4rem' }}>
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={13} fill="currentColor" />
                      ))}
                    </div>
                    {rev.title && (
                      <div style={{ fontWeight: 700, fontSize: '0.84rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
                        {rev.title}
                      </div>
                    )}
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: rev.photos?.length ? '0.65rem' : '0.4rem' }}>
                      {rev.comment}
                    </p>

                    {/* Review Attached Photos */}
                    {rev.photos && rev.photos.length > 0 && (
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.65rem' }}>
                        {rev.photos.map((photo, pIdx) => (
                          <img
                            key={pIdx}
                            src={photo}
                            alt="Customer upload"
                            style={{
                              width: '64px',
                              height: '64px',
                              objectFit: 'cover',
                              borderRadius: 'var(--radius-xs)',
                              border: '1px solid var(--border-subtle)'
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {/* Helpful Vote Button */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '0.4rem', borderTop: '1px solid var(--border-subtle)' }}>
                      <button
                        onClick={() => voteReviewHelpful(product.id, rev.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          fontSize: '0.74rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          cursor: 'pointer',
                          transition: 'color var(--transition-fast)'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-secondary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                      >
                        <ThumbsUp size={12} />
                        <span>Helpful ({rev.helpfulCount || 0})</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const ProductDetailModal = () => {
  const { quickViewProduct, setQuickViewProduct } = useStore();

  if (!quickViewProduct) return null;

  return (
    <div
      className="modal-overlay"
      onClick={() => setQuickViewProduct(null)}
      role="dialog"
      aria-modal="true"
      aria-label={quickViewProduct.name || 'Product Details'}
    >
      <ProductDetailContent
        key={quickViewProduct.id}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

export default ProductDetailModal;
