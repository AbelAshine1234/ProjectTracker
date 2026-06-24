'use client';
export default function ActivityFeedItem({ color = '#1A5C32', title, description, timestamp }) {
  return (
    <div className="activity-item">
      <div className="activity-item__dot" style={{ background: color }} />
      <div className="activity-item__content">
        <div className="activity-item__title">{title}</div>
        <div className="activity-item__desc">{description}</div>
      </div>
      <span className="activity-item__time">{timestamp}</span>
    </div>
  );
}
