import React, { useState, useRef } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonAvatar,
  IonToast
} from '@ionic/react';
import {
  cameraOutline,
  searchOutline,
  ellipsisVertical,
  thumbsUpOutline,
  thumbsUp,
  thumbsDownOutline,
  chatbubbleEllipsesOutline,
  shareSocialOutline,
  syncOutline,
  musicalNotes,
  volumeHighOutline,
  volumeMuteOutline
} from 'ionicons/icons';
import { SHORTS } from '../mock/data';
import { Short } from '../types/youtube';
import { CommentsSheet } from '../components/player/CommentsSheet';

export const ShortsTab: React.FC = () => {
  const [shortsList, setShortsList] = useState<Short[]>(SHORTS);
  const [activeCommentsShort, setActiveCommentsShort] = useState<Short | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [subscribedChannels, setSubscribedChannels] = useState<Record<string, boolean>>({});

  const toggleLikeShort = (shortId: string) => {
    setShortsList(prev =>
      prev.map(s => {
        if (s.id === shortId) {
          const isLiked = !s.isLiked;
          const likesCount = isLiked ? s.likesCount + 1 : s.likesCount - 1;
          return { ...s, isLiked, likes: `${Math.round(likesCount / 1000)}K` };
        }
        return s;
      })
    );
  };

  const toggleSubscribe = (channelId: string) => {
    setSubscribedChannels(prev => {
      const newState = !prev[channelId];
      setToastMsg(newState ? 'Subscribed!' : 'Unsubscribed');
      return { ...prev, [channelId]: newState };
    });
  };

  return (
    <IonPage id="shorts-page">
      {/* Translucent overlay header */}
      <IonHeader className="ion-no-border" style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100, background: 'transparent' }}>
        <IonToolbar style={{ '--background': 'transparent', '--color': '#ffffff' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, paddingLeft: 12, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
            Shorts
          </div>

          <IonButtons slot="end">
            <IonButton fill="clear" onClick={() => setIsMuted(!isMuted)} style={{ color: '#ffffff' }}>
              <IonIcon icon={isMuted ? volumeMuteOutline : volumeHighOutline} />
            </IonButton>
            <IonButton fill="clear" onClick={() => setToastMsg('Shorts Camera active')} style={{ color: '#ffffff' }}>
              <IonIcon icon={cameraOutline} />
            </IonButton>
            <IonButton fill="clear" onClick={() => setToastMsg('Search Shorts')} style={{ color: '#ffffff' }}>
              <IonIcon icon={searchOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* Vertical Snap Reel Container */}
      <div className="shorts-container" style={{ background: '#000000' }}>
        {shortsList.map((short) => {
          const isSubscribed = subscribedChannels[short.channel.id] ?? short.channel.isSubscribed;
          return (
            <div key={short.id} className="short-slide">
              {/* Background Video */}
              <video
                src={short.videoUrl}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />

              {/* Right Action Icons Column */}
              <div
                style={{
                  position: 'absolute',
                  right: 12,
                  bottom: 70,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 16,
                  zIndex: 20,
                }}
              >
                {/* Like */}
                <button
                  onClick={() => toggleLikeShort(short.id)}
                  style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(8px)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    color: short.isLiked ? 'var(--yt-blue)' : '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <IonIcon icon={short.isLiked ? thumbsUp : thumbsUpOutline} style={{ fontSize: '1.4rem' }} />
                  <span style={{ fontSize: '0.65rem', marginTop: 2, fontWeight: 600 }}>{short.likes}</span>
                </button>

                {/* Dislike */}
                <button
                  onClick={() => setToastMsg('Disliked')}
                  style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(8px)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    color: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <IonIcon icon={thumbsDownOutline} style={{ fontSize: '1.4rem' }} />
                  <span style={{ fontSize: '0.65rem', marginTop: 2 }}>Dislike</span>
                </button>

                {/* Comments */}
                <button
                  onClick={() => setActiveCommentsShort(short)}
                  style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(8px)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    color: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <IonIcon icon={chatbubbleEllipsesOutline} style={{ fontSize: '1.4rem' }} />
                  <span style={{ fontSize: '0.65rem', marginTop: 2, fontWeight: 600 }}>{short.commentsCount}</span>
                </button>

                {/* Share */}
                <button
                  onClick={() => {
                    if (navigator.share) navigator.share({ title: short.title, url: window.location.href });
                    else setToastMsg('Short link copied!');
                  }}
                  style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(8px)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    color: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <IonIcon icon={shareSocialOutline} style={{ fontSize: '1.4rem' }} />
                  <span style={{ fontSize: '0.65rem', marginTop: 2 }}>Share</span>
                </button>

                {/* Remix */}
                <button
                  onClick={() => setToastMsg('Remix this Short')}
                  style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(8px)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    color: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <IonIcon icon={syncOutline} style={{ fontSize: '1.4rem' }} />
                  <span style={{ fontSize: '0.65rem', marginTop: 2 }}>Remix</span>
                </button>

                {/* Audio Disc avatar */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: '2px solid #ffffff',
                    overflow: 'hidden',
                    marginTop: 4,
                  }}
                >
                  <img src={short.channel.avatar} alt="Sound" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>

              {/* Bottom Creator Info & Caption */}
              <div
                style={{
                  position: 'absolute',
                  left: 16,
                  bottom: 70,
                  right: 80,
                  zIndex: 20,
                  color: '#ffffff',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
                }}
              >
                {/* Creator handle + Subscribe button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <IonAvatar style={{ width: 36, height: 36, border: '1px solid #ffffff' }}>
                    <img src={short.channel.avatar} alt={short.channel.name} />
                  </IonAvatar>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{short.channel.handle}</span>
                  <button
                    onClick={() => toggleSubscribe(short.channel.id)}
                    style={{
                      background: isSubscribed ? 'rgba(255,255,255,0.2)' : '#ffffff',
                      color: isSubscribed ? '#ffffff' : '#000000',
                      border: 'none',
                      padding: '4px 12px',
                      borderRadius: 16,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {isSubscribed ? 'Subscribed' : 'Subscribe'}
                  </button>
                </div>

                {/* Caption */}
                <p style={{ margin: '0 0 8px', fontSize: '0.9rem', lineHeight: 1.35 }}>
                  {short.title}
                </p>

                {/* Audio Track marquee */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', opacity: 0.9 }}>
                  <IonIcon icon={musicalNotes} />
                  <span>{short.songName}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Shorts Comments Bottom Sheet */}
      {activeCommentsShort && (
        <CommentsSheet
          isOpen={!!activeCommentsShort}
          onClose={() => setActiveCommentsShort(null)}
          comments={activeCommentsShort.comments || []}
          videoId={activeCommentsShort.id}
        />
      )}

      <IonToast
        isOpen={!!toastMsg}
        onDidDismiss={() => setToastMsg(null)}
        message={toastMsg || ''}
        duration={2000}
        position="bottom"
      />
    </IonPage>
  );
};
