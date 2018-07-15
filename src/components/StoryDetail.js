import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import FaStars from 'react-icons/lib/fa/star';
import FaStarO from 'react-icons/lib/fa/star-o';

// Service Import
import AuthService from '../services/auth.service';
import WriterService from '../services/writer.service';

class StoryDetail extends Component {

   constructor(props) {
      super(props);
      this.state = {
         story_id : this.props.match.params.story_id,
         story_read: '',
         isLoading: true
      };

      this.Auth = new AuthService();
      this.deleteStory = this.deleteStory.bind(this);
      this.renderContent = this.renderContent.bind(this);
      this.publishStory = this.publishStory.bind(this);
      this.unpublishStory = this.unpublishStory.bind(this);
   }

   componentWillMount() {
      // Set page to top
      window.scrollTo(0, 0);
      
      let story_id = this.state.story_id;
      let token = this.Auth.getToken();

      WriterService.getStoryRead(story_id, token)
      .then((res) => {

         this.setState({
            story_read: res.data.stories,
            isLoading: false
         });

         console.log(res.data);
      })
      .catch((err) => {
         // console.log(err);
      });
   }

   renderContent() {
      let story_data = this.state.story_read;
      let story_id = this.state.story_id;
      const star_counter = [1,2,3,4,5];
      
      return(
         <div className="card story-box">
            <div className="card-header">
               <div className="image-wrapper">
                  <img className="story-image" src={"data:image/jpeg;base64," + story_data.image_url} alt="IF"/>
               </div>
            </div>
            <div className="card-body">
               <h1 className="card-title">
                  {story_data.title}
               </h1>
               <p>{story_data.description}</p>
               <h2 className="card-author">
                  category :&nbsp;
                  <br/>
                  {

                     story_data.story_category.map((category, index) =>{
                        return (
                           <label key={index} className="category">{category.category_type.name}</label>
                        )
                     })
                  }
               </h2>
               <div className="rating-stars">
                  {
                     story_data.story_review[0] ? [
                     
                        star_counter.map((x, index) =>{
                              return index + 1 <= Math.round(story_data.story_review[0].star) ? (
                                 <FaStars key={index} size={15} color="#f4c150"/>
                              ) : (
                                 <FaStarO key={index} size={15} color="#f4c150"/>
                              )
                           }),
                        <span key={star_counter[0] + 7} className="star-average">{Math.round(story_data.story_review[0].star)}</span>
                     ] : [
                        <FaStarO key={star_counter[0]} size={15} color="#f4c150"/>,
                        <FaStarO key={star_counter[1]} size={15} color="#f4c150"/>,
                        <FaStarO key={star_counter[2]} size={15} color="#f4c150"/>,
                        <FaStarO key={star_counter[3]} size={15} color="#f4c150"/>,
                        <FaStarO key={star_counter[4]} size={15} color="#f4c150"/>
                     ]
                  }
               </div>

               <div className="bottom-button">
                  <Link to={"/writer/story/edit/" + story_id}>
                     <button className="btn">edit story</button>
                  </Link>
                  
                  <button className="btn" onClick={this.deleteStory}>delete story</button>
                  {
                     this.state.story_read.publish === 0 ?
                        (
                           <button className="btn" onClick={this.publishStory}>publish story</button>
                        ) : (
                           <button className="btn" onClick={this.unpublishStory}>unpublish story</button>
                        )
                  }
               </div>
            </div>
         </div>
      );
   }

   publishStory() {
      let story_id = this.state.story_id;
      let token = this.Auth.getToken()
      let data = JSON.parse(this.state.story_read.content);
      let knot = "->" + data[0].name + ".p0\n";

      data.forEach(function(section, i){
         const sectionName = section['name'].replace(new RegExp(' ', 'g'), '_');
         knot+= "=== "+sectionName+"\n";
         section['paragraphs'].forEach(function(paragraph, j){
            knot+="\t= p"+j+"\n";
            knot+="\t"+paragraph['content']+"\n";
            if(paragraph['links'].length === 0){
               knot+="\t->END\n";
            }
            for (let k = 0; k <= paragraph['choices'].length - 1; k++) {
               knot+="\t* "+paragraph['choices'][k]+"\n";
               let res = false;
               let p = paragraph['links'][k];
               if(p){
                  res = data[p['section']]['name']+".p"+p['paragraph'];
               }
               if(!res){
                  res = "END";
               }

               knot+="\t->"+res+"\n";
            }
         });
      });

      const inkData = new FormData();

      inkData.append('ink', knot);

      WriterService.publishStory(story_id, token, inkData)
      .then((res) => {
         this.props.history.push("/writer");
         // console.log(res);

      })
      .catch((err) => {
         // console.log(err);
      });

   }

   unpublishStory() {
      let story_id = this.state.story_id;
      let token = this.Auth.getToken();

      WriterService.unpublishStory(story_id, token)
      .then((res) => {
         this.props.history.push("/writer");
         // console.log(res);
      })
      .catch((err) => {
         // console.log(err);
      });
   }

   deleteStory() {
      let story_id = this.state.story_id;
      let token = this.Auth.getToken();

      WriterService.deleteStory(story_id, token)
      .then((res) => {

         this.props.history.push("/writer");
         // console.log(res);

      })
      .catch((err) => {
         // console.log(err);
      });
   }

   render() {

      if(!this.state.isLoading) {
         return (
            <div className="container-fluid story-detail animated fadeInDownBig">
               <div className="row no-gutters">
                  <div className="col-12 col-sm-12 col-md-6 offset-md-3">
                     <div className="story-detail-read">
                        {this.renderContent()}
                     </div>
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

export default StoryDetail;