import React from 'react';
import { useStore } from '../context/StoreContext';
import { Command, X, Search, ShoppingBag, Heart, Compass, Package, Sparkles } from 'lucide-react';

export const KeyboardShortcutsModal = () => {
  const { isShortcutsOpen, setIsShortcutsOpen } = useStore();

  if (!isShortcutsOpen) return null;

  const shortcutGroups = [
    {
      group: 'Quick Triggers',
      items: [
        { keys: ['⌘', 'K'], altKeys: ['Ctrl', 'K'], label: 'Spotlight Search', icon: <Search size={14} /> },
        { keys: ['/'], label: 'Focus Search Bar', icon: <Search size={14} /> },
        { keys: ['C'], label: 'Toggle Shopping Bag', icon: <ShoppingBag size={14} /> },
        { keys: ['W'], label: 'Toggle Wishlist Drawer', icon: <Heart size={14} /> },
        { keys: ['P'], label: 'VIP Reward Wheel', icon: <Sparkles size={14} /> }
      ]
    },
    {
      group: 'Navigation',
      items: [
        { keys: ['H'], label: 'Navigate to Atelier Home', icon: <Compass size={14} /> },
        { keys: ['S'], label: 'Browse Shop Catalog', icon: <Compass size={14} /> },
        { keys: ['T'], label: 'Track Global Shipment', icon: <Package size={14} /> },
        { keys: ['?'], label: 'Open Shortcuts Cheat-Sheet', icon: <Command size={14} /> }
      ]
    },
    {
      group: 'System & Modals',
      items: [
        { keys: ['Esc'], label: 'Dismiss Active Modal or Drawer', icon: <X size={14} /> }
      ]
    }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard Shortcuts Atelier Guide"
      className="modal-overlay"
      onClick={() => setIsShortcutsOpen(false)}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 2200,
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
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-card)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'rgba(92, 58, 33, 0.1)',
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Command size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Keyboard Shortcuts</h3>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Navigate the LUMINA atelier at terminal speed
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsShortcutsOpen(false)}
            aria-label="Close shortcuts dialog"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '0.4rem',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem', maxHeight: '70vh', overflowY: 'auto' }}>
          {shortcutGroups.map((group) => (
            <div key={group.group} style={{ marginBottom: '1.5rem' }}>
              <div
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--accent-secondary)',
                  marginBottom: '0.75rem'
                }}
              >
                {group.group}
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.5rem',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                {group.items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.45rem 0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      transition: 'background-color var(--transition-fast)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'flex' }}>{item.icon}</span>
                      <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {item.label}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      {item.keys.map((k, kIdx) => (
                        <kbd
                          key={kIdx}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: '24px',
                            height: '24px',
                            padding: '0 0.45rem',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            fontFamily: 'monospace',
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border-light)',
                            borderRadius: 'var(--radius-xs)',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                            color: 'var(--text-primary)'
                          }}
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '0.85rem 1.5rem',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-card)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            textAlign: 'center'
          }}
        >
          Press <kbd style={{ padding: '0.1rem 0.35rem', borderRadius: '3px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}>Esc</kbd> anytime to return to the catalog
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsModal;
