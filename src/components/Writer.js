import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';
import FaPlus from 'react-icons/lib/fa/plus';
import FaSearch from 'react-icons/lib/fa/search';

import { AuthService, WriterService} from '../services';
import { RatingStars, LoadingScreen } from '../ui';
class Writer extends Component {

   constructor(props){
      super(props);

      this.state = {
         isLoading: true,
         search_stories: [],
         storyList: '',
         currentPageNumber: '',
         search: ''
      };

      this.Auth = new AuthService();
      this.handleSearch = this.handleSearch.bind(this);
      this.searchStory = this.searchStory.bind(this);
   }

   componentWillMount() {
      document.title = "Vixio - Writer Dashboard";

      // Set page to top
      window.scrollTo(0, 0);

      let token = this.Auth.getToken();

      if(this.Auth.getToken()) {

         WriterService.getStoryList(token)
         .then((res) => {
            
            this.setState({
               isLoading: false,
               storyList: res.data,
               currentPageNumber: res.data.current_page
            })

            // console.log(res.data);
         })
         .catch((err) => {
            // console.log(err);
         });
      }
   }

   renderStoryList() {
      let stories;

      if(this.state.search.length !== 0){
         stories = this.state.search_stories;
      }
      else {
         stories = this.state.storyList;
      }

      if(stories.length !== 0) {
         var renderStory = stories.data.map((story, index) => {
            return(
               <div key={index} className="col-12 col-sm-3 col-md-3 story-box-wrapper">
                  <Link to={"writer/story/" + story.id}>
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
                           <h2 className="card-author">
                              status :&nbsp;
                              {
                                 story.publish === 1 ? (
                                    'published'
                                 ) : (
                                    'unpublish'
                                 )
                              }
                           </h2>
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

      return renderStory;
   }

   getMoreStory() {
      let next_page_number = this.state.currentPageNumber + 1;
      let token = this.Auth.getToken();

      if(this.state.search.length !== 0) {

         if(next_page_number <= this.state.search_stories.last_page) {
            WriterService.getStoryList(token, next_page_number)
            .then((res) => {
               let result = res.data.data;
               let newArr =this.state.search_stories;
               result.forEach(function(data, i){
                  newArr.data.push(data);
               })
               this.setState({
                  search_stories: newArr,
                  currentPageNumber: next_page_number
               })

               
               // console.log(res);
            })
            .catch((err) => {
               // console.log(err);
            });
         }
      }
      else {

         if(next_page_number <= this.state.storyList.last_page) {
            WriterService.getStoryList(token, next_page_number)
            .then((res) => {
               let result = res.data.data;
               let newArr =this.state.storyList;
               result.forEach(function(data, i){
                  newArr.data.push(data);
               })
               this.setState({
                  storyList: newArr,
                  currentPageNumber: next_page_number
               })

               
               // console.log(res);
            })
            .catch((err) => {
               // console.log(err);
            });
         }
      }
   }

   handleSearch(e) {
      this.setState( {[e.target.name]: e.target.value} );
   }

   searchStory() {
      let search = this.state.search;
      let token = this.Auth.getToken();

      WriterService.searchStory(search, token)
      .then((res) => {

         this.setState({
            search_stories: res.data,
            currentPageNumber: res.data.current_page
         })
         console.log(res.data);
      })
      .catch((err) => {
         // console.log(err);
      });
   }

   render() {

      if(!this.state.isLoading) {

         return (
            <div className="container-fluid writer animated fadeIn">
               <div className="row no-gutters">
                  <div className="col-12 col-sm-12 col-md-12">
                     <h1 className="writer-title">Writer</h1>
                     <hr className="styled-line"/>
                     <div className="row no-gutters">
                        <div className="col-12 col-sm-12 col-md-12">
                           <div className="flex-wrapper">
                              <Link to="/writer/create">
                                 <button className="btn new-button"><FaPlus /> create new story</button>
                              </Link>
                              <div className="search-bar">
                                 <input type="text" className="form-control search-input" name="search" value={this.state.search} onChange={ this.handleSearch } placeholder="Search story to play..."/>
                                 <button type="submit" className="search-button" onClick={this.searchStory}><FaSearch /></button>
                              </div>
                           </div>
                           {
                              this.state.search.length !== 0 ?
                              (
                                 <div className="search-result text-right">
                                    <br/>
                                    <h1>search result for "{this.state.search}"...</h1>
                                 </div>
                              ) : (
                                 <div className="search-result text-right">
                                    <br/>
                                    <h1>displaying all result...</h1>
                                 </div>
                              )
                           }
                        </div>
                        {this.renderStoryList()}
                     </div>
                  </div>

                  <div className="col-12 col-sm-12 col-md-12 text-center">
                     <button className="btn writer-box-load-more" onClick={() => this.getMoreStory()}>load more</button>
                  </div>
               </div>   
            </div>
         );
      }
      else {
         return <LoadingScreen />
      }
   }
}

export default Writer;