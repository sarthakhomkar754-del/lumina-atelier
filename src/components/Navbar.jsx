import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { formatPrice } from '../utils/currency';
import {
  Search,
  ShoppingBag,
  Heart,
  Scale,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  User,
  Compass,
  Command,
  ShieldCheck,
  LogOut,
  LogIn,
  Sparkles,
  History,
  TrendingUp,
  Trash2
} from 'lucide-react';

export const Navbar = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    wishlistCount,
    compareCount,
    currency,
    calculateCartTotals,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsCompareOpen,
    setIsShortcutsOpen,
    orders,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setQuickViewProduct,
    // Auth & Dynamic Catalog
    currentUser,
    setIsAuthModalOpen,
    setAuthModalMode,
    logout,
    quickLoginDemo,
    products,
    recentSearches = [],
    addRecentSearch,
    clearRecentSearches
  } = useStore();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreCategoriesOpen, setIsMoreCategoriesOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const accountMenuRef = useRef(null);
  const { total } = calculateCartTotals();

  // Listen for global search focus trigger (Cmd+K, /)
  useEffect(() => {
    const handleFocusSearch = () => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
        searchInputRef.current.select?.();
        setIsSearchFocused(true);
      }
    };
    window.addEventListener('lumina:focus-search', handleFocusSearch);
    return () => window.removeEventListener('lumina:focus-search', handleFocusSearch);
  }, []);

  // Instant search filtering using dynamic atelier catalog with typo & multi-term tolerance
  const catalogList = products && products.length > 0 ? products : PRODUCTS;
  const matchingProducts = searchQuery.trim()
    ? catalogList
        .filter((p) => {
          const q = searchQuery.toLowerCase().trim();
          const name = (p.name || '').toLowerCase();
          const tagline = (p.tagline || '').toLowerCase();
          const category = (p.category || '').toLowerCase();
          const desc = (p.description || '').toLowerCase();

          // Direct substring match
          if (name.includes(q) || tagline.includes(q) || category.includes(q) || desc.includes(q)) {
            return true;
          }

          // Multi-token match: all words match somewhere
          const words = q.split(/\s+/).filter(Boolean);
          if (words.length > 1 && words.every((w) => name.includes(w) || tagline.includes(w) || category.includes(w))) {
            return true;
          }

          // Typo tolerance: if query word is within 1 edit of name or category words
          const targetWords = [...name.split(/\s+/), category];
          return words.some((w) =>
            targetWords.some((tw) => {
              if (Math.abs(tw.length - w.length) <= 1 && w.length >= 3) {
                let diff = 0;
                let i = 0, j = 0;
                while (i < tw.length && j < w.length) {
                  if (tw[i] !== w[j]) {
                    diff++;
                    if (diff > 1) return false;
                    if (tw.length > w.length) i++;
                    else if (w.length > tw.length) j++;
                    else { i++; j++; }
                  } else {
                    i++; j++;
                  }
                }
                return true;
              }
              return false;
            })
          );
        })
        .slice(0, 5)
    : [];

  // Close search suggestions & account menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target)) {
        setIsAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    setIsAccountMenuOpen(false);
  };

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      setCurrentView('shop');
    } else {
      setCurrentView('shop', { category: catId });
    }
    setIsMoreCategoriesOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className="glass-nav"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 90,
        padding: '0.75rem 1.25rem',
        transition: 'all var(--transition-normal)'
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem'
        }}
      >
        {/* Left: Brand Logo & Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 800,
              fontSize: '1.35rem',
              letterSpacing: '-0.03em',
              textDecoration: 'none',
              color: 'var(--text-primary)'
            }}
          >
            <span
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '12px 3px 12px 3px',
                background: 'var(--accent-primary)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(92, 58, 33, 0.25)',
                color: '#fbf8f3',
                fontSize: '0.95rem'
              }}
            >
              ✦
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.45rem', letterSpacing: '0.02em' }}>
              LUMINA<span style={{ color: 'var(--accent-secondary)', fontStyle: 'italic', fontWeight: 400 }}>.</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}
            className="hide-tablet"
          >
            {/* View Links */}
            <button
              onClick={() => handleNavClick('home')}
              style={{
                fontSize: '0.86rem',
                fontWeight: currentView === 'home' ? 800 : 500,
                color: currentView === 'home' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                position: 'relative',
                padding: '0.35rem 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Home
              {currentView === 'home' && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--gradient-brand)',
                    borderRadius: '2px'
                  }}
                />
              )}
            </button>

            <button
              onClick={() => handleNavClick('shop')}
              style={{
                fontSize: '0.86rem',
                fontWeight: currentView === 'shop' ? 800 : 500,
                color: currentView === 'shop' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                position: 'relative',
                padding: '0.35rem 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Shop All
              {currentView === 'shop' && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--gradient-brand)',
                    borderRadius: '2px'
                  }}
                />
              )}
            </button>

            {/* Quick Departments Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setIsMoreCategoriesOpen(!isMoreCategoriesOpen)}
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: 'var(--accent-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(197, 143, 93, 0.12)',
                  border: '1px solid rgba(197, 143, 93, 0.28)',
                  cursor: 'pointer'
                }}
              >
                <Compass size={13} />
                <span>Categories</span>
                <ChevronDown size={13} />
              </button>

              {isMoreCategoriesOpen && (
                <div
                  className="glass-panel animate-scale-up"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: 0,
                    width: '240px',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    padding: '0.5rem',
                    boxShadow: 'var(--shadow-lg)',
                    zIndex: 110,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.2rem',
                    maxHeight: '360px',
                    overflowY: 'auto'
                  }}
                >
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        textAlign: 'left',
                        borderRadius: 'var(--radius-xs)',
                        fontSize: '0.82rem',
                        fontWeight: selectedCategory === cat.id ? 800 : 500,
                        color: selectedCategory === cat.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        backgroundColor: selectedCategory === cat.id ? 'var(--bg-tertiary)' : 'transparent',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <span>{cat.name}</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{cat.count}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('track')}
              style={{
                fontSize: '0.86rem',
                fontWeight: currentView === 'track' ? 800 : 500,
                color: currentView === 'track' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                position: 'relative',
                padding: '0.35rem 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Track Flight
            </button>

            <button
              onClick={() => handleNavClick('help')}
              style={{
                fontSize: '0.86rem',
                fontWeight: currentView === 'help' ? 800 : 500,
                color: currentView === 'help' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                position: 'relative',
                padding: '0.35rem 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Help & FAQ
            </button>

            {currentUser?.role === 'admin' && (
              <button
                onClick={() => handleNavClick('admin')}
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  color: '#d97706',
                  backgroundColor: 'rgba(217, 119, 6, 0.12)',
                  border: '1px solid rgba(217, 119, 6, 0.35)',
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  cursor: 'pointer',
                  boxShadow: currentView === 'admin' ? '0 0 12px rgba(217, 119, 6, 0.3)' : 'none',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <ShieldCheck size={13} />
                <span>Admin Portal</span>
              </button>
            )}

            {!currentUser && (
              <button
                onClick={() => handleNavClick('login')}
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: currentView === 'login' ? 'var(--accent-primary)' : 'var(--text-primary)',
                  backgroundColor: currentView === 'login' ? 'rgba(92, 58, 33, 0.12)' : 'var(--bg-tertiary)',
                  border: currentView === 'login' ? '1px solid var(--accent-primary)' : '1px solid var(--border-light)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <LogIn size={13} />
                <span>Sign In</span>
              </button>
            )}
          </nav>
        </div>

        {/* Center: Live Interactive Search with Autocomplete */}
        <div
          ref={searchRef}
          style={{
            position: 'relative',
            flex: '1',
            maxWidth: '440px',
            minWidth: '160px'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-secondary)',
              border: `1px solid ${isSearchFocused ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
              borderRadius: 'var(--radius-full)',
              padding: '0.45rem 0.9rem',
              boxShadow: isSearchFocused ? '0 0 0 3px rgba(92, 58, 33, 0.14)' : 'none',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Search size={16} style={{ color: 'var(--text-muted)', marginRight: '0.6rem', flexShrink: 0 }} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search audio, laptops, titanium, streetwear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  addRecentSearch?.(searchQuery.trim());
                  setCurrentView('shop');
                  setIsSearchFocused(false);
                } else if (e.key === 'Escape') {
                  setIsSearchFocused(false);
                }
              }}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                boxShadow: 'none',
                fontSize: '0.86rem',
                color: 'var(--text-primary)',
                padding: 0
              }}
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={14} />
              </button>
            ) : (
              <kbd
                className="hide-mobile"
                onClick={() => searchInputRef.current?.focus()}
                title="Press ⌘K or / to search"
                style={{
                  fontSize: '0.66rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.38rem',
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-muted)',
                  fontFamily: 'monospace',
                  cursor: 'pointer',
                  flexShrink: 0,
                  userSelect: 'none'
                }}
              >
                ⌘K
              </kbd>
            )}
          </div>

          {/* Autocomplete Suggestions Popup or Recent Searches / Trending Drops */}
          {isSearchFocused && (
            <div
              className="glass-panel animate-scale-up"
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                right: 0,
                zIndex: 100,
                maxHeight: '380px',
                overflowY: 'auto',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)'
              }}
            >
              {searchQuery.trim().length > 0 ? (
                <>
                  <div
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      marginBottom: '0.5rem',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>Matching Drops</span>
                    <span>{matchingProducts.length} Results</span>
                  </div>

                  {matchingProducts.length === 0 ? (
                    <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                      No items matched "{searchQuery}".
                    </div>
                  ) : (
                    matchingProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          addRecentSearch?.(product.name);
                          setQuickViewProduct(product);
                          setIsSearchFocused(false);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          transition: 'background-color var(--transition-fast)'
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)')
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = 'transparent')
                        }
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          style={{
                            width: '42px',
                            height: '42px',
                            objectFit: 'cover',
                            borderRadius: 'var(--radius-xs)',
                            border: '1px solid var(--border-subtle)'
                          }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {product.name}
                          </div>
                          <div
                            style={{
                              fontSize: '0.76rem',
                              color: 'var(--accent-secondary)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem'
                            }}
                          >
                            <span>{formatPrice(product.price, currency)}</span>
                            <span style={{ color: 'var(--text-muted)' }}>• {product.category}</span>
                          </div>
                        </div>
                        <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
                      </div>
                    ))
                  )}
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', padding: '0.25rem' }}>
                  {/* Recent Searches Section */}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                        marginBottom: '0.5rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <History size={13} />
                        <span>Recent Searches</span>
                      </div>
                      {(recentSearches || []).length > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            clearRecentSearches?.();
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            fontSize: '0.72rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.2rem'
                          }}
                        >
                          <Trash2 size={11} />
                          <span>Clear</span>
                        </button>
                      )}
                    </div>

                    {(recentSearches || []).length === 0 ? (
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic', padding: '0.25rem 0' }}>
                        No recent searches saved
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                        {(recentSearches || []).map((term, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setSearchQuery(term);
                              addRecentSearch?.(term);
                              setCurrentView('shop');
                              setIsSearchFocused(false);
                            }}
                            style={{
                              padding: '0.35rem 0.65rem',
                              borderRadius: 'var(--radius-full)',
                              backgroundColor: 'var(--bg-tertiary)',
                              border: '1px solid var(--border-subtle)',
                              color: 'var(--text-secondary)',
                              fontSize: '0.78rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              transition: 'all var(--transition-fast)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = 'var(--accent-primary)';
                              e.currentTarget.style.color = 'var(--text-primary)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = 'var(--border-subtle)';
                              e.currentTarget.style.color = 'var(--text-secondary)';
                            }}
                          >
                            <History size={11} style={{ opacity: 0.6 }} />
                            <span>{term}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Trending Atelier Curations Section */}
                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: 'var(--accent-primary)',
                        marginBottom: '0.5rem'
                      }}
                    >
                      <TrendingUp size={13} />
                      <span>Trending Curations</span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                      {['Titanium Laptop', 'Acoustic Headphones', 'Cyber Matrix Phone', 'Mechanical Keyboard', 'Smart Chronograph'].map((trend, tIdx) => (
                        <button
                          key={tIdx}
                          onClick={() => {
                            setSearchQuery(trend);
                            addRecentSearch?.(trend);
                            setCurrentView('shop');
                            setIsSearchFocused(false);
                          }}
                          style={{
                            padding: '0.35rem 0.65rem',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: 'rgba(92, 58, 33, 0.08)',
                            border: '1px solid rgba(92, 58, 33, 0.25)',
                            color: 'var(--text-primary)',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            transition: 'all var(--transition-fast)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(92, 58, 33, 0.16)';
                            e.currentTarget.style.borderColor = 'var(--accent-primary)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(92, 58, 33, 0.08)';
                            e.currentTarget.style.borderColor = 'rgba(92, 58, 33, 0.25)';
                          }}
                        >
                          <Sparkles size={11} style={{ color: 'var(--accent-primary)' }} />
                          <span>{trend}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Actions (Account, Compare, Wishlist, Cart) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* User Account / Profile Trigger & Dropdown */}
          <div ref={accountMenuRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
              className="icon-btn"
              title={currentUser ? `${currentUser.name} (${currentUser.role === 'admin' ? 'Atelier Director' : currentUser.vipTier || 'Client'})` : 'Sign In / Account'}
              style={{
                backgroundColor: currentView === 'orders' || isAccountMenuOpen ? 'rgba(92, 58, 33, 0.12)' : 'var(--bg-secondary)',
                borderColor: currentView === 'orders' || isAccountMenuOpen ? 'var(--accent-primary)' : 'var(--border-subtle)',
                color: currentView === 'orders' || isAccountMenuOpen ? 'var(--accent-primary)' : 'var(--text-primary)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              {currentUser ? (
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    letterSpacing: '0.02em',
                    color: currentUser.role === 'admin' ? '#d97706' : 'var(--accent-primary)'
                  }}
                >
                  {currentUser.avatarInitials || 'U'}
                </span>
              ) : (
                <User size={18} />
              )}

              {/* Status Indicator */}
              {currentUser && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    right: '2px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: currentUser.role === 'admin' ? '#d97706' : 'var(--accent-green)',
                    boxShadow: '0 0 4px currentColor'
                  }}
                />
              )}
            </button>

            {/* Account Profile Popup Dropdown */}
            {isAccountMenuOpen && (
              <div
                className="glass-panel animate-scale-up"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: '280px',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-xl)',
                  padding: '1rem',
                  zIndex: 120,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                {currentUser ? (
                  <>
                    {/* User Identity Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
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
                          flexShrink: 0
                        }}
                      >
                        {currentUser.avatarInitials}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontWeight: 800,
                            fontSize: '0.9rem',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {currentUser.name}
                        </div>
                        <div
                          style={{
                            fontSize: '0.74rem',
                            color: 'var(--text-muted)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {currentUser.email}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem' }}>
                          <span
                            style={{
                              fontSize: '0.66rem',
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              padding: '0.1rem 0.4rem',
                              borderRadius: 'var(--radius-full)',
                              backgroundColor: currentUser.role === 'admin' ? 'rgba(217, 119, 6, 0.15)' : 'rgba(92, 58, 33, 0.12)',
                              color: currentUser.role === 'admin' ? '#d97706' : 'var(--accent-primary)',
                              border: `1px solid ${currentUser.role === 'admin' ? 'rgba(217, 119, 6, 0.3)' : 'rgba(92, 58, 33, 0.2)'}`
                            }}
                          >
                            {currentUser.role === 'admin' ? '✦ Atelier Director' : (currentUser.vipTier || 'Client')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)', margin: '0.2rem 0' }} />

                    {/* Navigation Actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <button
                        onClick={() => handleNavClick('orders')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.5rem 0.65rem',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: currentView === 'orders' ? 'var(--bg-tertiary)' : 'transparent',
                          color: 'var(--text-primary)',
                          border: 'none',
                          fontSize: '0.84rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <User size={15} style={{ color: 'var(--accent-primary)' }} />
                          My Orders & Profile
                        </span>
                        {orders.length > 0 && (
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            {orders.length} orders
                          </span>
                        )}
                      </button>

                      {currentUser.role === 'admin' && (
                        <button
                          onClick={() => handleNavClick('admin')}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 0.65rem',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: currentView === 'admin' ? 'rgba(217, 119, 6, 0.15)' : 'rgba(217, 119, 6, 0.08)',
                            color: '#d97706',
                            border: '1px solid rgba(217, 119, 6, 0.25)',
                            fontSize: '0.84rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            textAlign: 'left'
                          }}
                        >
                          <ShieldCheck size={15} />
                          Admin Control Center
                        </button>
                      )}
                    </div>

                    <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)', margin: '0.2rem 0' }} />

                    {/* Quick Demo Switcher */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        1-Click Switch Account
                      </span>
                      {currentUser.role === 'admin' ? (
                        <button
                          onClick={() => {
                            quickLoginDemo('customer');
                            setIsAccountMenuOpen(false);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            padding: '0.4rem 0.6rem',
                            borderRadius: 'var(--radius-xs)',
                            backgroundColor: 'var(--bg-tertiary)',
                            border: '1px solid var(--border-light)',
                            fontSize: '0.78rem',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer',
                            fontWeight: 600
                          }}
                        >
                          <Sparkles size={13} style={{ color: 'var(--accent-secondary)' }} />
                          Switch to VIP Customer (Alex)
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            quickLoginDemo('admin');
                            setIsAccountMenuOpen(false);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            padding: '0.4rem 0.6rem',
                            borderRadius: 'var(--radius-xs)',
                            backgroundColor: 'rgba(217, 119, 6, 0.08)',
                            border: '1px solid rgba(217, 119, 6, 0.25)',
                            fontSize: '0.78rem',
                            color: '#d97706',
                            cursor: 'pointer',
                            fontWeight: 700
                          }}
                        >
                          <ShieldCheck size={13} />
                          Switch to Admin (Sarah)
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        logout();
                        setIsAccountMenuOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.45rem',
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(239, 68, 68, 0.08)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        color: 'var(--accent-red)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        marginTop: '0.2rem'
                      }}
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.96rem', marginBottom: '0.2rem' }}>
                        Welcome to Lumina
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Sign in to track orders, save wishlists, and manage drops.
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <button
                        onClick={() => {
                          handleNavClick('login');
                        }}
                        className="btn-primary"
                        style={{
                          width: '100%',
                          padding: '0.55rem',
                          fontSize: '0.84rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.4rem'
                        }}
                      >
                        <LogIn size={15} />
                        Open Login Portal
                      </button>

                      <button
                        onClick={() => {
                          setAuthModalMode('signin');
                          setIsAuthModalOpen(true);
                          setIsAccountMenuOpen(false);
                        }}
                        className="btn-secondary"
                        style={{
                          width: '100%',
                          padding: '0.55rem',
                          fontSize: '0.84rem',
                          textAlign: 'center'
                        }}
                      >
                        Quick Pop-up Sign In
                      </button>
                    </div>

                    <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)', margin: '0.2rem 0' }} />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        Fast Demo Access
                      </span>
                      <button
                        onClick={() => {
                          quickLoginDemo('customer');
                          setIsAccountMenuOpen(false);
                        }}
                        style={{
                          padding: '0.4rem 0.6rem',
                          borderRadius: 'var(--radius-xs)',
                          backgroundColor: 'var(--bg-tertiary)',
                          border: '1px solid var(--border-light)',
                          fontSize: '0.78rem',
                          color: 'var(--text-secondary)',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        ✨ Demo Client (Alex Mercer)
                      </button>
                      <button
                        onClick={() => {
                          quickLoginDemo('admin');
                          setIsAccountMenuOpen(false);
                        }}
                        style={{
                          padding: '0.4rem 0.6rem',
                          borderRadius: 'var(--radius-xs)',
                          backgroundColor: 'rgba(217, 119, 6, 0.08)',
                          border: '1px solid rgba(217, 119, 6, 0.25)',
                          fontSize: '0.78rem',
                          color: '#d97706',
                          cursor: 'pointer',
                          fontWeight: 700,
                          textAlign: 'left'
                        }}
                      >
                        🛡️ Demo Admin (Director Sarah)
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Keyboard Shortcuts Trigger */}
          <button
            onClick={() => setIsShortcutsOpen(true)}
            className="icon-btn hide-tablet"
            title="Keyboard Shortcuts (?)"
            aria-label="Keyboard shortcuts guide"
          >
            <Command size={16} />
          </button>

          {/* Compare Button */}
          <button
            onClick={() => setIsCompareOpen(true)}
            className="icon-btn"
            title="Compare Products"
            aria-label="Compare products"
          >
            <Scale size={18} />
            {compareCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: 'var(--accent-secondary)',
                  color: '#000',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {compareCount}
              </span>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="icon-btn"
            title="Saved Wishlist"
          >
            <Heart size={18} />
            {wishlistCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: 'var(--accent-pink)',
                  color: '#fff',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-light)',
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              boxShadow: cartCount > 0 ? '0 2px 10px rgba(92, 58, 33, 0.18)' : 'none',
              transition: 'all var(--transition-fast)'
            }}
          >
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <ShoppingBag size={18} style={{ color: 'var(--accent-primary)' }} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-7px',
                    backgroundColor: 'var(--accent-primary)',
                    color: '#fff',
                    fontSize: '0.62rem',
                    fontWeight: 800,
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {cartCount}
                </span>
              )}
            </div>
            <span
              style={{
                fontWeight: 700,
                fontSize: '0.85rem'
              }}
              className="hide-mobile"
            >
              {total > 0 ? formatPrice(total, currency) : 'Bag'}
            </span>
          </button>

          {/* Mobile Menu Toggle (displayed on mobile/tablet via CSS) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="icon-btn mobile-hamburger-btn"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          className="glass-panel animate-fade-in"
          style={{
            marginTop: '0.75rem',
            padding: '1.25rem',
            backgroundColor: 'var(--bg-secondary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            borderRadius: 'var(--radius-lg)'
          }}
        >
          {/* Mobile Profile Card */}
          {currentUser ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: currentUser.role === 'admin'
                      ? 'linear-gradient(135deg, #d97706, #b45309)'
                      : 'var(--gradient-brand)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem'
                  }}
                >
                  {currentUser.avatarInitials}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{currentUser.name}</div>
                  <div style={{ fontSize: '0.72rem', color: currentUser.role === 'admin' ? '#d97706' : 'var(--accent-primary)', fontWeight: 700 }}>
                    {currentUser.role === 'admin' ? '✦ Atelier Director' : (currentUser.vipTier || 'Client')}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-red)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: '0.3rem 0.5rem'
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                gap: '0.5rem'
              }}
            >
              <button
                onClick={() => {
                  handleNavClick('login');
                }}
                className="btn-primary"
                style={{ flex: 1, padding: '0.55rem', fontSize: '0.84rem' }}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  handleNavClick('login');
                }}
                className="btn-secondary"
                style={{ flex: 1, padding: '0.55rem', fontSize: '0.84rem' }}
              >
                Register
              </button>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <button
              onClick={() => handleNavClick('home')}
              style={{
                textAlign: 'left',
                padding: '0.6rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.92rem',
                fontWeight: currentView === 'home' ? 800 : 500,
                color: currentView === 'home' ? 'var(--accent-primary)' : 'var(--text-primary)',
                background: currentView === 'home' ? 'var(--bg-tertiary)' : 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              🏠 Home
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              style={{
                textAlign: 'left',
                padding: '0.6rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.92rem',
                fontWeight: currentView === 'shop' ? 800 : 500,
                color: currentView === 'shop' ? 'var(--accent-primary)' : 'var(--text-primary)',
                background: currentView === 'shop' ? 'var(--bg-tertiary)' : 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              🛍️ Shop All Catalog
            </button>
            <button
              onClick={() => handleNavClick('orders')}
              style={{
                textAlign: 'left',
                padding: '0.6rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.92rem',
                fontWeight: currentView === 'orders' ? 800 : 500,
                color: currentView === 'orders' ? 'var(--accent-primary)' : 'var(--text-primary)',
                background: currentView === 'orders' ? 'var(--bg-tertiary)' : 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              📦 My Orders & Invoices ({orders.length})
            </button>

            {currentUser?.role === 'admin' && (
              <button
                onClick={() => handleNavClick('admin')}
                style={{
                  textAlign: 'left',
                  padding: '0.6rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  color: '#d97706',
                  background: currentView === 'admin' ? 'rgba(217, 119, 6, 0.18)' : 'rgba(217, 119, 6, 0.08)',
                  border: '1px solid rgba(217, 119, 6, 0.25)',
                  cursor: 'pointer'
                }}
              >
                🛡️ Admin Control Center
              </button>
            )}

            <button
              onClick={() => handleNavClick('track')}
              style={{
                textAlign: 'left',
                padding: '0.6rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.92rem',
                fontWeight: currentView === 'track' ? 800 : 500,
                color: currentView === 'track' ? 'var(--accent-primary)' : 'var(--text-primary)',
                background: currentView === 'track' ? 'var(--bg-tertiary)' : 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              🚀 Track Courier Flight
            </button>
            <button
              onClick={() => handleNavClick('help')}
              style={{
                textAlign: 'left',
                padding: '0.6rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.92rem',
                fontWeight: currentView === 'help' ? 800 : 500,
                color: currentView === 'help' ? 'var(--accent-primary)' : 'var(--text-primary)',
                background: currentView === 'help' ? 'var(--bg-tertiary)' : 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              💬 Help Center & Concierge
            </button>
          </div>

          <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
            DEPARTMENTS
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
            {CATEGORIES.slice(0, 8).map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                style={{
                  textAlign: 'left',
                  padding: '0.45rem 0.65rem',
                  background: selectedCategory === cat.id ? 'var(--bg-tertiary)' : 'transparent',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.8rem',
                  fontWeight: selectedCategory === cat.id ? 800 : 500,
                  color: selectedCategory === cat.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
