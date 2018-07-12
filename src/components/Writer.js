import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';
import FaStars from 'react-icons/lib/fa/star';
import FaStarO from 'react-icons/lib/fa/star-o';
import FaPlus from 'react-icons/lib/fa/plus';
import FaSearch from 'react-icons/lib/fa/search';

// Service Import
import AuthService from '../services/auth.service';
import WriterService from '../services/writer.service';

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
      document.title = "Writer";
      
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
            const star_counter = [1,2,3,4,5];
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
                           <div className="rating-stars">
                              {
                                 story.story_review[0] ? [
                                 
                                    star_counter.map((x, index) =>{
                                          return index + 1 <= Math.round(story.story_review[0].star) ? (
                                             <FaStars key={index} size={15} color="#f4c150"/>
                                          ) : (
                                             <FaStarO key={index} size={15} color="#f4c150"/>
                                          )
                                       }),
                                    <span key={index} className="star-average">{Math.round(story.story_review[0].star)}</span>
                                 ] : [
                                    <FaStarO key={star_counter[0]} size={15} color="#f4c150"/>,
                                    <FaStarO key={star_counter[1]} size={15} color="#f4c150"/>,
                                    <FaStarO key={star_counter[2]} size={15} color="#f4c150"/>,
                                    <FaStarO key={star_counter[3]} size={15} color="#f4c150"/>,
                                    <FaStarO key={star_counter[4]} size={15} color="#f4c150"/>
                                 ]
                              }
                           </div>
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

export default Writer;