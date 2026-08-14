import React from 'react';
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonAvatar,
  IonMenuToggle
} from '@ionic/react';
import {
  logoYoutube,
  home,
  flash,
  albums,
  personCircle,
  timeOutline,
  playCircleOutline,
  bookmarkOutline,
  thumbsUpOutline,
  arrowDownCircleOutline,
  flameOutline,
  musicalNotesOutline,
  gameControllerOutline,
  newspaperOutline,
  trophyOutline,
  settingsOutline,
  helpCircleOutline
} from 'ionicons/icons';
import { CHANNELS } from '../../mock/data';

interface SideMenuProps {
  onNavigateTab: (tabName: string) => void;
  onNavigateChannel?: (channelId: string) => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ onNavigateTab, onNavigateChannel }) => {
  const channelList = Object.values(CHANNELS);

  return (
    <IonMenu contentId="main-content" menuId="youtube-side-menu" type="overlay">
      <IonHeader className="ion-no-border" style={{ background: 'var(--yt-bg)' }}>
        <IonToolbar style={{ '--background': 'var(--yt-bg)', '--color': 'var(--yt-text-primary)', padding: '0 8px' }}>
          <div className="yt-logo-text" style={{ padding: '8px 12px' }}>
            <IonIcon icon={logoYoutube} style={{ color: 'var(--yt-red)', fontSize: '1.75rem' }} />
            <span>YouTube</span>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': 'var(--yt-bg)' }}>
        {/* Core Navigation Items */}
        <IonList lines="none" style={{ background: 'transparent' }}>
          <IonMenuToggle autoHide={false}>
            <IonItem
              button
              onClick={() => onNavigateTab('home')}
              style={{ '--background': 'transparent', '--color': 'var(--yt-text-primary)', '--border-radius': '10px', margin: '2px 8px' }}
            >
              <IonIcon icon={home} slot="start" style={{ marginRight: 20 }} />
              <IonLabel style={{ fontWeight: 500 }}>Home</IonLabel>
            </IonItem>

            <IonItem
              button
              onClick={() => onNavigateTab('shorts')}
              style={{ '--background': 'transparent', '--color': 'var(--yt-text-primary)', '--border-radius': '10px', margin: '2px 8px' }}
            >
              <IonIcon icon={flash} slot="start" style={{ marginRight: 20 }} />
              <IonLabel style={{ fontWeight: 500 }}>Shorts</IonLabel>
            </IonItem>

            <IonItem
              button
              onClick={() => onNavigateTab('subscriptions')}
              style={{ '--background': 'transparent', '--color': 'var(--yt-text-primary)', '--border-radius': '10px', margin: '2px 8px' }}
            >
              <IonIcon icon={albums} slot="start" style={{ marginRight: 20 }} />
              <IonLabel style={{ fontWeight: 500 }}>Subscriptions</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>

        <div style={{ height: 1, background: 'var(--yt-border)', margin: '8px 16px' }} />

        {/* You & Library Items */}
        <IonList lines="none" style={{ background: 'transparent' }}>
          <div style={{ padding: '8px 20px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--yt-text-primary)' }}>
            You
          </div>

          <IonMenuToggle autoHide={false}>
            <IonItem
              button
              onClick={() => onNavigateTab('you')}
              style={{ '--background': 'transparent', '--color': 'var(--yt-text-primary)', '--border-radius': '10px', margin: '2px 8px' }}
            >
              <IonIcon icon={personCircle} slot="start" style={{ marginRight: 20 }} />
              <IonLabel>Your Channel</IonLabel>
            </IonItem>

            <IonItem
              button
              onClick={() => onNavigateTab('you')}
              style={{ '--background': 'transparent', '--color': 'var(--yt-text-primary)', '--border-radius': '10px', margin: '2px 8px' }}
            >
              <IonIcon icon={timeOutline} slot="start" style={{ marginRight: 20 }} />
              <IonLabel>History</IonLabel>
            </IonItem>

            <IonItem
              button
              onClick={() => onNavigateTab('you')}
              style={{ '--background': 'transparent', '--color': 'var(--yt-text-primary)', '--border-radius': '10px', margin: '2px 8px' }}
            >
              <IonIcon icon={playCircleOutline} slot="start" style={{ marginRight: 20 }} />
              <IonLabel>Your Videos</IonLabel>
            </IonItem>

            <IonItem
              button
              onClick={() => onNavigateTab('you')}
              style={{ '--background': 'transparent', '--color': 'var(--yt-text-primary)', '--border-radius': '10px', margin: '2px 8px' }}
            >
              <IonIcon icon={bookmarkOutline} slot="start" style={{ marginRight: 20 }} />
              <IonLabel>Watch Later</IonLabel>
            </IonItem>

            <IonItem
              button
              onClick={() => onNavigateTab('you')}
              style={{ '--background': 'transparent', '--color': 'var(--yt-text-primary)', '--border-radius': '10px', margin: '2px 8px' }}
            >
              <IonIcon icon={thumbsUpOutline} slot="start" style={{ marginRight: 20 }} />
              <IonLabel>Liked Videos</IonLabel>
            </IonItem>

            <IonItem
              button
              onClick={() => onNavigateTab('you')}
              style={{ '--background': 'transparent', '--color': 'var(--yt-text-primary)', '--border-radius': '10px', margin: '2px 8px' }}
            >
              <IonIcon icon={arrowDownCircleOutline} slot="start" style={{ marginRight: 20 }} />
              <IonLabel>Downloads</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>

        <div style={{ height: 1, background: 'var(--yt-border)', margin: '8px 16px' }} />

        {/* Subscriptions List */}
        <IonList lines="none" style={{ background: 'transparent' }}>
          <div style={{ padding: '8px 20px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--yt-text-primary)' }}>
            Subscriptions
          </div>

          <IonMenuToggle autoHide={false}>
            {channelList.map((channel) => (
              <IonItem
                button
                key={channel.id}
                onClick={() => {
                  if (onNavigateChannel) onNavigateChannel(channel.id);
                }}
                style={{ '--background': 'transparent', '--color': 'var(--yt-text-primary)', '--border-radius': '10px', margin: '2px 8px' }}
              >
                <IonAvatar slot="start" style={{ width: 26, height: 26, marginRight: 16 }}>
                  <img src={channel.avatar} alt={channel.name} />
                </IonAvatar>
                <IonLabel style={{ fontSize: '0.88rem' }}>{channel.name}</IonLabel>
                {channel.id === 'lofi' && (
                  <div className="pulse-dot" style={{ background: 'var(--yt-red)', width: 8, height: 8 }} slot="end" />
                )}
              </IonItem>
            ))}
          </IonMenuToggle>
        </IonList>

        <div style={{ height: 1, background: 'var(--yt-border)', margin: '8px 16px' }} />

        {/* Explore Categories */}
        <IonList lines="none" style={{ background: 'transparent' }}>
          <div style={{ padding: '8px 20px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--yt-text-primary)' }}>
            Explore
          </div>

          <IonItem button style={{ '--background': 'transparent', '--color': 'var(--yt-text-primary)', margin: '2px 8px' }}>
            <IonIcon icon={flameOutline} slot="start" style={{ marginRight: 20 }} />
            <IonLabel>Trending</IonLabel>
          </IonItem>

          <IonItem button style={{ '--background': 'transparent', '--color': 'var(--yt-text-primary)', margin: '2px 8px' }}>
            <IonIcon icon={musicalNotesOutline} slot="start" style={{ marginRight: 20 }} />
            <IonLabel>Music</IonLabel>
          </IonItem>

          <IonItem button style={{ '--background': 'transparent', '--color': 'var(--yt-text-primary)', margin: '2px 8px' }}>
            <IonIcon icon={gameControllerOutline} slot="start" style={{ marginRight: 20 }} />
            <IonLabel>Gaming</IonLabel>
          </IonItem>

          <IonItem button style={{ '--background': 'transparent', '--color': 'var(--yt-text-primary)', margin: '2px 8px' }}>
            <IonIcon icon={newspaperOutline} slot="start" style={{ marginRight: 20 }} />
            <IonLabel>News</IonLabel>
          </IonItem>
        </IonList>

        <div style={{ height: 1, background: 'var(--yt-border)', margin: '8px 16px' }} />

        {/* Settings */}
        <IonList lines="none" style={{ background: 'transparent', paddingBottom: 24 }}>
          <IonItem button style={{ '--background': 'transparent', '--color': 'var(--yt-text-primary)', margin: '2px 8px' }}>
            <IonIcon icon={settingsOutline} slot="start" style={{ marginRight: 20 }} />
            <IonLabel>Settings</IonLabel>
          </IonItem>
          <IonItem button style={{ '--background': 'transparent', '--color': 'var(--yt-text-primary)', margin: '2px 8px' }}>
            <IonIcon icon={helpCircleOutline} slot="start" style={{ marginRight: 20 }} />
            <IonLabel>Help & Feedback</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
