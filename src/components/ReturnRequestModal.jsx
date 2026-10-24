import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/currency';
import {
  X,
  RotateCcw,
  CheckCircle,
  ShieldCheck,
  Printer,
  Copy,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ReturnRequestModal = () => {
  const {
    isReturnModalOpen,
    setIsReturnModalOpen,
    returnOrderTarget,
    setReturnOrderTarget,
    requestReturn,
    currency,
    currentUser,
    addToast
  } = useStore();

  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [returnReason, setReturnReason] = useState('Aesthetic or ergonomic mismatch with workspace');
  const [returnResolution, setReturnResolution] = useState('Store Credit (+5% VIP Bonus)');
  const [customerNotes, setCustomerNotes] = useState('');
  const [confirmedRma, setConfirmedRma] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isReturnModalOpen || !returnOrderTarget) return null;

  const items = returnOrderTarget.items || [];
  const activeItem = items[selectedItemIndex] || items[0];

  const handleClose = () => {
    setIsReturnModalOpen(false);
    setReturnOrderTarget(null);
    setConfirmedRma(null);
    setCustomerNotes('');
    setSelectedItemIndex(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activeItem) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const createdRma = requestReturn({
        orderId: returnOrderTarget.orderId,
        item: activeItem,
        reason: returnReason,
        resolution: returnResolution,
        comments: customerNotes
      });
      setConfirmedRma(createdRma);
      setIsSubmitting(false);
    }, 600);
  };

  const handleCopy = (text, label) => {
    navigator.clipboard?.writeText(text);
    addToast({
      title: 'Copied to Clipboard',
      message: `${label}: ${text}`,
      type: 'info'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="modal-backdrop"
      onClick={handleClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 10, 12, 0.78)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-glow)',
          boxShadow: 'var(--shadow-2xl)',
          padding: '2rem',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)'
          }}
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: 'rgba(217, 119, 6, 0.14)',
              color: 'var(--accent-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <RotateCcw size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
              {confirmedRma ? 'Return Authorized' : 'Initiate Self-Service Return'}
            </h2>
            <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Order #{returnOrderTarget.orderId} • 30-Day Unconditional Hardware Trial Guarantee
            </p>
          </div>
        </div>

        {confirmedRma ? (
          /* Confirmation & Return Label View */
          <div>
            <div
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                textAlign: 'center',
                marginBottom: '1.5rem'
              }}
            >
              <CheckCircle size={36} style={{ color: '#10b981', margin: '0 auto 0.5rem auto' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: '#10b981' }}>
                Return Merchandise Authorization #{confirmedRma.id}
              </h3>
              <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Your prepaid DHL Express Air return slip has been generated and emailed to{' '}
                <strong>{currentUser?.email || confirmedRma.customerEmail}</strong>.
              </p>
            </div>

            {/* Printable Return Waybill Slip */}
            <div
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-lg)',
                border: '1px dashed var(--border-light)',
                padding: '1.5rem',
                marginBottom: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 800 }}>
                    Prepaid Air Return Waybill
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>{confirmedRma.returnWaybill}</span>
                    <button
                      onClick={() => handleCopy(confirmedRma.returnWaybill, 'Waybill')}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-secondary)' }}
                      title="Copy Waybill"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Courier Dispatch</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-secondary)' }}>
                    {confirmedRma.returnCarrier}
                  </div>
                </div>
              </div>

              {/* Item Details */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.85rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '1rem'
                }}
              >
                <img
                  src={confirmedRma.item.image}
                  alt={confirmedRma.item.name}
                  style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: 'var(--radius-xs)' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {confirmedRma.item.name}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    Finish: {confirmedRma.item.color} • Qty: {confirmedRma.item.quantity}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Estimated Credit</div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#10b981' }}>
                    {formatPrice(confirmedRma.refundAmount, currency)}
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--text-primary)' }}>Drop-off Instructions:</strong>
                <ol style={{ paddingLeft: '1.25rem', margin: '0.35rem 0 0 0' }}>
                  <li>Pack hardware in the original Pelican/magnetic atelier packaging.</li>
                  <li>Affix or show this digital QR waybill at any authorized DHL Express Air point.</li>
                  <li>Upon clean-room inspection scan, your {confirmedRma.resolution} will be credited instantly.</li>
                </ol>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                onClick={handlePrint}
                className="btn-secondary"
                style={{
                  padding: '0.65rem 1.25rem',
                  fontSize: '0.84rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem'
                }}
              >
                <Printer size={15} />
                <span>Print Return Slip</span>
              </button>
              <button
                onClick={handleClose}
                className="btn-primary"
                style={{ padding: '0.65rem 1.5rem', fontSize: '0.84rem' }}
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Request Form */
          <form onSubmit={handleSubmit}>
            {/* Step 1: Select Item to Return */}
            {items.length > 1 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Select Item to Return
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {items.map((it, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedItemIndex(idx)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: selectedItemIndex === idx ? 'rgba(92, 58, 33, 0.12)' : 'var(--bg-tertiary)',
                        border: `1px solid ${selectedItemIndex === idx ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span style={{ fontSize: '0.86rem', fontWeight: 600 }}>
                        {it.product?.name || it.name} ({it.selectedColor || it.color || 'Default'})
                      </span>
                      <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--accent-secondary)' }}>
                        {formatPrice(it.product?.price || it.price, currency)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Item Summary */}
            {activeItem && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.85rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.25rem',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <img
                  src={activeItem.product?.images?.[0] || activeItem.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'}
                  alt={activeItem.product?.name || activeItem.name}
                  style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: 'var(--radius-xs)' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {activeItem.product?.name || activeItem.name}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    Color: {activeItem.selectedColor || activeItem.color || 'Standard'} • Qty: {activeItem.quantity || 1}
                  </div>
                </div>
                <div style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                  {formatPrice((activeItem.product?.price || activeItem.price || 0) * (activeItem.quantity || 1), currency)}
                </div>
              </div>
            )}

            {/* Reason Selector */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.45rem' }}>
                Reason for Return
              </label>
              <select
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-primary)',
                  fontSize: '0.86rem'
                }}
              >
                <option value="Aesthetic or ergonomic mismatch with workspace">Aesthetic or ergonomic mismatch with workspace</option>
                <option value="Hardware discrepancy or defective port/acoustic sensor">Hardware discrepancy or defective port/sensor</option>
                <option value="Selected incorrect chassis specification or finish">Selected incorrect specification or finish</option>
                <option value="Changed mind within 30-day trial period">Changed mind within 30-day trial period</option>
                <option value="Accidental order / duplicate purchase">Accidental order / duplicate purchase</option>
              </select>
            </div>

            {/* Resolution Selector */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.45rem' }}>
                Preferred Resolution
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div
                  onClick={() => setReturnResolution('Store Credit (+5% VIP Bonus)')}
                  style={{
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: `1.5px solid ${returnResolution.includes('Store Credit') ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                    backgroundColor: returnResolution.includes('Store Credit') ? 'rgba(92, 58, 33, 0.12)' : 'var(--bg-tertiary)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700, fontSize: '0.84rem', color: 'var(--accent-secondary)' }}>
                    <Sparkles size={14} />
                    <span>Store Credit</span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 700, marginTop: '0.2rem' }}>
                    +5% VIP Bonus Credit
                  </div>
                </div>

                <div
                  onClick={() => setReturnResolution('Original Payment Method')}
                  style={{
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: `1.5px solid ${returnResolution === 'Original Payment Method' ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                    backgroundColor: returnResolution === 'Original Payment Method' ? 'rgba(92, 58, 33, 0.12)' : 'var(--bg-tertiary)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.84rem', color: 'var(--text-primary)' }}>
                    Original Payment
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Refunded in 2-4 business days
                  </div>
                </div>
              </div>
            </div>

            {/* Client Comments */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.45rem' }}>
                Additional Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Share any additional feedback for our clean-room inspection team..."
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-primary)',
                  fontSize: '0.84rem',
                  resize: 'none'
                }}
              />
            </div>

            {/* Policy Reminder */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.76rem',
                color: 'var(--text-muted)',
                marginBottom: '1.5rem',
                padding: '0.65rem',
                backgroundColor: 'rgba(217, 119, 6, 0.08)',
                borderRadius: 'var(--radius-xs)'
              }}
            >
              <ShieldCheck size={16} style={{ color: 'var(--accent-secondary)', flexShrink: 0 }} />
              <span>
                Prepaid DHL air freight is covered 100% by LUMINA Atelier. No restocking or handling fees.
              </span>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={handleClose}
                className="btn-secondary"
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.84rem' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{
                  padding: '0.65rem 1.5rem',
                  fontSize: '0.84rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem'
                }}
              >
                <span>{isSubmitting ? 'Generating Waybill...' : 'Generate Return Slip'}</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReturnRequestModal;
