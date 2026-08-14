import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  RefresherEventDetail
} from '@ionic/react';
import { MainHeader } from '../components/header/MainHeader';
import { CategoryChips } from '../components/header/CategoryChips';
import { VideoCard } from '../components/video/VideoCard';
import { VideoSkeleton } from '../components/video/VideoSkeleton';
import { VIDEOS } from '../mock/data';
import { Video } from '../types/youtube';

import { arrowDownOutline } from 'ionicons/icons';

interface HomeTabProps {
  onChannelNavigate?: (channelId: string) => void;
  onSearch?: (query: string) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ onChannelNavigate, onSearch }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [videoList, setVideoList] = useState<Video[]>(VIDEOS);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setVideoList(VIDEOS);
    } else if (category === 'Live') {
      setVideoList(VIDEOS.filter(v => v.isLive));
    } else {
      const filtered = VIDEOS.filter(v => v.category === category || v.tags.includes(category));
      setVideoList(filtered.length > 0 ? filtered : VIDEOS);
    }
  };

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Shuffle videos to simulate new content
      const shuffled = [...VIDEOS].sort(() => 0.5 - Math.random());
      setVideoList(shuffled);
      setIsRefreshing(false);
      event.detail.complete();
    }, 1200);
  };

  const handleInfinite = (event: CustomEvent<void>) => {
    setTimeout(() => {
      setVideoList(prev => [...prev, ...VIDEOS.slice(0, 3)]);
      (event.target as HTMLIonInfiniteScrollElement).complete();
    }, 1000);
  };

  return (
    <IonPage id="home-page">
      <MainHeader onSearch={onSearch} />

      <IonContent fullscreen style={{ '--background': 'var(--yt-bg)' }}>
        {/* Pull to Refresh */}
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent
            pullingIcon={arrowDownOutline}
            pullingText="Pull to refresh feed..."
            refreshingSpinner="crescent"
            refreshingText="Fetching latest videos..."
          />
        </IonRefresher>

        {/* Category Horizontal Filter Chips */}
        <CategoryChips
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
        />

        {/* Video Feed */}
        <div style={{ paddingBottom: 60 }}>
          {isRefreshing ? (
            <>
              <VideoSkeleton />
              <VideoSkeleton />
              <VideoSkeleton />
            </>
          ) : (
            videoList.map((video, idx) => (
              <VideoCard
                key={`${video.id}-${idx}`}
                video={video}
                onChannelClick={onChannelNavigate}
              />
            ))
          )}
        </div>

        {/* Infinite Scroll */}
        <IonInfiniteScroll onIonInfinite={handleInfinite} threshold="100px">
          <IonInfiniteScrollContent
            loadingSpinner="bubbles"
            loadingText="Loading more awesome content..."
          />
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};
