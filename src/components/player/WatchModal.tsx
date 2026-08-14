import React, { useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonAvatar,
  IonToast,
  IonActionSheet
} from '@ionic/react';
import {
  chevronDownOutline,
  tvOutline,
  ellipsisVertical,
  thumbsUpOutline,
  thumbsUp,
  thumbsDownOutline,
  thumbsDown,
  shareSocialOutline,
  downloadOutline,
  bookmarkOutline,
  cutOutline,
  chatbubbleEllipsesOutline,
  checkmarkCircle
} from 'ionicons/icons';
import { usePlayer } from '../../context/PlayerContext';
import { VIDEOS } from '../../mock/data';
import { VideoCard } from '../video/VideoCard';
import { CommentsSheet } from './CommentsSheet';

interface WatchModalProps {
  onChannelNavigate?: (channelId: string) => void;
}

export const WatchModal: React.FC<WatchModalProps> = ({ onChannelNavigate }) => {
  const {
    activeVideo,
    isMinimized,
    isPlaying,
    minimizePlayer,
    closePlayer,
    toggleLikeVideo,
    videoElementRef,
    isCommentsOpen,
    setCommentsOpen
  } = usePlayer();

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [showMoreActions, setShowMoreActions] = useState(false);

  if (!activeVideo || isMinimized) {
    return null;
  }

  const relatedVideos = VIDEOS.filter((v) => v.id !== activeVideo.id);

  const handleSubscribeToggle = () => {
    setIsSubscribed(!isSubscribed);
    setToastMsg(isSubscribed ? `Unsubscribed from ${activeVideo.channel.name}` : `Subscribed to ${activeVideo.channel.name}!`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: activeVideo.title, url: window.location.href });
    } else {
      setToastMsg('Link copied to clipboard!');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1200,
        background: 'var(--yt-bg)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideUp 0.25s cubic-bezier(0.2, 0.9, 0.3, 1)',
      }}
    >
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>

      {/* Top Header Controls */}
      <IonHeader className="ion-no-border" style={{ background: 'var(--yt-bg)' }}>
        <IonToolbar style={{ '--background': 'var(--yt-bg)', '--color': 'var(--yt-text-primary)' }}>
          <IonButtons slot="start">
            <IonButton
              fill="clear"
              onClick={minimizePlayer}
              style={{ color: 'var(--yt-text-primary)' }}
              title="Minimize Player"
            >
              <IonIcon icon={chevronDownOutline} style={{ fontSize: '1.6rem' }} />
            </IonButton>
          </IonButtons>

          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--yt-text-secondary)', textAlign: 'center' }}>
            Playing Video
          </div>

          <IonButtons slot="end">
            <IonButton fill="clear" onClick={() => setToastMsg('Casting options')} style={{ color: 'var(--yt-text-primary)' }}>
              <IonIcon icon={tvOutline} />
            </IonButton>
            <IonButton fill="clear" onClick={() => setShowMoreActions(true)} style={{ color: 'var(--yt-text-primary)' }}>
              <IonIcon icon={ellipsisVertical} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* Video Player Display */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#000000' }}>
        <video
          ref={videoElementRef as any}
          src={activeVideo.videoUrl}
          poster={activeVideo.thumbnailUrl}
          autoPlay={true}
          controls={true}
          playsInline={true}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Scrollable Watch Details & Feed */}
      <IonContent style={{ '--background': 'var(--yt-bg)' }}>
        <div style={{ padding: '14px 16px' }}>
          {/* Video Title */}
          <h1
            style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--yt-text-primary)',
              margin: '0 0 8px',
              lineHeight: 1.35,
            }}
          >
            {activeVideo.title}
          </h1>

          {/* Views & Timestamp & Description Accordion */}
          <div
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            style={{
              background: 'var(--yt-surface)',
              borderRadius: 8,
              padding: '10px 12px',
              marginBottom: 16,
              cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--yt-text-primary)', display: 'flex', gap: 8 }}>
              <span>{activeVideo.views}</span>
              <span>{activeVideo.timestamp}</span>
              <span style={{ color: 'var(--yt-blue)' }}>{isDescriptionExpanded ? 'Show less' : '...more'}</span>
            </div>

            {isDescriptionExpanded && (
              <div style={{ marginTop: 10, fontSize: '0.82rem', color: 'var(--yt-text-primary)', whiteSpace: 'pre-line', lineHeight: 1.45 }}>
                {activeVideo.description}
                <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {activeVideo.tags.map(tag => (
                    <span key={tag} style={{ color: 'var(--yt-blue)', fontSize: '0.8rem' }}>#{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Channel Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}
          >
            <div
              style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
              onClick={() => {
                minimizePlayer();
                if (onChannelNavigate) onChannelNavigate(activeVideo.channel.id);
              }}
            >
              <IonAvatar style={{ width: 40, height: 40 }}>
                <img src={activeVideo.channel.avatar} alt={activeVideo.channel.name} />
              </IonAvatar>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--yt-text-primary)' }}>
                  {activeVideo.channel.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--yt-text-secondary)' }}>
                  {activeVideo.channel.subscribers} subscribers
                </div>
              </div>
            </div>

            <button
              onClick={handleSubscribeToggle}
              className={`subscribe-btn ${isSubscribed ? 'subscribed' : ''}`}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>

          {/* Action Pills Bar */}
          <div
            className="no-scrollbar"
            style={{
              display: 'flex',
              overflowX: 'auto',
              gap: 8,
              paddingBottom: 16,
              borderBottom: '1px solid var(--yt-border)',
            }}
          >
            {/* Like / Dislike Split Pill */}
            <div
              style={{
                display: 'inline-flex',
                background: 'var(--yt-chip-bg)',
                borderRadius: 18,
                alignItems: 'center',
              }}
            >
              <button
                onClick={() => toggleLikeVideo(activeVideo.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: activeVideo.isLiked ? 'var(--yt-blue)' : 'var(--yt-text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                }}
              >
                <IonIcon icon={activeVideo.isLiked ? thumbsUp : thumbsUpOutline} style={{ fontSize: '1rem' }} />
                <span>{activeVideo.likes}</span>
              </button>
              <div style={{ width: 1, height: 16, background: 'var(--yt-border)' }} />
              <button
                onClick={() => setToastMsg('Disliked')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--yt-text-primary)',
                  padding: '6px 10px',
                  cursor: 'pointer',
                }}
              >
                <IonIcon icon={thumbsDownOutline} style={{ fontSize: '1rem' }} />
              </button>
            </div>

            {/* Share */}
            <button className="yt-action-pill" onClick={handleShare}>
              <IonIcon icon={shareSocialOutline} />
              <span>Share</span>
            </button>

            {/* Remix / Clip */}
            <button className="yt-action-pill" onClick={() => setToastMsg('Remix feature ready')}>
              <IonIcon icon={cutOutline} />
              <span>Remix</span>
            </button>

            {/* Download */}
            <button className="yt-action-pill" onClick={() => setToastMsg('Downloading video...')}>
              <IonIcon icon={downloadOutline} />
              <span>Download</span>
            </button>

            {/* Save */}
            <button className="yt-action-pill" onClick={() => setToastMsg('Saved to playlist')}>
              <IonIcon icon={bookmarkOutline} />
              <span>Save</span>
            </button>
          </div>

          {/* Comments Teaser Box */}
          <div
            onClick={() => setCommentsOpen(true)}
            style={{
              background: 'var(--yt-surface)',
              borderRadius: 10,
              padding: '12px 14px',
              margin: '16px 0',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--yt-text-primary)' }}>
                Comments <span style={{ color: 'var(--yt-text-secondary)', fontWeight: 400 }}>{activeVideo.comments?.length || 0}</span>
              </div>
              <IonIcon icon={chatbubbleEllipsesOutline} style={{ color: 'var(--yt-text-secondary)' }} />
            </div>

            {activeVideo.comments && activeVideo.comments.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <IonAvatar style={{ width: 24, height: 24, flexShrink: 0 }}>
                  <img src={activeVideo.comments[0].author.avatar} alt="User" />
                </IonAvatar>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--yt-text-primary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {activeVideo.comments[0].content}
                </div>
              </div>
            )}
          </div>

          {/* Related / Up Next Videos Feed */}
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 12, color: 'var(--yt-text-primary)' }}>
              Up Next
            </div>
            {relatedVideos.map((video) => (
              <VideoCard
                key={`related-${video.id}`}
                video={video}
                onChannelClick={onChannelNavigate}
              />
            ))}
          </div>
        </div>
      </IonContent>

      {/* Bottom Sheet Comments Modal */}
      <CommentsSheet
        isOpen={isCommentsOpen}
        onClose={() => setCommentsOpen(false)}
        comments={activeVideo.comments || []}
        videoId={activeVideo.id}
      />

      {/* More Actions ActionSheet */}
      <IonActionSheet
        isOpen={showMoreActions}
        onDidDismiss={() => setShowMoreActions(false)}
        buttons={[
          {
            text: 'Quality: 1080p60 HD',
            handler: () => setToastMsg('Quality set to 1080p HD'),
          },
          {
            text: 'Playback Speed: Normal (1.0x)',
            handler: () => setToastMsg('Playback speed normal'),
          },
          {
            text: 'Captions / Subtitles (CC)',
            handler: () => setToastMsg('Captions enabled'),
          },
          {
            text: 'Stats for Geeks',
            handler: () => setToastMsg('Codec: VP9 / 1920x1080@60fps'),
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ]}
      />

      <IonToast
        isOpen={!!toastMsg}
        onDidDismiss={() => setToastMsg(null)}
        message={toastMsg || ''}
        duration={2000}
        position="bottom"
      />
    </div>
  );
};
