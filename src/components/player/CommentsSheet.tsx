import React, { useState } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonInput,
  IonFooter
} from '@ionic/react';
import { closeOutline, thumbsUpOutline, thumbsUp, heart, sendOutline } from 'ionicons/icons';
import { Comment } from '../../types/youtube';
import { usePlayer } from '../../context/PlayerContext';

interface CommentsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
  videoId: string;
}

export const CommentsSheet: React.FC<CommentsSheetProps> = ({
  isOpen,
  onClose,
  comments,
  videoId,
}) => {
  const { addComment } = usePlayer();
  const [newCommentText, setNewCommentText] = useState('');
  const [localComments, setLocalComments] = useState<Comment[]>(comments);

  // Sync if comments prop updates
  React.useEffect(() => {
    setLocalComments(comments);
  }, [comments]);

  const handleSendComment = () => {
    if (!newCommentText.trim()) return;
    addComment(videoId, newCommentText);
    setNewCommentText('');
  };

  const toggleCommentLike = (commentId: string) => {
    setLocalComments(prev =>
      prev.map(c => {
        if (c.id === commentId) {
          return { ...c, isLiked: !c.isLiked };
        }
        return c;
      })
    );
  };

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      breakpoints={[0, 0.5, 0.95]}
      initialBreakpoint={0.5}
      handleBehavior="cycle"
      style={{
        '--background': 'var(--yt-surface)',
        '--border-radius': '16px 16px 0 0',
      }}
    >
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': 'var(--yt-surface)', '--color': 'var(--yt-text-primary)' }}>
          <IonTitle style={{ fontSize: '1rem', fontWeight: 700 }}>
            Comments <span style={{ color: 'var(--yt-text-secondary)', fontWeight: 400, fontSize: '0.85rem' }}>{localComments.length}</span>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={onClose} style={{ color: 'var(--yt-text-primary)' }}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': 'var(--yt-surface)' }}>
        <IonList lines="none" style={{ background: 'transparent', padding: '0 8px 60px' }}>
          {localComments.map((comment) => (
            <div
              key={comment.id}
              style={{
                display: 'flex',
                gap: 12,
                padding: '12px 8px',
                borderBottom: '1px solid var(--yt-border)',
              }}
            >
              {/* Avatar */}
              <IonAvatar style={{ width: 34, height: 34, flexShrink: 0 }}>
                <img src={comment.author.avatar} alt={comment.author.name} />
              </IonAvatar>

              {/* Body */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--yt-text-primary)' }}>
                    {comment.author.name}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--yt-text-secondary)' }}>
                    {comment.timestamp}
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--yt-text-primary)', lineHeight: 1.4, marginBottom: 8 }}>
                  {comment.content}
                </div>

                {/* Comment Reactions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <button
                    onClick={() => toggleCommentLike(comment.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      color: comment.isLiked ? 'var(--yt-blue)' : 'var(--yt-text-secondary)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    <IonIcon icon={comment.isLiked ? thumbsUp : thumbsUpOutline} style={{ fontSize: '0.9rem' }} />
                    <span>{comment.likes}</span>
                  </button>

                  {comment.hasHeart && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--yt-red)', fontSize: '0.75rem' }}>
                      <IonIcon icon={heart} style={{ fontSize: '0.85rem' }} />
                      <span style={{ color: 'var(--yt-text-secondary)', fontSize: '0.7rem' }}>Creator liked</span>
                    </div>
                  )}

                  {comment.repliesCount ? (
                    <span style={{ color: 'var(--yt-blue)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                      {comment.repliesCount} replies
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </IonList>
      </IonContent>

      {/* Comment Input Footer */}
      <IonFooter className="ion-no-border" style={{ background: 'var(--yt-surface)' }}>
        <IonToolbar style={{ '--background': 'var(--yt-surface)', padding: '4px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
            <IonAvatar style={{ width: 28, height: 28, flexShrink: 0 }}>
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80" alt="Avatar" />
            </IonAvatar>

            <IonInput
              value={newCommentText}
              onIonInput={(e: any) => setNewCommentText(e.detail.value!)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendComment();
              }}
              placeholder="Add a comment..."
              style={{
                '--background': 'var(--yt-surface-hover)',
                '--color': 'var(--yt-text-primary)',
                '--placeholder-color': 'var(--yt-text-secondary)',
                '--border-radius': '20px',
                '--padding-start': '14px',
                '--padding-end': '14px',
              }}
            />

            <IonButton
              fill="clear"
              onClick={handleSendComment}
              disabled={!newCommentText.trim()}
              style={{ color: 'var(--yt-blue)' }}
            >
              <IonIcon icon={sendOutline} />
            </IonButton>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};
