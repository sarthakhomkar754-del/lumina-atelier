import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import confetti from 'canvas-confetti';
import { X, Sparkles, ArrowRight } from 'lucide-react';

const PRIZES = [
  { label: '20% OFF', code: 'VIBE20', color: '#0d9488' },
  { label: 'FREE SHIPPING', code: 'FREESHIP', color: '#0284c7' },
  { label: '10% OFF', code: 'DROP10', color: '#f43f5e' },
  { label: '$50 CREDIT', code: 'CYBER50', color: '#d97706' },
  { label: 'EXTRA 20% OFF', code: 'VIBE20', color: '#059669' },
  { label: 'PRIORITY VIP PASS', code: 'FREESHIP', color: '#475569' }
];

export const PromoWheelModal = () => {
  const { isSpinWheelOpen, setIsSpinWheelOpen, applyCoupon, addToast } = useStore();
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState(null);

  if (!isSpinWheelOpen) return null;

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setWonPrize(null);

    // Pick a winning index (0 to PRIZES.length - 1)
    const prizeIndex = Math.floor(Math.random() * PRIZES.length);
    const sliceAngle = 360 / PRIZES.length;
    // 5 full rotations + offset for the selected slice
    const totalRotation = rotation + 1800 + (PRIZES.length - prizeIndex) * sliceAngle;

    setRotation(totalRotation);

    setTimeout(() => {
      setSpinning(false);
      const prize = PRIZES[prizeIndex];
      setWonPrize(prize);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}

      addToast({
        title: `🎉 You Won ${prize.label}!`,
        message: `Use code ${prize.code} at checkout.`,
        type: 'success'
      });
    }, 4000);
  };

  const handleClaim = () => {
    if (wonPrize) {
      applyCoupon(wonPrize.code);
      setIsSpinWheelOpen(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={() => !spinning && setIsSpinWheelOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Promo Prize Wheel"
    >
      <div
        className="glass-panel animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '520px',
          width: '100%',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          padding: '2rem',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <button
          onClick={() => setIsSpinWheelOpen(false)}
          className="icon-btn"
          style={{ position: 'absolute', top: '1rem', right: '1rem', width: '32px', height: '32px' }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-pink)', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.85rem' }}>
          <Sparkles size={16} />
          <span>CYBER REWARDS GENERATOR</span>
        </div>

        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.4rem' }}>
          Spin & Unlock Exclusive Drop Perks
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
          Every spin is guaranteed to unlock a sitewide discount or free courier upgrade!
        </p>

        {/* Wheel Container */}
        <div style={{ position: 'relative', width: '280px', height: '280px', margin: '0 auto 1.75rem auto' }}>
          {/* Wheel Pointer */}
          <div
            style={{
              position: 'absolute',
              top: '-14px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
              width: 0,
              height: 0,
              borderLeft: '12px solid transparent',
              borderRight: '12px solid transparent',
              borderTop: '24px solid #f43f5e',
              filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))'
            }}
          />

          {/* Rotating Wheel Disc */}
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 8px 30px rgba(15, 23, 42, 0.25), inset 0 0 15px rgba(0,0,0,0.4)',
              border: '6px solid var(--bg-tertiary)',
              transition: 'transform 4s cubic-bezier(0.15, 0.9, 0.2, 1)',
              transform: `rotate(${rotation}deg)`
            }}
          >
            {PRIZES.map((prize, idx) => {
              const deg = (360 / PRIZES.length) * idx;
              return (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    width: '50%',
                    height: '50%',
                    backgroundColor: prize.color,
                    transformOrigin: 'bottom right',
                    transform: `rotate(${deg}deg) skewY(${90 - 360 / PRIZES.length}deg)`,
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}
                />
              );
            })}

            {/* Prize Labels */}
            {PRIZES.map((prize, idx) => {
              const deg = (360 / PRIZES.length) * idx + 360 / (PRIZES.length * 2);
              return (
                <div
                  key={`label-${idx}`}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '120px',
                    marginLeft: '-60px',
                    marginTop: '-10px',
                    transform: `rotate(${deg}deg) translate(80px) rotate(90deg)`,
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.68rem',
                    textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                    textAlign: 'center',
                    pointerEvents: 'none'
                  }}
                >
                  {prize.label}
                </div>
              );
            })}
          </div>

          {/* Center Hub */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-secondary)',
              border: '3px solid #fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
              zIndex: 5,
              color: 'var(--accent-primary)',
              fontWeight: 900,
              fontSize: '1rem'
            }}
          >
            ⚡
          </div>
        </div>

        {/* Won Prize Display or Spin Button */}
        {wonPrize ? (
          <div className="animate-scale-up" style={{ marginBottom: '1rem' }}>
            <div
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                marginBottom: '1rem'
              }}
            >
              <div style={{ color: '#10b981', fontWeight: 800, fontSize: '1.15rem', marginBottom: '0.2rem' }}>
                🎊 You Won: {wonPrize.label}!
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Promo code: <strong style={{ color: '#fff' }}>{wonPrize.code}</strong>
              </div>
            </div>
            <button
              onClick={handleClaim}
              className="btn-primary"
              style={{ width: '100%', padding: '0.8rem', justifyContent: 'center' }}
            >
              <span>Auto-Apply Discount & Shop</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={handleSpin}
            disabled={spinning}
            className="btn-glow"
            style={{
              width: '100%',
              padding: '0.85rem',
              justifyContent: 'center',
              cursor: spinning ? 'not-allowed' : 'pointer'
            }}
          >
            <Sparkles size={16} />
            <span>{spinning ? 'Calculating Coordinates...' : 'Spin the Wheel Now'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PromoWheelModal;
