import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Video, Comment } from '../types/youtube';
import { VIDEOS } from '../mock/data';

interface PlayerContextType {
  activeVideo: Video | null;
  isPlaying: boolean;
  isMinimized: boolean;
  currentTime: number;
  duration: number;
  progressPercent: number;
  isCommentsOpen: boolean;
  playVideo: (video: Video) => void;
  togglePlay: () => void;
  pauseVideo: () => void;
  resumeVideo: () => void;
  minimizePlayer: () => void;
  expandPlayer: () => void;
  closePlayer: () => void;
  seek: (seconds: number) => void;
  setCommentsOpen: (open: boolean) => void;
  toggleLikeVideo: (videoId: string) => void;
  addComment: (videoId: string, text: string) => void;
  videoElementRef: React.RefObject<HTMLVideoElement | null>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);

  // Play a video
  const playVideo = (video: Video) => {
    setActiveVideo(video);
    setIsMinimized(false);
    setIsPlaying(true);
    setCurrentTime(0);
  };

  const togglePlay = () => {
    if (!videoElementRef.current) {
      setIsPlaying(!isPlaying);
      return;
    }
    if (isPlaying) {
      videoElementRef.current.pause();
      setIsPlaying(false);
    } else {
      videoElementRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const pauseVideo = () => {
    if (videoElementRef.current) {
      videoElementRef.current.pause();
    }
    setIsPlaying(false);
  };

  const resumeVideo = () => {
    if (videoElementRef.current) {
      videoElementRef.current.play().catch(() => {});
    }
    setIsPlaying(true);
  };

  const minimizePlayer = () => {
    setIsMinimized(true);
  };

  const expandPlayer = () => {
    setIsMinimized(false);
  };

  const closePlayer = () => {
    if (videoElementRef.current) {
      videoElementRef.current.pause();
    }
    setActiveVideo(null);
    setIsPlaying(false);
    setIsMinimized(false);
    setCurrentTime(0);
  };

  const seek = (seconds: number) => {
    if (videoElementRef.current) {
      videoElementRef.current.currentTime = seconds;
    }
    setCurrentTime(seconds);
  };

  const setCommentsOpen = (open: boolean) => {
    setIsCommentsOpen(open);
  };

  const toggleLikeVideo = (videoId: string) => {
    if (activeVideo && activeVideo.id === videoId) {
      const isCurrentlyLiked = activeVideo.isLiked;
      setActiveVideo({
        ...activeVideo,
        isLiked: !isCurrentlyLiked,
        likesCount: isCurrentlyLiked ? activeVideo.likesCount - 1 : activeVideo.likesCount + 1,
        likes: (isCurrentlyLiked ? activeVideo.likesCount - 1 : activeVideo.likesCount + 1).toLocaleString(),
      });
    }
  };

  const addComment = (videoId: string, text: string) => {
    if (!text.trim()) return;
    const newComment: Comment = {
      id: `c_new_${Date.now()}`,
      author: {
        name: 'You (Alex)',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      },
      content: text,
      timestamp: 'Just now',
      likes: '0',
      isLiked: false,
      hasHeart: false,
      repliesCount: 0,
    };

    if (activeVideo && activeVideo.id === videoId) {
      setActiveVideo({
        ...activeVideo,
        comments: [newComment, ...(activeVideo.comments || [])],
      });
    }
  };

  // Video time tracking
  useEffect(() => {
    const video = videoElementRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.duration) {
        setDuration(video.duration);
      }
    };

    const onLoadedMetadata = () => {
      setDuration(video.duration || (activeVideo ? activeVideo.durationSeconds : 0));
    };

    const onEnded = () => {
      // Auto play next video from VIDEOS
      if (activeVideo) {
        const currentIndex = VIDEOS.findIndex(v => v.id === activeVideo.id);
        const nextIndex = (currentIndex + 1) % VIDEOS.length;
        playVideo(VIDEOS[nextIndex]);
      }
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('ended', onEnded);
    };
  }, [activeVideo]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <PlayerContext.Provider
      value={{
        activeVideo,
        isPlaying,
        isMinimized,
        currentTime,
        duration,
        progressPercent,
        isCommentsOpen,
        playVideo,
        togglePlay,
        pauseVideo,
        resumeVideo,
        minimizePlayer,
        expandPlayer,
        closePlayer,
        seek,
        setCommentsOpen,
        toggleLikeVideo,
        addComment,
        videoElementRef,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
