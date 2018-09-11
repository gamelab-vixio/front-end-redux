import React, { Component } from 'react';

import { AuthService, UserService } from '../services';
import { LoadingScreen } from '../ui';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_data: '',
      isLoading: true,
      isEdit: false,
      isChangePassword: false,
      selectedFile: null,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      changePasswordErrorMessage: '',
    };

    this.Auth = new AuthService();
    this.editProfile = this.editProfile.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.handleChangePasswordValue = this.handleChangePasswordValue.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
  }

  componentWillMount() {
    document.title = 'Vixio - My Profile';
    window.scrollTo(0, 0);
    if (this.Auth.getToken()) {
      let token = this.Auth.getToken();
      UserService.getUserProfile(token)
        .then(res => {
          this.setState({
            user_data: res.data,
            isLoading: false,
          });
        })
        .catch(err => {
          // console.log(err);
        });
    }
  }

  renderProfile() {
    let profile = this.state.user_data;

    return (
      <div className="user-profile-read">
        <label htmlFor="image">profile image :</label>
        <div className="profile-image-wrapper">
          <img src={'data:image/jpeg;base64,' + profile.image_url} alt="user-profile" />
        </div>
        <button className="btn edit-profile" onClick={this.editProfile}>
          change image
        </button>
        {this.state.isEdit ? (
          <div className="edit-profile-image">
            <label htmlFor="edit-profile-image">change profile image</label>
            <input type="file" onChange={this.fileChangedHandler} />

            <button type="submit" name="photo" className="btn submit-edit-profile" onClick={this.uploadHandler}>
              upload image
            </button>
          </div>
        ) : (
          ''
        )}

        <label htmlFor="name">name :</label>
        <p>{profile.name}</p>
        <label htmlFor="email">email :</label>
        <p>{profile.email}</p>
        <button type="submit" className="btn edit-profile" onClick={this.changePassword}>
          change password
        </button>
        {this.state.isChangePassword ? (
          <div className="edit-profile-image">
            <label htmlFor="old-password">current password</label>
            <input
              type="password"
              className="form-control"
              value={this.state.oldPassword}
              name="oldPassword"
              onChange={this.handleChangePasswordValue}
            />
            <label className="error-alert">{this.state.changePasswordErrorMessage.currentPassword}</label>

            <label htmlFor="new-password">new password</label>
            <input
              type="password"
              className="form-control"
              value={this.state.newPassword}
              name="newPassword"
              onChange={this.handleChangePasswordValue}
            />
            <label className="error-alert">{this.state.changePasswordErrorMessage.newPassword}</label>

            <label htmlFor="confirm-new-password">confirm new password</label>
            <input
              type="password"
              className="form-control"
              value={this.state.confirmPassword}
              name="confirmPassword"
              onChange={this.handleChangePasswordValue}
            />
            <label className="error-alert">{this.state.changePasswordErrorMessage.newPassword_Confirmation}</label>

            <button className="btn submit-edit-profile" onClick={this.changePasswordHandler}>
              change password
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }

  editProfile() {
    this.setState({
      isEdit: true,
    });
  }

  changePassword() {
    this.setState({
      isChangePassword: true,
    });
  }

  fileChangedHandler(e) {
    this.setState({ selectedFile: e.target.files[0] });
  }

  uploadHandler() {
    console.log(this.state.selectedFile);
    const token = this.Auth.getToken();
    const formData = new FormData();
    formData.append('photo', this.state.selectedFile, this.state.selectedFile.name);
    UserService.userEditProfile(token, formData)
      .then(res => {
        this.setState({
          selectedFile: null,
        });
        window.location.reload();
      })
      .catch(err => {
        // console.log(err);
      });
  }

  handleChangePasswordValue(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  changePasswordHandler() {
    let token = this.Auth.getToken();

    let changePasswordData = {
      currentPassword: this.state.oldPassword,
      newPassword: this.state.newPassword,
      newPassword_Confirmation: this.state.confirmPassword,
    };

    // console.log(changePasswordData);

    UserService.userChangePassword(token, changePasswordData)
      .then(res => {
        window.location.reload();

        console.log(res);
      })
      .catch(err => {
        let status = err.response.status;

        if (status === 400 || status === 422) {
          this.setState({
            changePasswordErrorMessage: err.response.data.errors,
          });
        }
        // console.log(err);
      });
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <div className="container-fluid user-profile animated fadeIn">
          <div className="row no-gutters">
            <div className="col-12 col-sm-12 col-md-12">
              <h1 className="user-profile-title">user profile</h1>
              <hr className="styled-line" />
            </div>
            <div className="col-12 col-sm-12 col-md-6 offset-md-3">{this.renderProfile()}</div>
          </div>
        </div>
      );
    } else {
      return <LoadingScreen />;
    }
  }
}

export default UserProfile;
