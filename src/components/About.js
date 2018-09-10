import React, { Component } from 'react';
import { ProfileCard } from '../ui';
class About extends Component {
  // Set page to top
  componentWillMount() {
    document.title = 'Vixio - About';
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="container-fluid about animated fadeIn">
        <div className="row no-gutters">
          <div className="col-12 col-sm-12 col-md-12">
            <div className="wrapper">
              <h1 className="about-title">about</h1>
              <hr className="styled-line" />
              <h2 className="description-title">about this project</h2>
              <p className="description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum quas praesentium sint quae quo asperiores
                similique laboriosam reiciendis, perspiciatis ex obcaecati cupiditate assumenda quos a. Veniam aperiam
                nemo officia fuga.
              </p>
              <div className="milestone">
                <h2 className="milestone-title">milestone</h2>
                <div className="timeline-item" date-is="01-01-2018">
                  <h1>milestone title</h1>
                  <p>description</p>
                </div>

                <div className="timeline-item" date-is="01-02-2018">
                  <h1>milestone title</h1>
                  <p>description</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row no-gutters">
          <div className="col-12 col-sm-12 col-md-12">
            <div className="contributors-title">
              <h2>Contributors</h2>
            </div>
          </div>
          <ProfileCard
            fullName={'Ieuan Ignatius'}
            universityName={'Binus University International'}
            description={'Software Engineer at Tiket.com'}
            facebookLink={'https://www.facebook.com/ieuan.ignatius'}
            linkedinLink={'https://www.linkedin.com/in/ieuanignatius'}
          />
          <ProfileCard
            fullName={'Albert Darmawan'}
            universityName={'Binus University International'}
            description={'Software Engineer at Traveloka'}
            facebookLink={'https://www.facebook.com/darmawanalbert'}
            linkedinLink={'https://www.linkedin.com/in/darmawanalbert'}
          />
          <ProfileCard
            fullName={'Shan Valdo'}
            universityName={'Binus University International'}
            description={'Software Engineer'}
            facebookLink={'https://www.facebook.com/shanvaldo'}
            linkedinLink={'https://www.linkedin.com/in/shan-valdo-96873412b'}
          />
        </div>
      </div>
    );
  }
}

export default About;
