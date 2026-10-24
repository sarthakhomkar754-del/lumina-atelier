import React, { useState } from 'react';
import {
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Send,
  Sparkles
} from 'lucide-react';

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    category: 'Shipping & Delivery',
    question: 'How fast is worldwide dispatch and what are the shipping fees?',
    answer: 'All orders are dispatched within 48 hours via DHL Express Air or FedEx Priority Courier. Standard shipping is $15.00, or 100% FREE on all orders over $99. Delivery times range between 2 to 4 business days globally.'
  },
  {
    id: 'faq-2',
    category: 'Returns & Refunds',
    question: 'What is the 30-Day Evaluation Period & Return Policy?',
    answer: 'We provide an unconditional 30-day trial for all hardware drops. If the ergonomics, acoustic soundstage, or finishes do not meet your exact standards, initiate a return from your account. We provide prepaid DHL air return labels and issue a 100% refund immediately upon receipt.'
  },
  {
    id: 'faq-3',
    category: 'Warranty Coverage',
    question: 'How does the Official 2-Year Comprehensive Warranty work?',
    answer: 'Every LUMINA product includes automatic 2-year hardware coverage against mechanical failures, sensor discrepancies, battery degradation beyond 20%, and manufacturing imperfections. We dispatch advanced replacements before you even send back the defective unit.'
  },
  {
    id: 'faq-4',
    category: 'Payments & Security',
    question: 'Which payment methods, digital currencies, and cards are accepted?',
    answer: 'We accept all major credit/debit cards (Visa, MasterCard, American Express), Apple Pay, Google Pay, PayPal, and Cash on Delivery. All transactions are encrypted via 256-bit AES cryptographic tokenization.'
  },
  {
    id: 'faq-5',
    category: 'Orders & Tracking',
    question: 'How do I track my active order and download tax invoices?',
    answer: 'Navigate to "Track Order" in the top bar and enter your Order ID (e.g. LUM-847291). You can also view live status, dispatch waybills, and print official PDF tax invoices directly from your Orders & Account dashboard.'
  },
  {
    id: 'faq-6',
    category: 'Promo Codes',
    question: 'Are there any active discount or coupon codes?',
    answer: 'Yes! Active codes include VIBE20 (20% off everything), DROP10 (10% off sitewide), FREESHIP (100% free shipping), and CYBER50 ($50 off orders over $200). You can also spin the VIP Promo Wheel for instant mystery rewards!'
  }
];

export const HelpCenterView = () => {
  const [openFaq, setOpenFaq] = useState('faq-1');
  const [searchTerm, setSearchTerm] = useState('');

  // Live Concierge Chat simulation
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am LUMINA Concierge AI. How can I assist you with your orders, hardware specs, or delivery today?'
    }
  ]);
  const [userInput, setUserInput] = useState('');

  const filteredFaqs = FAQ_ITEMS.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (textToSend = null) => {
    const text = textToSend || userInput;
    if (!text.trim()) return;

    const userMsg = { sender: 'user', text: text.trim() };
    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setUserInput('');

    // Simulated smart assistant response
    setTimeout(() => {
      const q = text.toLowerCase();
      let reply = 'Thank you for reaching out! A dedicated concierge specialist has been notified. In the meantime, you can review live order dispatches in your account dashboard.';

      if (q.includes('track') || q.includes('where is my order') || q.includes('package')) {
        reply = 'You can track any dispatch in real time by opening our "Track Order" center. All shipments include live DHL Express flight telemetry and delivery estimates.';
      } else if (q.includes('return') || q.includes('refund')) {
        reply = 'We offer an unconditional 30-day evaluation period with prepaid DHL return labels. You can initiate a return directly from the My Orders tab.';
      } else if (q.includes('coupon') || q.includes('discount') || q.includes('code')) {
        reply = 'Active discount codes right now are VIBE20 (20% off), DROP10 (10% off), FREESHIP (Free express courier), and CYBER50 ($50 off over $200).';
      } else if (q.includes('warranty')) {
        reply = 'All drops include our comprehensive 2-Year Full Replacement Warranty against all hardware defects or battery degradation.';
      }

      setChatMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    }, 600);
  };

  return (
    <div
      style={{
        maxWidth: '1240px',
        margin: '2rem auto 5rem auto',
        padding: '0 1.25rem'
      }}
    >
      {/* Hero Header */}
      <div
        className="glass-panel"
        style={{
          padding: '2.5rem 2rem',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-light)',
          textAlign: 'center',
          marginBottom: '2.5rem',
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
            backgroundColor: 'rgba(92, 58, 33, 0.08)',
            color: 'var(--accent-primary)',
            fontSize: '0.78rem',
            fontWeight: 800,
            marginBottom: '1rem',
            border: '1px solid rgba(92, 58, 33, 0.22)'
          }}
        >
          <HelpCircle size={14} />
          <span>LUMINA CLIENT SERVICES & ATELIER SUPPORT</span>
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          How can we assist you today?
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '520px', margin: '0 auto 1.5rem auto' }}>
          Search our comprehensive knowledge base, chat with our instant concierge AI, or browse FAQs regarding shipping and returns.
        </p>

        {/* Search Input */}
        <div
          style={{
            maxWidth: '520px',
            margin: '0 auto',
            backgroundColor: 'var(--bg-tertiary)',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <input
            type="text"
            placeholder="Search FAQs (e.g. shipping speeds, 30-day returns, warranty)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
      </div>

      {/* Two-Column Grid: FAQ Accordion + Live Concierge Chat */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start'
        }}
      >
        {/* Left: Frequently Asked Questions */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={20} style={{ color: 'var(--accent-primary)' }} />
            <span>Frequently Asked Questions</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filteredFaqs.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                No questions matched your search query. Try other keywords or chat with our AI concierge below.
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="glass-panel"
                    style={{
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-secondary)',
                      border: `1px solid ${isOpen ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                      overflow: 'hidden',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      style={{
                        width: '100%',
                        padding: '1.15rem 1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textAlign: 'left',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        fontWeight: 700,
                        fontSize: '0.92rem'
                      }}
                    >
                      <span style={{ paddingRight: '1rem' }}>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp size={18} style={{ color: 'var(--accent-primary)' }} />
                      ) : (
                        <ChevronDown size={18} style={{ color: 'var(--text-muted)' }} />
                      )}
                    </button>

                    {isOpen && (
                      <div
                        style={{
                          padding: '0 1.25rem 1.25rem 1.25rem',
                          fontSize: '0.86rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.65,
                          borderTop: '1px solid var(--border-subtle)',
                          paddingTop: '0.85rem'
                        }}
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Live Interactive Concierge Chat Widget */}
        <div
          className="glass-panel"
          style={{
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-light)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            height: '540px'
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              padding: '1.25rem',
              backgroundColor: 'var(--bg-card)',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--gradient-brand)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}
              >
                <Sparkles size={16} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>
                  LUMINA Concierge Assistant
                </div>
                <div style={{ fontSize: '0.74rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                  <span>Online • Instant Response</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div
            style={{
              flex: 1,
              padding: '1.25rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem'
            }}
          >
            {chatMessages.map((msg, idx) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={idx}
                  style={{
                    alignSelf: isUser ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    backgroundColor: isUser ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                    color: isUser ? '#ffffff' : 'var(--text-primary)',
                    padding: '0.75rem 1rem',
                    borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    fontSize: '0.84rem',
                    lineHeight: 1.5,
                    border: `1px solid ${isUser ? 'transparent' : 'var(--border-subtle)'}`
                  }}
                >
                  {msg.text}
                </div>
              );
            })}
          </div>

          {/* Quick Prompt Suggestions */}
          <div style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap', borderTop: '1px solid var(--border-subtle)' }}>
            {[
              'Where is my package?',
              'How do returns work?',
              'Active promo codes?'
            ].map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                style={{
                  fontSize: '0.74rem',
                  padding: '0.25rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)',
                  cursor: 'pointer'
                }}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            style={{
              padding: '0.85rem 1rem',
              backgroundColor: 'var(--bg-card)',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              gap: '0.5rem'
            }}
          >
            <input
              type="text"
              placeholder="Ask anything about drops, shipping, or warranty..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              style={{
                flex: 1,
                padding: '0.55rem 0.85rem',
                fontSize: '0.82rem',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--text-primary)'
              }}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '0.55rem 1rem', borderRadius: 'var(--radius-full)' }}
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterView;
