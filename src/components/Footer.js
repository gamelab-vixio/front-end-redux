import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Footer extends Component {

   render() {

      return (
         <div className="footer">
            <div className="footer-center">
               <h1>vixio</h1>
            </div>
            <div className="footer-bottom">
               <span>Copyright © 2018. All rights reserved</span>               
            </div>
         </div>
      );
   }
}

export default Footer;