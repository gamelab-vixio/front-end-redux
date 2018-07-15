import React, { Component } from 'react';

import Slider from 'react-slick';
import TextTruncate from 'react-text-truncate';
import FaStars from 'react-icons/lib/fa/star';
// import FaStarO from 'react-icons/lib/fa/star-o';

// Service Import
import StoryService from '../services/story.service';

class Home extends Component {
   
   constructor(props){
      super(props);

      this.state = {
         all_stories: [],
         isLoading: true
      };

      this.retrieveStoryData = this.retrieveStoryData.bind(this);
   }

   componentWillMount() {

		document.title = "Vixio - Home";	
		
      // Set page to top
      window.scrollTo(0, 0);
      
      this.retrieveStoryData();
   }

   retrieveStoryData(page_number) {
      StoryService.getAllStories(page_number)
      .then((res) => {

         this.setState({
            all_stories: res.data,
            isLoading: false
         })

         // console.log(res.data);
      })
      .catch((err) => {
         // console.log(err);
      });
   }

   renderStoryCard() {

      let all_stories = this.state.all_stories;

      // console.log(all_stories);

      return(

         <div className="row no-gutters">
            <div className="col-12 col-sm-12 col-md-12">
               <div className="row no-gutters story-row">
                  
                  {               
                     all_stories.data.map((story, index) => {
                        return(
                           <div key={story.id} className="col-12 col-sm-5 col-md-3 col-lg-3 col-xl-2 story-box-wrapper">
                              <div className="card story-box">
                                 <div className="card-header">
                                    <div className="image-wrapper">
                                       <img className="story-image" src={'https://pm1.narvii.com/6028/a945a07be845c179ae038a85a307f6964af5aa0b_hq.jpg'} alt="IF"/>
                                    </div>
                                 </div>
                                 <div className="card-body">
                                    <h1 className="card-title">
                                       <TextTruncate line={2} truncateText="…" text={story.title}/>
                                    </h1>
                                    <h2 className="card-author">{story.user.name}</h2>
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

      var settings = {
         dots: false,
         infinite: true,
         speed: 500,
         slidesToShow: 1,
         slidesToScroll: 1,
         autoplay: true,
         arrows: true,
         pauseOnHover: true,
      };

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
                           {/*Desktop version*/}
                           <div className="story-category-wrapper">
                              <h1 className="category-title text-center">Top Search in This Month</h1>                     
                              {/* <Slider {...settings}> */}
                                 {this.renderStoryCard()}
                                 {/*this.retrieveStoryData(2)*/}
                              {/* </Slider> */}
                           </div>
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
}

export default Home;