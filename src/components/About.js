import React, { Component } from 'react';

import FaLinkedin from 'react-icons/lib/fa/linkedin';
import FaFacebook from 'react-icons/lib/fa/facebook';

class About extends Component {
   
   // Set page to top
   componentWillMount(){
      document.title = "About";

      window.scrollTo(0, 0);
   }

   render() {

      return (
         <div className="container-fluid about animated fadeIn">
            <div className="row no-gutters">
               <div className="col-12 col-sm-12 col-md-12">
                  <div className="wrapper">
                     <h1 className="about-title">about</h1>
                     <hr className="styled-line"/>
                     <h2 className="description-title">about this project</h2>
                     <p className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Eum quas praesentium sint quae quo asperiores similique 
                      laboriosam reiciendis, perspiciatis ex obcaecati cupiditate 
                      assumenda quos a. Veniam aperiam nemo officia fuga.</p>
                     
                     <div className="milestone">
                        <h2 className="milestone-title">milestone</h2>
                        <div className="timeline-item" date-is='01-01-2018'>
                           <h1>milestone title</h1>
                           <p>description</p>
                        </div>

                        <div className="timeline-item" date-is='01-02-2018'>
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
                     <h2>contributors</h2>
                  </div>
               </div>   
               <div className="col-12 col-sm-4 col-md-4">
                  <div className="card">
                     <div className="card-body">
                        <div className="profile-image">
                           <img src={require('../images/albert.jpg')} alt="shan valdo"/>
                        </div>
                        <h2 className="card-title">albert darmawan</h2>
                        <h3 className="card-subtitle">binus international university</h3>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                     </div>
                     <div className="card-footer">
                        <a className="social-media" href="https://www.facebook.com/darmawanalbert" onClick={this.toggle}>
                           <FaFacebook size={25} color="#3b5998"/>
                        </a>
                        <a className="social-media" href="https://www.linkedin.com/in/darmawanalbert" onClick={this.toggle}>
                           <FaLinkedin size={25} color="#0077b5"/>
                        </a>
                     </div>
                  </div>
               </div>

               <div className="col-12 col-sm-4 col-md-4">
                  <div className="card">
                     <div className="card-body">
                        <div className="profile-image">
                           <img src={require('../images/ieuan.jpg')} alt="shan valdo"/>
                        </div>
                        <h2 className="card-title">ieuan ignatius</h2>
                        <h3 className="card-subtitle">binus international university</h3>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                     </div>
                     <div className="card-footer">
                        <a className="social-media" href="https://www.facebook.com/ieuan.ignatius" onClick={this.toggle}>
                           <FaFacebook size={25} color="#3b5998"/>
                        </a>
                        <a className="social-media" href="https://www.linkedin.com/in/ieuanignatius" onClick={this.toggle}>
                           <FaLinkedin size={25} color="#0077b5"/>
                        </a>
                     </div>
                  </div>
               </div>

               <div className="col-12 col-sm-4 col-md-4">
                  <div id="last-card" className="card">
                     <div className="card-body">
                        <div className="profile-image">
                           <img src={require('../images/shanvaldo.jpg')} alt="shan valdo"/>
                        </div>
                        <h2 className="card-title">shan valdo</h2>
                        <h3 className="card-subtitle">binus international university</h3>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                     </div>
                     <div className="card-footer">
                        <a className="social-media" href="https://www.facebook.com/shanvaldo" onClick={this.toggle}>
                           <FaFacebook size={25} color="#3b5998"/>
                        </a>
                        <a className="social-media" href="https://www.linkedin.com/in/shan-valdo-96873412b/" onClick={this.toggle}>
                           <FaLinkedin size={25} color="#0077b5"/>
                        </a>
                     </div>
                  </div>   
               </div>
            </div>   
         </div>
      );
   }
}

export default About;