import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FaLinkedin from 'react-icons/lib/fa/linkedin';
import FaFacebook from 'react-icons/lib/fa/facebook';

class ProfileCard extends Component {
    static propTypes = {
        fullName: PropTypes.string.isRequired,
        universityName: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        facebookLink: PropTypes.string,
        linkedinLink: PropTypes.string,
    };

    static defaultProps = {
        facebookLink: '#',
        linkedinLink: '#',
    };

    // TODO: Add image source to ProfileCard

    render() {
        const { fullName, universityName, description, facebookLink, linkedinLink } = this.props;
        return (
            <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div className="card">
                    <div className="card-body">
                        <div className="profile-image">
                           <img src={require('../../images/albert.jpg')} alt={fullName} />
                        </div>
                        <h2 className="card-title">{fullName}</h2>
                        <h3 className="card-subtitle">{universityName}</h3>
                        <p className="card-text">{description}</p>
                    </div>
                    <div className="card-footer">
                        <a className="social-media" href={facebookLink}>
                           <FaFacebook size={25} color="#3b5998"/>
                        </a>
                        <a className="social-media" href={linkedinLink}>
                           <FaLinkedin size={25} color="#0077b5"/>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileCard;