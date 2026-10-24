import React from 'react';
import { useStore } from '../context/StoreContext';
import { Home, ShoppingBag, Heart, Package, Search } from 'lucide-react';

export const MobileBottomNav = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    wishlistCount,
    orders,
    setIsCartOpen,
    setIsWishlistOpen
  } = useStore();

  return (
    <nav
      className="mobile-bottom-nav"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '62px',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 95,
        display: 'none', // Controlled by CSS media queries
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 0.5rem'
      }}
    >
      {/* 1. Home */}
      <button
        onClick={() => setCurrentView('home')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.2rem',
          background: 'none',
          border: 'none',
          color: currentView === 'home' ? 'var(--accent-primary)' : 'var(--text-muted)',
          fontSize: '0.68rem',
          fontWeight: currentView === 'home' ? 800 : 500,
          cursor: 'pointer',
          padding: '0.35rem 0.6rem'
        }}
      >
        <Home size={19} />
        <span>Home</span>
      </button>

      {/* 2. Shop Catalog */}
      <button
        onClick={() => setCurrentView('shop')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.2rem',
          background: 'none',
          border: 'none',
          color: currentView === 'shop' ? 'var(--accent-primary)' : 'var(--text-muted)',
          fontSize: '0.68rem',
          fontWeight: currentView === 'shop' ? 800 : 500,
          cursor: 'pointer',
          padding: '0.35rem 0.6rem'
        }}
      >
        <Search size={19} />
        <span>Shop</span>
      </button>

      {/* 3. Orders */}
      <button
        onClick={() => setCurrentView('orders')}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.2rem',
          background: 'none',
          border: 'none',
          color: currentView === 'orders' ? 'var(--accent-primary)' : 'var(--text-muted)',
          fontSize: '0.68rem',
          fontWeight: currentView === 'orders' ? 800 : 500,
          cursor: 'pointer',
          padding: '0.35rem 0.6rem'
        }}
      >
        <Package size={19} />
        <span>Orders</span>
        {orders.length > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '2px',
              right: '8px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-secondary)'
            }}
          />
        )}
      </button>

      {/* 4. Wishlist */}
      <button
        onClick={() => setIsWishlistOpen(true)}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.2rem',
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          fontSize: '0.68rem',
          fontWeight: 500,
          cursor: 'pointer',
          padding: '0.35rem 0.6rem'
        }}
      >
        <Heart size={19} />
        <span>Saved</span>
        {wishlistCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '2px',
              right: '6px',
              backgroundColor: 'var(--accent-pink)',
              color: '#fff',
              fontSize: '0.6rem',
              fontWeight: 800,
              width: '15px',
              height: '15px',
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

      {/* 5. Cart Bag */}
      <button
        onClick={() => setIsCartOpen(true)}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.2rem',
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          fontSize: '0.68rem',
          fontWeight: 500,
          cursor: 'pointer',
          padding: '0.35rem 0.6rem'
        }}
      >
        <ShoppingBag size={19} />
        <span>Bag</span>
        {cartCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '2px',
              right: '8px',
              backgroundColor: 'var(--accent-primary)',
              color: '#fff',
              fontSize: '0.6rem',
              fontWeight: 800,
              width: '15px',
              height: '15px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {cartCount}
          </span>
        )}
      </button>
    </nav>
  );
};

export default MobileBottomNav;
