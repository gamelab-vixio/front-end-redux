import React, { Component } from 'react';
import { ProfileCard, Timeline, Title } from '../ui';

class About extends Component {
  constructor(props) {
    super(props);
    this.timelineItems = [
      {
        title: 'Project initiated',
        date: '01-01-2018',
        description: 'This is the beginning of everything',
      },
      {
        title: 'Project finished!',
        date: '12-11-2018',
        description: 'All the main features are finished!',
      },
    ];
  }

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
              <Title text={'About'} />
              <h2 className="description-title">about this project</h2>
              <p className="description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum quas praesentium sint quae quo asperiores
                similique laboriosam reiciendis, perspiciatis ex obcaecati cupiditate assumenda quos a. Veniam aperiam
                nemo officia fuga.
              </p>
              <Timeline timelineItems={this.timelineItems} />
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
