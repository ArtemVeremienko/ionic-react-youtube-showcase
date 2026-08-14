export interface Channel {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bannerUrl: string;
  subscribers: string;
  videosCount: number;
  description: string;
  isSubscribed?: boolean;
}

export interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: string;
  isLiked?: boolean;
  hasHeart?: boolean;
  repliesCount?: number;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  durationSeconds: number;
  views: string;
  viewsCount: number;
  timestamp: string;
  channel: Channel;
  likes: string;
  likesCount: number;
  isLiked?: boolean;
  isDisliked?: boolean;
  isSaved?: boolean;
  commentsCount: string;
  category: string;
  tags: string[];
  isLive?: boolean;
  comments?: Comment[];
}

export interface Short {
  id: string;
  title: string;
  videoUrl: string;
  channel: Channel;
  likes: string;
  likesCount: number;
  isLiked?: boolean;
  isSubscribed?: boolean;
  commentsCount: string;
  songName: string;
  tags: string[];
  comments?: Comment[];
}

export interface Playlist {
  id: string;
  title: string;
  videoCount: number;
  thumbnailUrl: string;
  updatedDate: string;
  isPrivate?: boolean;
  videos?: Video[];
}

export interface NotificationItem {
  id: string;
  type: 'upload' | 'comment' | 'live' | 'mention';
  title: string;
  channel: Channel;
  thumbnailUrl?: string;
  timestamp: string;
  isRead: boolean;
}
