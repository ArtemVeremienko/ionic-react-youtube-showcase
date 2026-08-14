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
  IonList,
  IonItem,
  IonLabel,
  IonToast,
  IonActionSheet
} from '@ionic/react';
import {
  tvOutline,
  notificationsOutline,
  searchOutline,
  settingsOutline,
  personOutline,
  shieldCheckmarkOutline,
  glassesOutline,
  playCircleOutline,
  arrowDownCircleOutline,
  filmOutline,
  cardOutline,
  timeOutline,
  helpCircleOutline,
  addOutline,
  lockClosedOutline
} from 'ionicons/icons';
import { VIDEOS, PLAYLISTS } from '../mock/data';
import { usePlayer } from '../context/PlayerContext';
import { SearchModal } from '../components/header/SearchModal';

interface YouTabProps {
  onSearch?: (query: string) => void;
  onChannelNavigate?: (channelId: string) => void;
}

export const YouTab: React.FC<YouTabProps> = ({ onSearch, onChannelNavigate }) => {
  const { playVideo } = usePlayer();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [showAccountSheet, setShowAccountSheet] = useState(false);

  return (
    <IonPage id="you-page">
      <IonHeader className="ion-no-border" style={{ background: 'var(--yt-bg)' }}>
        <IonToolbar style={{ '--background': 'var(--yt-bg)', '--color': 'var(--yt-text-primary)' }}>
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={() => setToastMsg('Casting options')} style={{ color: 'var(--yt-text-primary)' }}>
              <IonIcon icon={tvOutline} />
            </IonButton>
            <IonButton fill="clear" onClick={() => setToastMsg('No new notifications')} style={{ color: 'var(--yt-text-primary)' }}>
              <IonIcon icon={notificationsOutline} />
            </IonButton>
            <IonButton fill="clear" onClick={() => setIsSearchOpen(true)} style={{ color: 'var(--yt-text-primary)' }}>
              <IonIcon icon={searchOutline} />
            </IonButton>
            <IonButton fill="clear" onClick={() => setToastMsg('Settings & Preferences')} style={{ color: 'var(--yt-text-primary)' }}>
              <IonIcon icon={settingsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ '--background': 'var(--yt-bg)' }}>
        {/* User Profile Header */}
        <div style={{ padding: '8px 16px 16px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <IonAvatar style={{ width: 68, height: 68 }}>
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80" alt="Profile" />
          </IonAvatar>

          <div style={{ flex: 1 }}>
            <h2 style={{ margin: '0 0 2px', fontSize: '1.25rem', fontWeight: 700, color: 'var(--yt-text-primary)' }}>
              Alex Rivera
            </h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--yt-text-secondary)', marginBottom: 6 }}>
              @alexrivera_dev • View channel &gt;
            </div>

            {/* Quick account action chips */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setShowAccountSheet(true)}
                className="yt-action-pill"
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
              >
                <IonIcon icon={personOutline} />
                <span>Switch account</span>
              </button>
              <button
                onClick={() => setToastMsg('Google Account security & info')}
                className="yt-action-pill"
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
              >
                <IonIcon icon={shieldCheckmarkOutline} />
                <span>Google Account</span>
              </button>
            </div>
          </div>
        </div>

        {/* History Carousel */}
        <div style={{ marginTop: 8, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px 10px' }}>
            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--yt-text-primary)' }}>History</span>
            <button
              onClick={() => setToastMsg('History full list')}
              style={{
                background: 'transparent',
                border: '1px solid var(--yt-border)',
                color: 'var(--yt-text-primary)',
                padding: '4px 12px',
                borderRadius: 16,
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              View all
            </button>
          </div>

          <div
            className="no-scrollbar"
            style={{
              display: 'flex',
              overflowX: 'auto',
              gap: 12,
              padding: '0 16px',
            }}
          >
            {VIDEOS.map((video, idx) => (
              <div
                key={`history-${video.id}`}
                onClick={() => playVideo(video)}
                style={{ width: 140, flexShrink: 0, cursor: 'pointer' }}
              >
                <div style={{ position: 'relative', width: 140, height: 80, borderRadius: 8, overflow: 'hidden', background: '#222' }}>
                  <img src={video.thumbnailUrl} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div className="video-duration-badge" style={{ fontSize: '0.65rem', padding: '1px 4px' }}>{video.duration}</div>
                  {/* Progress bar simulation */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: `${(idx + 1) * 22}%`, height: 3, background: 'var(--yt-red)' }} />
                </div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: 'var(--yt-text-primary)',
                    marginTop: 6,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: 1.25,
                  }}
                >
                  {video.title}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--yt-text-secondary)', marginTop: 2 }}>
                  {video.channel.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Playlists Carousel */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px 10px' }}>
            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--yt-text-primary)' }}>Playlists</span>
            <button
              onClick={() => setToastMsg('Create new playlist modal')}
              style={{
                background: 'transparent',
                border: '1px solid var(--yt-border)',
                color: 'var(--yt-text-primary)',
                padding: '4px 12px',
                borderRadius: 16,
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <IonIcon icon={addOutline} />
              <span>New playlist</span>
            </button>
          </div>

          <div
            className="no-scrollbar"
            style={{
              display: 'flex',
              overflowX: 'auto',
              gap: 12,
              padding: '0 16px',
            }}
          >
            {PLAYLISTS.map((playlist) => (
              <div
                key={playlist.id}
                onClick={() => setToastMsg(`Opening playlist "${playlist.title}"`)}
                style={{ width: 140, flexShrink: 0, cursor: 'pointer' }}
              >
                <div style={{ position: 'relative', width: 140, height: 80, borderRadius: 8, overflow: 'hidden', background: '#222' }}>
                  <img src={playlist.thumbnailUrl} alt={playlist.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'rgba(0,0,0,0.7)',
                      padding: '2px 6px',
                      fontSize: '0.65rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: '#ffffff',
                    }}
                  >
                    <span>{playlist.videoCount} videos</span>
                    {playlist.isPrivate && <IonIcon icon={lockClosedOutline} />}
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--yt-text-primary)', marginTop: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {playlist.title}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--yt-text-secondary)', marginTop: 2 }}>
                  {playlist.updatedDate}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Menu List */}
        <IonList lines="full" style={{ background: 'transparent', paddingBottom: 60 }}>
          <IonItem button onClick={() => setToastMsg('Your uploaded videos')} style={{ '--background': 'transparent', '--color': 'var(--yt-text-primary)' }}>
            <IonIcon icon={playCircleOutline} slot="start" style={{ marginRight: 16 }} />
            <IonLabel>Your videos</IonLabel>
          </IonItem>

          <IonItem button onClick={() => setToastMsg('12 downloaded offline videos ready')} style={{ '--background': 'transparent', '--color': 'var(--yt-text-primary)' }}>
            <IonIcon icon={arrowDownCircleOutline} slot="start" style={{ marginRight: 16 }} />
            <IonLabel>
              <h2>Downloads</h2>
              <p style={{ color: 'var(--yt-text-secondary)' }}>12 videos • Offline ready</p>
            </IonLabel>
          </IonItem>

          <IonItem button onClick={() => setToastMsg('Your movies & purchases')} style={{ '--background': 'transparent', '--color': 'var(--yt-text-primary)' }}>
            <IonIcon icon={filmOutline} slot="start" style={{ marginRight: 16 }} />
            <IonLabel>Your movies & TV</IonLabel>
          </IonItem>

          <IonItem button onClick={() => setToastMsg('YouTube Premium Membership details')} style={{ '--background': 'transparent', '--color': 'var(--yt-text-primary)' }}>
            <IonIcon icon={cardOutline} slot="start" style={{ color: 'var(--yt-red)', marginRight: 16 }} />
            <IonLabel>Get YouTube Premium</IonLabel>
          </IonItem>

          <IonItem button onClick={() => setToastMsg('Total watch time: 14 hrs this week')} style={{ '--background': 'transparent', '--color': 'var(--yt-text-primary)' }}>
            <IonIcon icon={timeOutline} slot="start" style={{ marginRight: 16 }} />
            <IonLabel>Time watched</IonLabel>
          </IonItem>

          <IonItem button onClick={() => setToastMsg('Help & Support FAQ')} style={{ '--background': 'transparent', '--color': 'var(--yt-text-primary)' }}>
            <IonIcon icon={helpCircleOutline} slot="start" style={{ marginRight: 16 }} />
            <IonLabel>Help & feedback</IonLabel>
          </IonItem>
        </IonList>

        {/* Account Switcher Action Sheet */}
        <IonActionSheet
          isOpen={showAccountSheet}
          onDidDismiss={() => setShowAccountSheet(false)}
          header="Accounts"
          buttons={[
            {
              text: 'Alex Rivera (alexrivera_dev@gmail.com) - Active',
              icon: personOutline,
              handler: () => setToastMsg('Active Account: Alex Rivera'),
            },
            {
              text: 'Antigravity Studio (studio@antigravity.ai)',
              icon: personOutline,
              handler: () => setToastMsg('Switched to Antigravity Studio'),
            },
            {
              text: 'Add account',
              icon: addOutline,
              handler: () => setToastMsg('Add Google Account'),
            },
            {
              text: 'Turn on Incognito',
              icon: glassesOutline,
              handler: () => setToastMsg('Incognito mode activated'),
            },
            {
              text: 'Cancel',
              role: 'cancel',
            },
          ]}
        />

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
