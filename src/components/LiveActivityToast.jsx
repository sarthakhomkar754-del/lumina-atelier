import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, RECENT_ACTIVITY_MOCKS } from '../data/products';
import { CheckCircle, X } from 'lucide-react';

export const LiveActivityToast = () => {
  const { setQuickViewProduct, products } = useStore();
  const [currentActivity, setCurrentActivity] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const list = products && products.length > 0 ? products : PRODUCTS;
    let index = 0;
    const interval = setInterval(() => {
      const mock = RECENT_ACTIVITY_MOCKS[index % RECENT_ACTIVITY_MOCKS.length];
      const matchedProduct = list.find((p) => p.name.includes(mock.item.split(' ')[0])) || list[0];

      setCurrentActivity({
        ...mock,
        product: matchedProduct
      });

      // Show for 5.5 seconds then hide
      setTimeout(() => {
        setCurrentActivity(null);
      }, 5500);

      index++;
    }, 14000);

    return () => clearInterval(interval);
  }, [dismissed, products]);

  if (!currentActivity || dismissed) return null;

  return (
    <div
      className="glass-panel animate-scale-up"
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 80,
        maxWidth: '340px',
        padding: '0.65rem 0.85rem',
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-lg)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}
    >
      <img
        src={currentActivity.product.images[0]}
        alt={currentActivity.item}
        style={{
          width: '42px',
          height: '42px',
          borderRadius: 'var(--radius-xs)',
          objectFit: 'cover',
          border: '1px solid var(--border-subtle)'
        }}
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          <CheckCircle size={12} style={{ color: '#10b981' }} />
          <span>Verified Purchase</span>
          <span>• {currentActivity.time}</span>
        </div>
        <div
          onClick={() => setQuickViewProduct(currentActivity.product)}
          style={{
            fontWeight: 700,
            fontSize: '0.8rem',
            color: 'var(--text-primary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }}
        >
          {currentActivity.name} bought {currentActivity.item}
        </div>
      </div>

      <button
        onClick={() => setDismissed(true)}
        style={{ color: 'var(--text-muted)', padding: '0.2rem', display: 'flex' }}
        title="Dismiss activity alerts"
      >
        <X size={13} />
      </button>
    </div>
  );
};
