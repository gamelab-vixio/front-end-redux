import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timeline extends Component {
  static propTypes = {
    timelineItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  render() {
    const { timelineItems } = this.props;
    return (
      <div className="milestone">
        <h2 className="milestone-title">milestone</h2>
        {timelineItems.map((item, index) => (
          <div className="timeline-item" date-is={item.date}>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Timeline;
