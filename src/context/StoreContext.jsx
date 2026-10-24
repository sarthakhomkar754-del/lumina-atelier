import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { DISCOUNT_CODES, PRODUCTS } from '../data/products';
import { soundManager } from '../utils/sound';

const StoreContext = createContext(null);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

// Realistic initial demo orders if user has no orders yet
const INITIAL_DEMO_ORDERS = [
  {
    orderId: 'LUM-847291',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(), // 28 hours ago
    trackingNumber: 'DHL-AIR-948201842',
    carrier: 'DHL Express Global Air',
    trackingStatus: 'Delivered',
    estimatedDelivery: 'Yesterday, 14:30',
    shippingDetails: {
      firstName: 'Alexander',
      lastName: 'Mercer',
      email: 'alex.mercer@cyberlumina.io',
      phone: '+1 (555) 019-2834',
      address: '742 Evergreen Terrace, Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      zip: '94107',
      country: 'United States'
    },
    paymentMethod: 'card',
    cardLast4: '4242',
    items: [
      {
        cartItemId: 'lumina-blade-oled-laptop-Space Black Anodized-32GB RAM / 1TB SSD',
        id: 'lumina-blade-oled-laptop',
        product: PRODUCTS[0],
        quantity: 1,
        selectedColor: 'Space Black Anodized',
        selectedSize: '32GB RAM / 1TB SSD'
      }
    ],
    summary: {
      subtotal: 2499.00,
      discountAmount: 249.90,
      shipping: 0,
      tax: 179.93,
      total: 2429.03,
      isFreeShipping: true
    },
    trackingSteps: [
      { label: 'Order Confirmed & Payment Verified', time: 'Yesterday 09:15', completed: true },
      { label: 'Clean-Room Inspection & Tamper Seal', time: 'Yesterday 11:30', completed: true },
      { label: 'Dispatched via DHL Express Air', time: 'Yesterday 13:00', completed: true },
      { label: 'Delivered to Recipient Front Porch', time: 'Yesterday 14:30', completed: true }
    ]
  },
  {
    orderId: 'LUM-928410',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    trackingNumber: 'FDX-EXP-559281729',
    carrier: 'FedEx Priority Flight',
    trackingStatus: 'Out for Delivery',
    estimatedDelivery: 'Today by 17:00',
    shippingDetails: {
      firstName: 'Alexander',
      lastName: 'Mercer',
      email: 'alex.mercer@cyberlumina.io',
      phone: '+1 (555) 019-2834',
      address: '742 Evergreen Terrace, Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      zip: '94107',
      country: 'United States'
    },
    paymentMethod: 'applepay',
    cardLast4: '9821',
    items: [
      {
        cartItemId: 'cyber-matrix-phone-ultra-Dark Matter Black-512GB / 16GB',
        id: 'cyber-matrix-phone-ultra',
        product: PRODUCTS[1],
        quantity: 1,
        selectedColor: 'Dark Matter Black',
        selectedSize: '512GB / 16GB'
      }
    ],
    summary: {
      subtotal: 1399.00,
      discountAmount: 0,
      shipping: 0,
      tax: 111.92,
      total: 1510.92,
      isFreeShipping: true
    },
    trackingSteps: [
      { label: 'Order Confirmed', time: 'Today 06:20', completed: true },
      { label: 'Precision Packing Completed', time: 'Today 07:45', completed: true },
      { label: 'Loaded on Courier Van', time: 'Today 09:10', completed: true },
      { label: 'Out for Delivery', time: 'In Progress (Estimated 17:00)', completed: false, active: true }
    ]
  }
];

const INITIAL_SAVED_ADDRESSES = [
  {
    id: 'addr-default',
    label: 'Home (Default)',
    firstName: 'Alexander',
    lastName: 'Mercer',
    email: 'alex.mercer@cyberlumina.io',
    phone: '+1 (555) 019-2834',
    address: '742 Evergreen Terrace, Apt 4B',
    city: 'San Francisco',
    state: 'CA',
    zip: '94107',
    country: 'United States',
    isDefault: true
  },
  {
    id: 'addr-work',
    label: 'Studio / Office',
    firstName: 'Alexander',
    lastName: 'Mercer',
    email: 'alex.mercer@cyberlumina.io',
    phone: '+1 (555) 019-2834',
    address: '101 Cybernetics Boulevard, Suite 404',
    city: 'San Francisco',
    state: 'CA',
    zip: '94103',
    country: 'United States',
    isDefault: false
  }
];

export const DEFAULT_DEMO_USERS = [
  {
    id: 'user-alex',
    name: 'Alexander Mercer',
    email: 'alex.mercer@cyberlumina.io',
    password: 'password123',
    role: 'customer',
    vipTier: 'Gold Patron',
    joinedDate: 'Jan 2025',
    avatarInitials: 'AM',
    phone: '+1 (555) 019-2834',
    address: '742 Evergreen Terrace, Apt 4B',
    city: 'San Francisco',
    state: 'CA',
    zip: '94107',
    country: 'United States',
    loyaltyPoints: 1250,
    pointHistory: [
      { id: 'ph-1', date: 'Yesterday', reason: 'Order #LUM-847291 Reward', points: 2429, type: 'earned' },
      { id: 'ph-2', date: '3 days ago', reason: 'VIP Welcome Bonus', points: 250, type: 'earned' },
      { id: 'ph-3', date: '1 week ago', reason: 'Voucher Redemption (-$14.29)', points: -1429, type: 'redeemed' }
    ]
  },
  {
    id: 'user-admin-sarah',
    name: 'Sarah Vance',
    email: 'sarah.vance@lumina.luxury',
    password: 'admin123',
    role: 'admin',
    vipTier: 'Atelier Director',
    joinedDate: 'Nov 2023',
    avatarInitials: 'SV',
    phone: '+1 (555) 948-2010',
    title: 'Managing Director & Head of Curation',
    loyaltyPoints: 5000,
    pointHistory: [
      { id: 'ph-admin-1', date: 'Nov 2023', reason: 'Director Founding Allocation', points: 5000, type: 'earned' }
    ]
  }
];

export const INITIAL_DEMO_RMAS = [
  {
    id: 'RMA-84910',
    orderId: 'LUM-847291',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    customerName: 'Alexander Mercer',
    customerEmail: 'alex.mercer@cyberlumina.io',
    item: {
      id: 'lumina-blade-oled-laptop',
      name: 'Blade Pro 16" Liquid Titanium',
      color: 'Space Black Anodized',
      quantity: 1,
      price: 2499.00
    },
    reason: 'Aesthetic mismatch with workspace setup',
    resolution: 'Store Credit (+5% VIP Bonus)',
    refundAmount: 2623.95,
    status: 'Approved - Ready for Drop-off',
    returnCarrier: 'DHL Express Air Return',
    returnWaybill: 'DHL-RET-9482019',
    returnSteps: [
      { label: 'Return Authorization Created', time: '12 hours ago', completed: true },
      { label: 'Prepaid Waybill Generated', time: '11 hours ago', completed: true },
      { label: 'Courier Scan & Transit', time: 'Pending Drop-off', completed: false, active: true },
      { label: 'Clean-Room Inspection & Credit Issue', time: 'Pending', completed: false }
    ]
  }
];

export const INITIAL_RESTOCK_WAITLIST = {
  'matrix-fold-7-cybernetic': [
    { email: 'marcus.v@studio-neo.design', variant: 'Matte Titanium', requestedAt: 'Yesterday 14:20' },
    { email: 'elena.rostova@soundstage.io', variant: 'Obsidian Black', requestedAt: '2 days ago' }
  ],
  'cyber-audio-dock': [
    { email: 'kenji.t@collector-tech.jp', variant: 'Default', requestedAt: '3 days ago' }
  ]
};

export const StoreProvider = ({ children }) => {
  // Navigation & View Routing: 'home' | 'shop' | 'orders' | 'track' | 'help' | 'admin' | 'login'
  const [currentView, setCurrentViewState] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['shop', 'orders', 'track', 'help', 'home', 'admin', 'login'].includes(hash)) {
        return hash;
      }
    }
    return 'home';
  });

  // User Accounts & Authentication
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('lumina_users');
      return saved ? JSON.parse(saved) : DEFAULT_DEMO_USERS;
    } catch {
      return DEFAULT_DEMO_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('lumina_current_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.loyaltyPoints !== 'number') {
          parsed.loyaltyPoints = 1250;
        }
        if (!Array.isArray(parsed.pointHistory)) {
          parsed.pointHistory = DEFAULT_DEMO_USERS[0].pointHistory;
        }
        return parsed;
      }
      return DEFAULT_DEMO_USERS[0];
    } catch {
      return DEFAULT_DEMO_USERS[0];
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'

  // Dynamic Product Catalog (real-time admin stock/price management)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('lumina_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Dynamic Coupons (admin managed)
  const [coupons, setCoupons] = useState(() => {
    try {
      const saved = localStorage.getItem('lumina_coupons');
      return saved ? JSON.parse(saved) : DISCOUNT_CODES;
    } catch {
      return DISCOUNT_CODES;
    }
  });

  // Theme state with localStorage persistence (Default to calm, refreshing light theme)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('lumina_theme_v2');
    if (saved === 'dark' || saved === 'light') return saved;
    // Default to refreshing calm light mode
    return 'light';
  });

  // Sound effects state
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('lumina_sound') !== 'false';
  });

  // Multi-Currency
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('lumina_currency') || 'USD';
  });

  // Cart state with localStorage persistence
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('lumina_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state with localStorage persistence
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('lumina_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Compare products (up to 3)
  const [compareList, setCompareList] = useState([]);

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Orders history (persisted, pre-seeded with realistic demo history)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('lumina_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_DEMO_ORDERS;
    } catch {
      return INITIAL_DEMO_ORDERS;
    }
  });

  // Saved Addresses
  const [savedAddresses, setSavedAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('lumina_addresses');
      return saved ? JSON.parse(saved) : INITIAL_SAVED_ADDRESSES;
    } catch {
      return INITIAL_SAVED_ADDRESSES;
    }
  });

  // Recently Viewed Products
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const saved = localStorage.getItem('lumina_recently_viewed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // User Reviews state (persisted per product)
  const [userReviews, setUserReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('lumina_user_reviews');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Catalog View Mode: 'grid-4' | 'grid-3' | 'list'
  const [catalogViewMode, setCatalogViewMode] = useState(() => {
    return localStorage.getItem('lumina_view_mode') || 'grid-4';
  });

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Customer Return Requests (RMA)
  const [rmaRequests, setRmaRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('lumina_rma_requests');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_DEMO_RMAS;
    } catch {
      return INITIAL_DEMO_RMAS;
    }
  });

  // Out-of-stock Restock Waitlist { [productId]: [ { email, variant, requestedAt } ] }
  const [restockWaitlist, setRestockWaitlist] = useState(() => {
    try {
      const saved = localStorage.getItem('lumina_restock_waitlist');
      return saved ? JSON.parse(saved) : INITIAL_RESTOCK_WAITLIST;
    } catch {
      return INITIAL_RESTOCK_WAITLIST;
    }
  });

  // Recent Search Queries History
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem('lumina_recent_searches');
      return saved ? JSON.parse(saved) : ['OLED Laptop', 'ANC Headphones', 'Titanium Watch'];
    } catch {
      return ['OLED Laptop', 'ANC Headphones', 'Titanium Watch'];
    }
  });

  // Abandoned cart slide-in banner state (session based)
  const [isAbandonedCartDismissed, setIsAbandonedCartDismissed] = useState(false);

  // Modals & Drawers visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [pendingCheckout, setPendingCheckout] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isSpinWheelOpen, setIsSpinWheelOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [invoiceOrder, setInvoiceOrder] = useState(null); // When non-null, shows printable invoice modal
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [returnOrderTarget, setReturnOrderTarget] = useState(null);
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [restockModalProduct, setRestockModalProduct] = useState(null);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);

  // Sync theme with document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('lumina_theme', theme);
    localStorage.setItem('lumina_theme_v2', theme);
  }, [theme]);

  // Sync sound setting
  useEffect(() => {
    soundManager.setMuted(!soundEnabled);
    localStorage.setItem('lumina_sound', String(soundEnabled));
  }, [soundEnabled]);

  // Sync currency
  useEffect(() => {
    localStorage.setItem('lumina_currency', currency);
  }, [currency]);

  // Sync cart
  useEffect(() => {
    localStorage.setItem('lumina_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync wishlist
  useEffect(() => {
    localStorage.setItem('lumina_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync orders
  useEffect(() => {
    localStorage.setItem('lumina_orders', JSON.stringify(orders));
  }, [orders]);

  // Sync saved addresses
  useEffect(() => {
    localStorage.setItem('lumina_addresses', JSON.stringify(savedAddresses));
  }, [savedAddresses]);

  // Sync recently viewed
  useEffect(() => {
    localStorage.setItem('lumina_recently_viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  // Sync user reviews
  useEffect(() => {
    localStorage.setItem('lumina_user_reviews', JSON.stringify(userReviews));
  }, [userReviews]);

  // Sync catalog view mode
  useEffect(() => {
    localStorage.setItem('lumina_view_mode', catalogViewMode);
  }, [catalogViewMode]);

  // Sync RMAs
  useEffect(() => {
    localStorage.setItem('lumina_rma_requests', JSON.stringify(rmaRequests));
  }, [rmaRequests]);

  // Sync Restock Waitlist
  useEffect(() => {
    localStorage.setItem('lumina_restock_waitlist', JSON.stringify(restockWaitlist));
  }, [restockWaitlist]);

  // Sync Recent Searches
  useEffect(() => {
    localStorage.setItem('lumina_recent_searches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Navigation view switcher that also updates hash smoothly with optional query params
  const setCurrentView = useCallback((view, params = null) => {
    setCurrentViewState(view);
    if (typeof window !== 'undefined') {
      let hash = view;
      if (params && typeof params === 'object') {
        const query = new URLSearchParams(params).toString();
        if (query) hash += `?${query}`;
      }
      window.location.hash = hash;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Listen to window hash changes (for back/forward and deep linking)
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace(/^#\/?/, '');
      if (!rawHash) {
        setCurrentViewState('home');
        setQuickViewProduct(null);
        return;
      }

      if (rawHash.startsWith('product=') || rawHash.startsWith('product/')) {
        const prodId = rawHash.replace(/^product[=/]/, '');
        const target = PRODUCTS.find((p) => p.id === prodId);
        if (target) {
          setQuickViewProduct(target);
        }
      } else {
        // If not a product hash, ensure quickViewProduct is cleared so back button closes modal
        setQuickViewProduct(null);

        // Check if hash contains query string, e.g. shop?category=audio
        const [viewPart, queryPart] = rawHash.split('?');
        const view = viewPart.toLowerCase();

        if (['home', 'shop', 'orders', 'track', 'help', 'admin', 'login'].includes(view)) {
          setCurrentViewState(view);
          if (queryPart) {
            const params = new URLSearchParams(queryPart);
            const cat = params.get('category') || params.get('cat');
            if (cat) setSelectedCategory(cat);
            const search = params.get('q') || params.get('search');
            if (search) setSearchQuery(search);
          }
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check on load
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isAnyModalOpen = Boolean(
    isCartOpen ||
    isWishlistOpen ||
    isCompareOpen ||
    isCheckoutOpen ||
    isTrackingOpen ||
    isSpinWheelOpen ||
    isShortcutsOpen ||
    isAuthModalOpen ||
    isReturnModalOpen ||
    isRestockModalOpen ||
    quickViewProduct ||
    invoiceOrder
  );

  // Background body scroll lock
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isAnyModalOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [isAnyModalOpen]);

  // Global Keyboard shortcuts & Escape key dismiss handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      // 1. Global Spotlight Search shortcut (Ctrl+K or Cmd+K)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('lumina:focus-search'));
        return;
      }

      // 2. Escape Key dismiss priority
      if (e.key === 'Escape' || e.key === 'Esc') {
        if (invoiceOrder) {
          setInvoiceOrder(null);
        } else if (isAuthModalOpen) {
          setIsAuthModalOpen(false);
        } else if (isReturnModalOpen) {
          setIsReturnModalOpen(false);
        } else if (isRestockModalOpen) {
          setIsRestockModalOpen(false);
        } else if (isShortcutsOpen) {
          setIsShortcutsOpen(false);
        } else if (isCheckoutOpen) {
          setIsCheckoutOpen(false);
        } else if (quickViewProduct) {
          setQuickViewProduct(null);
          if (typeof window !== 'undefined' && window.location.hash.startsWith('#product')) {
            window.history.replaceState(null, '', `#${currentView}`);
          }
        } else if (isSpinWheelOpen) {
          setIsSpinWheelOpen(false);
        } else if (isTrackingOpen) {
          setIsTrackingOpen(false);
        } else if (isCompareOpen) {
          setIsCompareOpen(false);
        } else if (isWishlistOpen) {
          setIsWishlistOpen(false);
        } else if (isCartOpen) {
          setIsCartOpen(false);
        }
        return;
      }

      // 3. Single-key hotkeys (only when NOT typing in an input/textarea/editable)
      const activeEl = document.activeElement;
      const isInputActive =
        activeEl &&
        (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeEl.tagName) || activeEl.isContentEditable);

      if (isInputActive || e.metaKey || e.ctrlKey || e.altKey) {
        return;
      }

      if (e.key === '?') {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
      } else if (e.key === '/') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('lumina:focus-search'));
      } else if ((e.key === 'c' || e.key === 'C') && !isAnyModalOpen) {
        e.preventDefault();
        setIsCartOpen(true);
      } else if ((e.key === 'w' || e.key === 'W') && !isAnyModalOpen) {
        e.preventDefault();
        setIsWishlistOpen(true);
      } else if ((e.key === 'p' || e.key === 'P') && !isAnyModalOpen) {
        e.preventDefault();
        setIsSpinWheelOpen(true);
      } else if (e.key === 'h' || e.key === 'H') {
        setCurrentView('home');
      } else if (e.key === 's' || e.key === 'S') {
        setCurrentView('shop');
      } else if (e.key === 't' || e.key === 'T') {
        setCurrentView('track');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    invoiceOrder,
    isShortcutsOpen,
    isAuthModalOpen,
    isReturnModalOpen,
    isRestockModalOpen,
    isCheckoutOpen,
    quickViewProduct,
    isSpinWheelOpen,
    isTrackingOpen,
    isCompareOpen,
    isWishlistOpen,
    isCartOpen,
    isAnyModalOpen,
    currentView,
    setCurrentView
  ]);

  // Record recently viewed product
  const addToRecentlyViewed = useCallback((product) => {
    if (!product || !product.id) return;
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  }, []);

  // Clear recently viewed history
  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
    localStorage.removeItem('lumina_recently_viewed');
  }, []);

  // When quickViewProduct is selected, record it and update deep-link hash
  const handleSetQuickViewProduct = useCallback((product) => {
    setQuickViewProduct(product);
    if (product) {
      addToRecentlyViewed(product);
      if (typeof window !== 'undefined' && !window.location.hash.startsWith('#product=')) {
        window.history.replaceState(null, '', `#product=${product.id}`);
      }
    } else {
      if (typeof window !== 'undefined' && window.location.hash.startsWith('#product=')) {
        window.history.replaceState(null, '', `#${currentView}`);
      }
    }
  }, [addToRecentlyViewed, currentView]);

  // Toast helper
  const addToast = useCallback(({ title, message, type = 'info', undoAction = null, duration = 4000 }) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast = { id, title, message, type, undoAction };
    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Add a user review for a product
  const addUserReview = useCallback((productId, reviewObj) => {
    setUserReviews((prev) => {
      const existing = prev[productId] || [];
      const updated = {
        ...prev,
        [productId]: [{ helpfulCount: 0, ...reviewObj }, ...existing]
      };
      localStorage.setItem('lumina_user_reviews', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Upvote / helpful reaction on customer review
  const voteReviewHelpful = useCallback((productId, reviewId) => {
    soundManager.playPop();
    setUserReviews((prev) => {
      const existing = prev[productId] || [];
      const updated = {
        ...prev,
        [productId]: existing.map((r) =>
          r.id === reviewId ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 } : r
        )
      };
      localStorage.setItem('lumina_user_reviews', JSON.stringify(updated));
      return updated;
    });
    addToast({
      title: 'Feedback Recorded 👍',
      message: 'Thank you for helping other atelier clients!',
      type: 'info',
      duration: 2500
    });
  }, [addToast]);

  // Get all reviews for a product (combining original and community reviews)
  const getProductReviews = useCallback((product) => {
    if (!product) return [];
    const custom = userReviews[product.id] || [];
    const base = product.reviews || [];
    return [...custom, ...base];
  }, [userReviews]);

  // ==================== SELF-SERVICE RETURNS & RMA ENGINE ====================
  const requestReturn = useCallback(({ orderId, item, reason, resolution, comments = '' }) => {
    soundManager.playSuccess();
    const rmaNum = Math.floor(10000 + Math.random() * 90000);
    const waybillNum = Math.floor(1000000 + Math.random() * 9000000);
    const bonusMultiplier = resolution.includes('Store Credit') ? 1.05 : 1.0;
    const baseItemPrice = item?.product?.price || item?.price || 0;
    const qty = item?.quantity || 1;
    const refundAmount = (baseItemPrice * qty) * bonusMultiplier;

    const newRma = {
      id: `RMA-${rmaNum}`,
      orderId,
      createdAt: new Date().toISOString(),
      customerName: currentUser?.name || 'Valued Customer',
      customerEmail: currentUser?.email || 'alex.mercer@cyberlumina.io',
      item: {
        id: item?.product?.id || item?.id || 'lumina-item',
        name: item?.product?.name || item?.name || 'LUMINA Hardware Drop',
        color: item?.selectedColor || item?.color || 'Default',
        size: item?.selectedSize || item?.size || 'Standard',
        quantity: qty,
        price: baseItemPrice,
        image: item?.product?.images?.[0] || item?.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'
      },
      reason,
      resolution,
      comments,
      refundAmount,
      status: 'Approved - Ready for Drop-off',
      returnCarrier: 'DHL Express Air Return',
      returnWaybill: `DHL-RET-${waybillNum}`,
      returnSteps: [
        { label: 'Return Authorization Created', time: 'Just now', completed: true },
        { label: 'Prepaid Waybill Generated', time: 'Just now', completed: true },
        { label: 'Courier Scan & Transit', time: 'Awaiting Drop-off', completed: false, active: true },
        { label: 'Clean-Room Inspection & Credit Issue', time: 'Pending', completed: false }
      ]
    };

    setRmaRequests((prev) => {
      const updated = [newRma, ...prev];
      localStorage.setItem('lumina_rma_requests', JSON.stringify(updated));
      return updated;
    });

    addToast({
      title: 'Return Authorized! 📦',
      message: `${newRma.id} initiated. Prepaid DHL Air return slip is ready for download.`,
      type: 'success'
    });

    return newRma;
  }, [currentUser, addToast]);

  const updateRmaStatus = useCallback((rmaId, newStatus, adminNote = '') => {
    setRmaRequests((prev) => {
      const updated = prev.map((rma) => {
        if (rma.id !== rmaId) return rma;
        let steps = [...rma.returnSteps];
        if (newStatus === 'Approved - Ready for Drop-off') {
          steps[0].completed = true;
          steps[1].completed = true;
        } else if (newStatus === 'Item Received & Inspected') {
          steps[0].completed = true;
          steps[1].completed = true;
          steps[2].completed = true;
        } else if (newStatus === 'Refund Processed') {
          steps = steps.map((s) => ({ ...s, completed: true }));
        }
        return {
          ...rma,
          status: newStatus,
          adminNote: adminNote || rma.adminNote,
          returnSteps: steps
        };
      });
      localStorage.setItem('lumina_rma_requests', JSON.stringify(updated));
      return updated;
    });
    addToast({
      title: 'RMA Status Updated',
      message: `${rmaId} set to "${newStatus}".`,
      type: 'success'
    });
  }, [addToast]);

  // ==================== RESTOCK NOTIFICATION WAITLIST ====================
  const joinRestockWaitlist = useCallback((productId, email, variant = 'Default') => {
    soundManager.playSuccess();
    const cleanEmail = (email || currentUser?.email || '').trim().toLowerCase();
    if (!cleanEmail) {
      addToast({
        title: 'Email Required',
        message: 'Please provide a valid email address to receive arrival alerts.',
        type: 'warning'
      });
      return false;
    }

    setRestockWaitlist((prev) => {
      const existing = prev[productId] || [];
      if (existing.some((sub) => sub.email === cleanEmail && sub.variant === variant)) {
        addToast({
          title: 'Already on Waitlist 🔔',
          message: `You are already registered for priority restock notifications.`,
          type: 'info'
        });
        return prev;
      }
      const updated = {
        ...prev,
        [productId]: [
          ...existing,
          { email: cleanEmail, variant, requestedAt: new Date().toLocaleDateString() }
        ]
      };
      localStorage.setItem('lumina_restock_waitlist', JSON.stringify(updated));
      return updated;
    });

    addToast({
      title: 'Priority Waitlist Confirmed! 🔔',
      message: `We will notify ${cleanEmail} the second new inventory lands.`,
      type: 'success'
    });
    return true;
  }, [currentUser, addToast]);

  const notifyRestockWaitlist = useCallback((productId) => {
    const subscribers = restockWaitlist[productId] || [];
    if (subscribers.length === 0) {
      addToast({
        title: 'No Subscribers',
        message: 'No customers are currently waiting for this hardware drop.',
        type: 'info'
      });
      return;
    }
    soundManager.playSuccess();
    addToast({
      title: 'Restock Broadcast Dispatched! 🚀',
      message: `Priority drop alert sent to ${subscribers.length} waitlisted buyer(s).`,
      type: 'success'
    });
  }, [restockWaitlist, addToast]);

  // ==================== LOYALTY POINTS & VIP REWARDS ====================
  const earnPoints = useCallback((points, reason) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      loyaltyPoints: (currentUser.loyaltyPoints || 0) + points,
      pointHistory: [
        { id: `ph-${Date.now()}`, date: 'Just now', reason, points, type: 'earned' },
        ...(currentUser.pointHistory || [])
      ]
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('lumina_current_user', JSON.stringify(updatedUser));
    setRegisteredUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    soundManager.playPop();
    addToast({
      title: `+${points} LUMINA Points! 🌟`,
      message: reason,
      type: 'success'
    });
  }, [currentUser, addToast]);

  const redeemPoints = useCallback((pointsToRedeem) => {
    if (!currentUser || (currentUser.loyaltyPoints || 0) < pointsToRedeem) {
      addToast({
        title: 'Insufficient Points',
        message: 'You need more LUMINA points to claim this reward.',
        type: 'warning'
      });
      return false;
    }
    const discountVal = pointsToRedeem / 100;
    const updatedUser = {
      ...currentUser,
      loyaltyPoints: currentUser.loyaltyPoints - pointsToRedeem,
      pointHistory: [
        {
          id: `ph-${Date.now()}`,
          date: 'Just now',
          reason: `Redeemed for $${discountVal.toFixed(2)} Store Voucher`,
          points: -pointsToRedeem,
          type: 'redeemed'
        },
        ...(currentUser.pointHistory || [])
      ]
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('lumina_current_user', JSON.stringify(updatedUser));
    setRegisteredUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    soundManager.playSuccess();
    addToast({
      title: 'Voucher Unlocked! 🎟️',
      message: `Redeemed ${pointsToRedeem} points for a $${discountVal.toFixed(2)} checkout credit.`,
      type: 'success'
    });
    return discountVal;
  }, [currentUser, addToast]);

  // ==================== RECENT SEARCHES & ABANDONED CART ====================
  const addRecentSearch = useCallback((term) => {
    const clean = term.trim();
    if (!clean) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== clean.toLowerCase());
      const updated = [clean, ...filtered].slice(0, 6);
      localStorage.setItem('lumina_recent_searches', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem('lumina_recent_searches');
  }, []);

  const dismissAbandonedCart = useCallback(() => {
    setIsAbandonedCartDismissed(true);
  }, []);

  const toggleTheme = useCallback(() => {
    soundManager.playClick();
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundManager.setMuted(!next);
      if (next) soundManager.playPop();
      return next;
    });
  }, []);

  // Cart operations
  const addToCart = useCallback((product, quantity = 1, selectedColor = null, selectedSize = null) => {
    soundManager.playPop();
    const color = selectedColor || (product.colors && product.colors[0]?.name) || 'Default';
    const size = selectedSize || (product.sizes && product.sizes[0]) || 'Standard';
    const cartItemId = `${product.id}-${color}-${size}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prevCart.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevCart,
        {
          cartItemId,
          id: product.id,
          product,
          quantity,
          selectedColor: color,
          selectedSize: size,
          addedAt: Date.now()
        }
      ];
    });

    addToast({
      title: 'Added to Bag',
      message: `${quantity}x ${product.name} (${color})`,
      type: 'success'
    });
  }, [addToast]);

  const removeFromCart = useCallback((cartItemId) => {
    soundManager.playRemove();
    const itemToRemove = cart.find((item) => item.cartItemId === cartItemId);
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));

    if (itemToRemove) {
      addToast({
        title: 'Item Removed',
        message: `${itemToRemove.product.name} removed from your bag.`,
        type: 'warning',
        undoAction: () => {
          setCart((prev) => [...prev, itemToRemove]);
          soundManager.playPop();
        }
      });
    }
  }, [cart, addToast]);

  const updateCartQuantity = useCallback((cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    soundManager.playClick();
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Wishlist operations
  const toggleWishlist = useCallback((product) => {
    const isSaved = wishlist.some((item) => item.id === product.id);
    if (isSaved) {
      soundManager.playRemove();
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      addToast({
        title: 'Removed from Wishlist',
        message: `${product.name} removed`,
        type: 'info'
      });
    } else {
      soundManager.playPop();
      setWishlist((prev) => [...prev, product]);
      addToast({
        title: 'Saved to Wishlist ❤️',
        message: `${product.name} saved to your collection!`,
        type: 'success'
      });
    }
  }, [wishlist, addToast]);

  const isInWishlist = useCallback((productId) => {
    return wishlist.some((item) => item.id === productId);
  }, [wishlist]);

  // Compare operations
  const toggleCompare = useCallback((product) => {
    soundManager.playClick();
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        addToast({ title: 'Removed from Compare', message: product.name, type: 'info' });
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        addToast({
          title: 'Compare Limit Reached',
          message: 'You can compare up to 3 products at a time.',
          type: 'warning'
        });
        return prev;
      }
      addToast({
        title: 'Added to Compare ⚖️',
        message: `${product.name} added to comparison`,
        type: 'success'
      });
      return [...prev, product];
    });
  }, [addToast]);

  const isInCompare = useCallback((productId) => {
    return compareList.some((p) => p.id === productId);
  }, [compareList]);

  // Coupon operations
  const applyCoupon = useCallback((code) => {
    const cleanCode = code.trim().toUpperCase();
    const activeRule = coupons[cleanCode] || DISCOUNT_CODES[cleanCode];
    if (activeRule) {
      soundManager.playSuccess();
      setAppliedCoupon({
        code: cleanCode,
        ...activeRule
      });
      addToast({
        title: 'Coupon Applied! 🎉',
        message: `${cleanCode}: ${activeRule.label}`,
        type: 'success'
      });
      return true;
    } else {
      soundManager.playRemove();
      addToast({
        title: 'Invalid Promo Code',
        message: `Code "${cleanCode}" was not found or has expired. Try VIBE20, DROP10, or FREESHIP.`,
        type: 'error'
      });
      return false;
    }
  }, [coupons, addToast]);

  const removeCoupon = useCallback(() => {
    soundManager.playClick();
    setAppliedCoupon(null);
    addToast({ title: 'Promo Code Removed', message: 'Discount removed from bag', type: 'info' });
  }, [addToast]);

  // Totals calculations
  const calculateCartTotals = useCallback(() => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    let discountAmount = 0;
    let isFreeShipping = subtotal >= 99;

    if (appliedCoupon) {
      if (appliedCoupon.discount === 'free_shipping') {
        isFreeShipping = true;
      } else if (appliedCoupon.fixed) {
        if (subtotal >= 200) {
          discountAmount = appliedCoupon.discount;
        }
      } else {
        discountAmount = subtotal * appliedCoupon.discount;
      }
    }

    const shipping = subtotal === 0 || isFreeShipping ? 0 : 15.0;
    const taxableAmount = Math.max(0, subtotal - discountAmount);
    const tax = taxableAmount * 0.08; // 8% estimated tax
    const total = taxableAmount + shipping + tax;

    return {
      subtotal,
      discountAmount,
      shipping,
      tax,
      total,
      isFreeShipping,
      amountUntilFreeShipping: Math.max(0, 99 - subtotal)
    };
  }, [cart, appliedCoupon]);

  // Orders creation
  const placeOrder = useCallback((orderData) => {
    soundManager.playSuccess();
    const orderIdNum = Math.floor(100000 + Math.random() * 900000);
    const trackingCodeNum = Math.floor(100000000 + Math.random() * 900000000);
    const newOrder = {
      orderId: `LUM-${orderIdNum}`,
      createdAt: new Date().toISOString(),
      trackingNumber: `DHL-EXP-${trackingCodeNum}`,
      carrier: 'DHL Express Global Air',
      trackingStatus: 'Processing Order',
      estimatedDelivery: '2-3 Business Days',
      items: [...cart],
      summary: calculateCartTotals(),
      shippingDetails: orderData.shipping,
      paymentMethod: orderData.paymentMethod || 'card',
      cardLast4: orderData.cardLast4 || '4242',
      customerNotes: orderData.notes || '',
      userId: currentUser?.id || 'guest',
      customerName: currentUser?.name || `${orderData.shipping?.firstName || ''} ${orderData.shipping?.lastName || ''}`.trim() || 'Valued Customer',
      customerEmail: currentUser?.email || orderData.shipping?.email || '',
      trackingSteps: [
        { label: 'Order Confirmed & Payment Verified', time: 'Just now', completed: true },
        { label: 'Quality Verification & Packing', time: 'In Queue', completed: false },
        { label: 'Handed to Express Courier Air', time: 'Pending', completed: false },
        { label: 'Out for Delivery', time: 'Pending', completed: false }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);

    // Automatically award 1 loyalty point per $1 spent on purchase
    const earnedPoints = Math.max(10, Math.round(newOrder.summary.total));
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        loyaltyPoints: (currentUser.loyaltyPoints || 0) + earnedPoints,
        pointHistory: [
          {
            id: `ph-${Date.now()}`,
            date: 'Just now',
            reason: `Earned on Order #${newOrder.orderId}`,
            points: earnedPoints,
            type: 'earned'
          },
          ...(currentUser.pointHistory || [])
        ]
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('lumina_current_user', JSON.stringify(updatedUser));
      setRegisteredUsers((prevUsers) => {
        const up = prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u));
        localStorage.setItem('lumina_users', JSON.stringify(up));
        return up;
      });
      addToast({
        title: `+${earnedPoints} VIP Points Earned! 🌟`,
        message: 'Credited to your LUMINA rewards ledger.',
        type: 'success'
      });
    }

    return newOrder;
  }, [cart, calculateCartTotals, clearCart, currentUser, addToast]);

  // Reorder all items from a past order
  const reorderPastOrder = useCallback((pastOrder) => {
    if (!pastOrder || !pastOrder.items) return;
    pastOrder.items.forEach((item) => {
      addToCart(item.product, item.quantity, item.selectedColor, item.selectedSize);
    });
    setIsCartOpen(true);
    addToast({
      title: 'Order Items Restocked! 🛍️',
      message: `${pastOrder.items.length} items added back into your bag.`,
      type: 'success'
    });
  }, [addToCart, addToast]);

  // ==================== USER AUTHENTICATION ====================
  const register = useCallback(({ name, email, password, role = 'customer' }) => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      addToast({
        title: 'Account Already Exists',
        message: 'A client profile with this email already exists. Please sign in.',
        type: 'warning'
      });
      return false;
    }
    const initials = name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0]?.toUpperCase())
      .slice(0, 2)
      .join('') || 'CU';

    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      password,
      role: role === 'admin' ? 'admin' : 'customer',
      vipTier: role === 'admin' ? 'Atelier Director' : 'Silver Member',
      joinedDate: 'Just now',
      avatarInitials: initials,
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: 'United States'
    };

    const updated = [...registeredUsers, newUser];
    setRegisteredUsers(updated);
    localStorage.setItem('lumina_users', JSON.stringify(updated));
    setCurrentUser(newUser);
    localStorage.setItem('lumina_current_user', JSON.stringify(newUser));
    setIsAuthModalOpen(false);

    soundManager.playSuccess();
    addToast({
      title: `Welcome, ${newUser.name}!`,
      message: role === 'admin' ? 'Admin credentials authorized. Control portal unlocked.' : 'Your client atelier account has been created.',
      type: 'success'
    });

    if (pendingCheckout) {
      setPendingCheckout(false);
      setIsCheckoutOpen(true);
      setCurrentView('shop');
      addToast({
        title: `Welcome, ${newUser.name.split(' ')[0]}!`,
        message: 'Resuming your Amazon-style secure checkout...',
        type: 'success'
      });
    } else if (currentView === 'login') {
      setCurrentView('shop');
    }

    return true;
  }, [registeredUsers, pendingCheckout, currentView, setCurrentView, addToast]);

  const login = useCallback((email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const user = registeredUsers.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === password
    );

    if (!user) {
      addToast({
        title: 'Authentication Failed',
        message: 'Invalid email address or passcode. Try the 1-click demo logins.',
        type: 'error'
      });
      soundManager.playRemove();
      return false;
    }

    setCurrentUser(user);
    localStorage.setItem('lumina_current_user', JSON.stringify(user));
    setIsAuthModalOpen(false);
    soundManager.playSuccess();
    addToast({
      title: `Welcome Back, ${user.name}`,
      message: user.role === 'admin' ? 'Authorized as Atelier Director. Full control granted.' : 'Logged into your client profile. Opening product dashboard...',
      type: 'success'
    });

    if (pendingCheckout) {
      setPendingCheckout(false);
      setIsCheckoutOpen(true);
      setCurrentView('shop');
      addToast({
        title: `Welcome Back, ${user.name.split(' ')[0]}!`,
        message: 'Resuming your Amazon-style secure checkout...',
        type: 'success'
      });
    } else if (currentView === 'login') {
      setCurrentView('shop');
    }

    return true;
  }, [registeredUsers, pendingCheckout, currentView, setCurrentView, addToast]);

  const quickLoginDemo = useCallback((targetRole = 'customer') => {
    const demoUser = registeredUsers.find((u) => u.role === targetRole) || DEFAULT_DEMO_USERS.find((u) => u.role === targetRole);
    if (demoUser) {
      setCurrentUser(demoUser);
      localStorage.setItem('lumina_current_user', JSON.stringify(demoUser));
      setIsAuthModalOpen(false);
      soundManager.playSuccess();
      addToast({
        title: targetRole === 'admin' ? 'Director Mode Activated' : 'Customer Profile Active',
        message: targetRole === 'admin' ? 'Signed in as Sarah Vance (Atelier Director)' : 'Signed in as Alexander Mercer (VIP Gold). Opening product dashboard...',
        type: 'success'
      });

      if (pendingCheckout) {
        setPendingCheckout(false);
        setIsCheckoutOpen(true);
        setCurrentView('shop');
        addToast({
          title: `Welcome, ${demoUser.name.split(' ')[0]}!`,
          message: 'Resuming your Amazon-style secure checkout...',
          type: 'success'
        });
      } else if (currentView === 'login') {
        setCurrentView('shop');
      }
    }
  }, [registeredUsers, pendingCheckout, currentView, setCurrentView, addToast]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('lumina_current_user');
    if (currentView === 'admin') {
      setCurrentView('home');
    }
    soundManager.playClick();
    addToast({
      title: 'Signed Out',
      message: 'You have been safely disconnected from your atelier session.',
      type: 'info'
    });
  }, [currentView, setCurrentView, addToast]);

  // Amazon-Style Mandatory Login Gate for Buying
  const startCheckout = useCallback(() => {
    if (!currentUser) {
      setPendingCheckout(true);
      setCurrentView('login');
      addToast({
        title: 'Sign In Required to Buy 🔒',
        message: 'Like Amazon, please sign in or create an account to proceed to checkout and buy products.',
        type: 'info'
      });
      return false;
    }
    setIsCheckoutOpen(true);
    return true;
  }, [currentUser, setCurrentView, addToast]);

  // ==================== STORE & INVENTORY MANAGEMENT (ADMIN) ====================
  const updateProductStock = useCallback((productId, newStock) => {
    setProducts((prev) => {
      const updated = prev.map((p) =>
        p.id === productId ? { ...p, inStock: Math.max(0, Number(newStock)) } : p
      );
      localStorage.setItem('lumina_products', JSON.stringify(updated));
      return updated;
    });
    addToast({ title: 'Stock Updated', message: 'Inventory levels synchronized.', type: 'success' });
  }, [addToast]);

  const updateProductPrice = useCallback((productId, newPrice) => {
    setProducts((prev) => {
      const updated = prev.map((p) =>
        p.id === productId ? { ...p, price: Math.max(1, Number(newPrice)) } : p
      );
      localStorage.setItem('lumina_products', JSON.stringify(updated));
      return updated;
    });
    addToast({ title: 'Price Updated', message: 'Live catalog pricing adjusted.', type: 'success' });
  }, [addToast]);

  const toggleProductFeatured = useCallback((productId) => {
    setProducts((prev) => {
      const updated = prev.map((p) =>
        p.id === productId ? { ...p, featured: !p.featured } : p
      );
      localStorage.setItem('lumina_products', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addProduct = useCallback((newProduct) => {
    setProducts((prev) => {
      const updated = [newProduct, ...prev];
      localStorage.setItem('lumina_products', JSON.stringify(updated));
      return updated;
    });
    addToast({ title: 'Drop Launched', message: `${newProduct.name} is now live in catalog.`, type: 'success' });
  }, [addToast]);

  const deleteProduct = useCallback((productId) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== productId);
      localStorage.setItem('lumina_products', JSON.stringify(updated));
      return updated;
    });
    addToast({ title: 'Product Archived', message: 'Item removed from active drops.', type: 'info' });
  }, [addToast]);

  // ==================== ORDER FULFILLMENT (ADMIN) ====================
  const updateOrderStatus = useCallback((orderId, newStatus) => {
    setOrders((prev) => {
      const updated = prev.map((order) => {
        if (order.orderId !== orderId) return order;
        let newSteps = [...(order.trackingSteps || [])];
        if (newStatus === 'Delivered') {
          newSteps = newSteps.map((s) => ({ ...s, completed: true }));
        } else if (newStatus === 'Out for Delivery') {
          newSteps = newSteps.map((s, idx) => ({ ...s, completed: idx <= 2 }));
        } else if (newStatus === 'Dispatched via Air') {
          newSteps = newSteps.map((s, idx) => ({ ...s, completed: idx <= 1 }));
        }
        return {
          ...order,
          trackingStatus: newStatus,
          trackingSteps: newSteps
        };
      });
      localStorage.setItem('lumina_orders', JSON.stringify(updated));
      return updated;
    });
    addToast({ title: 'Fulfillment Updated', message: `Order ${orderId} set to "${newStatus}".`, type: 'success' });
  }, [addToast]);

  // ==================== PROMO ENGINE (ADMIN) ====================
  const addCoupon = useCallback((code, couponData) => {
    const upperCode = code.trim().toUpperCase();
    setCoupons((prev) => {
      const updated = { ...prev, [upperCode]: couponData };
      localStorage.setItem('lumina_coupons', JSON.stringify(updated));
      return updated;
    });
    addToast({ title: 'Coupon Created', message: `Code ${upperCode} is now active at checkout.`, type: 'success' });
  }, [addToast]);

  const deleteCoupon = useCallback((code) => {
    setCoupons((prev) => {
      const copy = { ...prev };
      delete copy[code];
      localStorage.setItem('lumina_coupons', JSON.stringify(copy));
      return copy;
    });
    addToast({ title: 'Coupon Deactivated', message: `Code ${code} removed.`, type: 'info' });
  }, [addToast]);

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
  const wishlistCount = wishlist.length;
  const compareCount = compareList.length;

  return (
    <StoreContext.Provider
      value={{
        // View Routing
        currentView,
        setCurrentView,
        catalogViewMode,
        setCatalogViewMode,
        // Theme & Audio
        theme,
        toggleTheme,
        soundEnabled,
        toggleSound,
        currency,
        setCurrency,
        // Cart
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        calculateCartTotals,
        // Wishlist
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
        // Compare
        compareList,
        toggleCompare,
        isInCompare,
        compareCount,
        setCompareList,
        // Coupons
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        // Orders & Tracking
        orders,
        placeOrder,
        reorderPastOrder,
        savedAddresses,
        setSavedAddresses,
        recentlyViewed,
        addToRecentlyViewed,
        clearRecentlyViewed,
        userReviews,
        addUserReview,
        voteReviewHelpful,
        getProductReviews,
        invoiceOrder,
        setInvoiceOrder,
        // Self-Service Returns (RMA)
        rmaRequests,
        requestReturn,
        updateRmaStatus,
        isReturnModalOpen,
        setIsReturnModalOpen,
        returnOrderTarget,
        setReturnOrderTarget,
        // Out-of-Stock Restock Waitlist
        restockWaitlist,
        joinRestockWaitlist,
        notifyRestockWaitlist,
        isRestockModalOpen,
        setIsRestockModalOpen,
        restockModalProduct,
        setRestockModalProduct,
        // Loyalty Rewards & VIP Points
        earnPoints,
        redeemPoints,
        // Recent Search History & Abandoned Cart
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
        isAbandonedCartDismissed,
        dismissAbandonedCart,
        // Toasts
        toasts,
        addToast,
        removeToast,
        // Drawers / Modals
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCompareOpen,
        setIsCompareOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        pendingCheckout,
        setPendingCheckout,
        startCheckout,
        isTrackingOpen,
        setIsTrackingOpen,
        isSpinWheelOpen,
        setIsSpinWheelOpen,
        isShortcutsOpen,
        setIsShortcutsOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        quickViewProduct,
        setQuickViewProduct: handleSetQuickViewProduct,
        // Authentication & User Profiles
        currentUser,
        setCurrentUser,
        registeredUsers,
        login,
        register,
        logout,
        quickLoginDemo,
        // Catalog & Inventory Management
        products,
        updateProductStock,
        updateProductPrice,
        toggleProductFeatured,
        addProduct,
        deleteProduct,
        // Order Fulfillment (Admin)
        updateOrderStatus,
        // Promo Engine
        coupons,
        addCoupon,
        deleteCoupon,
        // Filter & Search
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy,
        inStockOnly,
        setInStockOnly,
        minRating,
        setMinRating
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
