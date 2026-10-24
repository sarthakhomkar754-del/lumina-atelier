import React from 'react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/currency';
import { X, Printer, CheckCircle, ShieldCheck } from 'lucide-react';

export const InvoiceModal = () => {
  const { invoiceOrder, setInvoiceOrder, currency } = useStore();

  if (!invoiceOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(invoiceOrder.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div
      className="modal-overlay"
      onClick={() => setInvoiceOrder(null)}
      role="dialog"
      aria-modal="true"
      aria-label="Official Invoice"
    >
      <div
        className="glass-panel animate-scale-up invoice-container"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '800px',
          width: '100%',
          maxHeight: '92dvh',
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          color: '#0f172a',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative'
        }}
      >
        {/* Action Header (Hidden during print) */}
        <div
          className="no-print"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid #e2e8f0'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: '#dcfce7',
                color: '#15803d',
                padding: '0.3rem 0.65rem',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: 700
              }}
            >
              <CheckCircle size={14} />
              <span>Official Tax Invoice</span>
            </span>
            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Order {invoiceOrder.orderId}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button
              onClick={handlePrint}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Printer size={15} />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => setInvoiceOrder(null)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#f1f5f9',
                color: '#475569',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Invoice Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '2.5rem'
          }}
        >
          <div>
            <div
              style={{
                fontSize: '1.6rem',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                color: '#0f172a',
                marginBottom: '0.25rem'
              }}
            >
              LUMINA<span style={{ color: '#0d9488' }}>//</span> ATELIER
            </div>
            <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5 }}>
              Aerospace Metallurgy & Digital Couture Inc.<br />
              100 Cybernetics Boulevard, Suite 500<br />
              San Francisco, CA 94107, USA<br />
              VAT / Tax ID: US-948201940
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
              INVOICE
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              <strong>Invoice #:</strong> INV-{invoiceOrder.orderId}<br />
              <strong>Order Date:</strong> {formattedDate}<br />
              <strong>Status:</strong> {invoiceOrder.trackingStatus || 'Paid / Confirmed'}
            </div>
          </div>
        </div>

        {/* Bill To & Dispatch To */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            padding: '1.25rem',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            marginBottom: '2rem',
            border: '1px solid #e2e8f0'
          }}
        >
          <div>
            <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', marginBottom: '0.4rem' }}>
              Delivered & Invoiced To:
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
              {invoiceOrder.shippingDetails?.firstName} {invoiceOrder.shippingDetails?.lastName}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
              {invoiceOrder.shippingDetails?.address}<br />
              {invoiceOrder.shippingDetails?.city}, {invoiceOrder.shippingDetails?.state} {invoiceOrder.shippingDetails?.zip}<br />
              {invoiceOrder.shippingDetails?.country}<br />
              Email: {invoiceOrder.shippingDetails?.email}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', marginBottom: '0.4rem' }}>
              Logistics & Payment:
            </div>
            <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
              <strong>Carrier:</strong> {invoiceOrder.carrier || 'DHL Express Global Air'}<br />
              <strong>Tracking:</strong> {invoiceOrder.trackingNumber || 'DHL-EXP-489281'}<br />
              <strong>Payment:</strong> {invoiceOrder.paymentMethod === 'applepay' ? 'Apple Pay (Instant Token)' : `Card ending in •••• ${invoiceOrder.cardLast4 || '4242'}`}<br />
              <strong>Delivery ETA:</strong> {invoiceOrder.estimatedDelivery || '2-3 Business Days'}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '2rem'
          }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid #0f172a', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem 0.5rem', fontSize: '0.76rem', textTransform: 'uppercase', color: '#64748b' }}>
                Item Description
              </th>
              <th style={{ padding: '0.75rem 0.5rem', fontSize: '0.76rem', textTransform: 'uppercase', color: '#64748b', textAlign: 'center' }}>
                Qty
              </th>
              <th style={{ padding: '0.75rem 0.5rem', fontSize: '0.76rem', textTransform: 'uppercase', color: '#64748b', textAlign: 'right' }}>
                Unit Price
              </th>
              <th style={{ padding: '0.75rem 0.5rem', fontSize: '0.76rem', textTransform: 'uppercase', color: '#64748b', textAlign: 'right' }}>
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceOrder.items.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '1rem 0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                      src={item.product?.images?.[0] || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=200&q=80'}
                      alt={item.product?.name}
                      style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>
                        {item.product?.name}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
                        {item.selectedColor} • {item.selectedSize}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem 0.5rem', textAlign: 'center', fontWeight: 600, fontSize: '0.86rem' }}>
                  {item.quantity}
                </td>
                <td style={{ padding: '1rem 0.5rem', textAlign: 'right', fontSize: '0.86rem', color: '#475569' }}>
                  {formatPrice(item.product?.price || 0, currency)}
                </td>
                <td style={{ padding: '1rem 0.5rem', textAlign: 'right', fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>
                  {formatPrice((item.product?.price || 0) * item.quantity, currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals Summary */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2.5rem' }}>
          <div style={{ width: '280px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', fontSize: '0.84rem', color: '#475569' }}>
              <span>Subtotal:</span>
              <span>{formatPrice(invoiceOrder.summary?.subtotal || 0, currency)}</span>
            </div>
            {invoiceOrder.summary?.discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', fontSize: '0.84rem', color: '#16a34a' }}>
                <span>Discounts Applied:</span>
                <span>-{formatPrice(invoiceOrder.summary?.discountAmount, currency)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', fontSize: '0.84rem', color: '#475569' }}>
              <span>Express Air Courier:</span>
              <span>{invoiceOrder.summary?.shipping === 0 ? 'FREE' : formatPrice(invoiceOrder.summary?.shipping || 0, currency)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', fontSize: '0.84rem', color: '#475569' }}>
              <span>Estimated Tax (8%):</span>
              <span>{formatPrice(invoiceOrder.summary?.tax || 0, currency)}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '0.75rem',
                marginTop: '0.5rem',
                borderTop: '2px solid #0f172a',
                fontWeight: 900,
                fontSize: '1.15rem',
                color: '#0f172a'
              }}
            >
              <span>Total Paid:</span>
              <span>{formatPrice(invoiceOrder.summary?.total || 0, currency)}</span>
            </div>
          </div>
        </div>

        {/* Footer Guarantee & Barcode simulation */}
        <div
          style={{
            borderTop: '1px solid #e2e8f0',
            paddingTop: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.76rem',
            color: '#64748b'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldCheck size={16} style={{ color: '#0d9488' }} />
            <span>Includes Official 2-Year Full Hardware Coverage and 30-Day Evaluation Period.</span>
          </div>

          <div style={{ textAlign: 'right', fontFamily: 'monospace', letterSpacing: '0.1em', fontSize: '0.82rem', color: '#0f172a', fontWeight: 700 }}>
            ||| | ||||| || |||| |||| ||
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
