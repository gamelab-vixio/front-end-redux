import React, { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
  }
  
  render() {
    return (
      <div className="footer">
        <div className="footer-center">
          <h1>vixio</h1>
        </div>
        <div className="footer-bottom">
          <span>{`Copyright © ${this.currentYear}. All rights reserved`}</span>
        </div>
      </div>
    );
  }
}

export default Footer;
