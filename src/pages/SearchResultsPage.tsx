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
  IonToast
} from '@ionic/react';
import {
  arrowBackOutline,
  searchOutline,
  filterOutline,
  ellipsisVertical,
  checkmarkCircle
} from 'ionicons/icons';
import { VIDEOS, CHANNELS } from '../mock/data';
import { VideoCard } from '../components/video/VideoCard';
import { SearchModal } from '../components/header/SearchModal';

interface SearchResultsPageProps {
  query: string;
  onBack: () => void;
  onSearch: (newQuery: string) => void;
  onChannelNavigate?: (channelId: string) => void;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  query,
  onBack,
  onSearch,
  onChannelNavigate,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const lowerQuery = query.toLowerCase();

  // Matched channel
  const matchedChannel = Object.values(CHANNELS).find(
    c => c.name.toLowerCase().includes(lowerQuery) || c.handle.toLowerCase().includes(lowerQuery)
  );

  // Matched videos
  const matchedVideos = VIDEOS.filter(
    v =>
      v.title.toLowerCase().includes(lowerQuery) ||
      v.description.toLowerCase().includes(lowerQuery) ||
      v.category.toLowerCase().includes(lowerQuery) ||
      v.tags.some(t => t.toLowerCase().includes(lowerQuery)) ||
      v.channel.name.toLowerCase().includes(lowerQuery)
  );

  const displayVideos = matchedVideos.length > 0 ? matchedVideos : VIDEOS;

  return (
    <IonPage id="search-results-page">
      <IonHeader className="ion-no-border" style={{ background: 'var(--yt-bg)' }}>
        <IonToolbar style={{ '--background': 'var(--yt-bg)', '--color': 'var(--yt-text-primary)' }}>
          <IonButtons slot="start">
            <IonButton fill="clear" onClick={onBack} style={{ color: 'var(--yt-text-primary)' }}>
              <IonIcon icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>

          <div
            onClick={() => setIsSearchOpen(true)}
            style={{
              background: 'var(--yt-surface)',
              borderRadius: 20,
              padding: '6px 14px',
              fontSize: '0.88rem',
              color: 'var(--yt-text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: '0 8px',
            }}
          >
            <span>{query}</span>
            <IonIcon icon={searchOutline} style={{ color: 'var(--yt-text-secondary)' }} />
          </div>

          <IonButtons slot="end">
            <IonButton fill="clear" onClick={() => setToastMsg('Search Filters')} style={{ color: 'var(--yt-text-primary)' }}>
              <IonIcon icon={filterOutline} />
            </IonButton>
            <IonButton fill="clear" onClick={() => setToastMsg('More options')} style={{ color: 'var(--yt-text-primary)' }}>
              <IonIcon icon={ellipsisVertical} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ '--background': 'var(--yt-bg)' }}>
        <div style={{ paddingBottom: 60 }}>
          {/* Matched Channel Card */}
          {matchedChannel && (
            <div
              onClick={() => onChannelNavigate && onChannelNavigate(matchedChannel.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '16px',
                borderBottom: '1px solid var(--yt-border)',
                background: 'var(--yt-surface)',
                margin: '8px 12px 16px',
                borderRadius: 12,
                cursor: 'pointer',
              }}
            >
              <IonAvatar style={{ width: 56, height: 56 }}>
                <img src={matchedChannel.avatar} alt={matchedChannel.name} />
              </IonAvatar>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--yt-text-primary)' }}>
                    {matchedChannel.name}
                  </span>
                  <IonIcon icon={checkmarkCircle} style={{ color: 'var(--yt-text-secondary)', fontSize: '0.9rem' }} />
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--yt-text-secondary)', marginTop: 2 }}>
                  {matchedChannel.handle} • {matchedChannel.subscribers} subscribers
                </div>
              </div>

              <button
                className="subscribe-btn"
                style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setToastMsg(`Subscribed to ${matchedChannel.name}`);
                }}
              >
                Subscribe
              </button>
            </div>
          )}

          {/* Videos Result List */}
          {displayVideos.map((video) => (
            <VideoCard
              key={`search-res-${video.id}`}
              video={video}
              onChannelClick={onChannelNavigate}
            />
          ))}
        </div>

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSearch={onSearch}
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
