import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonAvatar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonToast
} from '@ionic/react';
import {
  arrowBackOutline,
  searchOutline,
  ellipsisVertical,
  notificationsOutline,
  checkmarkCircle
} from 'ionicons/icons';
import { CHANNELS, VIDEOS, SHORTS } from '../mock/data';
import { VideoCard } from '../components/video/VideoCard';
import { SearchModal } from '../components/header/SearchModal';

interface ChannelPageProps {
  channelId: string;
  onBack: () => void;
  onSearch?: (query: string) => void;
}

export const ChannelPage: React.FC<ChannelPageProps> = ({
  channelId,
  onBack,
  onSearch,
}) => {
  const channel = CHANNELS[channelId] || CHANNELS.ionic;
  const [selectedSegment, setSelectedSegment] = useState<'home' | 'videos' | 'shorts' | 'about'>('videos');
  const [isSubscribed, setIsSubscribed] = useState(channel.isSubscribed || false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const channelVideos = VIDEOS.filter(v => v.channel.id === channel.id);
  const displayVideos = channelVideos.length > 0 ? channelVideos : VIDEOS.slice(0, 3);
  const channelShorts = SHORTS.filter(s => s.channel.id === channel.id);

  const toggleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    setToastMsg(isSubscribed ? `Unsubscribed from ${channel.name}` : `Subscribed to ${channel.name}!`);
  };

  return (
    <IonPage id="channel-page">
      <IonHeader className="ion-no-border" style={{ background: 'var(--yt-bg)' }}>
        <IonToolbar style={{ '--background': 'var(--yt-bg)', '--color': 'var(--yt-text-primary)' }}>
          <IonButtons slot="start">
            <IonButton fill="clear" onClick={onBack} style={{ color: 'var(--yt-text-primary)' }}>
              <IonIcon icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>

          <div style={{ fontSize: '1.05rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {channel.name}
          </div>

          <IonButtons slot="end">
            <IonButton fill="clear" onClick={() => setIsSearchOpen(true)} style={{ color: 'var(--yt-text-primary)' }}>
              <IonIcon icon={searchOutline} />
            </IonButton>
            <IonButton fill="clear" onClick={() => setToastMsg('Channel options')} style={{ color: 'var(--yt-text-primary)' }}>
              <IonIcon icon={ellipsisVertical} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ '--background': 'var(--yt-bg)' }}>
        {/* Banner Cover */}
        <div style={{ width: '100%', height: 110, background: '#1c1c1c', overflow: 'hidden' }}>
          <img src={channel.bannerUrl} alt="Banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Channel Header Profile Info */}
        <div style={{ padding: '16px 16px 8px' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <IonAvatar style={{ width: 68, height: 68 }}>
              <img src={channel.avatar} alt={channel.name} />
            </IonAvatar>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--yt-text-primary)' }}>
                  {channel.name}
                </h1>
                <IonIcon icon={checkmarkCircle} style={{ color: 'var(--yt-text-secondary)', fontSize: '0.95rem' }} />
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--yt-text-secondary)', marginTop: 2 }}>
                {channel.handle} • {channel.subscribers} subscribers • {channel.videosCount} videos
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--yt-text-secondary)', marginTop: 4, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {channel.description}
              </div>
            </div>
          </div>

          {/* Subscribe Button */}
          <div style={{ marginTop: 14 }}>
            <button
              onClick={toggleSubscribe}
              className={`subscribe-btn ${isSubscribed ? 'subscribed' : ''}`}
              style={{ width: '100%', padding: '10px 0', fontSize: '0.9rem', borderRadius: 24 }}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>
        </div>

        {/* Segment Tabs */}
        <IonSegment
          value={selectedSegment}
          onIonChange={(e: any) => setSelectedSegment(e.detail.value)}
          style={{
            '--background': 'transparent',
            borderBottom: '1px solid var(--yt-border)',
            marginTop: 4,
          }}
        >
          <IonSegmentButton value="videos" style={{ '--color': 'var(--yt-text-secondary)', '--color-checked': 'var(--yt-text-primary)' }}>
            <IonLabel style={{ textTransform: 'capitalize', fontWeight: 600 }}>Videos</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="shorts" style={{ '--color': 'var(--yt-text-secondary)', '--color-checked': 'var(--yt-text-primary)' }}>
            <IonLabel style={{ textTransform: 'capitalize', fontWeight: 600 }}>Shorts</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="about" style={{ '--color': 'var(--yt-text-secondary)', '--color-checked': 'var(--yt-text-primary)' }}>
            <IonLabel style={{ textTransform: 'capitalize', fontWeight: 600 }}>About</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* Segment Content */}
        <div style={{ paddingBottom: 60, marginTop: 8 }}>
          {selectedSegment === 'videos' && (
            <div>
              {displayVideos.map((video) => (
                <VideoCard key={`ch-vid-${video.id}`} video={video} />
              ))}
            </div>
          )}

          {selectedSegment === 'shorts' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, padding: '8px 12px' }}>
              {(channelShorts.length > 0 ? channelShorts : SHORTS).map((short) => (
                <div key={`ch-short-${short.id}`} style={{ position: 'relative', paddingTop: '160%', background: '#222', borderRadius: 8, overflow: 'hidden' }}>
                  <video src={short.videoUrl} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} muted />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', padding: '12px 8px 6px', color: '#fff' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {short.title}
                    </div>
                    <div style={{ fontSize: '0.65rem', opacity: 0.8, marginTop: 2 }}>{short.likes} views</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedSegment === 'about' && (
            <div style={{ padding: '16px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 8px', color: 'var(--yt-text-primary)' }}>Description</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--yt-text-secondary)', lineHeight: 1.5, margin: '0 0 20px' }}>
                {channel.description}
              </p>

              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 8px', color: 'var(--yt-text-primary)' }}>Channel Details</h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--yt-text-secondary)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div>📍 Location: United States</div>
                <div>📅 Joined: May 14, 2018</div>
                <div>👁️ Total Views: 48,290,140 views</div>
                <div>🔗 Custom URL: youtube.com/{channel.handle}</div>
              </div>
            </div>
          )}
        </div>

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSearch={(q) => { if (onSearch) onSearch(q); }}
        />

        <IonToast
          isOpen={!!toastMsg}
          onDidDismiss={() => setToastMsg(null)}
          message={toastMsg || ''}
          duration={2000}
          position="bottom"
        />
      </IonContent>
    </IonPage>
  );
};
