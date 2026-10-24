import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle, AlertTriangle, XCircle, Info, X, RotateCcw } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div
      role="region"
      aria-live="polite"
      aria-label="Notifications"
      className="toast-container"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isError = toast.type === 'error';

        const borderColor = isSuccess
          ? '#10b981'
          : isWarning
          ? '#f59e0b'
          : isError
          ? '#f43f5e'
          : 'var(--accent-primary)';

        return (
          <div
            key={toast.id}
            role="status"
            aria-atomic="true"
            className="glass-panel animate-scale-up"
            style={{
              padding: '0.85rem 1rem',
              backgroundColor: 'var(--bg-secondary)',
              borderLeft: `4px solid ${borderColor}`,
              borderTop: '1px solid var(--border-light)',
              borderRight: '1px solid var(--border-light)',
              borderBottom: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              pointerEvents: 'auto'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              {isSuccess && <CheckCircle size={18} style={{ color: '#10b981', flexShrink: 0 }} />}
              {isWarning && <AlertTriangle size={18} style={{ color: '#f59e0b', flexShrink: 0 }} />}
              {isError && <XCircle size={18} style={{ color: '#f43f5e', flexShrink: 0 }} />}
              {!isSuccess && !isWarning && !isError && <Info size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />}

              <div>
                <div style={{ fontWeight: 700, fontSize: '0.84rem' }}>{toast.title}</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>{toast.message}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {toast.undoAction && (
                <button
                  onClick={() => {
                    toast.undoAction();
                    removeToast(toast.id);
                  }}
                  aria-label="Undo action"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.74rem',
                    color: 'var(--accent-primary)',
                    fontWeight: 700,
                    padding: '0.2rem 0.5rem',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: 'rgba(92, 58, 33, 0.1)'
                  }}
                >
                  <RotateCcw size={12} />
                  <span>Undo</span>
                </button>
              )}
              <button
                onClick={() => removeToast(toast.id)}
                aria-label="Dismiss notification"
                style={{ color: 'var(--text-muted)', display: 'flex', padding: '0.2rem' }}
              >
                <X size={14} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
