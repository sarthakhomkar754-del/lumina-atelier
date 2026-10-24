import React from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';
import {
  Sparkles,
  Laptop,
  Headphones,
  Watch,
  Gamepad2,
  Footprints,
  Shirt,
  Lamp,
  Droplets,
  Coffee,
  Dumbbell,
  Camera,
  Briefcase
} from 'lucide-react';

const iconMap = {
  Sparkles,
  Laptop,
  Headphones,
  Watch,
  Gamepad2,
  Footprints,
  Shirt,
  Lamp,
  Droplets,
  Coffee,
  Dumbbell,
  Camera,
  Briefcase
};

export const CategoryPills = () => {
  const { selectedCategory, setSelectedCategory } = useStore();

  return (
    <div
      style={{
        maxWidth: '1360px',
        margin: '2rem auto 1rem auto',
        padding: '0 1.25rem'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {CATEGORIES.map((cat) => {
          const IconComponent = iconMap[cat.icon] || Sparkles;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0.6rem 1.15rem',
                borderRadius: isSelected ? '18px 4px 18px 4px' : 'var(--radius-full)',
                fontSize: '0.86rem',
                fontWeight: isSelected ? 700 : 500,
                whiteSpace: 'nowrap',
                backgroundColor: isSelected ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                color: isSelected ? '#fbf8f3' : 'var(--text-secondary)',
                border: isSelected
                  ? '1px solid var(--accent-primary)'
                  : '1px solid var(--border-subtle)',
                boxShadow: isSelected
                  ? '0 4px 14px rgba(92, 58, 33, 0.22)'
                  : 'var(--shadow-sm)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <IconComponent size={16} />
              <span>{cat.name}</span>
              <span
                style={{
                  fontSize: '0.72rem',
                  padding: '0.1rem 0.45rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: isSelected ? 'rgba(251, 248, 243, 0.22)' : 'var(--bg-tertiary)',
                  color: isSelected ? '#fbf8f3' : 'var(--text-muted)'
                }}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
