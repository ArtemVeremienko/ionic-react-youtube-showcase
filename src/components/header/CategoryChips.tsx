import React from 'react';
import { CATEGORIES } from '../../mock/data';

interface CategoryChipsProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div
      className="no-scrollbar"
      style={{
        display: 'flex',
        overflowX: 'auto',
        padding: '8px 16px',
        background: 'var(--yt-bg)',
        gap: '8px',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        borderBottom: '1px solid var(--yt-border)',
      }}
    >
      {CATEGORIES.map((category) => {
        const isActive = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`category-chip ${isActive ? 'active' : ''}`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};
