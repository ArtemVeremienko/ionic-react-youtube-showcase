# Ionic Showcase (YouTube Edition) 📱⚡

A full-featured YouTube mobile & desktop application built with **Ionic 8 + React 18 + TypeScript + Vite** demonstrating cross-platform mobile patterns, non-linear navigation, and native gestures.

---

## ✨ Features Highlighted

- **Non-Linear Mini-Player**: Video docks into a persistent bottom bar above the tabs while letting users browse other tabs without interrupting playback.
- **Adaptive Layout (`IonSplitPane`)**: Mobile tabs on phones; expands automatically to a side navigation drawer (`IonMenu`) on tablets and desktop screens.
- **Collapsible Toolbars & Search Modal**: Native search overlay with search history, voice search simulation, and category filter chips (`IonSegment`).
- **Interactive Comments Bottom Sheet (`IonModal`)**: Sheet modal with breakpoints `[0, 0.5, 0.95]` for dragging, liking, and adding comments.
- **Shorts Vertical Snap Reel**: Fullscreen vertical feed with swipe gestures, like reactions, and audio tracks.
- **Live Theme & Mode Switcher**: On-the-fly toggling between **Dark/Light Theme** and **iOS vs Material Design (MD)** rendering modes.
- **Pull-to-Refresh & Skeleton Placeholders**: `IonRefresher` with animated spinner and `IonSkeletonText` loading states.

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

To access from a mobile device on the same local network:
Open `http://<YOUR_LOCAL_IP>:3000/` (e.g. `http://192.168.0.174:3000/`).

### 3. Build for Production
```bash
npm run build
```

---

## 📂 Project Structure

```
├── src/
│   ├── components/
│   │   ├── common/         # PlatformToggle widget
│   │   ├── header/         # MainHeader, SearchModal, CategoryChips
│   │   ├── navigation/     # SideMenu, TabBar
│   │   ├── player/         # MiniPlayer, WatchModal, CommentsSheet
│   │   └── video/          # VideoCard, VideoSkeleton
│   ├── context/            # PlayerContext & ThemeContext
│   ├── mock/               # Mock videos, channels, shorts, playlists
│   ├── pages/              # HomeTab, ShortsTab, SubscriptionsTab, YouTab, ChannelPage, SearchResultsPage
│   ├── theme/              # variables.css (YouTube tokens) & global.css
│   ├── types/              # TypeScript interfaces
│   ├── App.tsx             # Root router & split pane layout
│   └── main.tsx            # App bootstrap
```
