import React, { useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonBadge,
  IonMenuButton,
  IonPopover,
  IonActionSheet,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonToast
} from '@ionic/react';
import {
  logoYoutube,
  tvOutline,
  notificationsOutline,
  searchOutline,
  checkmarkCircle,
  radioOutline
} from 'ionicons/icons';
import { NOTIFICATIONS } from '../../mock/data';
import { SearchModal } from './SearchModal';

interface MainHeaderProps {
  onSearch?: (query: string) => void;
}

export const MainHeader: React.FC<MainHeaderProps> = ({ onSearch }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showCastSheet, setShowCastSheet] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const unreadCount = NOTIFICATIONS.filter(n => !n.isRead).length;

  return (
    <>
      <IonHeader className="ion-no-border" style={{ background: 'var(--yt-bg)' }}>
        <IonToolbar style={{ '--background': 'var(--yt-bg)', '--color': 'var(--yt-text-primary)' }}>
          {/* Left: Side Menu toggle & YouTube Logo */}
          <IonButtons slot="start">
            <IonMenuButton style={{ color: 'var(--yt-text-primary)' }} />
            <div className="yt-logo-text" style={{ cursor: 'pointer', marginLeft: 4 }}>
              <IonIcon icon={logoYoutube} style={{ color: 'var(--yt-red)', fontSize: '1.75rem' }} />
              <span>YouTube</span>
            </div>
          </IonButtons>

          {/* Right Action Icons */}
          <IonButtons slot="end">
            {/* Cast to Screen */}
            <IonButton onClick={() => setShowCastSheet(true)} fill="clear" style={{ color: 'var(--yt-text-primary)' }}>
              <IonIcon icon={tvOutline} />
            </IonButton>

            {/* Notifications Popover */}
            <IonButton
              onClick={(e) => setPopoverEvent(e.nativeEvent)}
              fill="clear"
              style={{ position: 'relative', color: 'var(--yt-text-primary)' }}
            >
              <IonIcon icon={notificationsOutline} />
              {unreadCount > 0 && (
                <IonBadge
                  color="danger"
                  style={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    fontSize: '0.65rem',
                    padding: '2px 5px',
                    borderRadius: '10px',
                  }}
                >
                  {unreadCount}
                </IonBadge>
              )}
            </IonButton>

            {/* Search Icon */}
            <IonButton onClick={() => setIsSearchOpen(true)} fill="clear" style={{ color: 'var(--yt-text-primary)' }}>
              <IonIcon icon={searchOutline} />
            </IonButton>

            {/* Current User Avatar */}
            <IonAvatar style={{ width: 28, height: 28, marginLeft: 4, marginRight: 8, cursor: 'pointer' }}>
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80" alt="Avatar" />
            </IonAvatar>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* Full-featured Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={(query) => {
          if (onSearch) onSearch(query);
        }}
      />

      {/* Cast Action Sheet */}
      <IonActionSheet
        isOpen={showCastSheet}
        onDidDismiss={() => setShowCastSheet(false)}
        header="Connect to a device"
        buttons={[
          {
            text: 'Living Room TV (Chromecast 4K)',
            icon: tvOutline,
            handler: () => setToastMessage('Connecting to Living Room TV...'),
          },
          {
            text: 'Bedroom AirPlay Screen',
            icon: radioOutline,
            handler: () => setToastMessage('Connecting to Bedroom Screen...'),
          },
          {
            text: 'Link with TV Code',
            handler: () => setToastMessage('Enter TV code in settings'),
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ]}
      />

      {/* Notifications Popover */}
      <IonPopover
        isOpen={!!popoverEvent}
        event={popoverEvent}
        onDidDismiss={() => setPopoverEvent(null)}
        style={{ '--width': '340px' }}
      >
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--yt-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Notifications</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--yt-blue)', cursor: 'pointer' }}>Mark all as read</span>
        </div>
        <IonList lines="full" style={{ maxHeight: 380, overflowY: 'auto' }}>
          {NOTIFICATIONS.map((notif) => (
            <IonItem key={notif.id} button style={{ '--background': notif.isRead ? 'transparent' : 'rgba(255,255,255,0.05)' }}>
              <IonAvatar slot="start" style={{ width: 36, height: 36 }}>
                <img src={notif.channel.avatar} alt={notif.channel.name} />
              </IonAvatar>
              <IonLabel className="ion-text-wrap" style={{ fontSize: '0.82rem' }}>
                <p style={{ color: 'var(--yt-text-primary)', margin: 0, lineHeight: 1.3 }}>{notif.title}</p>
                <p style={{ color: 'var(--yt-text-secondary)', fontSize: '0.75rem', marginTop: 4 }}>{notif.timestamp}</p>
              </IonLabel>
              {notif.thumbnailUrl && (
                <img src={notif.thumbnailUrl} alt="Thumbnail" style={{ width: 48, height: 32, objectFit: 'cover', borderRadius: 4 }} slot="end" />
              )}
            </IonItem>
          ))}
        </IonList>
      </IonPopover>

      <IonToast
        isOpen={!!toastMessage}
        onDidDismiss={() => setToastMessage(null)}
        message={toastMessage || ''}
        duration={2500}
        position="bottom"
      />
    </>
  );
};
