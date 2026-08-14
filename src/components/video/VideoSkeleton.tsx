import React from 'react';
import { IonSkeletonText } from '@ionic/react';

export const VideoSkeleton: React.FC = () => {
  return (
    <div style={{ marginBottom: 24, padding: '0 0 12px' }}>
      {/* Thumbnail skeleton */}
      <div style={{ width: '100%', paddingTop: '56.25%', position: 'relative' }}>
        <IonSkeletonText
          animated={true}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            margin: 0,
            borderRadius: 0,
          }}
        />
      </div>

      {/* Info skeleton */}
      <div style={{ display: 'flex', padding: '12px 14px 0', gap: 12, alignItems: 'flex-start' }}>
        <IonSkeletonText
          animated={true}
          style={{ width: 38, height: 38, borderRadius: '50%', flexShrink: 0, margin: 0 }}
        />
        <div style={{ flex: 1 }}>
          <IonSkeletonText animated={true} style={{ width: '90%', height: 16, marginBottom: 6, borderRadius: 4 }} />
          <IonSkeletonText animated={true} style={{ width: '60%', height: 12, borderRadius: 4 }} />
        </div>
      </div>
    </div>
  );
};
