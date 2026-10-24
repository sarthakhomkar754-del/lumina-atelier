import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/currency';
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Printer,
  RotateCcw,
  MapPin,
  CreditCard,
  Plus,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  Search,
  Filter,
  X,
  LogOut,
  LogIn
} from 'lucide-react';

export const OrdersAccountView = () => {
  const {
    orders,
    currency,
    reorderPastOrder,
    setInvoiceOrder,
    savedAddresses,
    setSavedAddresses,
    setCurrentView,
    addToast,
    currentUser,
    logout,
    setIsAuthModalOpen,
    setAuthModalMode,
    rmaRequests = [],
    setIsReturnModalOpen,
    setReturnOrderTarget,
    redeemPoints
  } = useStore();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'returns' | 'vip' | 'addresses' | 'payments'
  const [orderSearch, setOrderSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState('all'); // 'all' | 'active' | 'delivered'

  // New Address Modal / Form state
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: 'Apartment / Residence',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States'
  });

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!newAddress.address.trim() || !newAddress.city.trim() || !newAddress.zip.trim()) {
      addToast({ title: 'Incomplete Address', message: 'Please fill out required address fields', type: 'warning' });
      return;
    }

    const created = {
      id: `addr-${Date.now()}`,
      ...newAddress,
      isDefault: savedAddresses.length === 0
    };

    setSavedAddresses([...savedAddresses, created]);
    setShowAddressForm(false);
    setNewAddress({
      label: 'Apartment / Residence',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: 'United States'
    });
    addToast({ title: 'Address Saved', message: 'Added to your delivery address book', type: 'success' });
  };

  const handleSetDefaultAddress = (id) => {
    setSavedAddresses(
      savedAddresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id
      }))
    );
    addToast({ title: 'Default Address Updated', message: 'Will be pre-selected at checkout', type: 'info' });
  };

  const handleDeleteAddress = (id) => {
    if (savedAddresses.length <= 1) {
      addToast({ title: 'Cannot Delete', message: 'You must maintain at least one delivery address', type: 'warning' });
      return;
    }
    setSavedAddresses(savedAddresses.filter((a) => a.id !== id));
    addToast({ title: 'Address Removed', message: 'Deleted from your address book', type: 'info' });
  };

  return (
    <div
      style={{
        maxWidth: '1240px',
        margin: '2rem auto 5rem auto',
        padding: '0 1.25rem'
      }}
    >
      {/* Account Profile Hero Card */}
      <div
        className="glass-panel"
        style={{
          padding: '2rem',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-light)',
          marginBottom: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: currentUser?.role === 'admin'
                ? 'linear-gradient(135deg, #d97706, #b45309)'
                : 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              fontWeight: 800,
              color: '#ffffff',
              boxShadow: '0 4px 14px rgba(92, 58, 33, 0.22)',
              flexShrink: 0
            }}
          >
            {currentUser?.avatarInitials || 'AM'}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                {currentUser?.name || 'Alexander Mercer'}
              </h2>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: currentUser?.role === 'admin' ? '#d97706' : 'var(--accent-secondary)',
                  backgroundColor: currentUser?.role === 'admin' ? 'rgba(217, 119, 6, 0.15)' : 'rgba(197, 143, 93, 0.12)',
                  border: `1px solid ${currentUser?.role === 'admin' ? 'rgba(217, 119, 6, 0.3)' : 'rgba(197, 143, 93, 0.28)'}`,
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-full)'
                }}
              >
                {currentUser?.role === 'admin' ? <ShieldCheck size={12} /> : <Sparkles size={11} />}
                <span>{currentUser?.role === 'admin' ? 'ATELIER DIRECTOR' : (currentUser?.vipTier || 'ATELIER VIP TIER').toUpperCase()}</span>
              </span>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              {currentUser?.email || 'alex.mercer@cyberlumina.io'} • Member since {currentUser?.memberSince || 'Jan 2025'} • {orders.length} Verified Orders
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {currentUser?.role === 'admin' && (
            <button
              onClick={() => setCurrentView('admin')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.6rem 1.1rem',
                fontSize: '0.84rem',
                fontWeight: 700,
                color: '#d97706',
                backgroundColor: 'rgba(217, 119, 6, 0.12)',
                border: '1px solid rgba(217, 119, 6, 0.35)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer'
              }}
            >
              <ShieldCheck size={15} />
              <span>Admin Portal</span>
            </button>
          )}

          <button
            onClick={() => setCurrentView('track')}
            className="btn-secondary"
            style={{ padding: '0.6rem 1.1rem', fontSize: '0.84rem' }}
          >
            <Truck size={15} />
            <span>Track Flight</span>
          </button>

          {currentUser ? (
            <button
              onClick={logout}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.6rem 1rem',
                fontSize: '0.84rem',
                fontWeight: 600,
                color: 'var(--accent-red)',
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer'
              }}
            >
              <LogOut size={15} />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setAuthModalMode('signin');
                setIsAuthModalOpen(true);
              }}
              className="btn-primary"
              style={{ padding: '0.6rem 1.1rem', fontSize: '0.84rem' }}
            >
              <LogIn size={15} />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs Header */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: '2rem',
          overflowX: 'auto'
        }}
      >
        {[
          { id: 'orders', label: `My Orders (${orders.length})` },
          { id: 'returns', label: `Returns & RMAs (${rmaRequests.length})` },
          { id: 'vip', label: `VIP Rewards (${currentUser?.loyaltyPoints || 1250} Pts)` },
          { id: 'addresses', label: `Addresses (${savedAddresses.length})` },
          { id: 'payments', label: 'Payment Methods' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              paddingBottom: '0.85rem',
              fontSize: '0.92rem',
              fontWeight: activeTab === tab.id ? 800 : 500,
              color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-muted)',
              borderBottom: activeTab === tab.id ? '2px solid var(--accent-primary)' : '2px solid transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all var(--transition-fast)'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: ORDERS HISTORY */}
      {activeTab === 'orders' && (() => {
        const activeOrdersCount = orders.filter((o) => o.trackingStatus !== 'Delivered').length;
        const deliveredOrdersCount = orders.filter((o) => o.trackingStatus === 'Delivered').length;
        const totalSpent = orders.reduce((sum, o) => sum + (o.summary?.total || 0), 0);

        const filteredOrders = orders.filter((order) => {
          if (orderFilter === 'active' && order.trackingStatus === 'Delivered') return false;
          if (orderFilter === 'delivered' && order.trackingStatus !== 'Delivered') return false;
          if (!orderSearch.trim()) return true;
          const query = orderSearch.toLowerCase().trim();
          const matchId = order.orderId?.toLowerCase().includes(query);
          const matchTracking = order.trackingNumber?.toLowerCase().includes(query);
          const matchCarrier = order.carrier?.toLowerCase().includes(query);
          const matchItems = order.items?.some((i) =>
            i.product?.name?.toLowerCase().includes(query) ||
            i.selectedColor?.toLowerCase().includes(query) ||
            i.selectedSize?.toLowerCase().includes(query)
          );
          return matchId || matchTracking || matchCarrier || matchItems;
        });

        if (orders.length === 0) {
          return (
            <div
              className="glass-panel"
              style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-secondary)'
              }}
            >
              <Package size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>No orders placed yet</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                Your confirmed drops, delivery status, and printable invoices will appear here.
              </p>
              <button onClick={() => setCurrentView('shop')} className="btn-primary">
                Explore Catalog
              </button>
            </div>
          );
        }

        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Account Orders Portfolio Metrics */}
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
                  padding: '1.15rem 1.35rem',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                  Total Atelier Drops
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.35rem' }}>
                  {orders.length} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>orders</span>
                </div>
              </div>

              <div
                className="glass-panel"
                style={{
                  padding: '1.15rem 1.35rem',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                  In Flight / Out for Delivery
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--accent-secondary)', marginTop: '0.35rem' }}>
                  {activeOrdersCount} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>active</span>
                </div>
              </div>

              <div
                className="glass-panel"
                style={{
                  padding: '1.15rem 1.35rem',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                  Lifetime Investment
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--accent-primary)', marginTop: '0.35rem' }}>
                  {formatPrice(totalSpent, currency)}
                </div>
              </div>
            </div>

            {/* Orders Search & Filter Toolbar */}
            <div
              className="glass-panel"
              style={{
                padding: '0.85rem 1.25rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
              }}
            >
              {/* Search input */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-subtle)',
                  padding: '0.4rem 0.85rem',
                  flex: '1',
                  minWidth: '220px',
                  maxWidth: '380px'
                }}
              >
                <Search size={15} style={{ color: 'var(--text-muted)', marginRight: '0.5rem', flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="Filter order ID, courier, or items..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                    fontSize: '0.82rem',
                    color: 'var(--text-primary)',
                    padding: 0
                  }}
                />
                {orderSearch && (
                  <button
                    onClick={() => setOrderSearch('')}
                    aria-label="Clear order search"
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, display: 'flex' }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Status Filter Chips */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                {[
                  { id: 'all', label: `All (${orders.length})` },
                  { id: 'active', label: `In Transit (${activeOrdersCount})` },
                  { id: 'delivered', label: `Delivered (${deliveredOrdersCount})` }
                ].map((chip) => (
                  <button
                    key={chip.id}
                    onClick={() => setOrderFilter(chip.id)}
                    style={{
                      padding: '0.35rem 0.85rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.78rem',
                      fontWeight: orderFilter === chip.id ? 800 : 500,
                      backgroundColor: orderFilter === chip.id ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                      color: orderFilter === chip.id ? '#ffffff' : 'var(--text-secondary)',
                      border: `1px solid ${orderFilter === chip.id ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtered Orders List */}
            {filteredOrders.length === 0 ? (
              <div
                className="glass-panel"
                style={{
                  textAlign: 'center',
                  padding: '3rem 1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <Filter size={36} style={{ color: 'var(--text-muted)', margin: '0 auto 0.75rem auto' }} />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.35rem' }}>No matching orders</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  No orders matched your active search criteria.
                </p>
                <button
                  onClick={() => {
                    setOrderSearch('');
                    setOrderFilter('all');
                  }}
                  className="btn-secondary"
                  style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
                >
                  Clear Filters
                </button>
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
                    border: '1px solid var(--border-subtle)',
                    overflow: 'hidden'
                  }}
                >
                  {/* Order Top Header */}
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                      <div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          Order Identifier
                        </div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {order.orderId}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          Placed Date
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          Total Amount
                        </div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>
                          {formatPrice(order.summary?.total || 0, currency)}
                        </div>
                      </div>
                    </div>

                    {/* Status Pill & Invoice CTA */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.35rem 0.85rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          backgroundColor: isDelivered ? 'rgba(95, 122, 97, 0.12)' : 'rgba(92, 58, 33, 0.08)',
                          color: isDelivered ? '#445946' : 'var(--accent-primary)',
                          border: `1px solid ${isDelivered ? 'rgba(95, 122, 97, 0.25)' : 'rgba(92, 58, 33, 0.22)'}`
                        }}
                      >
                        {isDelivered ? <CheckCircle size={13} /> : <Clock size={13} />}
                        <span>{order.trackingStatus}</span>
                      </span>

                      <button
                        onClick={() => setInvoiceOrder(order)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.4rem 0.8rem',
                          borderRadius: 'var(--radius-xs)',
                          backgroundColor: 'var(--bg-tertiary)',
                          color: 'var(--text-primary)',
                          border: '1px solid var(--border-light)',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                        title="View Official Printable Invoice"
                      >
                        <Printer size={13} />
                        <span>Official Invoice</span>
                      </button>
                    </div>
                  </div>

                  {/* Order Items Body */}
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '1rem',
                            flexWrap: 'wrap'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img
                              src={item.product?.images?.[0]}
                              alt={item.product?.name}
                              style={{
                                width: '64px',
                                height: '64px',
                                objectFit: 'cover',
                                borderRadius: 'var(--radius-sm)',
                                border: '1px solid var(--border-subtle)',
                                backgroundColor: 'var(--bg-tertiary)'
                              }}
                            />
                            <div>
                              <h4 style={{ fontSize: '0.94rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                                {item.product?.name}
                              </h4>
                              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                                Variant: {item.selectedColor} • {item.selectedSize}
                              </div>
                              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                                Qty: {item.quantity} × {formatPrice(item.product?.price || 0, currency)}
                              </div>
                            </div>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '1rem', fontWeight: 800 }}>
                              {formatPrice((item.product?.price || 0) * item.quantity, currency)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Footer Actions: Track Package, Reorder */}
                    <div
                      style={{
                        paddingTop: '1rem',
                        borderTop: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '1rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <Truck size={15} style={{ color: 'var(--accent-secondary)' }} />
                        <span>Carrier: <strong>{order.carrier || 'DHL Express Global Air'}</strong></span>
                        <span>•</span>
                        <span>Tracking: <strong style={{ color: 'var(--text-primary)' }}>{order.trackingNumber || 'DHL-948201'}</strong></span>
                      </div>

                      <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => {
                            setReturnOrderTarget(order);
                            setIsReturnModalOpen(true);
                          }}
                          className="btn-secondary"
                          style={{
                            padding: '0.45rem 0.95rem',
                            fontSize: '0.8rem',
                            borderColor: 'rgba(217, 119, 6, 0.4)',
                            color: 'var(--accent-secondary)'
                          }}
                        >
                          <RotateCcw size={13} />
                          <span>Return / Refund</span>
                        </button>

                        <button
                          onClick={() => setCurrentView('track', { id: order.orderId })}
                          className="btn-secondary"
                          style={{ padding: '0.45rem 0.95rem', fontSize: '0.8rem' }}
                        >
                          <ExternalLink size={13} />
                          <span>Track Courier</span>
                        </button>

                        <button
                          onClick={() => reorderPastOrder(order)}
                          className="btn-primary"
                          style={{ padding: '0.45rem 0.95rem', fontSize: '0.8rem' }}
                        >
                          <RotateCcw size={13} />
                          <span>Reorder All</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        );
      })()}

      {/* TAB: RETURNS & RMAS */}
      {activeTab === 'returns' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Returns & Authorization Slips (RMA)</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                Track the progress of returned drops, prepaid air waybills, and store credit refunds.
              </p>
            </div>
            {orders.length > 0 && (
              <button
                onClick={() => {
                  setReturnOrderTarget(orders[0]);
                  setIsReturnModalOpen(true);
                }}
                className="btn-primary"
                style={{ padding: '0.55rem 1rem', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <RotateCcw size={14} />
                <span>New Return Request</span>
              </button>
            )}
          </div>

          {rmaRequests.length === 0 ? (
            <div
              className="glass-panel"
              style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-secondary)'
              }}
            >
              <RotateCcw size={44} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>No Active Returns</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', maxWidth: '440px', margin: '0 auto 1.5rem auto' }}>
                All your hardware orders are currently in good standing. If any drop fails to exceed your standards, you can initiate a return from your Orders tab.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {rmaRequests.map((rma) => (
                <div
                  key={rma.id}
                  className="glass-panel"
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    padding: '1.5rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--text-primary)' }}>{rma.id}</span>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            padding: '0.2rem 0.6rem',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: rma.status.includes('Approved') ? 'rgba(16, 185, 129, 0.12)' : 'rgba(217, 119, 6, 0.12)',
                            color: rma.status.includes('Approved') ? '#10b981' : '#d97706',
                            border: `1px solid ${rma.status.includes('Approved') ? 'rgba(16, 185, 129, 0.3)' : 'rgba(217, 119, 6, 0.3)'}`
                          }}
                        >
                          {rma.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Linked to Order #{rma.orderId} • Created on {new Date(rma.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Resolution Value</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#10b981' }}>
                        {formatPrice(rma.refundAmount, currency)}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--accent-secondary)' }}>{rma.resolution}</div>
                    </div>
                  </div>

                  {/* Return Item Row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      padding: '0.85rem',
                      backgroundColor: 'var(--bg-tertiary)',
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: '1rem'
                    }}
                  >
                    <img
                      src={rma.item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80'}
                      alt={rma.item.name}
                      style={{ width: '46px', height: '46px', objectFit: 'cover', borderRadius: 'var(--radius-xs)' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>{rma.item.name}</div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                        Reason: <span style={{ color: 'var(--text-primary)' }}>{rma.reason}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Waybill</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                        {rma.returnWaybill}
                      </div>
                    </div>
                  </div>

                  {/* Tracking Timeline */}
                  {rma.returnSteps && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.65rem', paddingTop: '0.5rem' }}>
                      {rma.returnSteps.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          style={{
                            padding: '0.5rem 0.65rem',
                            borderRadius: 'var(--radius-xs)',
                            backgroundColor: step.completed ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-card)',
                            border: `1px solid ${step.completed ? 'rgba(16, 185, 129, 0.25)' : 'var(--border-subtle)'}`,
                            fontSize: '0.74rem'
                          }}
                        >
                          <div style={{ fontWeight: 700, color: step.completed ? '#10b981' : 'var(--text-secondary)' }}>
                            {step.completed ? '✓ ' : '○ '}{step.label}
                          </div>
                          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                            {step.time}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SAVED ADDRESSES */}
      {activeTab === 'addresses' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Delivery Address Book</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                Addresses automatically sync into one-click checkout.
              </p>
            </div>
            <button
              onClick={() => setShowAddressForm(!showAddressForm)}
              className="btn-primary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}
            >
              <Plus size={15} />
              <span>{showAddressForm ? 'Cancel' : 'Add New Address'}</span>
            </button>
          </div>

          {/* Add Address Form Accordion */}
          {showAddressForm && (
            <form
              onSubmit={handleSaveAddress}
              className="glass-panel animate-scale-up"
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--accent-primary)',
                marginBottom: '2rem'
              }}
            >
              <h4 style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '1rem' }}>
                Enter New Delivery Destination
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="Address Label (e.g. Home, Penthouse, Studio)"
                  value={newAddress.label}
                  onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Recipient First Name"
                  value={newAddress.firstName}
                  onChange={(e) => setNewAddress({ ...newAddress, firstName: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Recipient Last Name"
                  value={newAddress.lastName}
                  onChange={(e) => setNewAddress({ ...newAddress, lastName: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Street Address & Apt / Suite"
                  value={newAddress.address}
                  onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="State / Province"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Postal / ZIP Code"
                  value={newAddress.zip}
                  onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                  required
                />
                <input
                  type="tel"
                  placeholder="Contact Phone Number"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ padding: '0.55rem 1.4rem' }}>
                Save Delivery Address
              </button>
            </form>
          )}

          {/* Addresses Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {savedAddresses.map((addr) => (
              <div
                key={addr.id}
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: `1px solid ${addr.isDefault ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, fontSize: '0.95rem' }}>
                    <MapPin size={16} style={{ color: 'var(--accent-primary)' }} />
                    <span>{addr.label}</span>
                  </div>
                  {addr.isDefault && (
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        backgroundColor: 'rgba(92, 58, 33, 0.08)',
                        color: 'var(--accent-primary)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid rgba(92, 58, 33, 0.22)'
                      }}
                    >
                      DEFAULT
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                  {addr.firstName} {addr.lastName}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {addr.address}<br />
                  {addr.city}, {addr.state} {addr.zip}<br />
                  {addr.country}<br />
                  {addr.phone && `Tel: ${addr.phone}`}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                  {!addr.isDefault && (
                    <button
                      onClick={() => handleSetDefaultAddress(addr.id)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        backgroundColor: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-xs)',
                        color: 'var(--text-primary)',
                        cursor: 'pointer'
                      }}
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteAddress(addr.id)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      backgroundColor: 'transparent',
                      border: '1px solid transparent',
                      color: 'var(--accent-pink)',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PAYMENT METHODS */}
      {activeTab === 'payments' && (
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Saved Cards & Digital Wallets</h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Encrypted using 256-bit AES end-to-end tokenization.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            <div
              className="glass-panel"
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--accent-primary)',
                background: 'linear-gradient(135deg, rgba(92, 58, 33, 0.06) 0%, rgba(197, 143, 93, 0.08) 100%)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <CreditCard size={24} style={{ color: 'var(--accent-primary)' }} />
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-primary)', backgroundColor: 'rgba(92, 58, 33, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                  DEFAULT CARD
                </span>
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '1rem' }}>
                •••• •••• •••• 4242
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                <span>ALEXANDER MERCER</span>
                <span>EXP 12/28</span>
              </div>
            </div>

            <div
              className="glass-panel"
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}> Pay</span>
                <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>VERIFIED</span>
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Apple Cash & Biometric TouchID
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                1-Tap Checkout Active
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: VIP PRIVILEGES & REWARDS LEDGER */}
      {activeTab === 'vip' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Top Loyalty Ledger Card */}
          <div
            className="glass-panel"
            style={{
              padding: '2rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1.5px solid var(--accent-secondary)',
              background: 'linear-gradient(135deg, rgba(92, 58, 33, 0.08) 0%, rgba(197, 143, 93, 0.12) 100%)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-secondary)', marginBottom: '0.25rem' }}>
                  LUMINA Rewards Balance
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>
                  {currentUser?.loyaltyPoints || 1250}{' '}
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-secondary)' }}>Points</span>
                </div>
                <div style={{ fontSize: '0.84rem', color: '#10b981', fontWeight: 700, marginTop: '0.35rem' }}>
                  ≈ {formatPrice((currentUser?.loyaltyPoints || 1250) / 100, currency)} instant store discount value
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(217, 119, 6, 0.16)',
                    color: '#d97706',
                    border: '1px solid rgba(217, 119, 6, 0.35)'
                  }}
                >
                  ✦ {currentUser?.vipTier || 'Gold Patron'}
                </span>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  Earn 1 Point per $1 Spent
                </div>
              </div>
            </div>

            {/* Tier Progress Bar */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                <span>Progress to Platinum Legend (2,500 Pts)</span>
                <span>{Math.round(((currentUser?.loyaltyPoints || 1250) / 2500) * 100)}%</span>
              </div>
              <div style={{ height: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min(100, Math.round(((currentUser?.loyaltyPoints || 1250) / 2500) * 100))}%`,
                    background: 'var(--gradient-brand)',
                    borderRadius: '4px',
                    transition: 'width 0.5s ease'
                  }}
                />
              </div>
            </div>

            {/* Instant Voucher Redemption Buttons */}
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.65rem', color: 'var(--text-primary)' }}>
                Redeem Points for Checkout Vouchers:
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {[
                  { points: 500, value: 5.0 },
                  { points: 1000, value: 10.0 },
                  { points: 2000, value: 20.0 }
                ].map((tier) => {
                  const canRedeem = (currentUser?.loyaltyPoints || 0) >= tier.points;
                  return (
                    <button
                      key={tier.points}
                      disabled={!canRedeem}
                      onClick={() => redeemPoints(tier.points)}
                      style={{
                        padding: '0.55rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: canRedeem ? 'var(--bg-secondary)' : 'var(--bg-tertiary)',
                        border: `1px solid ${canRedeem ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                        color: canRedeem ? 'var(--text-primary)' : 'var(--text-muted)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: canRedeem ? 'pointer' : 'not-allowed',
                        opacity: canRedeem ? 1 : 0.6,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}
                    >
                      <Sparkles size={13} style={{ color: canRedeem ? 'var(--accent-secondary)' : 'inherit' }} />
                      <span>{tier.points} Pts → {formatPrice(tier.value, currency)} Credit</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Points History Ledger */}
          <div
            className="glass-panel"
            style={{
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)'
            }}
          >
            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem' }}>Points Activity Ledger</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {(currentUser?.pointHistory || [
                { id: 'ph-1', date: 'Yesterday', reason: 'Order #LUM-847291 Purchase', points: 2429, type: 'earned' },
                { id: 'ph-2', date: '3 days ago', reason: 'VIP Welcome Bonus', points: 250, type: 'earned' },
                { id: 'ph-3', date: '1 week ago', reason: 'Voucher Redemption (-$14.29)', points: -1429, type: 'redeemed' }
              ]).map((hist) => (
                <div
                  key={hist.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.82rem'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{hist.reason}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{hist.date}</div>
                  </div>
                  <div
                    style={{
                      fontWeight: 800,
                      color: hist.points > 0 ? '#10b981' : '#f43f5e'
                    }}
                  >
                    {hist.points > 0 ? `+${hist.points}` : hist.points} Pts
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Grid */}
          <div
            className="glass-panel"
            style={{
              padding: '1.75rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <ShieldCheck size={22} style={{ color: 'var(--accent-primary)' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>VIP Patron Privileges</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1.15rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.35rem', color: 'var(--accent-secondary)' }}>
                  🚀 Free DHL Express Global Air
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  Automatic express courier upgrades on all orders with real-time flight tracking.
                </p>
              </div>
              <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1.15rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.35rem', color: 'var(--accent-primary)' }}>
                  🛡️ 2-Year Full Hardware Coverage
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  Advanced replacement dispatched before you send back any defective hardware.
                </p>
              </div>
              <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1.15rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.35rem', color: 'var(--accent-pink)' }}>
                  ⚡ Priority Restock Access
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  Receive drop notifications 1 hour ahead of public releases on waitlisted hardware.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersAccountView;
