import React, { useState } from 'react';
import { Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import {
  IonApp,
  IonSplitPane,
  IonTabs,
  IonRouterOutlet,
  setupIonicReact,
  IonActionSheet,
  IonToast
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core Ionic CSS */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme and YouTube styles */
import './theme/variables.css';
import './theme/global.css';

/* Context Providers */
import { PlayerProvider } from './context/PlayerContext';
import { ThemeProvider } from './context/ThemeContext';

/* Pages */
import { HomeTab } from './pages/HomeTab';
import { ShortsTab } from './pages/ShortsTab';
import { SubscriptionsTab } from './pages/SubscriptionsTab';
import { YouTab } from './pages/YouTab';
import { ChannelPage } from './pages/ChannelPage';
import { SearchResultsPage } from './pages/SearchResultsPage';

/* Components */
import { SideMenu } from './components/navigation/SideMenu';
import { TabBar } from './components/navigation/TabBar';
import { MiniPlayer } from './components/player/MiniPlayer';
import { WatchModal } from './components/player/WatchModal';
import { PlatformToggle } from './components/common/PlatformToggle';
import { videocamOutline, radioOutline, createOutline } from 'ionicons/icons';

setupIonicReact({
  mode: 'md',
  rippleEffect: true,
});

const AppContent: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const [activeChannelId, setActiveChannelId] = useState<string>('ionic');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Extract current tab from pathname
  const path = location.pathname;
  let currentTab = 'home';
  if (path.includes('/shorts')) currentTab = 'shorts';
  else if (path.includes('/subscriptions')) currentTab = 'subscriptions';
  else if (path.includes('/you')) currentTab = 'you';

  const handleNavigateTab = (tabName: string) => {
    history.push(`/${tabName}`);
  };

  const handleNavigateChannel = (channelId: string) => {
    setActiveChannelId(channelId);
    history.push(`/channel/${channelId}`);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    history.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <IonSplitPane contentId="main-content" when="lg">
        {/* Desktop / Tablet Adaptive Drawer Menu */}
        <SideMenu
          onNavigateTab={handleNavigateTab}
          onNavigateChannel={handleNavigateChannel}
        />

        {/* Main Content Area with IonTabs */}
        <IonTabs>
          <IonRouterOutlet id="main-content">
            <Route
              exact
              path="/home"
              render={() => (
                <HomeTab
                  onChannelNavigate={handleNavigateChannel}
                  onSearch={handleSearch}
                />
              )}
            />

            <Route
              exact
              path="/shorts"
              render={() => <ShortsTab />}
            />

            <Route
              exact
              path="/subscriptions"
              render={() => (
                <SubscriptionsTab
                  onChannelNavigate={handleNavigateChannel}
                  onSearch={handleSearch}
                />
              )}
            />

            <Route
              exact
              path="/you"
              render={() => (
                <YouTab
                  onSearch={handleSearch}
                  onChannelNavigate={handleNavigateChannel}
                />
              )}
            />

            <Route
              path="/channel/:id"
              render={() => (
                <ChannelPage
                  channelId={activeChannelId}
                  onBack={() => history.goBack()}
                  onSearch={handleSearch}
                />
              )}
            />

            <Route
              path="/search"
              render={() => (
                <SearchResultsPage
                  query={searchQuery || 'Ionic React'}
                  onBack={() => history.goBack()}
                  onSearch={handleSearch}
                  onChannelNavigate={handleNavigateChannel}
                />
              )}
            />

            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </IonRouterOutlet>

          <TabBar
            currentTab={currentTab}
            onOpenCreate={() => setShowCreateSheet(true)}
          />
        </IonTabs>
      </IonSplitPane>

      {/* Persistent Non-Linear Mini-Player */}
      <MiniPlayer />

      {/* Expandable Watch Modal */}
      <WatchModal onChannelNavigate={handleNavigateChannel} />

      {/* Floating Theme & Platform Showcase Switcher */}
      <PlatformToggle />

      {/* Create / Upload Action Sheet */}
      <IonActionSheet
        isOpen={showCreateSheet}
        onDidDismiss={() => setShowCreateSheet(false)}
        header="Create"
        buttons={[
          {
            text: 'Create a Short',
            icon: videocamOutline,
            handler: () => setToastMsg('Starting Shorts Camera recorder...'),
          },
          {
            text: 'Upload a video',
            icon: createOutline,
            handler: () => setToastMsg('Select video file to upload'),
          },
          {
            text: 'Go LIVE',
            icon: radioOutline,
            handler: () => setToastMsg('Configuring live streaming broadcast...'),
          },
          {
            text: 'Create a post',
            handler: () => setToastMsg('Create community post modal'),
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ]}
      />

      <IonToast
        isOpen={!!toastMsg}
        onDidDismiss={() => setToastMsg(null)}
        message={toastMsg || ''}
        duration={2000}
        position="bottom"
      />
    </>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <PlayerProvider>
        <IonApp>
          <IonReactRouter basename={import.meta.env.BASE_URL}>
            <AppContent />
          </IonReactRouter>
        </IonApp>
      </PlayerProvider>
    </ThemeProvider>
  );
};

export default App;
