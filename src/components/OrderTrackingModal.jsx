import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/currency';
import {
  X,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Search
} from 'lucide-react';

const FALLBACK_ORDER = {
  orderId: 'LUM-928410',
  createdAt: '2026-10-18T10:00:00.000Z',
  trackingStatus: 'In Transit via Express Courier',
  shippingDetails: {
    firstName: 'Alexander',
    city: 'Tokyo',
    country: 'Japan'
  },
  items: [
    {
      cartItemId: 'sample-1',
      product: {
        name: 'LUMINA Sonic Pro ANC Headphones',
        price: 349.99,
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80'
        ]
      },
      quantity: 1,
      selectedColor: 'Obsidian Black',
      selectedSize: 'Standard'
    }
  ],
  summary: { total: 349.99 }
};

export const OrderTrackingModal = () => {
  const { isTrackingOpen, setIsTrackingOpen, orders, currency, addToast } = useStore();
  const [searchId, setSearchId] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(() => {
    return orders.length > 0 ? orders[0] : null;
  });

  if (!isTrackingOpen) return null;

  const displayOrder = selectedOrder || orders[0] || FALLBACK_ORDER;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    const found = orders.find((o) => o.orderId.toLowerCase() === searchId.trim().toLowerCase());
    if (found) {
      setSelectedOrder(found);
      addToast({ title: 'Order Located', message: `Displaying tracking for ${found.orderId}`, type: 'success' });
    } else {
      addToast({ title: 'Order Not Found', message: `No active order matching "${searchId}". Displaying demo tracking.`, type: 'info' });
    }
  };

  const trackingSteps = [
    { title: 'Order Verified & Packed', time: 'Yesterday 14:20', desc: 'Inspection passed, tamper-proof laser seal applied', completed: true },
    { title: 'Handed to DHL Express Air', time: 'Yesterday 19:45', desc: 'Scanned at Central Global Logistics Hub', completed: true },
    { title: 'In Flight Transit', time: 'Today 08:30', desc: 'Aircraft in transit to regional hub', active: true },
    { title: 'Out for Delivery', time: 'Estimated Tomorrow 11:00', desc: 'Courier dispatch to delivery address', completed: false }
  ];

  return (
    <div
      className="modal-overlay"
      onClick={() => setIsTrackingOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Shipment Tracking"
    >
      <div
        className="glass-panel animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '720px',
          width: '100%',
          maxHeight: '90dvh',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          padding: '2rem',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(197, 143, 93, 0.15)',
                color: 'var(--accent-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Package size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Live Telemetry Tracking</h3>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Real-time satellite coordinates & courier status
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsTrackingOpen(false)}
            className="icon-btn"
            style={{ width: '32px', height: '32px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Order Bar */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <input
            type="text"
            placeholder="Search by Order ID (e.g. LUM-849204)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            style={{ flex: 1, padding: '0.55rem 0.85rem', fontSize: '0.84rem' }}
          />
          <button type="submit" className="btn-secondary" style={{ padding: '0.55rem 1rem', fontSize: '0.84rem' }}>
            <Search size={15} />
            <span>Track</span>
          </button>
        </form>

        {/* Order Details Header Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            border: '1px solid var(--border-subtle)',
            marginBottom: '1.75rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1rem'
          }}
        >
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ORDER NUMBER</div>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--accent-primary)' }}>
              {displayOrder.orderId}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>STATUS</div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
              <span>In Transit</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>CARRIER</div>
            <div style={{ fontWeight: 700, fontSize: '0.86rem' }}>DHL Express Air</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>DESTINATION</div>
            <div style={{ fontWeight: 700, fontSize: '0.86rem' }}>
              {displayOrder.shippingDetails?.city || 'Tokyo'}, {displayOrder.shippingDetails?.country || 'Japan'}
            </div>
          </div>
        </div>

        {/* Visual Tracking Progress Timeline */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem' }}>
            Courier Milestones
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative' }}>
            {trackingSteps.map((step, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                {/* Status Dot & Vertical Line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: step.completed
                        ? 'rgba(16, 185, 129, 0.2)'
                        : step.active
                        ? 'rgba(197, 143, 93, 0.22)'
                        : 'var(--bg-tertiary)',
                      border: step.completed
                        ? '2px solid #5f7a61'
                        : step.active
                        ? '2px solid var(--accent-secondary)'
                        : '2px solid var(--border-light)',
                      color: step.completed ? '#5f7a61' : step.active ? 'var(--accent-secondary)' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: step.active ? '0 0 15px rgba(197, 143, 93, 0.4)' : 'none'
                    }}
                  >
                    {step.completed ? <CheckCircle2 size={16} /> : step.active ? <Truck size={15} /> : <Clock size={14} />}
                  </div>
                  {idx < trackingSteps.length - 1 && (
                    <div
                      style={{
                        width: '2px',
                        flex: 1,
                        minHeight: '36px',
                        backgroundColor: step.completed ? '#10b981' : 'var(--border-subtle)',
                        marginTop: '0.25rem'
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div style={{ paddingBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: step.active ? 'var(--accent-secondary)' : 'var(--text-primary)' }}>
                      {step.title}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>• {step.time}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    {step.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Items in Parcel */}
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Items in Parcel
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {displayOrder.items.map((it, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.65rem 0.85rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <img
                  src={it.product.images[0]}
                  alt={it.product.name}
                  style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: 'var(--radius-xs)' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.86rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {it.product.name}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    Qty: {it.quantity} • {it.selectedColor}
                  </div>
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>
                  {formatPrice(it.product.price * it.quantity, currency)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingModal;
