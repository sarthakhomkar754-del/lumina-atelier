import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/currency';
import {
  ShieldAlert,
  ShieldCheck,
  Package,
  Layers,
  Tag,
  TrendingUp,
  Truck,
  Plus,
  Trash2,
  AlertTriangle,
  Search,
  LogOut,
  ShoppingBag,
  X,
  RotateCcw,
  BellRing,
  CheckCircle2,
  Send,
  Mail
} from 'lucide-react';

export const AdminDashboardView = () => {
  const {
    currentUser,
    setCurrentView,
    quickLoginDemo,
    logout,
    orders,
    updateOrderStatus,
    products,
    updateProductStock,
    updateProductPrice,
    toggleProductFeatured,
    addProduct,
    deleteProduct,
    coupons,
    addCoupon,
    deleteCoupon,
    currency,
    rmaRequests = [],
    updateRmaStatus,
    restockWaitlist = {},
    notifyRestockWaitlist
  } = useStore();

  const [activeTab, setActiveTab] = useState('orders'); // 'overview' | 'orders' | 'inventory' | 'promos' | 'returns' | 'waitlists'
  const [productSearch, setProductSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [rmaStatusFilter, setRmaStatusFilter] = useState('all');
  const [waitlistSearch, setWaitlistSearch] = useState('');

  // New Product Modal / Form State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    tagline: '',
    category: 'computing',
    price: 999,
    originalPrice: 1199,
    inStock: 10,
    featured: false,
    badge: 'NEW DROP',
    images: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
    colors: 'Matte Titanium, Obsidian Black',
    sizes: 'Standard Spec'
  });

  // New Coupon Form State
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('25'); // 25% or fixed
  const [newCouponType, setNewCouponType] = useState('percent'); // 'percent' | 'fixed'
  const [newCouponLabel, setNewCouponLabel] = useState('');

  // 1. Guard check: Must be admin
  const isAdmin = currentUser?.role === 'admin';

  if (!isAdmin) {
    return (
      <div
        style={{
          maxWidth: '680px',
          margin: '5rem auto',
          padding: '2.5rem',
          textAlign: 'center',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          boxShadow: 'var(--shadow-xl)'
        }}
        className="glass-panel"
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'rgba(244, 63, 94, 0.12)',
            color: '#f43f5e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto'
          }}
        >
          <ShieldAlert size={32} />
        </div>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Restricted Atelier Portal
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.75rem', lineHeight: 1.6 }}>
          Administrative privileges required. You are currently browsing as a guest or standard client account.
          Authenticate with director credentials to manage inventory and fulfillment.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => quickLoginDemo('admin')}
            className="btn-primary"
            style={{ padding: '0.75rem 1.5rem', fontSize: '0.88rem' }}
          >
            <ShieldCheck size={16} />
            <span>Switch to Atelier Director (Demo Admin)</span>
          </button>

          <button
            onClick={() => setCurrentView('home')}
            className="btn-secondary"
            style={{ padding: '0.75rem 1.25rem', fontSize: '0.88rem' }}
          >
            <span>Return to Store</span>
          </button>
        </div>
      </div>
    );
  }

  // Analytics derivations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.summary?.total || 0), 0);
  const activeOrders = orders.filter((o) => o.trackingStatus !== 'Delivered');
  const deliveredOrders = orders.filter((o) => o.trackingStatus === 'Delivered');
  const lowStockProducts = (products || []).filter((p) => (p.inStock || 0) <= 3);

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter === 'all') return true;
    if (orderStatusFilter === 'active') return o.trackingStatus !== 'Delivered';
    if (orderStatusFilter === 'delivered') return o.trackingStatus === 'Delivered';
    return true;
  });

  // Filtered products
  const filteredProducts = (products || []).filter((p) => {
    if (!productSearch.trim()) return true;
    const q = productSearch.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name.trim()) return;

    const created = {
      id: `custom-${Date.now()}`,
      name: newProduct.name,
      tagline: newProduct.tagline || 'Custom Atelier Release',
      category: newProduct.category,
      price: Number(newProduct.price) || 299,
      originalPrice: Number(newProduct.originalPrice) || Number(newProduct.price) * 1.2,
      inStock: Number(newProduct.inStock) || 5,
      featured: Boolean(newProduct.featured),
      badge: newProduct.badge || 'NEW DROP',
      badgeType: 'brand',
      rating: 5.0,
      reviewCount: 1,
      images: [newProduct.images],
      colors: newProduct.colors.split(',').map((c) => ({
        name: c.trim(),
        hex: '#18181b',
        bg: '#000000'
      })),
      sizes: newProduct.sizes.split(',').map((s) => s.trim()),
      description: 'Exclusive custom release curated by the LUMINA Atelier director board.',
      specs: { 'Release': 'Director Signature Drop' },
      reviews: []
    };

    addProduct(created);
    setShowAddProductModal(false);
    setNewProduct({
      name: '',
      tagline: '',
      category: 'computing',
      price: 999,
      originalPrice: 1199,
      inStock: 10,
      featured: false,
      badge: 'NEW DROP',
      images: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      colors: 'Matte Titanium, Obsidian Black',
      sizes: 'Standard Spec'
    });
  };

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    const cleanCode = newCouponCode.trim().toUpperCase();
    const discountVal = Number(newCouponDiscount);

    if (newCouponType === 'percent') {
      addCoupon(cleanCode, {
        discount: discountVal / 100,
        label: newCouponLabel || `${discountVal}% OFF Everything`
      });
    } else {
      addCoupon(cleanCode, {
        discount: discountVal,
        fixed: true,
        label: newCouponLabel || `$${discountVal} OFF Order`
      });
    }

    setNewCouponCode('');
    setNewCouponLabel('');
  };

  return (
    <div
      style={{
        maxWidth: '1360px',
        margin: '2rem auto 5rem auto',
        padding: '0 1.25rem'
      }}
    >
      {/* Top Admin Header Bar */}
      <div
        className="glass-panel"
        style={{
          padding: '1.5rem 2rem',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-light)',
          marginBottom: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              backgroundColor: 'var(--accent-primary)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.35rem',
              boxShadow: '0 4px 14px rgba(92, 58, 33, 0.28)'
            }}
          >
            🛡️
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>Atelier Control Center</h2>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(92, 58, 33, 0.15)',
                  color: 'var(--accent-primary)',
                  border: '1px solid rgba(92, 58, 33, 0.3)'
                }}
              >
                Director Access
              </span>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Logged in as <strong>{currentUser?.name}</strong> • Store Management & Fulfillment
            </div>
          </div>
        </div>

        {/* Header Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <button
            onClick={() => setCurrentView('shop')}
            className="btn-secondary"
            style={{ padding: '0.55rem 1.15rem', fontSize: '0.84rem' }}
          >
            <ShoppingBag size={15} />
            <span>View Storefront</span>
          </button>

          <button
            onClick={logout}
            className="btn-secondary"
            style={{ padding: '0.55rem 1rem', fontSize: '0.84rem', color: '#f43f5e' }}
            title="Disconnect Administrator Session"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: '2rem',
          overflowX: 'auto',
          paddingBottom: '0.25rem'
        }}
      >
        {[
          { id: 'orders', label: `Order Fulfillment (${orders.length})`, icon: <Truck size={16} /> },
          { id: 'returns', label: `Returns & RMAs (${(rmaRequests || []).length})`, icon: <RotateCcw size={16} /> },
          { id: 'waitlists', label: `Restock Waitlists (${Object.values(restockWaitlist || {}).reduce((acc, l) => acc + (l?.length || 0), 0)})`, icon: <BellRing size={16} /> },
          { id: 'inventory', label: `Inventory & Drops (${(products || []).length})`, icon: <Layers size={16} /> },
          { id: 'promos', label: `Promo Engine (${Object.keys(coupons || {}).length})`, icon: <Tag size={16} /> },
          { id: 'overview', label: 'Executive Analytics', icon: <TrendingUp size={16} /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              paddingBottom: '0.85rem',
              fontSize: '0.9rem',
              fontWeight: activeTab === tab.id ? 800 : 500,
              color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-muted)',
              borderBottom: activeTab === tab.id ? '2px solid var(--accent-primary)' : '2px solid transparent',
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ==================== TAB 1: ORDER FULFILLMENT ==================== */}
      {activeTab === 'orders' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Filter Toolbar */}
          <div
            className="glass-panel"
            style={{
              padding: '1rem 1.5rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                Filter Queue:
              </span>
              {[
                { id: 'all', label: `All Orders (${orders.length})` },
                { id: 'active', label: `In Transit (${activeOrders.length})` },
                { id: 'delivered', label: `Completed (${deliveredOrders.length})` }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setOrderStatusFilter(filter.id)}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.78rem',
                    fontWeight: orderStatusFilter === filter.id ? 800 : 500,
                    backgroundColor: orderStatusFilter === filter.id ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                    color: orderStatusFilter === filter.id ? '#ffffff' : 'var(--text-secondary)',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer'
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Advance client orders through the global courier pipeline
            </div>
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div
              className="glass-panel"
              style={{ padding: '3rem', textAlign: 'center', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-secondary)' }}
            >
              <Package size={42} style={{ color: 'var(--text-muted)', margin: '0 auto 0.75rem auto' }} />
              <h4>No orders in this filter queue</h4>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const isDelivered = order.trackingStatus === 'Delivered';

              return (
                <div
                  key={order.orderId}
                  className="glass-panel"
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-light)',
                    overflow: 'hidden'
                  }}
                >
                  {/* Order Top Bar */}
                  <div
                    style={{
                      padding: '1.25rem 1.5rem',
                      backgroundColor: 'var(--bg-card)',
                      borderBottom: '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <span style={{ fontSize: '1.05rem', fontWeight: 800 }}>{order.orderId}</span>
                        <span
                          style={{
                            padding: '0.25rem 0.65rem',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            backgroundColor: isDelivered ? 'rgba(16, 185, 129, 0.15)' : 'rgba(217, 119, 6, 0.15)',
                            color: isDelivered ? '#10b981' : '#d97706',
                            border: `1px solid ${isDelivered ? 'rgba(16, 185, 129, 0.3)' : 'rgba(217, 119, 6, 0.3)'}`
                          }}
                        >
                          {order.trackingStatus}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        Customer: <strong>{order.shippingDetails?.firstName} {order.shippingDetails?.lastName}</strong> ({order.shippingDetails?.email})
                      </div>
                    </div>

                    {/* Order Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          Total Value
                        </div>
                        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>
                          {formatPrice(order.summary?.total || 0, currency)}
                        </div>
                      </div>

                      {/* Status Action Selector */}
                      <select
                        value={order.trackingStatus}
                        onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                        style={{
                          padding: '0.45rem 0.85rem',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--bg-tertiary)',
                          border: '1px solid var(--accent-primary)',
                          color: 'var(--text-primary)',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="Confirmed & Processing">Confirmed & Processing</option>
                        <option value="Dispatched via Air">Dispatched via Air</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered (Completed)</option>
                      </select>
                    </div>
                  </div>

                  {/* Items and Address preview */}
                  <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between' }}>
                    <div style={{ flex: '1', minWidth: '260px' }}>
                      <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
                        Ordered Items ({order.items?.length || 0})
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {order.items?.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <img
                              src={item.product?.images?.[0]}
                              alt=""
                              style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '4px' }}
                            />
                            <div style={{ fontSize: '0.82rem' }}>
                              <div style={{ fontWeight: 700 }}>{item.product?.name}</div>
                              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                                {item.quantity} × {formatPrice(item.product?.price || 0, currency)} • {item.selectedColor}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ flex: '1', minWidth: '240px', borderLeft: '1px solid var(--border-subtle)', paddingLeft: '1.5rem' }}>
                      <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.45rem' }}>
                        Shipping Address
                      </div>
                      <div style={{ fontSize: '0.82rem', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
                        <div>{order.shippingDetails?.address}</div>
                        <div>{order.shippingDetails?.city}, {order.shippingDetails?.state} {order.shippingDetails?.zip}</div>
                        <div>{order.shippingDetails?.country}</div>
                        <div style={{ marginTop: '0.35rem', color: 'var(--text-muted)' }}>Phone: {order.shippingDetails?.phone}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ==================== TAB: RETURNS & RMA PORTAL ==================== */}
      {activeTab === 'returns' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Quick Metrics Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem'
            }}
          >
            <div
              className="glass-panel"
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)'
              }}
            >
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                Total RMA Claims
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.35rem', color: 'var(--text-primary)' }}>
                {(rmaRequests || []).length}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                All-time customer returns
              </div>
            </div>

            <div
              className="glass-panel"
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid rgba(245, 158, 11, 0.3)'
              }}
            >
              <div style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: 700, textTransform: 'uppercase' }}>
                Pending Authorization
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.35rem', color: '#f59e0b' }}>
                {(rmaRequests || []).filter((r) => r.status === 'Pending Approval').length}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Requires director review
              </div>
            </div>

            <div
              className="glass-panel"
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid rgba(59, 130, 246, 0.3)'
              }}
            >
              <div style={{ fontSize: '0.78rem', color: '#3b82f6', fontWeight: 700, textTransform: 'uppercase' }}>
                In Return Transit
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.35rem', color: '#3b82f6' }}>
                {(rmaRequests || []).filter((r) => r.status.includes('Approved') || r.status.includes('Transit')).length}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Prepaid DHL air waybill issued
              </div>
            </div>

            <div
              className="glass-panel"
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}
            >
              <div style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase' }}>
                Settled Refunds & Credits
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.35rem', color: '#10b981' }}>
                {formatPrice(
                  (rmaRequests || [])
                    .filter((r) => r.status === 'Refund Processed')
                    .reduce((acc, r) => acc + (r.refundAmount || 0), 0),
                  currency
                )}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Processed back to clients
              </div>
            </div>
          </div>

          {/* Filter Toolbar */}
          <div
            className="glass-panel"
            style={{
              padding: '1rem 1.5rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                Filter RMA Queue:
              </span>
              {[
                { id: 'all', label: `All Claims (${(rmaRequests || []).length})` },
                { id: 'pending', label: `Pending Review (${(rmaRequests || []).filter((r) => r.status === 'Pending Approval').length})` },
                { id: 'authorized', label: `Authorized (${(rmaRequests || []).filter((r) => r.status.includes('Approved')).length})` },
                { id: 'received', label: `In Inspection (${(rmaRequests || []).filter((r) => r.status.includes('Received') || r.status.includes('Inspection')).length})` },
                { id: 'completed', label: `Settled (${(rmaRequests || []).filter((r) => r.status === 'Refund Processed').length})` }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setRmaStatusFilter(filter.id)}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    backgroundColor: rmaStatusFilter === filter.id ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                    color: rmaStatusFilter === filter.id ? '#ffffff' : 'var(--text-secondary)',
                    border: '1px solid var(--border-subtle)',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* RMA Claims List */}
          {(rmaRequests || []).filter((rma) => {
            if (rmaStatusFilter === 'all') return true;
            if (rmaStatusFilter === 'pending') return rma.status === 'Pending Approval';
            if (rmaStatusFilter === 'authorized') return rma.status.includes('Approved') || rma.status.includes('Authorized');
            if (rmaStatusFilter === 'received') return rma.status.includes('Received') || rma.status.includes('Inspection');
            if (rmaStatusFilter === 'completed') return rma.status === 'Refund Processed';
            return true;
          }).length === 0 ? (
            <div
              className="glass-panel"
              style={{
                padding: '3rem 2rem',
                textAlign: 'center',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-muted)'
              }}
            >
              <RotateCcw size={36} style={{ margin: '0 auto 1rem auto', opacity: 0.4 }} />
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                No Return Claims Found
              </div>
              <div style={{ fontSize: '0.84rem' }}>
                No client return authorizations match the current queue filter.
              </div>
            </div>
          ) : (
            (rmaRequests || [])
              .filter((rma) => {
                if (rmaStatusFilter === 'all') return true;
                if (rmaStatusFilter === 'pending') return rma.status === 'Pending Approval';
                if (rmaStatusFilter === 'authorized') return rma.status.includes('Approved') || rma.status.includes('Authorized');
                if (rmaStatusFilter === 'received') return rma.status.includes('Received') || rma.status.includes('Inspection');
                if (rmaStatusFilter === 'completed') return rma.status === 'Refund Processed';
                return true;
              })
              .map((rma) => {
                const isPending = rma.status === 'Pending Approval';
                const isApproved = rma.status.includes('Approved');
                const isReceived = rma.status.includes('Received') || rma.status.includes('Inspection');
                const isCompleted = rma.status === 'Refund Processed';
                const isRejected = rma.status === 'Rejected';

                return (
                  <div
                    key={rma.id}
                    className="glass-panel"
                    style={{
                      borderRadius: 'var(--radius-xl)',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-light)',
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow-md)'
                    }}
                  >
                    {/* RMA Card Header */}
                    <div
                      style={{
                        padding: '1rem 1.5rem',
                        backgroundColor: 'var(--bg-card)',
                        borderBottom: '1px solid var(--border-subtle)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            color: '#ef4444',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <RotateCcw size={18} />
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <span style={{ fontWeight: 800, fontSize: '0.98rem' }}>Claim #{rma.id}</span>
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                              Ref: <strong>#{rma.orderId}</strong>
                            </span>
                          </div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                            Authorized {new Date(rma.createdAt).toLocaleDateString()} • Client: <strong>{rma.customerName || 'Alexander Mercer'}</strong> ({rma.customerEmail})
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span
                          style={{
                            padding: '0.35rem 0.85rem',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            letterSpacing: '0.02em',
                            backgroundColor: isPending
                              ? 'rgba(245, 158, 11, 0.15)'
                              : isApproved
                              ? 'rgba(59, 130, 246, 0.15)'
                              : isReceived
                              ? 'rgba(139, 92, 246, 0.15)'
                              : isCompleted
                              ? 'rgba(16, 185, 129, 0.15)'
                              : 'rgba(244, 63, 94, 0.15)',
                            color: isPending
                              ? '#f59e0b'
                              : isApproved
                              ? '#3b82f6'
                              : isReceived
                              ? '#8b5cf6'
                              : isCompleted
                              ? '#10b981'
                              : '#f43f5e',
                            border: `1px solid ${
                              isPending
                                ? 'rgba(245, 158, 11, 0.3)'
                                : isApproved
                                ? 'rgba(59, 130, 246, 0.3)'
                                : isReceived
                                ? 'rgba(139, 92, 246, 0.3)'
                                : isCompleted
                                ? 'rgba(16, 185, 129, 0.3)'
                                : 'rgba(244, 63, 94, 0.3)'
                            }`
                          }}
                        >
                          {rma.status}
                        </span>
                      </div>
                    </div>

                    {/* RMA Card Body */}
                    <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                      {/* Left Column: Item & Claim Details */}
                      <div>
                        <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.65rem', letterSpacing: '0.04em' }}>
                          Returned Merchandise
                        </div>
                        <div
                          style={{
                            padding: '0.85rem',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: 'var(--bg-card)',
                            border: '1px solid var(--border-subtle)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '0.85rem'
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{rma.item?.name}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                              Spec: {rma.item?.color || 'Standard'} • Qty: {rma.item?.quantity || 1}
                            </div>
                          </div>
                          <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                            {formatPrice(rma.item?.price, currency)}
                          </div>
                        </div>

                        <div style={{ marginBottom: '0.85rem' }}>
                          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                            Client Reason for Return:
                          </span>
                          <div
                            style={{
                              padding: '0.65rem 0.85rem',
                              borderRadius: 'var(--radius-sm)',
                              backgroundColor: 'rgba(0,0,0,0.15)',
                              borderLeft: '3px solid var(--accent-primary)',
                              fontSize: '0.82rem',
                              fontStyle: 'italic',
                              color: 'var(--text-secondary)'
                            }}
                          >
                            "{rma.reason}"
                          </div>
                        </div>

                        <div>
                          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                            Requested Resolution:
                          </span>
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              padding: '0.45rem 0.75rem',
                              borderRadius: 'var(--radius-sm)',
                              backgroundColor: rma.resolution?.includes('5%') ? 'rgba(234, 179, 8, 0.12)' : 'var(--bg-tertiary)',
                              color: rma.resolution?.includes('5%') ? '#eab308' : 'var(--text-primary)',
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              border: `1px solid ${rma.resolution?.includes('5%') ? 'rgba(234, 179, 8, 0.3)' : 'var(--border-subtle)'}`
                            }}
                          >
                            <span>{rma.resolution}</span>
                            <span>•</span>
                            <span style={{ color: 'var(--text-primary)' }}>
                              Total Settlement: {formatPrice(rma.refundAmount, currency)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Courier Tracking & Director Actions */}
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
                        <div>
                          <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.65rem', letterSpacing: '0.04em' }}>
                            Return Logistics & Slip
                          </div>

                          <div
                            style={{
                              padding: '0.85rem',
                              borderRadius: 'var(--radius-md)',
                              backgroundColor: 'var(--bg-card)',
                              border: '1px solid var(--border-subtle)',
                              marginBottom: '1rem'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                              <span style={{ color: 'var(--text-muted)' }}>Assigned Courier:</span>
                              <strong style={{ color: 'var(--accent-primary)' }}>{rma.returnCarrier || 'DHL Express Global Air'}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                              <span style={{ color: 'var(--text-muted)' }}>Waybill Tracking Slip:</span>
                              <code style={{ fontSize: '0.78rem', padding: '0.15rem 0.45rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '4px' }}>
                                {rma.returnWaybill || 'Generating...'}
                              </code>
                            </div>
                          </div>

                          {/* 4-Step Milestone Progress */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
                            {[
                              { label: 'Authorized', done: true },
                              { label: 'Waybill Ready', done: isApproved || isReceived || isCompleted },
                              { label: 'Depot Intake', done: isReceived || isCompleted },
                              { label: 'Refund Sent', done: isCompleted }
                            ].map((step, idx) => (
                              <div
                                key={idx}
                                style={{
                                  padding: '0.45rem 0.25rem',
                                  textAlign: 'center',
                                  borderRadius: 'var(--radius-sm)',
                                  backgroundColor: step.done ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-card)',
                                  border: `1px solid ${step.done ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-subtle)'}`,
                                  color: step.done ? '#10b981' : 'var(--text-muted)',
                                  fontSize: '0.68rem',
                                  fontWeight: 700
                                }}
                              >
                                {step.label}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Director Fulfillment Action Controls */}
                        <div
                          style={{
                            paddingTop: '0.85rem',
                            borderTop: '1px solid var(--border-subtle)',
                            display: 'flex',
                            gap: '0.75rem',
                            flexWrap: 'wrap'
                          }}
                        >
                          {isPending && (
                            <>
                              <button
                                onClick={() => updateRmaStatus(rma.id, 'Approved - Ready for Drop-off')}
                                className="btn-primary"
                                style={{ flex: 1, padding: '0.65rem 1rem', fontSize: '0.82rem', justifyContent: 'center' }}
                              >
                                <CheckCircle2 size={15} />
                                <span>Authorize & Issue DHL Air Waybill</span>
                              </button>
                              <button
                                onClick={() => updateRmaStatus(rma.id, 'Rejected', 'Item does not meet return condition policies')}
                                className="btn-secondary"
                                style={{ padding: '0.65rem 0.85rem', fontSize: '0.82rem', color: '#f43f5e' }}
                              >
                                <span>Reject</span>
                              </button>
                            </>
                          )}

                          {isApproved && (
                            <button
                              onClick={() => updateRmaStatus(rma.id, 'Item Received - Under Inspection')}
                              className="btn-primary"
                              style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.82rem', justifyContent: 'center' }}
                            >
                              <Package size={15} />
                              <span>Mark Item Scanned & Received at Depot</span>
                            </button>
                          )}

                          {isReceived && (
                            <button
                              onClick={() => updateRmaStatus(rma.id, 'Refund Processed')}
                              className="btn-primary"
                              style={{
                                width: '100%',
                                padding: '0.65rem 1rem',
                                fontSize: '0.82rem',
                                justifyContent: 'center',
                                backgroundColor: '#10b981'
                              }}
                            >
                              <CheckCircle2 size={15} />
                              <span>Pass Inspection & Issue {formatPrice(rma.refundAmount, currency)}</span>
                            </button>
                          )}

                          {isCompleted && (
                            <div
                              style={{
                                width: '100%',
                                padding: '0.55rem',
                                borderRadius: 'var(--radius-sm)',
                                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                color: '#10b981',
                                textAlign: 'center',
                                fontSize: '0.82rem',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.45rem'
                              }}
                            >
                              <CheckCircle2 size={16} />
                              <span>Claim Settled & Refund Dispatched</span>
                            </div>
                          )}

                          {isRejected && (
                            <div
                              style={{
                                width: '100%',
                                padding: '0.55rem',
                                borderRadius: 'var(--radius-sm)',
                                backgroundColor: 'rgba(244, 63, 94, 0.1)',
                                color: '#f43f5e',
                                textAlign: 'center',
                                fontSize: '0.82rem',
                                fontWeight: 700
                              }}
                            >
                              Claim Rejected by Director
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      )}

      {/* ==================== TAB: OUT-OF-STOCK RESTOCK WAITLISTS ==================== */}
      {activeTab === 'waitlists' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Waitlist Header Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem'
            }}
          >
            <div
              className="glass-panel"
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)'
              }}
            >
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                Total Waiting VIP Clients
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.35rem', color: 'var(--text-primary)' }}>
                {Object.values(restockWaitlist || {}).reduce((acc, l) => acc + (l?.length || 0), 0)}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Subscribers awaiting hardware drops
              </div>
            </div>

            <div
              className="glass-panel"
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid rgba(245, 158, 11, 0.3)'
              }}
            >
              <div style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: 700, textTransform: 'uppercase' }}>
                High-Demand Sold Out Drops
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.35rem', color: '#f59e0b' }}>
                {Object.keys(restockWaitlist || {}).filter((pid) => {
                  const p = (products || []).find((prod) => prod.id === pid);
                  return !p || (p.inStock || 0) <= 0;
                }).length}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Immediate production recommended
              </div>
            </div>

            <div
              className="glass-panel"
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}
            >
              <div style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase' }}>
                Back-In-Stock Conversions
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.35rem', color: '#10b981' }}>
                94.8%
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Average email-to-purchase rate
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div
            className="glass-panel"
            style={{
              padding: '1rem 1.5rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem'
            }}
          >
            <Search size={16} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search waitlists by hardware name or buyer email..."
              value={waitlistSearch}
              onChange={(e) => setWaitlistSearch(e.target.value)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                fontSize: '0.86rem',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          {/* Waitlist Product Cards */}
          {Object.entries(restockWaitlist || {})
            .filter(([productId, list]) => {
              if (!waitlistSearch.trim()) return true;
              const q = waitlistSearch.toLowerCase();
              const p = (products || []).find((prod) => prod.id === productId);
              const nameMatch = p?.name?.toLowerCase().includes(q) || productId.toLowerCase().includes(q);
              const emailMatch = list.some((sub) => sub.email.toLowerCase().includes(q));
              return nameMatch || emailMatch;
            })
            .map(([productId, subscribers]) => {
              const product = (products || []).find((p) => p.id === productId);
              const isSoldOut = !product || (product.inStock || 0) <= 0;

              return (
                <div
                  key={productId}
                  className="glass-panel"
                  style={{
                    borderRadius: 'var(--radius-xl)',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-light)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-md)'
                  }}
                >
                  {/* Product Header */}
                  <div
                    style={{
                      padding: '1.25rem 1.5rem',
                      backgroundColor: 'var(--bg-card)',
                      borderBottom: '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {product?.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product?.name || productId}
                          style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '12px',
                            objectFit: 'cover',
                            border: '1px solid var(--border-subtle)'
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '12px',
                            backgroundColor: 'var(--bg-tertiary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text-muted)'
                          }}
                        >
                          <Package size={22} />
                        </div>
                      )}

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                            {product?.name || productId}
                          </h4>
                          <span
                            style={{
                              fontSize: '0.72rem',
                              fontWeight: 800,
                              padding: '0.2rem 0.6rem',
                              borderRadius: 'var(--radius-full)',
                              backgroundColor: isSoldOut ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                              color: isSoldOut ? '#ef4444' : '#10b981',
                              border: `1px solid ${isSoldOut ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`
                            }}
                          >
                            {isSoldOut ? 'SOLD OUT (0 Stock)' : `AVAILABLE (${product?.inStock} In Atelier)`}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                          Category: <strong>{product?.category || 'Exclusive Hardware'}</strong> • Price: <strong>{formatPrice(product?.price || 1299, currency)}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Quick Restock & Broadcast Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                      {product && (
                        <button
                          onClick={() => updateProductStock(product.id, (product.inStock || 0) + 10)}
                          className="btn-secondary"
                          style={{ padding: '0.55rem 0.95rem', fontSize: '0.82rem' }}
                        >
                          <Plus size={15} />
                          <span>+10 Batch Restock</span>
                        </button>
                      )}

                      <button
                        onClick={() => notifyRestockWaitlist(productId)}
                        className="btn-primary"
                        style={{ padding: '0.55rem 1.15rem', fontSize: '0.82rem' }}
                      >
                        <Send size={14} />
                        <span>Broadcast Restock Alert ({subscribers.length})</span>
                      </button>
                    </div>
                  </div>

                  {/* Registered Subscribers Table */}
                  <div style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>
                      Waiting Buyers Queue ({subscribers.length} clients)
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                            <th style={{ padding: '0.5rem 0.75rem' }}>Client Email</th>
                            <th style={{ padding: '0.5rem 0.75rem' }}>Selected Variant</th>
                            <th style={{ padding: '0.5rem 0.75rem' }}>Signed Up</th>
                            <th style={{ padding: '0.5rem 0.75rem' }}>Priority Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subscribers.map((sub, sIdx) => (
                            <tr
                              key={sIdx}
                              style={{
                                borderBottom: '1px solid var(--border-subtle)',
                                backgroundColor: sIdx % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)'
                              }}
                            >
                              <td style={{ padding: '0.7rem 0.75rem', fontWeight: 600 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <Mail size={14} style={{ color: 'var(--accent-primary)' }} />
                                  <span>{sub.email}</span>
                                </div>
                              </td>
                              <td style={{ padding: '0.7rem 0.75rem', color: 'var(--text-secondary)' }}>
                                {sub.variant || 'Standard Drop'}
                              </td>
                              <td style={{ padding: '0.7rem 0.75rem', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                                {sub.requestedAt || 'Recently'}
                              </td>
                              <td style={{ padding: '0.7rem 0.75rem' }}>
                                <span
                                  style={{
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    padding: '0.2rem 0.55rem',
                                    borderRadius: 'var(--radius-full)',
                                    backgroundColor: 'rgba(59, 130, 246, 0.12)',
                                    color: '#3b82f6',
                                    border: '1px solid rgba(59, 130, 246, 0.25)'
                                  }}
                                >
                                  VIP Queue Position #{sIdx + 1}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* ==================== TAB 2: INVENTORY & DROPS ==================== */}
      {activeTab === 'inventory' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Inventory Controls */}
          <div
            className="glass-panel"
            style={{
              padding: '1.25rem 1.5rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1, maxWidth: '400px' }}>
              <Search size={16} style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search catalog drops to adjust price or stock..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '0.86rem',
                  color: 'var(--text-primary)'
                }}
              />
            </div>

            <button
              onClick={() => setShowAddProductModal(true)}
              className="btn-primary"
              style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}
            >
              <Plus size={15} />
              <span>Launch New Atelier Drop</span>
            </button>
          </div>

          {/* Product Items Table */}
          <div
            className="glass-panel"
            style={{
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              overflow: 'hidden'
            }}
          >
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-card)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.74rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '1rem 1.25rem' }}>Product & Category</th>
                    <th style={{ padding: '1rem 1rem' }}>Live Price ($)</th>
                    <th style={{ padding: '1rem 1rem' }}>Stock Count</th>
                    <th style={{ padding: '1rem 1rem' }}>Featured</th>
                    <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.85rem 1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                          <img
                            src={p.images?.[0]}
                            alt={p.name}
                            style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '6px' }}
                          />
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{p.name}</div>
                            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                              {p.category} • {p.badge || 'Standard Drop'}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Price editor */}
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>$</span>
                          <input
                            type="number"
                            value={p.price}
                            onChange={(e) => updateProductPrice(p.id, Number(e.target.value))}
                            style={{
                              width: '90px',
                              padding: '0.3rem 0.5rem',
                              borderRadius: 'var(--radius-sm)',
                              backgroundColor: 'var(--bg-tertiary)',
                              border: '1px solid var(--border-subtle)',
                              color: 'var(--text-primary)',
                              fontSize: '0.84rem',
                              fontWeight: 700
                            }}
                          />
                        </div>
                      </td>

                      {/* Stock editor */}
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                          <button
                            onClick={() => updateProductStock(p.id, (p.inStock || 0) - 1)}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '4px',
                              backgroundColor: 'var(--bg-tertiary)',
                              border: '1px solid var(--border-subtle)',
                              cursor: 'pointer'
                            }}
                          >
                            -
                          </button>
                          <span style={{ fontWeight: 800, minWidth: '32px', textAlign: 'center', color: (p.inStock || 0) <= 2 ? '#f43f5e' : 'var(--text-primary)' }}>
                            {p.inStock || 0}
                          </span>
                          <button
                            onClick={() => updateProductStock(p.id, (p.inStock || 0) + 1)}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '4px',
                              backgroundColor: 'var(--bg-tertiary)',
                              border: '1px solid var(--border-subtle)',
                              cursor: 'pointer'
                            }}
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Featured toggle */}
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <button
                          onClick={() => toggleProductFeatured(p.id)}
                          style={{
                            padding: '0.25rem 0.65rem',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            backgroundColor: p.featured ? 'rgba(197, 143, 93, 0.2)' : 'var(--bg-tertiary)',
                            color: p.featured ? 'var(--accent-secondary)' : 'var(--text-muted)',
                            border: `1px solid ${p.featured ? 'var(--accent-secondary)' : 'var(--border-subtle)'}`,
                            cursor: 'pointer'
                          }}
                        >
                          {p.featured ? '★ Featured' : 'Standard'}
                        </button>
                      </td>

                      {/* Delete */}
                      <td style={{ padding: '0.85rem 1.25rem', textAlign: 'right' }}>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            padding: '0.35rem'
                          }}
                          title="Archive Drop"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 3: PROMO ENGINE ==================== */}
      {activeTab === 'promos' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {/* Create Promo Code */}
          <div
            className="glass-panel"
            style={{
              padding: '1.75rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              height: 'fit-content'
            }}
          >
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.35rem' }}>
              Create Promotional Code
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Codes will immediately activate for client checkout bag validation.
            </p>

            <form onSubmit={handleCreateCoupon} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                  Coupon Code Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIP25 or ATELIER50"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontFamily: 'monospace',
                    fontWeight: 800
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                  Discount Type
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setNewCouponType('percent')}
                    style={{
                      padding: '0.45rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.78rem',
                      fontWeight: newCouponType === 'percent' ? 800 : 500,
                      backgroundColor: newCouponType === 'percent' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                      color: newCouponType === 'percent' ? '#ffffff' : 'var(--text-secondary)',
                      border: '1px solid var(--border-subtle)',
                      cursor: 'pointer'
                    }}
                  >
                    Percentage (%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewCouponType('fixed')}
                    style={{
                      padding: '0.45rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.78rem',
                      fontWeight: newCouponType === 'fixed' ? 800 : 500,
                      backgroundColor: newCouponType === 'fixed' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                      color: newCouponType === 'fixed' ? '#ffffff' : 'var(--text-secondary)',
                      border: '1px solid var(--border-subtle)',
                      cursor: 'pointer'
                    }}
                  >
                    Fixed USD ($)
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                  {newCouponType === 'percent' ? 'Discount Percentage (e.g. 20 = 20%)' : 'Dollar Amount (e.g. 50 = $50)'}
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max={newCouponType === 'percent' ? '90' : '500'}
                  value={newCouponDiscount}
                  onChange={(e) => setNewCouponDiscount(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontWeight: 700
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                  Marketing Label
                </label>
                <input
                  type="text"
                  placeholder="e.g. 25% OFF Summer Collection"
                  value={newCouponLabel}
                  onChange={(e) => setNewCouponLabel(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ marginTop: '0.5rem', padding: '0.65rem', justifyContent: 'center' }}
              >
                <span>Activate Coupon</span>
              </button>
            </form>
          </div>

          {/* Active Promo Codes List */}
          <div
            className="glass-panel"
            style={{
              padding: '1.75rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)'
            }}
          >
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.35rem' }}>
              Active Coupon Directory
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Live promotional discount rules stored in atelier engine.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {Object.entries(coupons || {}).map(([code, info]) => (
                <div
                  key={code}
                  style={{
                    padding: '0.85rem 1.15rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          fontFamily: 'monospace',
                          fontWeight: 800,
                          fontSize: '0.92rem',
                          color: 'var(--accent-primary)',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          backgroundColor: 'rgba(92, 58, 33, 0.08)'
                        }}
                      >
                        {code}
                      </span>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                        {info.fixed ? `$${info.discount} Fixed` : info.discount === 'free_shipping' ? 'Free Shipping' : `${Math.round(info.discount * 100)}% OFF`}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      {info.label}
                    </div>
                  </div>

                  <button
                    onClick={() => deleteCoupon(code)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '0.35rem'
                    }}
                    title="Deactivate Coupon"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 4: EXECUTIVE ANALYTICS ==================== */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* 4 Metrics Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <div
              className="glass-panel"
              style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}
            >
              <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                Gross Revenue
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-secondary)', marginTop: '0.35rem' }}>
                {formatPrice(totalRevenue, currency)}
              </div>
            </div>

            <div
              className="glass-panel"
              style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}
            >
              <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                Orders in Pipeline
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-primary)', marginTop: '0.35rem' }}>
                {activeOrders.length} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>in transit</span>
              </div>
            </div>

            <div
              className="glass-panel"
              style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}
            >
              <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                Catalog Total Drops
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.35rem' }}>
                {(products || []).length} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>active SKUs</span>
              </div>
            </div>

            <div
              className="glass-panel"
              style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}
            >
              <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                Low Stock Items
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: lowStockProducts.length > 0 ? '#f43f5e' : '#10b981', marginTop: '0.35rem' }}>
                {lowStockProducts.length} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>items</span>
              </div>
            </div>
          </div>

          {/* Low Stock Alerts */}
          {lowStockProducts.length > 0 && (
            <div
              className="glass-panel"
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'rgba(244, 63, 94, 0.05)',
                border: '1px solid rgba(244, 63, 94, 0.25)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#f43f5e', fontWeight: 800 }}>
                <AlertTriangle size={18} />
                <span>Low Inventory Alerts (Restock Recommended)</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
                {lowStockProducts.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.84rem' }}>{p.name}</div>
                      <div style={{ fontSize: '0.74rem', color: '#f43f5e' }}>Only {p.inStock} left in atelier</div>
                    </div>
                    <button
                      onClick={() => updateProductStock(p.id, (p.inStock || 0) + 10)}
                      className="btn-secondary"
                      style={{ padding: '0.35rem 0.65rem', fontSize: '0.74rem' }}
                    >
                      +10 Restock
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================== CREATE PRODUCT MODAL ==================== */}
      {showAddProductModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Launch New Atelier Drop"
          className="modal-overlay"
          onClick={() => setShowAddProductModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            zIndex: 2300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem'
          }}
        >
          <div
            className="glass-panel animate-scale-up"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '540px',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-light)',
              maxHeight: '85vh',
              overflowY: 'auto',
              padding: '1.75rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Launch New Atelier Drop</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Item will instantly appear in the storefront catalog</p>
              </div>
              <button onClick={() => setShowAddProductModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, marginBottom: '0.25rem' }}>Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lumina Aether Noise-Cancelling Headphones"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, marginBottom: '0.25rem' }}>Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                >
                  <option value="computing">Computing & Phones</option>
                  <option value="audio">Acoustics & Audio</option>
                  <option value="wearables">Cyber Wearables</option>
                  <option value="gaming">Gaming & VR</option>
                  <option value="footwear">Sneakers & Kicks</option>
                  <option value="streetwear">Tech Streetwear</option>
                  <option value="living">Aesthetic Living</option>
                  <option value="gear">Tactical EDC & Bags</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, marginBottom: '0.25rem' }}>Price ($ USD)</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, marginBottom: '0.25rem' }}>Initial Stock</label>
                  <input
                    type="number"
                    required
                    value={newProduct.inStock}
                    onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, marginBottom: '0.25rem' }}>Image URL</label>
                <input
                  type="url"
                  required
                  value={newProduct.images}
                  onChange={(e) => setNewProduct({ ...newProduct, images: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={newProduct.featured}
                  onChange={(e) => setNewProduct({ ...newProduct, featured: e.target.checked })}
                />
                <label htmlFor="featuredToggle" style={{ fontSize: '0.82rem', fontWeight: 600 }}>Feature prominently on Atelier Homepage</label>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ marginTop: '1rem', padding: '0.75rem', justifyContent: 'center' }}
              >
                <span>Publish Drop to Store</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardView;
