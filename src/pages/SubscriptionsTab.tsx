import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonAvatar,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail
} from '@ionic/react';
import { MainHeader } from '../components/header/MainHeader';
import { VideoCard } from '../components/video/VideoCard';
import { CHANNELS, VIDEOS } from '../mock/data';
import { Video } from '../types/youtube';

interface SubscriptionsTabProps {
  onChannelNavigate?: (channelId: string) => void;
  onSearch?: (query: string) => void;
}

export const SubscriptionsTab: React.FC<SubscriptionsTabProps> = ({ onChannelNavigate, onSearch }) => {
  const channelList = Object.values(CHANNELS);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);

  const filters = ['All', 'Today', 'Videos', 'Shorts', 'Live', 'Continue watching', 'Unwatched'];

  const getFilteredVideos = (): Video[] => {
    let list = VIDEOS;
    if (selectedChannelId) {
      list = list.filter(v => v.channel.id === selectedChannelId);
    }
    if (activeFilter === 'Live') {
      return list.filter(v => v.isLive);
    }
    return list;
  };

  const handleRefresh = (e: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      e.detail.complete();
    }, 1000);
  };

  return (
    <IonPage id="subscriptions-page">
      <MainHeader onSearch={onSearch} />

      <IonContent fullscreen style={{ '--background': 'var(--yt-bg)' }}>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        {/* Top Channel Story Bar */}
        <div
          className="no-scrollbar"
          style={{
            display: 'flex',
            overflowX: 'auto',
            padding: '12px 16px',
            gap: 16,
            background: 'var(--yt-bg)',
            borderBottom: '1px solid var(--yt-border)',
          }}
        >
          {channelList.map((channel) => {
            const isSelected = selectedChannelId === channel.id;
            return (
              <div
                key={channel.id}
                onClick={() => setSelectedChannelId(isSelected ? null : channel.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: 64,
                  cursor: 'pointer',
                }}
              >
                <div style={{ position: 'relative', marginBottom: 6 }}>
                  <IonAvatar
                    style={{
                      width: 54,
                      height: 54,
                      border: isSelected ? '2px solid var(--yt-blue)' : '2px solid transparent',
                      padding: 2,
                    }}
                  >
                    <img src={channel.avatar} alt={channel.name} />
                  </IonAvatar>

                  {channel.id === 'lofi' && (
                    <div
                      className="pulse-dot"
                      style={{
                        position: 'absolute',
                        bottom: 2,
                        right: 2,
                        width: 12,
                        height: 12,
                        background: 'var(--yt-red)',
                        border: '2px solid var(--yt-bg)',
                      }}
                    />
                  )}
                </div>

                <span
                  style={{
                    fontSize: '0.72rem',
                    color: isSelected ? 'var(--yt-blue)' : 'var(--yt-text-primary)',
                    fontWeight: isSelected ? 700 : 500,
                    textAlign: 'center',
                    maxWidth: 64,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {channel.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Filter Pills */}
        <div
          className="no-scrollbar"
          style={{
            display: 'flex',
            overflowX: 'auto',
            padding: '8px 16px',
            gap: 8,
            borderBottom: '1px solid var(--yt-border)',
          }}
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`category-chip ${activeFilter === filter ? 'active' : ''}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Video List */}
        <div style={{ paddingBottom: 60 }}>
          {getFilteredVideos().map((video) => (
            <VideoCard
              key={`sub-${video.id}`}
              video={video}
              onChannelClick={onChannelNavigate}
            />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};
