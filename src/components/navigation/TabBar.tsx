import React from 'react';
import {
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonBadge
} from '@ionic/react';
import {
  home,
  homeOutline,
  flash,
  flashOutline,
  albums,
  albumsOutline,
  personCircle,
  personCircleOutline,
  addCircleOutline
} from 'ionicons/icons';

interface TabBarProps {
  currentTab: string;
  onOpenCreate?: () => void;
}

export const TabBar: React.FC<TabBarProps> = ({ currentTab, onOpenCreate }) => {
  return (
    <IonTabBar
      slot="bottom"
      style={{
        '--background': 'var(--yt-bg)',
        '--border': '1px solid var(--yt-border)',
        height: '54px',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <IonTabButton tab="home" href="/home">
        <IonIcon icon={currentTab === 'home' ? home : homeOutline} style={{ color: 'var(--yt-text-primary)' }} />
        <IonLabel style={{ color: 'var(--yt-text-primary)', fontSize: '0.7rem', marginTop: 2 }}>Home</IonLabel>
      </IonTabButton>

      <IonTabButton tab="shorts" href="/shorts">
        <IonIcon icon={currentTab === 'shorts' ? flash : flashOutline} style={{ color: 'var(--yt-text-primary)' }} />
        <IonLabel style={{ color: 'var(--yt-text-primary)', fontSize: '0.7rem', marginTop: 2 }}>Shorts</IonLabel>
      </IonTabButton>

      {/* Center Create Button */}
      <IonTabButton tab="create" onClick={onOpenCreate}>
        <IonIcon icon={addCircleOutline} style={{ fontSize: '2.1rem', color: 'var(--yt-text-primary)' }} />
      </IonTabButton>

      <IonTabButton tab="subscriptions" href="/subscriptions">
        <IonIcon icon={currentTab === 'subscriptions' ? albums : albumsOutline} style={{ color: 'var(--yt-text-primary)' }} />
        <IonLabel style={{ color: 'var(--yt-text-primary)', fontSize: '0.7rem', marginTop: 2 }}>Subscriptions</IonLabel>
      </IonTabButton>

      <IonTabButton tab="you" href="/you">
        <IonIcon icon={currentTab === 'you' ? personCircle : personCircleOutline} style={{ color: 'var(--yt-text-primary)' }} />
        <IonLabel style={{ color: 'var(--yt-text-primary)', fontSize: '0.7rem', marginTop: 2 }}>You</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};
