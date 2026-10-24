import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  BellRing,
  Mail,
  CheckCircle,
  Sparkles,
  Users
} from 'lucide-react';

export const RestockModal = () => {
  const {
    isRestockModalOpen,
    setIsRestockModalOpen,
    restockModalProduct,
    setRestockModalProduct,
    joinRestockWaitlist,
    currentUser,
    restockWaitlist
  } = useStore();

  const [email, setEmail] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('Default');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isRestockModalOpen || !restockModalProduct) return null;

  const currentSubscribers = restockWaitlist[restockModalProduct.id]?.length || 142;

  const handleClose = () => {
    setIsRestockModalOpen(false);
    setRestockModalProduct(null);
    setIsSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const targetEmail = email.trim() || currentUser?.email;
    if (!targetEmail) return;

    const success = joinRestockWaitlist(restockModalProduct.id, targetEmail, selectedVariant);
    if (success) {
      setIsSubmitted(true);
      setTimeout(() => {
        handleClose();
      }, 2400);
    }
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
          maxWidth: '520px',
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
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }}
        >
          <X size={15} />
        </button>

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}
            >
              <CheckCircle size={32} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 0.4rem 0' }}>
              You're on the VIP Waitlist!
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0 }}>
              We'll send an instant priority alert the second new {restockModalProduct.name} units pass clean-room inspection.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(217, 119, 6, 0.12)',
                  color: 'var(--accent-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <BellRing size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                  Back-in-Stock Priority Alert
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--accent-secondary)', marginTop: '0.15rem' }}>
                  <Users size={12} />
                  <span>{currentSubscribers} buyers currently on the waitlist</span>
                </div>
              </div>
            </div>

            {/* Product Snapshot */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.25rem',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <img
                src={restockModalProduct.images[0]}
                alt={restockModalProduct.name}
                style={{ width: '52px', height: '52px', objectFit: 'cover', borderRadius: 'var(--radius-xs)' }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {restockModalProduct.name}
                </div>
                <div style={{ fontSize: '0.76rem', color: '#f43f5e', fontWeight: 700, marginTop: '0.15rem' }}>
                  Currently Sold Out • Restocking in 3-5 days
                </div>
              </div>
            </div>

            {/* Finish Selection if available */}
            {restockModalProduct.colors && restockModalProduct.colors.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Preferred Finish / Specification
                </label>
                <select
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-primary)',
                    fontSize: '0.84rem'
                  }}
                >
                  {restockModalProduct.colors.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Email Input */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Your Notification Email
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter email for instant drop alert..."
                  defaultValue={currentUser?.email || ''}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem 0.65rem 2.25rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-primary)',
                    fontSize: '0.86rem'
                  }}
                />
                <Mail
                  size={15}
                  style={{
                    position: 'absolute',
                    left: '0.8rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)'
                  }}
                />
              </div>
            </div>

            {/* Assurance */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.74rem',
                color: 'var(--text-muted)',
                marginBottom: '1.25rem'
              }}
            >
              <Sparkles size={13} style={{ color: 'var(--accent-secondary)' }} />
              <span>Waitlist members receive 1-hour early access before public release. Zero spam guarantee.</span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={handleClose}
                className="btn-secondary"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.84rem' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '0.6rem 1.5rem', fontSize: '0.84rem' }}
              >
                Join VIP Waitlist
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RestockModal;
