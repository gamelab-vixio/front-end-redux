import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import FaCaretDown from 'react-icons/lib/fa/caret-down';

// Service Import
import AuthService from '../services/auth.service';

// Redux Import
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Reducer Import
import { 
   isLogout
} from '../reducers/account';

class Header extends Component {

   constructor(props) {
      super(props);

      this.state = {
         isOpen: false,
         isDropdownOpen: false,
         isSearch: false
      };

      this.Auth = new AuthService();
      this.toggle = this.toggle.bind(this);
      this.dropdownToggle = this.dropdownToggle.bind(this);
      this.search = this.search.bind(this);
    //   console.log(this.Auth.getToken());
   }


   toggle() {
      this.setState({
         isOpen: !this.state.isOpen
      });
   }

   dropdownToggle() {
      this.setState({
         isDropdownOpen: !this.state.isDropdownOpen
      });
   }

   search() {
      this.setState({
         isSearch: !this.state.isSearch
      });
   }

   handleLogout() {
      this.Auth.logout();
      this.props.isLogout();
   }

   render() {

      return (
         <div className="sticky-top">
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
               <Link className="navbar-brand" to="/">
                  <span className="project-name">vixio</span>
               </Link>
               <button className={this.state.isOpen ? 'hamburger hamburger--spring is-active' : 'hamburger hamburger--spring'} type="button" onClick={this.toggle}>
                  <span className="hamburger-box">
                     <span className="hamburger-inner"></span>
                  </span>
               </button>
               <div className={this.state.isOpen ? 'collapse navbar-collapse custom-navbar show' : 'collapse navbar-collapse custom-navbar hide'}>
                  <ul className="navbar-nav mr-auto">
                     <li className="nav-item">
                        <Link className="nav-link custom-hover" to="/" onClick={this.toggle}>home</Link>
                     </li>
                     <li className="nav-item">
                        <Link className="nav-link custom-hover" to="/story" onClick={this.toggle}>story</Link>
                     </li>
                     <li className="nav-item">
                        <Link className="nav-link custom-hover" to="/blog" onClick={this.toggle}>blog</Link>
                     </li>
                     <li className="nav-item">
                        <Link className="nav-link custom-hover" to="/documentation" onClick={this.toggle}>documentation</Link>
                     </li>
                     
                     <li className="nav-item">
                        <Link className="nav-link custom-hover" to="/about" onClick={this.toggle}>about</Link>
                     </li>

                     {
                        this.Auth.getToken() ? (

                           <li className="nav-item">
                              <Link className="nav-link custom-hover" to="/writer" onClick={this.toggle}>writer</Link>
                           </li>
                        ) : (
                           ''
                        )
                     }
                     
                     {
                        this.Auth.getToken() ? (
                           <li className="nav-item user-dropdown-menu">
                              <a className="nav-link" onClick={this.dropdownToggle}>account <FaCaretDown /></a>
                              <div className={this.state.isDropdownOpen ? 'dropdown-show animated fadeInDown' : 'hide'}>
                                 <Link className="dropdown-list" to="/profile" onClick={this.toggle}>my profile</Link>
                                 <Link className="dropdown-list" to="/profile/history" onClick={this.toggle}>history</Link>
                                 <Link className="dropdown-list" to="/" onClick={(event) => { this.toggle(); this.handleLogout();}}>logout</Link>
                              </div>
                           </li>
                        
                        ) : (
                           <li className="nav-item">
                              <Link className="nav-link custom-hover" to="/account" onClick={this.toggle}>account</Link>
                           </li>
                        )
                     }
                  </ul>
               </div>
            </nav>
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   isLogin: state.account.isLogin
});

const mapDispatchToProps = (dispatch) => 
   bindActionCreators(
      {
         isLogout
      },
      dispatch
   );

export default connect(mapStateToProps, mapDispatchToProps)(Header);