import React, { useState } from 'react';
import {
  IonAvatar,
  IonButton,
  IonIcon,
  IonActionSheet,
  IonToast
} from '@ionic/react';
import {
  ellipsisVertical,
  timeOutline,
  bookmarkOutline,
  shareSocialOutline,
  downloadOutline,
  eyeOffOutline,
  banOutline,
  flagOutline,
  checkmarkCircle
} from 'ionicons/icons';
import { Video } from '../../types/youtube';
import { usePlayer } from '../../context/PlayerContext';

interface VideoCardProps {
  video: Video;
  onChannelClick?: (channelId: string) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onChannelClick }) => {
  const { playVideo } = usePlayer();
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCardClick = () => {
    playVideo(video);
  };

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onChannelClick) {
      onChannelClick(video.channel.id);
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowActionSheet(true);
  };

  return (
    <div
      onClick={handleCardClick}
      style={{
        marginBottom: 20,
        cursor: 'pointer',
        background: 'transparent',
      }}
    >
      {/* Thumbnail Container */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#181818', overflow: 'hidden' }}>
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
          loading="lazy"
        />

        {/* Duration / Live Badge */}
        {video.isLive ? (
          <div className="video-live-badge">
            <span className="pulse-dot" />
            LIVE
          </div>
        ) : (
          <div className="video-duration-badge">
            {video.duration}
          </div>
        )}
      </div>

      {/* Metadata Info Row */}
      <div style={{ display: 'flex', padding: '12px 14px 4px', gap: 12, alignItems: 'flex-start' }}>
        {/* Channel Avatar */}
        <IonAvatar
          onClick={handleAvatarClick}
          style={{ width: 38, height: 38, flexShrink: 0, marginTop: 2, cursor: 'pointer' }}
        >
          <img src={video.channel.avatar} alt={video.channel.name} />
        </IonAvatar>

        {/* Details Column */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              margin: '0 0 4px',
              fontSize: '0.95rem',
              fontWeight: 500,
              color: 'var(--yt-text-primary)',
              lineHeight: 1.35,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {video.title}
          </h3>

          <div style={{ fontSize: '0.8rem', color: 'var(--yt-text-secondary)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 4 }}>
            <span>{video.channel.name}</span>
            <span>•</span>
            <span>{video.views}</span>
            <span>•</span>
            <span>{video.timestamp}</span>
          </div>
        </div>

        {/* 3-dots Menu Button */}
        <IonButton
          fill="clear"
          onClick={handleMenuClick}
          style={{
            '--padding-start': '4px',
            '--padding-end': '4px',
            margin: 0,
            height: 32,
            color: 'var(--yt-text-secondary)',
          }}
        >
          <IonIcon icon={ellipsisVertical} style={{ fontSize: '1rem' }} />
        </IonButton>
      </div>

      {/* Action Sheet Menu */}
      <IonActionSheet
        isOpen={showActionSheet}
        onDidDismiss={() => setShowActionSheet(false)}
        header={video.title}
        buttons={[
          {
            text: 'Save to Watch Later',
            icon: timeOutline,
            handler: () => setToastMessage('Saved to Watch Later'),
          },
          {
            text: 'Save to playlist',
            icon: bookmarkOutline,
            handler: () => setToastMessage('Added to playlist'),
          },
          {
            text: 'Download video',
            icon: downloadOutline,
            handler: () => setToastMessage('Downloading video for offline viewing...'),
          },
          {
            text: 'Share',
            icon: shareSocialOutline,
            handler: () => {
              if (navigator.share) {
                navigator.share({ title: video.title, url: window.location.href });
              } else {
                setToastMessage('Link copied to clipboard');
              }
            },
          },
          {
            text: 'Not interested',
            icon: eyeOffOutline,
            handler: () => setToastMessage('Feedback recorded: Video hidden'),
          },
          {
            text: "Don't recommend channel",
            icon: banOutline,
            handler: () => setToastMessage(`We won't recommend ${video.channel.name} again`),
          },
          {
            text: 'Report',
            icon: flagOutline,
            role: 'destructive',
            handler: () => setToastMessage('Report submitted for review'),
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ]}
      />

      <IonToast
        isOpen={!!toastMessage}
        onDidDismiss={() => setToastMessage(null)}
        message={toastMessage || ''}
        duration={2000}
        position="bottom"
      />
    </div>
  );
};
