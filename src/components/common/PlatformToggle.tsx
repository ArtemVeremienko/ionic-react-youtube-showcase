import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { moonOutline, sunnyOutline, logoApple, logoAndroid } from 'ionicons/icons';
import { useAppTheme } from '../../context/ThemeContext';

export const PlatformToggle: React.FC = () => {
  const { theme, platformMode, toggleTheme, togglePlatformMode } = useAppTheme();

  return (
    <div
      style={{
        position: 'fixed',
        top: 60,
        right: 16,
        zIndex: 9999,
        display: 'flex',
        gap: 6,
        background: 'rgba(20, 20, 20, 0.85)',
        backdropFilter: 'blur(12px)',
        padding: '4px 8px',
        borderRadius: 24,
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
      }}
    >
      <button
        onClick={toggleTheme}
        title="Toggle Dark / Light Theme"
        style={{
          background: 'transparent',
          border: 'none',
          color: theme === 'dark' ? '#ffcc00' : '#ffffff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          fontSize: '0.75rem',
          fontWeight: 600,
          padding: '4px 8px',
          borderRadius: 16,
        }}
      >
        <IonIcon icon={theme === 'dark' ? sunnyOutline : moonOutline} style={{ fontSize: '1rem' }} />
        {theme === 'dark' ? 'Light' : 'Dark'}
      </button>

      <div style={{ width: 1, height: 16, background: 'rgba(255, 255, 255, 0.2)', alignSelf: 'center' }} />

      <button
        onClick={togglePlatformMode}
        title="Toggle iOS vs Material Design (MD) styling mode"
        style={{
          background: 'transparent',
          border: 'none',
          color: platformMode === 'ios' ? '#3ea6ff' : '#00e676',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          fontSize: '0.75rem',
          fontWeight: 600,
          padding: '4px 8px',
          borderRadius: 16,
        }}
      >
        <IonIcon icon={platformMode === 'ios' ? logoApple : logoAndroid} style={{ fontSize: '1rem' }} />
        {platformMode.toUpperCase()}
      </button>
    </div>
  );
};
