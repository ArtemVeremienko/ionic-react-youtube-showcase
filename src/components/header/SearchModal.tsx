import React, { useState } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonToast
} from '@ionic/react';
import { arrowBackOutline, micOutline, timeOutline, closeOutline, searchOutline, trendingUpOutline } from 'ionicons/icons';
import { SEARCH_HISTORY_ITEMS } from '../../mock/data';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [history, setHistory] = useState<string[]>(SEARCH_HISTORY_ITEMS);
  const [showToast, setShowToast] = useState(false);

  const handleSearchSubmit = (term: string) => {
    if (!term.trim()) return;
    if (!history.includes(term)) {
      setHistory([term, ...history]);
    }
    onSearch(term);
    onClose();
  };

  const removeHistoryItem = (e: React.MouseEvent, item: string) => {
    e.stopPropagation();
    setHistory(history.filter(h => h !== item));
  };

  const trendingTopics = [
    'React 19 Server Components',
    'Ionic 8 Full Features',
    'AI Web Development 2026',
    'TypeScript 5.7 Best Practices'
  ];

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} animated={true}>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': 'var(--yt-bg)' }}>
          <IonButtons slot="start">
            <IonButton onClick={onClose} fill="clear">
              <IonIcon icon={arrowBackOutline} color="light" />
            </IonButton>
          </IonButtons>

          <IonSearchbar
            value={searchText}
            onIonInput={(e: any) => setSearchText(e.detail.value!)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchSubmit(searchText);
              }
            }}
            placeholder="Search YouTube"
            showClearButton="focus"
            autoFocus={true}
            style={{
              '--background': 'var(--yt-surface)',
              '--color': 'var(--yt-text-primary)',
              '--placeholder-color': 'var(--yt-text-secondary)',
              '--border-radius': '20px',
              paddingTop: 0,
              paddingBottom: 0,
            }}
          />

          <IonButtons slot="end">
            <IonButton
              fill="clear"
              onClick={() => setShowToast(true)}
              style={{
                background: 'var(--yt-chip-bg)',
                borderRadius: '50%',
                width: 36,
                height: 36,
              }}
            >
              <IonIcon icon={micOutline} color="light" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': 'var(--yt-bg)' }}>
        {/* Recent searches */}
        <IonList lines="none" style={{ background: 'transparent' }}>
          {history.map((term, index) => (
            <IonItem
              button
              key={`hist-${index}`}
              onClick={() => handleSearchSubmit(term)}
              style={{ '--background': 'transparent', '--color': 'var(--yt-text-primary)' }}
            >
              <IonIcon icon={timeOutline} slot="start" style={{ color: 'var(--yt-text-secondary)', marginRight: 16 }} />
              <IonLabel style={{ fontWeight: 500 }}>{term}</IonLabel>
              <IonButton
                fill="clear"
                slot="end"
                onClick={(e) => removeHistoryItem(e, term)}
                style={{ color: 'var(--yt-text-secondary)' }}
              >
                <IonIcon icon={closeOutline} />
              </IonButton>
            </IonItem>
          ))}

          {/* Trending Suggestions */}
          <div style={{ padding: '16px 16px 8px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--yt-text-secondary)', textTransform: 'uppercase' }}>
            Trending on YouTube
          </div>
          {trendingTopics.map((topic, idx) => (
            <IonItem
              button
              key={`trend-${idx}`}
              onClick={() => handleSearchSubmit(topic)}
              style={{ '--background': 'transparent', '--color': 'var(--yt-text-primary)' }}
            >
              <IonIcon icon={trendingUpOutline} slot="start" style={{ color: 'var(--yt-red)', marginRight: 16 }} />
              <IonLabel>{topic}</IonLabel>
              <IonIcon icon={searchOutline} slot="end" style={{ color: 'var(--yt-text-secondary)', fontSize: '1rem' }} />
            </IonItem>
          ))}
        </IonList>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Voice Search: Listening... (Say something!)"
          duration={2500}
          position="bottom"
          color="dark"
        />
      </IonContent>
    </IonModal>
  );
};
