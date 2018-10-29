import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FaLinkedinSquare from 'react-icons/lib/fa/linkedin-square';
import FaFacebookSquare from 'react-icons/lib/fa/facebook-square';

class ProfileCard extends Component {
  static propTypes = {
    fullName: PropTypes.string.isRequired,
    universityName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    facebookLink: PropTypes.string,
    linkedinLink: PropTypes.string,
    imageName: PropTypes.string,
  };

  static defaultProps = {
    facebookLink: '#',
    linkedinLink: '#',
    imageName: 'profile.png',
  };

  render() {
    const { fullName, universityName, description, facebookLink, linkedinLink, imageName } = this.props;
    return (
      <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
        <div className="card">
          <div className="card-body">
            <div className="profile-image">
              <img src={require('../../images/' + imageName)} alt={fullName} />
            </div>
            <h2 className="card-title">{fullName}</h2>
            <p className="card-text">{description}</p>
            <p className="card-text">{universityName}</p>
          </div>
          <div className="card-footer">
            <a className="social-media" href={facebookLink}>
              <FaFacebookSquare size={30} color="#3b5998" />
            </a>
            <a className="social-media" href={linkedinLink}>
              <FaLinkedinSquare size={30} color="#0077b5" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileCard;
