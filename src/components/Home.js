import React, { Component } from 'react';

import TextTruncate from 'react-text-truncate';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { AuthService, StoryService } from '../services';
import { RatingStars, LoadingScreen } from '../ui';

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
      this.retrieveUserBased();
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
                                       <h2 className="card-author">{story.user.name}</h2>
                                       <h2 className="card-author">
                                          category :&nbsp;
                                          <br/>
                                          {
                                             story.story_category.map((category, index) =>{
                                                   return (
                                                   <label key={index} className="category">{category.category_type.name}</label>
                                                   )
                                             })
                                          }
                                       </h2>
                                       <RatingStars rating={Math.round(story.story_review[0].star)} />
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
                                       <h2 className="card-author">{story.user.name}</h2>
                                       <h2 className="card-author">
                                          category :&nbsp;
                                          <br/>
                                          {
                                             story.story_category.map((category, index) =>{
                                                   return (
                                                   <label key={index} className="category">{category.category_type.name}</label>
                                                   )
                                             })
                                          }
                                       </h2>
                                       <RatingStars rating={Math.round(story.story_review[0].star)} />
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
                                       <h2 className="card-author">{story.user.name}</h2>
                                       <h2 className="card-author">
                                          category :&nbsp;
                                          <br/>
                                          {
                                             story.story_category.map((category, index) =>{
                                                   return (
                                                   <label key={index} className="category">{category.category_type.name}</label>
                                                   )
                                             })
                                          }
                                       </h2>
                                       <RatingStars rating={Math.round(story.story_review[0].star)} />
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
                                 this.props.isLogin && (this.state.userBased.length !== 0) ? (
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
         return <LoadingScreen />;
      }
   }
}

const mapStateToProps = (state) => ({
   isLogin: state.account.isLogin
});

export default connect(mapStateToProps)(Home);