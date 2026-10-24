import React, { Suspense, lazy } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { LiveActivityToast } from './components/LiveActivityToast';
import { ToastContainer } from './components/ToastContainer';
import { OfflineIndicator } from './components/OfflineIndicator';
import './App.css';

// Dynamic code-split views
const ShopCatalogView = lazy(() => import('./components/ShopCatalogView'));
const OrdersAccountView = lazy(() => import('./components/OrdersAccountView'));
const ShipmentTrackingView = lazy(() => import('./components/ShipmentTrackingView'));
const HelpCenterView = lazy(() => import('./components/HelpCenterView'));
const AdminDashboardView = lazy(() => import('./components/AdminDashboardView'));
const LoginView = lazy(() => import('./components/LoginView'));

// Dynamic code-split modals & drawers (loaded on-demand)
const ProductDetailModal = lazy(() => import('./components/ProductDetailModal'));
const CartDrawer = lazy(() => import('./components/CartDrawer'));
const WishlistDrawer = lazy(() => import('./components/WishlistDrawer'));
const CompareModal = lazy(() => import('./components/CompareModal'));
const CheckoutModal = lazy(() => import('./components/CheckoutModal'));
const OrderTrackingModal = lazy(() => import('./components/OrderTrackingModal'));
const PromoWheelModal = lazy(() => import('./components/PromoWheelModal'));
const InvoiceModal = lazy(() => import('./components/InvoiceModal'));
const KeyboardShortcutsModal = lazy(() => import('./components/KeyboardShortcutsModal'));
const AuthModal = lazy(() => import('./components/AuthModal'));
const ReturnRequestModal = lazy(() => import('./components/ReturnRequestModal'));
const RestockModal = lazy(() => import('./components/RestockModal'));
const AbandonedCartBanner = lazy(() => import('./components/AbandonedCartBanner'));

function ViewFallback() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '55vh',
        gap: '1rem',
        color: 'var(--text-secondary)'
      }}
    >
      <div
        className="spinner"
        style={{
          width: '34px',
          height: '34px',
          border: '3px solid var(--border-light)',
          borderTopColor: 'var(--accent-primary)',
          borderRadius: '50%'
        }}
      />
      <span style={{ fontSize: '0.86rem', fontWeight: 600, letterSpacing: '0.02em' }}>
        Loading LUMINA Atelier...
      </span>
    </div>
  );
}

function AppContent() {
  const { currentView, currentUser } = useStore();

  return (
    <div className="app-container">
      {/* Top Ticker with promo, currency, theme & sound toggles */}
      <AnnouncementBar />

      {/* Sticky Glassmorphic Header with autocomplete live search, view tabs, cart, wishlist, compare */}
      <Navbar />

      {/* Main Dynamic View Switching with Code-Splitting Suspense */}
      <main className="main-content">
        <Suspense fallback={<ViewFallback />}>
          {currentView === 'home' && <HomeView />}
          {currentView === 'shop' && <ShopCatalogView />}
          {currentView === 'orders' && <OrdersAccountView />}
          {currentView === 'track' && <ShipmentTrackingView />}
          {currentView === 'help' && <HelpCenterView />}
          {currentView === 'admin' && <AdminDashboardView />}
          {currentView === 'login' && <LoginView />}
        </Suspense>
      </main>

      {/* Comprehensive Trust & Policies Footer */}
      <Footer />

      {/* Native-like Mobile Bottom App Bar */}
      <MobileBottomNav />

      {/* On-Demand Modals & Drawers */}
      <Suspense fallback={null}>
        <ProductDetailModal />
        <CartDrawer />
        <WishlistDrawer />
        <CompareModal />
        <CheckoutModal key={currentUser?.id || 'guest'} />
        <OrderTrackingModal />
        <PromoWheelModal />
        <InvoiceModal />
        <KeyboardShortcutsModal />
        <AuthModal />
        <ReturnRequestModal />
        <RestockModal />
        <AbandonedCartBanner />
      </Suspense>

      {/* Engaging Dynamic Notifications & Indicators */}
      <LiveActivityToast />
      <OfflineIndicator />
      <ToastContainer />
    </div>
  );
}

export function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

export default App;
