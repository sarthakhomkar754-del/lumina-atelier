import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

export const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [showRestoredNotice, setShowRestoredNotice] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowRestoredNotice(true);
      const timer = setTimeout(() => {
        setShowRestoredNotice(false);
      }, 3500);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowRestoredNotice(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showRestoredNotice) {
    return null;
  }

  return (
    <aside
      aria-label="Network status"
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        top: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2500,
        pointerEvents: 'none'
      }}
    >
      <div
        className="glass-panel animate-scale-up"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.65rem',
          padding: '0.55rem 1.15rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.82rem',
          fontWeight: 700,
          backgroundColor: isOnline ? 'rgba(16, 185, 129, 0.95)' : 'rgba(217, 119, 6, 0.95)',
          color: '#ffffff',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
          border: `1px solid ${isOnline ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.25)'}`,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          letterSpacing: '0.01em',
          pointerEvents: 'auto'
        }}
      >
        {isOnline ? (
          <>
            <Wifi size={15} style={{ strokeWidth: 2.5 }} />
            <span>Connection Restored — Synchronized</span>
          </>
        ) : (
          <>
            <WifiOff size={15} style={{ strokeWidth: 2.5 }} />
            <span>Atelier Offline — Bag & Cache Persisted</span>
          </>
        )}
      </div>
    </aside>
  );
};

export default OfflineIndicator;
