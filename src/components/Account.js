import React, { Component } from 'react';
import Alert from 'react-s-alert';
import { AuthService, LoginService, RegisterService } from '../services';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clearLoginFieldAfterLogin, isLogin } from '../reducers/account';

class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loginEmail: '',
         loginPassword: '',
         firstName: '',
         firstNameStatus: true,
         lastName: '',
         lastNameStatus: true,
         email: '',
         password: '',
         confirmPassword: '',
         confirmPasswordStatus: true,
         loginErrorMessage: [],
         registerErrorMessage: []
      };

      this.Auth = new AuthService();
   }

   componentWillMount() {
      document.title = "Vixio - Account";
      window.scrollTo(0, 0);
   }

   /* <------------- Login --------------> */
   handleLoginValue = (e) => {
      this.setState( {[e.target.name]: e.target.value} );
   }

   handleLoginSubmit = (e) => {
      e.preventDefault();

      // JSON into Variable
      let loginData = {
         email: this.state.loginEmail,
         password: this.state.loginPassword
      };


      LoginService.loginUser(loginData)
      .then((res) => {
         // Clear state and show success alert
         this.props.clearLoginFieldAfterLogin();
         // Set token
         this.Auth.setToken(res.data.token);
         // Redirect to home
         this.props.history.push("/");
         if(this.Auth.getToken()) {
            this.props.isLogin();
         }
         // return Promise.resolve(res);
         // console.log(res.data);
      })
      .catch((err) => {
         let status = err.response.status;

         if(status === 400 || status === 422) {
            this.setState({
               loginErrorMessage: err.response.data.errors
            });
         }
         else {
            this.setState({
               loginPassword: '',
               loginErrorMessage: []
            }, this.failedLoginAlert());
         }
      });
   }

   failedLoginAlert() {
      Alert.error('<h5>Invalid Login or Password</h5>', {
         position: 'top-right',
         effect: 'slide',
      });
   }

   /* <------------- Register --------------> */
   handleRegisterValue = (e) => {
      this.setState( {[e.target.name]: e.target.value} );
   }

   handleRegisterSubmit = (e) => {
      e.preventDefault();

      // Password Confirmation
      if(this.state.password === this.state.confirmPassword) {

         this.setState({
            confirmPasswordStatus: true
         })

         // Concate name
         let fullname = this.state.firstName + this.state.lastName;

         // JSON into Variable
         let registerData = {
            name: fullname,
            email: this.state.email,
            password: this.state.password
         };

         RegisterService.registerNewUser(registerData)
         .then((res) => {

            // Clear state and show success alert
            this.setState({
               firstName: '',
               lastName: '',
               email: '',
               password: '',
               confirmPassword: '',
               registerErrorMessage: []
            }, () => this.successAlert());

            // console.log(res.data);
         })
         .catch((err) => {
            let status = err.response.status;

            if(status === 400 || status === 422)
            {
               this.setState({
                  registerErrorMessage: err.response.data.errors
               })

               // Check first name field
               if(this.state.firstName === '') {
                  this.setState({
                     firstNameStatus: false
                  });
               }
               else {
                  this.setState({
                     firstNameStatus: true
                  });
               }

               // Check last name field
               if(this.state.lastName === '') {
                  this.setState({
                     lastNameStatus: false
                  });
               }
               else {
                  this.setState({
                     lastNameStatus : true
                  });
               }
            }

            // console.log(err.response);
         });
      }
      else {
         this.setState({
            confirmPasswordStatus: false
         })
      }
   }

   successAlert() {
      Alert.success('<h5>Thank You For Registering :)</h5>', {
         position: 'bottom-right',
         effect: 'jelly',
      });
   }

   render() {
      let { firstName, firstNameStatus, lastName, lastNameStatus, loginEmail, email, loginPassword, password, confirmPassword, confirmPasswordStatus, loginErrorMessage, registerErrorMessage } = this.state;

      return (
         <div className="container-fluid account animated fadeInDown">
            <div className="row no-gutters">
               <div className="col-12 col-sm-9 col-md-9 col-lg-6 col-xl-6 offset-sm-2 offset-md-2 offset-lg-3 offset-xl-3">
                  <h1 className="login-title">login</h1>
                  <hr className="styled-line"/>
                  <form onSubmit={this.handleLoginSubmit}>
                     <div className="form-group">
                        <label htmlFor="login-email">Email address</label>
                        <input type="email" className="form-control" id="login-email" value={loginEmail} name="loginEmail" aria-describedby="emailHelp" placeholder="Enter your email" autoComplete="off" onChange={this.handleLoginValue}/>
                        <span className="error-message">{loginErrorMessage.email}</span>

                        <label htmlFor="login-password">Password</label>
                        <input type="password" className="form-control" id="login-password" value={loginPassword} name="loginPassword" placeholder="Enter your password" autoComplete="off" onChange={this.handleLoginValue}/>
                        <span className="error-message">{loginErrorMessage.password}</span>

                        <div className="text-right button-wrapper">
                           <button type="submit" className="btn btn-outline-primary manual-signin-button">login</button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>

            <div className="row no-gutters">
               <div className="col-12 col-sm-9 col-md-9 col-lg-6 col-xl-6 offset-sm-2 offset-md-2 offset-lg-3 offset-xl-3">
                  <div className="register">
                     <h1 className="divider">
                        <span>or</span>
                     </h1>
                     <h1 className="login-title">register</h1>
                     <hr className="styled-line"/>
                     <form onSubmit={this.handleRegisterSubmit}>
                        <div className="form-group">
                           <label htmlFor="login-firstname">First Name</label>
                           <input type="text" className="form-control" id="register-firstname" value={firstName} name="firstName" placeholder="Your first name" autoComplete="off" onChange={this.handleRegisterValue}/>
                           {
                              firstNameStatus ? (
                                 ''
                              ) : (
                                 <span className="error-message">The first name field is required.</span>
                              )
                           }

                           <label htmlFor="login-lastname">Last Name</label>
                           <input type="text" className="form-control" id="register-lastname" value={lastName} name="lastName" placeholder="Your last name" autoComplete="off" onChange={this.handleRegisterValue}/>
                           {
                              lastNameStatus ? (
                                 ''
                              ) : (
                                 <span className="error-message">The last name field is required.</span>
                              )
                           }

                           <label htmlFor="login-email">Email address</label>
                           <input type="email" className="form-control" id="register-email" value={email} name="email" aria-describedby="emailHelp" placeholder="Your email" autoComplete="off" onChange={this.handleRegisterValue}/>
                           <span className="error-message">{registerErrorMessage.email}</span>

                           <label htmlFor="login-password">Password</label>
                           <input type="password" className="form-control" id="register-password" value={password} name="password" placeholder="Your password" autoComplete="off" onChange={this.handleRegisterValue}/>
                           <span className="error-message">{registerErrorMessage.password}</span>

                           <label htmlFor="login-confirm-password">Confirm Password</label>
                           <input type="password" className="form-control" id="register-confirm-password" value={confirmPassword} name="confirmPassword" placeholder="Confirm your password" autoComplete="off" onChange={this.handleRegisterValue}/>
                           {
                              confirmPasswordStatus ? (
                                 ''
                              ) : (
                                 <span className="error-message">Your password does not match</span>
                              )
                           }

                           <div className="text-right button-wrapper">
                              <button type="submit" className="btn btn-outline-primary manual-signin-button">register</button>
                           </div>
                           <Alert stack={{limit: 3}} timeout={5000} html={true} />
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   // count: state.counter.count,
   // lastName: state.account.lastName
});

const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
      {
         clearLoginFieldAfterLogin,
         isLogin
      },
      dispatch
   );

export default connect(mapStateToProps, mapDispatchToProps)(Login);