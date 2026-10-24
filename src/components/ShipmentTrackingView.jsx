import React, { useState, useEffect, useCallback } from 'react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/currency';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Search,
  ShieldCheck,
  Printer,
  MapPin,
  Plane,
  Copy
} from 'lucide-react';

export const ShipmentTrackingView = () => {
  const { orders, currency, addToast, setInvoiceOrder } = useStore();
  const [searchId, setSearchId] = useState('');

  const getInitialOrderId = useCallback(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const match = hash.match(/[?&](?:id|order)=([^&]+)/i);
      if (match && match[1]) {
        const code = decodeURIComponent(match[1]).toLowerCase();
        const found = orders.find(
          (o) =>
            o.orderId.toLowerCase() === code ||
            (o.trackingNumber && o.trackingNumber.toLowerCase() === code)
        );
        if (found) return found.orderId;
      }
    }
    return orders.length > 0 ? orders[0].orderId : '';
  }, [orders]);

  const [selectedOrderId, setSelectedOrderId] = useState(getInitialOrderId);

  // Sync if hash changes while on the page
  useEffect(() => {
    const onHash = () => {
      const id = getInitialOrderId();
      if (id) setSelectedOrderId(id);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [getInitialOrderId]);

  const activeOrder = orders.find((o) => o.orderId === selectedOrderId) || orders[0];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    const clean = searchId.trim().toLowerCase();
    const found = orders.find(
      (o) =>
        o.orderId.toLowerCase() === clean ||
        (o.trackingNumber && o.trackingNumber.toLowerCase() === clean)
    );
    if (found) {
      setSelectedOrderId(found.orderId);
      addToast({ title: 'Shipment Located', message: `Tracking order ${found.orderId}`, type: 'success' });
    } else {
      addToast({
        title: 'Shipment Not Found',
        message: `No active dispatch with code "${searchId}". Displaying latest order.`,
        type: 'warning'
      });
    }
  };

  if (!activeOrder) {
    return (
      <div style={{ maxWidth: '800px', margin: '4rem auto', textAlign: 'center', padding: '2rem' }}>
        <Package size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem auto' }} />
        <h3>No shipments found</h3>
      </div>
    );
  }

  const isDelivered = activeOrder.trackingStatus === 'Delivered';

  return (
    <div
      style={{
        maxWidth: '1100px',
        margin: '2rem auto 5rem auto',
        padding: '0 1.25rem'
      }}
    >
      {/* Search Header */}
      <div
        className="glass-panel"
        style={{
          padding: '2.5rem 2rem',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-light)',
          marginBottom: '2rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(197, 143, 93, 0.12)',
            color: 'var(--accent-secondary)',
            fontSize: '0.78rem',
            fontWeight: 800,
            marginBottom: '1rem',
            border: '1px solid rgba(197, 143, 93, 0.28)'
          }}
        >
          <Plane size={14} />
          <span>GLOBAL COURIER SATELLITE TELEMETRY</span>
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          Live Dispatch & Flight Tracking
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '520px', margin: '0 auto 1.75rem auto' }}>
          Track real-time courier air dispatches, tamper-seal verification milestones, and estimated porch arrival times.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            display: 'flex',
            gap: '0.5rem',
            backgroundColor: 'var(--bg-tertiary)',
            padding: '0.35rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-light)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, paddingLeft: '0.85rem' }}>
            <Search size={18} style={{ color: 'var(--text-muted)', marginRight: '0.5rem' }} />
            <input
              type="text"
              placeholder="Enter Order ID (e.g. LUM-847291) or Carrier Tracking Code"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.86rem',
                outline: 'none',
                boxShadow: 'none'
              }}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.82rem' }}>
            Locate Package
          </button>
        </form>

        {/* Quick Pick Pills */}
        {orders.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.65rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
              Your Active Drops:
            </span>
            {orders.map((o) => (
              <button
                key={o.orderId}
                onClick={() => setSelectedOrderId(o.orderId)}
                style={{
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  backgroundColor: selectedOrderId === o.orderId ? 'var(--accent-primary)' : 'var(--bg-card)',
                  color: selectedOrderId === o.orderId ? '#ffffff' : 'var(--text-secondary)',
                  border: `1px solid ${selectedOrderId === o.orderId ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                  cursor: 'pointer'
                }}
              >
                {o.orderId} • {o.trackingStatus}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Tracking Details Container */}
      <div
        className="glass-panel"
        style={{
          borderRadius: 'var(--radius-xl)',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          overflow: 'hidden'
        }}
      >
        {/* Top Status Banner */}
        <div
          style={{
            padding: '1.75rem 2rem',
            backgroundColor: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Shipment Identifier
              </span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-secondary)' }}>
                {activeOrder.carrier || 'DHL Express Global Air'}
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>
              {activeOrder.orderId}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              <span>Waybill: <strong>{activeOrder.trackingNumber || 'DHL-AIR-948201842'}</strong></span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(activeOrder.trackingNumber || activeOrder.orderId);
                  addToast({ title: 'Tracking Code Copied! 📋', message: activeOrder.trackingNumber || activeOrder.orderId, type: 'info' });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.15rem 0.35rem',
                  borderRadius: 'var(--radius-xs)'
                }}
                title="Copy tracking code"
              >
                <Copy size={13} />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Estimated Delivery
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: isDelivered ? '#10b981' : 'var(--accent-primary)' }}>
                {activeOrder.estimatedDelivery || 'In Transit'}
              </div>
            </div>

            <button
              onClick={() => setInvoiceOrder(activeOrder)}
              className="btn-secondary"
              style={{ padding: '0.55rem 1rem', fontSize: '0.82rem' }}
            >
              <Printer size={14} />
              <span>Print Invoice</span>
            </button>
          </div>
        </div>

        {/* Split Section: Tracking Timeline & Destination Info */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            padding: '2.5rem 2rem'
          }}
        >
          {/* Left: Interactive Vertical Stepper */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Truck size={18} style={{ color: 'var(--accent-primary)' }} />
              <span>Flight & Dispatch Milestones</span>
            </h3>

            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
              {/* Stepper Vertical Line */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  bottom: '12px',
                  left: '11px',
                  width: '2px',
                  backgroundColor: 'var(--border-subtle)'
                }}
              />

              {activeOrder.trackingSteps &&
                activeOrder.trackingSteps.map((step, idx) => {
                  return (
                    <div
                      key={idx}
                      style={{
                        position: 'relative',
                        marginBottom: idx === activeOrder.trackingSteps.length - 1 ? 0 : '1.75rem'
                      }}
                    >
                      {/* Step Dot */}
                      <div
                        style={{
                          position: 'absolute',
                          left: '-2rem',
                          top: '2px',
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: step.completed
                            ? '#10b981'
                            : step.active
                            ? 'var(--accent-primary)'
                            : 'var(--bg-tertiary)',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '2px solid var(--bg-secondary)',
                          boxShadow: step.completed || step.active ? '0 0 10px rgba(16, 185, 129, 0.4)' : 'none'
                        }}
                      >
                        {step.completed ? <CheckCircle2 size={13} /> : <Clock size={12} />}
                      </div>

                      <div style={{ fontWeight: step.completed || step.active ? 800 : 500, fontSize: '0.94rem', color: step.completed || step.active ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                        {step.label}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                        {step.time}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Right: Destination, Items, & Carrier Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Delivery Destination Card */}
            <div
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                <MapPin size={14} style={{ color: 'var(--accent-secondary)' }} />
                <span>Delivery Address & Recipient</span>
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.94rem' }}>
                {activeOrder.shippingDetails?.firstName} {activeOrder.shippingDetails?.lastName}
              </div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '0.2rem' }}>
                {activeOrder.shippingDetails?.address}<br />
                {activeOrder.shippingDetails?.city}, {activeOrder.shippingDetails?.state} {activeOrder.shippingDetails?.zip}<br />
                {activeOrder.shippingDetails?.country}
              </div>
            </div>

            {/* Package Contents */}
            <div
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Package Items ({activeOrder.items?.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {activeOrder.items?.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                      src={item.product?.images?.[0]}
                      alt={item.product?.name}
                      style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.84rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.product?.name}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                        Qty: {item.quantity} • {item.selectedColor}
                      </div>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.86rem' }}>
                      {formatPrice((item.product?.price || 0) * item.quantity, currency)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Courier Guarantee */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: '#10b981' }}>
              <ShieldCheck size={16} />
              <span>Tamper-evident laser hologram packaging seal intact.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentTrackingView;
