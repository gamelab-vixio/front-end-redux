import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Footer extends Component {

   render() {

      return (
         <div className="footer">
            <div className="footer-top">
               <Link className="nav-link custom-hover" to="/">home</Link>
               <Link className="nav-link custom-hover" to="/blog">blog</Link>
               <Link className="nav-link custom-hover" to="/documentation">documentation</Link>
               <Link className="nav-link custom-hover" to="/create">create</Link>
               <Link className="nav-link custom-hover" to="/about">about</Link>
               <Link className="nav-link custom-hover" to="/account">account</Link>
            </div>
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