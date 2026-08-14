import React from 'react';
import { IonIcon } from '@ionic/react';
import { play, pause, close } from 'ionicons/icons';
import { usePlayer } from '../../context/PlayerContext';

export const MiniPlayer: React.FC = () => {
  const {
    activeVideo,
    isMinimized,
    isPlaying,
    progressPercent,
    togglePlay,
    expandPlayer,
    closePlayer
  } = usePlayer();

  if (!activeVideo || !isMinimized) {
    return null;
  }

  return (
    <div className="mini-player-container" onClick={expandPlayer}>
      {/* Top progress bar */}
      <div
        className="mini-player-progress"
        style={{ width: `${progressPercent}%` }}
      />

      {/* Left: Video Preview Thumbnail */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
        <img
          src={activeVideo.thumbnailUrl}
          alt={activeVideo.title}
          style={{
            width: 72,
            height: 44,
            borderRadius: 6,
            objectFit: 'cover',
            flexShrink: 0,
          }}
        />

        {/* Video & Channel title */}
        <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
          <div
            style={{
              fontSize: '0.85rem',
              fontWeight: 500,
              color: 'var(--yt-text-primary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: 1.2,
            }}
          >
            {activeVideo.title}
          </div>
          <div
            style={{
              fontSize: '0.75rem',
              color: 'var(--yt-text-secondary)',
              marginTop: 2,
            }}
          >
            {activeVideo.channel.name}
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 8 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={togglePlay}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--yt-text-primary)',
            padding: 8,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          <IonIcon icon={isPlaying ? pause : play} style={{ fontSize: '1.4rem' }} />
        </button>

        <button
          onClick={closePlayer}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--yt-text-primary)',
            padding: 8,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Close"
        >
          <IonIcon icon={close} style={{ fontSize: '1.3rem' }} />
        </button>
      </div>
    </div>
  );
};
