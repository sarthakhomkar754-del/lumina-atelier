import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { FilterSidebar } from './FilterSidebar';
import { RecentlyViewedShelf } from './RecentlyViewedShelf';
import { formatPrice } from '../utils/currency';
import {
  ArrowUpDown,
  RotateCcw,
  Search,
  LayoutGrid,
  Grid3X3,
  List,
  SlidersHorizontal,
  ChevronRight,
  X,
  Star,
  ShoppingBag,
  Heart,
  Scale,
  LogIn
} from 'lucide-react';

export const ShopCatalogView = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    inStockOnly,
    setInStockOnly,
    minRating,
    setMinRating,
    catalogViewMode,
    setCatalogViewMode,
    setCurrentView,
    currency,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    setQuickViewProduct,
    products,
    currentUser
  } = useStore();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Derived progressive pagination based on active filterKey (zero cascading renders)
  const filterKey = `${selectedCategory}|${searchQuery}|${priceRange[0] || 0}-${priceRange[1] || 3000}|${sortBy}|${inStockOnly}|${minRating}`;
  const [loadMoreState, setLoadMoreState] = useState({ filterKey, count: 12 });
  const visibleCount = loadMoreState.filterKey === filterKey ? loadMoreState.count : 12;

  // Filter dynamic catalog products
  const catalogList = products && products.length > 0 ? products : PRODUCTS;
  const filteredProducts = catalogList.filter((product) => {
    // Category match
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }

    // Price match (dual-bound)
    const minP = priceRange[0] || 0;
    const maxP = priceRange[1] || 3000;
    if (product.price < minP || product.price > maxP) {
      return false;
    }

    // In-Stock match
    if (inStockOnly && product.inStock <= 0) {
      return false;
    }

    // Rating match
    if (minRating > 0 && product.rating < minRating) {
      return false;
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchTagline = product.tagline.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      if (!matchName && !matchTagline && !matchCategory && !matchDesc) {
        return false;
      }
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
    // Default 'featured'
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  const visibleProducts = sortedProducts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedProducts.length;

  const resetAll = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange([0, 3000]);
    setInStockOnly(false);
    setMinRating(0);
    setSortBy('featured');
  };

  const selectedCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);

  const activeFilters = [
    selectedCategory !== 'all' && {
      label: `Category: ${selectedCategoryObj?.name || selectedCategory}`,
      clear: () => setSelectedCategory('all')
    },
    ((priceRange[0] && priceRange[0] > 0) || priceRange[1] < 3000) && {
      label: `Price: ${formatPrice(priceRange[0] || 0, currency)} – ${formatPrice(priceRange[1] || 3000, currency)}`,
      clear: () => setPriceRange([0, 3000])
    },
    inStockOnly && {
      label: 'In Stock Only',
      clear: () => setInStockOnly(false)
    },
    minRating > 0 && {
      label: `${minRating}★ & Above`,
      clear: () => setMinRating(0)
    },
    searchQuery.trim() && {
      label: `Search: "${searchQuery}"`,
      clear: () => setSearchQuery('')
    }
  ].filter(Boolean);

  return (
    <div
      style={{
        maxWidth: '1360px',
        margin: '1.5rem auto 5rem auto',
        padding: '0 1.25rem'
      }}
    >
      {/* Breadcrumb Navigation */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          marginBottom: '1.5rem'
        }}
      >
        <button
          onClick={() => setCurrentView('home')}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}
        >
          Home
        </button>
        <ChevronRight size={13} />
        <button
          onClick={() => setSelectedCategory('all')}
          style={{
            background: 'none',
            border: 'none',
            color: selectedCategory === 'all' ? 'var(--text-primary)' : 'var(--text-muted)',
            fontWeight: selectedCategory === 'all' ? 700 : 500,
            cursor: 'pointer',
            padding: 0
          }}
        >
          Engineered Catalog
        </button>
        {selectedCategory !== 'all' && (
          <>
            <ChevronRight size={13} />
            <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>
              {selectedCategoryObj?.name || selectedCategory}
            </span>
          </>
        )}
      </nav>

      {/* Buyer Dashboard Status & Patronage Header */}
      <div
        className="glass-panel animate-fade-in"
        style={{
          marginBottom: '1.75rem',
          padding: '1rem 1.35rem',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: currentUser ? 'var(--bg-secondary)' : 'var(--bg-tertiary)',
          border: `1px solid ${currentUser ? 'var(--border-light)' : 'var(--border-subtle)'}`,
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: currentUser.role === 'admin'
                  ? 'linear-gradient(135deg, #d97706, #b45309)'
                  : 'var(--gradient-brand)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.9rem',
                flexShrink: 0,
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              {currentUser.avatarInitials}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 800, fontSize: '0.96rem', color: 'var(--text-primary)' }}>
                  Welcome to Your Atelier Storefront, {currentUser.name}
                </span>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    padding: '0.15rem 0.5rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: currentUser.role === 'admin' ? 'rgba(217, 119, 6, 0.15)' : 'rgba(92, 58, 33, 0.12)',
                    color: currentUser.role === 'admin' ? '#d97706' : 'var(--accent-primary)',
                    border: `1px solid ${currentUser.role === 'admin' ? 'rgba(217, 119, 6, 0.3)' : 'rgba(92, 58, 33, 0.2)'}`
                  }}
                >
                  ✦ {currentUser.role === 'admin' ? 'Atelier Director' : (currentUser.vipTier || 'Gold Patron')}
                </span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                VIP Buying Active: Instant 1-Click Checkout • Priority DHL Air Dispatch • 14-Day Free Returns
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(92, 58, 33, 0.1)',
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <ShoppingBag size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                Browsing Atelier Catalog as Guest
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Sign in to link orders with real-time DHL tracking and unlock 1-click buying.
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {currentUser ? (
            <>
              <button
                onClick={() => setCurrentView('orders')}
                className="btn-ghost"
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  padding: '0.4rem 0.8rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-subtle)',
                  cursor: 'pointer'
                }}
              >
                My Orders & Profile
              </button>
              {currentUser.role === 'admin' && (
                <button
                  onClick={() => setCurrentView('admin')}
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    padding: '0.4rem 0.8rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(217, 119, 6, 0.12)',
                    color: '#d97706',
                    border: '1px solid rgba(217, 119, 6, 0.3)',
                    cursor: 'pointer'
                  }}
                >
                  Admin Portal
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => setCurrentView('login')}
              className="btn-primary"
              style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                padding: '0.45rem 0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <LogIn size={14} />
              <span>Sign In to Buy</span>
            </button>
          )}
        </div>
      </div>

      {/* Catalog Title & Controls Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.25rem',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
              {selectedCategory === 'all' ? 'Atelier Drops & Catalog' : selectedCategoryObj?.name}
            </h1>
            <span
              style={{
                fontSize: '0.8rem',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
                padding: '0.2rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 800
              }}
            >
              {sortedProducts.length} Items
            </span>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Aerospace grade metallurgy, precision acoustic drivers, and performance streetwear.
          </p>
        </div>

        {/* View Mode & Sort Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="btn-secondary hide-desktop"
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem', display: 'none' }}
          >
            <SlidersHorizontal size={14} />
            <span>Filters</span>
          </button>

          {/* Layout Switcher (4-Col, 3-Col, List) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.2rem'
            }}
          >
            <button
              onClick={() => setCatalogViewMode('grid-4')}
              style={{
                background: catalogViewMode === 'grid-4' ? 'var(--accent-primary)' : 'transparent',
                color: catalogViewMode === 'grid-4' ? '#ffffff' : 'var(--text-muted)',
                border: 'none',
                borderRadius: '6px',
                padding: '0.35rem 0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Compact 4-Column Grid"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setCatalogViewMode('grid-3')}
              style={{
                background: catalogViewMode === 'grid-3' ? 'var(--accent-primary)' : 'transparent',
                color: catalogViewMode === 'grid-3' ? '#ffffff' : 'var(--text-muted)',
                border: 'none',
                borderRadius: '6px',
                padding: '0.35rem 0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Comfortable 3-Column Grid"
            >
              <Grid3X3 size={16} />
            </button>
            <button
              onClick={() => setCatalogViewMode('list')}
              style={{
                background: catalogViewMode === 'list' ? 'var(--accent-primary)' : 'transparent',
                color: catalogViewMode === 'list' ? '#ffffff' : 'var(--text-muted)',
                border: 'none',
                borderRadius: '6px',
                padding: '0.35rem 0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Detailed List Spec View"
            >
              <List size={16} />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.84rem' }}>
              <ArrowUpDown size={15} />
              <span>Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.5rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.84rem',
                fontWeight: 700,
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-light)',
                cursor: 'pointer'
              }}
            >
              <option value="featured">Featured Drops</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips Bar */}
      {activeFilters.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Active Filters:
          </span>
          {activeFilters.map((chip, idx) => (
            <span
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(92, 58, 33, 0.08)',
                color: 'var(--text-primary)',
                fontSize: '0.76rem',
                fontWeight: 700,
                border: '1px solid rgba(92, 58, 33, 0.22)'
              }}
            >
              <span>{chip.label}</span>
              <button
                onClick={chip.clear}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
              >
                <X size={12} />
              </button>
            </span>
          ))}
          <button
            onClick={resetAll}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-pink)',
              fontSize: '0.76rem',
              fontWeight: 700,
              cursor: 'pointer',
              padding: '0.2rem 0.4rem'
            }}
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Grid Layout: Sidebar + Products */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '270px 1fr',
          gap: '2.5rem',
          alignItems: 'start'
        }}
        className="catalog-grid-layout"
      >
        {/* Left: Filter Sidebar */}
        <div className="filter-sidebar-wrapper">
          <FilterSidebar />
        </div>

        {/* Right: Products Presentation */}
        <div>
          {sortedProducts.length === 0 ? (
            <div
              className="glass-panel"
              style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(92, 58, 33, 0.1)',
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto'
                }}
              >
                <Search size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                No drops matched your exact filters
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '420px', margin: '0 auto 1.5rem auto' }}>
                Try relaxing your price constraints, selecting "All Drops", or resetting filters to explore our full collection.
              </p>
              <button onClick={resetAll} className="btn-primary" style={{ padding: '0.65rem 1.4rem' }}>
                <RotateCcw size={15} />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : catalogViewMode === 'list' ? (
            /* DETAILED LIST VIEW */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {visibleProducts.map((product) => {
                const isSaved = isInWishlist(product.id);
                const isCompared = isInCompare(product.id);
                return (
                  <div
                    key={product.id}
                    className="glass-panel"
                    style={{
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      display: 'grid',
                      gridTemplateColumns: '200px 1fr auto',
                      gap: '1.5rem',
                      alignItems: 'center'
                    }}
                  >
                    {/* Image */}
                    <div
                      style={{
                        position: 'relative',
                        aspectRatio: '1',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        cursor: 'pointer'
                      }}
                      onClick={() => setQuickViewProduct(product)}
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {product.badge && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '0.5rem',
                            left: '0.5rem',
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            padding: '0.15rem 0.5rem',
                            borderRadius: 'var(--radius-xs)',
                            backgroundColor: 'var(--accent-primary)',
                            color: '#fff'
                          }}
                        >
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Middle Info */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                        <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--accent-secondary)', fontWeight: 800 }}>
                          {product.category}
                        </span>
                        <span style={{ color: 'var(--text-muted)' }}>•</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--accent-amber)', fontSize: '0.8rem', fontWeight: 700 }}>
                          <Star size={13} fill="currentColor" />
                          <span>{product.rating}</span>
                          <span style={{ color: 'var(--text-muted)' }}>({product.reviewCount})</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => setQuickViewProduct(product)}
                        style={{ fontSize: '1.15rem', fontWeight: 800, cursor: 'pointer', marginBottom: '0.35rem' }}
                      >
                        {product.name}
                      </h3>

                      <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                        {product.description}
                      </p>

                      {/* Specs pills */}
                      {product.specs && (
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {Object.entries(product.specs).slice(0, 3).map(([k, v]) => (
                            <span
                              key={k}
                              style={{
                                fontSize: '0.72rem',
                                backgroundColor: 'var(--bg-tertiary)',
                                color: 'var(--text-secondary)',
                                padding: '0.2rem 0.5rem',
                                borderRadius: 'var(--radius-xs)',
                                border: '1px solid var(--border-subtle)'
                              }}
                            >
                              <strong>{k}:</strong> {v}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right Price & Actions */}
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '150px' }}>
                      <div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                          {formatPrice(product.price, currency)}
                        </div>
                        {product.originalPrice && (
                          <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                            {formatPrice(product.originalPrice, currency)}
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="icon-btn"
                          style={{
                            width: '36px',
                            height: '36px',
                            backgroundColor: isSaved ? 'var(--accent-pink)' : 'var(--bg-tertiary)',
                            color: isSaved ? '#fff' : 'var(--text-primary)'
                          }}
                          title="Wishlist"
                        >
                          <Heart size={15} fill={isSaved ? 'currentColor' : 'none'} />
                        </button>
                        <button
                          onClick={() => toggleCompare(product)}
                          className="icon-btn"
                          style={{
                            width: '36px',
                            height: '36px',
                            backgroundColor: isCompared ? 'var(--accent-secondary)' : 'var(--bg-tertiary)',
                            color: isCompared ? '#000' : 'var(--text-primary)'
                          }}
                          title="Compare"
                        >
                          <Scale size={15} />
                        </button>
                      </div>

                      <button
                        onClick={() => addToCart(product, 1)}
                        className="btn-primary"
                        style={{ padding: '0.55rem 1rem', fontSize: '0.82rem' }}
                      >
                        <ShoppingBag size={14} />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* STANDARD OR EXPANDED GRID VIEW */
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  catalogViewMode === 'grid-3'
                    ? 'repeat(auto-fill, minmax(320px, 1fr))'
                    : 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '1.5rem'
              }}
            >
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Progressive Load More & Collection Progress */}
          {sortedProducts.length > 0 && (
            <div
              style={{
                marginTop: '3rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.85rem'
              }}
            >
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Showing {Math.min(visibleCount, sortedProducts.length)} of {sortedProducts.length} curated drops
              </div>
              <div
                style={{
                  width: '220px',
                  height: '4px',
                  backgroundColor: 'var(--border-subtle)',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: `${Math.min(100, (Math.min(visibleCount, sortedProducts.length) / sortedProducts.length) * 100)}%`,
                    height: '100%',
                    backgroundColor: 'var(--accent-primary)',
                    borderRadius: 'var(--radius-full)',
                    transition: 'width var(--transition-normal)'
                  }}
                />
              </div>

              {hasMore ? (
                <button
                  onClick={() => setLoadMoreState({ filterKey, count: visibleCount + 12 })}
                  className="btn-secondary"
                  style={{
                    padding: '0.75rem 2rem',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <span>Load More Drops ({sortedProducts.length - visibleCount} remaining)</span>
                </button>
              ) : sortedProducts.length > 12 ? (
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  ✓ You have viewed all {sortedProducts.length} curated drops
                </span>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {/* Recently Viewed Shelf */}
      <RecentlyViewedShelf />
    </div>
  );
};

export default ShopCatalogView;
