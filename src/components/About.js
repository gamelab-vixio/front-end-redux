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
              <h2 className="description-title">About this project</h2>
              <p className="description">
              Researchers and interactive fiction enthusiasts are continuing to explore hidden benefits of reading interactive fiction, a video game that primarily consists of text. To enable proper research on interactive fiction, a robust development tool and a distribution platform is necessary. 
              Unfortunately, current existing platforms are mostly either outdated or discontinued, even though there are many interactive fiction enthusiasts. This motivates us to develop Vixio, an all-in-one interactive fiction platform available as a web application. Vixio enables researchers and enthusiasts to develop and distribute interactive fiction with ease!
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
            imageName={'ieuan.jpg'}
          />
          <ProfileCard
            fullName={'Albert Darmawan'}
            universityName={'Binus University International'}
            description={'Software Engineer at Traveloka'}
            facebookLink={'https://www.facebook.com/darmawanalbert'}
            linkedinLink={'https://www.linkedin.com/in/darmawanalbert'}
            imageName={'albert.jpg'}
          />
          <ProfileCard
            fullName={'Shan Valdo'}
            universityName={'Binus University International'}
            description={'Software Engineer'}
            facebookLink={'https://www.facebook.com/shanvaldo'}
            linkedinLink={'https://www.linkedin.com/in/shan-valdo-96873412b'}
            imageName={'shanvaldo.jpg'}
          />
        </div>
      </div>
    );
  }
}

export default About;
