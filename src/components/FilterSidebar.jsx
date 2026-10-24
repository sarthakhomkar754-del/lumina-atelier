import React from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';
import { formatPrice } from '../utils/currency';
import { SlidersHorizontal, RotateCcw, Star } from 'lucide-react';

export const FilterSidebar = () => {
  const {
    currency,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    inStockOnly,
    setInStockOnly,
    minRating,
    setMinRating,
    searchQuery,
    setSearchQuery
  } = useStore();

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 3000]);
    setInStockOnly(false);
    setMinRating(0);
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    (priceRange[0] && priceRange[0] > 0) ||
    priceRange[1] < 3000 ||
    inStockOnly ||
    minRating > 0 ||
    searchQuery.trim().length > 0;

  return (
    <aside
      className="glass-panel"
      style={{
        padding: '1.25rem',
        borderRadius: 'var(--radius-lg)',
        height: 'fit-content',
        position: 'sticky',
        top: '80px',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)'
      }}
    >
      {/* Title & Reset Button */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem' }}>
          <SlidersHorizontal size={17} style={{ color: 'var(--accent-primary)' }} />
          <span>Filters & Specs</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.74rem',
              color: 'var(--accent-pink)',
              fontWeight: 600
            }}
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Categories Filter */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.65rem' }}>
          Category
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.45rem 0.65rem',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.82rem',
                  textAlign: 'left',
                  backgroundColor: isSelected ? 'var(--bg-tertiary)' : 'transparent',
                  color: isSelected ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontWeight: isSelected ? 700 : 500,
                  transition: 'background-color var(--transition-fast)'
                }}
              >
                <span>{cat.name}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{cat.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Filter with Presets & Range Controls */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Price Range
          </label>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>
            {formatPrice(priceRange[0] || 0, currency)} – {formatPrice(priceRange[1] || 3000, currency)}
          </span>
        </div>

        {/* Quick Price Preset Chips */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.35rem', marginBottom: '0.75rem' }}>
          {[
            { label: 'All Prices', range: [0, 3000] },
            { label: 'Under $150', range: [0, 150] },
            { label: '$150 – $600', range: [150, 600] },
            { label: '$600 – $1,500', range: [600, 1500] },
            { label: '$1,500+', range: [1500, 3000] }
          ].map((preset) => {
            const isMatch = (priceRange[0] || 0) === preset.range[0] && priceRange[1] === preset.range[1];
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => setPriceRange(preset.range)}
                style={{
                  padding: '0.3rem 0.4rem',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  backgroundColor: isMatch ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                  color: isMatch ? '#ffffff' : 'var(--text-secondary)',
                  border: isMatch ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        {/* Dual Numeric Range Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <div>
            <label style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>Min ($)</label>
            <input
              type="number"
              min="0"
              max={priceRange[1]}
              value={priceRange[0] || 0}
              onChange={(e) => {
                const val = Math.max(0, Number(e.target.value));
                setPriceRange([val, Math.max(val, priceRange[1])]);
              }}
              style={{ width: '100%', padding: '0.35rem 0.5rem', fontSize: '0.78rem' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>Max ($)</label>
            <input
              type="number"
              min={priceRange[0] || 0}
              max="5000"
              value={priceRange[1] || 3000}
              onChange={(e) => {
                const val = Math.min(5000, Number(e.target.value));
                setPriceRange([priceRange[0], Math.max(priceRange[0] || 0, val)]);
              }}
              style={{ width: '100%', padding: '0.35rem 0.5rem', fontSize: '0.78rem' }}
            />
          </div>
        </div>

        {/* Slider for Max Price */}
        <input
          type="range"
          min="40"
          max="3000"
          step="20"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0] || 0, Math.max(priceRange[0] || 0, Number(e.target.value))])}
          style={{
            width: '100%',
            accentColor: 'var(--accent-primary)',
            cursor: 'pointer'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
          <span>{formatPrice(0, currency)}</span>
          <span>{formatPrice(3000, currency)}+</span>
        </div>
      </div>

      {/* Rating Filter */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.65rem' }}>
          Customer Rating
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {[
            { label: 'All Ratings', value: 0 },
            { label: '4.8 ★ & Above', value: 4.8 },
            { label: '4.5 ★ & Above', value: 4.5 }
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setMinRating(item.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0.6rem',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.82rem',
                backgroundColor: minRating === item.value ? 'var(--bg-tertiary)' : 'transparent',
                color: minRating === item.value ? 'var(--accent-amber)' : 'var(--text-secondary)',
                fontWeight: minRating === item.value ? 700 : 500
              }}
            >
              <Star size={13} fill={minRating === item.value ? 'currentColor' : 'none'} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* In-Stock Toggle */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.65rem 0',
          borderTop: '1px solid var(--border-subtle)'
        }}
      >
        <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>In-Stock Only</span>
        <button
          onClick={() => setInStockOnly(!inStockOnly)}
          style={{
            width: '40px',
            height: '22px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: inStockOnly ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
            border: '1px solid var(--border-light)',
            position: 'relative',
            transition: 'background-color var(--transition-fast)'
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '2px',
              left: inStockOnly ? '20px' : '2px',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: '#fff',
              transition: 'left var(--transition-fast)'
            }}
          />
        </button>
      </div>
    </aside>
  );
};
