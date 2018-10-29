import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Title extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  render() {
    const { text } = this.props;
    return (
      <div>
        <h1 className="main-title">{text}</h1>
        <hr className="styled-line" />
      </div>
    );
  }
}

export default Title;
