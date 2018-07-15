import React, { Component } from 'react';

import TextTruncate from 'react-text-truncate';
import FaStars from 'react-icons/lib/fa/star';
import { Link } from 'react-router-dom';
// import FaStarO from 'react-icons/lib/fa/star-o';

// Service Import
import AuthService from '../services/auth.service';
import StoryService from '../services/story.service';

// Redux Import
import { connect } from 'react-redux';

class Home extends Component {
   
   constructor(props){
      super(props);

      this.state = {
         mostPopular: [],
         newAvailable: [],
         userBased: [],
         isLoading: true
      };

      this.Auth = new AuthService();
      this.retrieveMostPopular = this.retrieveMostPopular.bind(this);
      this.retrieveNewAvailable = this.retrieveNewAvailable.bind(this);
      this.retrieveUserBased = this.retrieveUserBased.bind(this);
   }

   componentWillMount() {

		document.title = "Vixio - Home";	
		
      // Set page to top
      window.scrollTo(0, 0);
      
      this.retrieveMostPopular();
      this.retrieveNewAvailable();
   }

   retrieveMostPopular() {
      StoryService.mostPopular()
      .then((res) => {

         this.setState({
            mostPopular: res.data,
            isLoading: false
         })

         // console.log(res.data);
      })
      .catch((err) => {
         // console.log(err);
      });
   }

   retrieveNewAvailable() {
      StoryService.newAvailable()
      .then((res) => {

         this.setState({
            newAvailable: res.data,
            isLoading: false
         })

         // console.log(res.data);
      })
      .catch((err) => {
         // console.log(err);
      });
   }

   retrieveUserBased() {
      let token = this.Auth.getToken();
      StoryService.userBased(token)
      .then((res) => {

         this.setState({
            userBased: res.data,
            isLoading: false
         })

         // console.log(res.data);
      })
      .catch((err) => {
         // console.log(err);
      });
   }

   renderMostPopular() {

      let all_stories = this.state.mostPopular;

      // console.log(all_stories);

      return(

         <div className="row no-gutters">
            <div className="col-12 col-sm-12 col-md-12">
               <div className="row no-gutters story-row">
                  
                  {               
                     all_stories.map((story, index) => {
                        return(
                           <div key={story.id} className="col-12 col-sm-5 col-md-3 col-lg-3 col-xl-2 story-box-wrapper">
                              <Link to={"/story/" + story.id}>
                                 <div className="card story-box">
                                    <div className="card-header">
                                       <div className="image-wrapper">
                                       <img className="story-image" src={"data:image/jpeg;base64," + story.image_url} alt="IF"/>
                                       </div>
                                    </div>
                                    <div className="card-body">
                                       <h1 className="card-title">
                                          <TextTruncate line={2} truncateText="…" text={story.title}/>
                                       </h1>
                                       {/* <h2 className="card-author">{story.user.name}</h2> */}
                                       <div className="rating-stars">
                                          <FaStars size={15} color="#f4c150"/>
                                          <FaStars size={15} color="#f4c150"/>
                                          <FaStars size={15} color="#f4c150"/>
                                          <FaStars size={15} color="#f4c150"/>
                                          <FaStars size={15} color="#f4c150"/>
                                          <span className="star-average">5.0</span>
                                          <span className="total-comments">(1024)</span>
                                       </div>
                                    </div>
                                 </div>
                              </Link>
                           </div>
                        )
                     })
                  }

               </div>
            </div>
         </div>
      );
   }

   renderNewAvailable() {

      let all_stories = this.state.newAvailable;

      // console.log(all_stories);

      return(

         <div className="row no-gutters">
            <div className="col-12 col-sm-12 col-md-12">
               <div className="row no-gutters story-row">
                  
                  {               
                     all_stories.map((story, index) => {
                        return(
                           <div key={story.id} className="col-12 col-sm-5 col-md-3 col-lg-3 col-xl-2 story-box-wrapper">
                              <Link to={"/story/" + story.id}>
                                 <div className="card story-box">
                                    <div className="card-header">
                                       <div className="image-wrapper">
                                       <img className="story-image" src={"data:image/jpeg;base64," + story.image_url} alt="IF"/>
                                       </div>
                                    </div>
                                    <div className="card-body">
                                       <h1 className="card-title">
                                          <TextTruncate line={2} truncateText="…" text={story.title}/>
                                       </h1>
                                       {/* <h2 className="card-author">{story.user.name}</h2> */}
                                       <div className="rating-stars">
                                          <FaStars size={15} color="#f4c150"/>
                                          <FaStars size={15} color="#f4c150"/>
                                          <FaStars size={15} color="#f4c150"/>
                                          <FaStars size={15} color="#f4c150"/>
                                          <FaStars size={15} color="#f4c150"/>
                                          <span className="star-average">5.0</span>
                                          <span className="total-comments">(1024)</span>
                                       </div>
                                    </div>
                                 </div>
                              </Link>
                           </div>
                        )
                     })
                  }

               </div>
            </div>
         </div>
      );
   }

   renderUserBased() {

      let all_stories = this.state.userBased;

      console.log(all_stories);

      return(

         <div className="row no-gutters">
            <div className="col-12 col-sm-12 col-md-12">
               <div className="row no-gutters story-row">
                  
                  {               
                     all_stories.map((story, index) => {
                        return(
                           <div key={story.id} className="col-12 col-sm-5 col-md-3 col-lg-3 col-xl-2 story-box-wrapper">
                              <Link to={"/story/" + story.id}>   
                                 <div className="card story-box">
                                    <div className="card-header">
                                       <div className="image-wrapper">
                                       <img className="story-image" src={"data:image/jpeg;base64," + story.image_url} alt="IF"/>
                                       </div>
                                    </div>
                                    <div className="card-body">
                                       <h1 className="card-title">
                                          <TextTruncate line={2} truncateText="…" text={story.title}/>
                                       </h1>
                                       {/* <h2 className="card-author">{story.user.name}</h2> */}
                                       <div className="rating-stars">
                                          <FaStars size={15} color="#f4c150"/>
                                          <FaStars size={15} color="#f4c150"/>
                                          <FaStars size={15} color="#f4c150"/>
                                          <FaStars size={15} color="#f4c150"/>
                                          <FaStars size={15} color="#f4c150"/>
                                          <span className="star-average">5.0</span>
                                          <span className="total-comments">(1024)</span>
                                       </div>
                                    </div>
                                 </div>
                              </Link>
                           </div>
                        )
                     })
                  }

               </div>
            </div>
         </div>
      );
   }

   render() {

      if(!this.state.isLoading) {

         return (
            <div className="container-fluid home animated fadeIn">
               {/*
               <div className="row no-gutters">
                  <div className="col-12 col-sm-12 col-md-12 search-background">
                     <h1>the next generation interactive fiction platform</h1>
                  </div>
               </div> */}
               <div className="row no-gutters">
                  <div className="col-12 col-sm-12 col-md-12">

                     {
                        !this.state.isLoading ? (
                           <div>
                              <div className="story-category-wrapper">
                                 <h1 className="category-title text-center">Most Popular</h1>                     
                                    {this.renderMostPopular()}
                              </div>

                              <div className="story-category-wrapper">
                                 <h1 className="category-title text-center">New Available</h1>                     
                                    {this.renderNewAvailable()}
                              </div>
                              
                              {
                                 this.props.isLogin ? (
                                    <div className="story-category-wrapper">
                                       <h1 className="category-title text-center">User Based</h1>                     
                                          {this.renderUserBased()}
                                    </div>
                                 ) : (
                                    ''
                                 )
                              }
                              
                           </div>
                        ) : (
                           ''
                        )
                     }
                  </div>
               </div>
            </div>
         );
      }
      else {
         return(
            <div className="loader">
               <div className="sk-cube-grid">
                  <div className="sk-cube sk-cube1"></div>
                  <div className="sk-cube sk-cube2"></div>
                  <div className="sk-cube sk-cube3"></div>
                  <div className="sk-cube sk-cube4"></div>
                  <div className="sk-cube sk-cube5"></div>
                  <div className="sk-cube sk-cube6"></div>
                  <div className="sk-cube sk-cube7"></div>
                  <div className="sk-cube sk-cube8"></div>
                  <div className="sk-cube sk-cube9"></div>
               </div>
            </div>
         );
      }
   }
}

const mapStateToProps = (state) => ({
   isLogin: state.account.isLogin
});

export default connect(mapStateToProps)(Home);