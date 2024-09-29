import React from 'react';
import './Timeline.css';

const Timeline = ({ events }) => {
  return (
    <div className="timeline">
      {events && events.length > 0 ? (
        events.map((event, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-date">
              {new Date(event.timestamp.seconds * 1000).toLocaleString()}
            </div>
            <div className={`timeline-status ${event.status.toLowerCase()}`}>
              <strong>{event.status}</strong>
            </div>
            {event.location && <div className="timeline-location">{event.location}</div>}
            {event.description && <div className="timeline-description">{event.description}</div>}
          </div>
        ))
      ) : (
        <p>No timeline events available.</p>
      )}
    </div>
  );
};

export default Timeline;
