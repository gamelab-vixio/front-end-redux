import React, { Component } from 'react';

import { Link } from 'react-router-dom';

// Service Import
import AuthService from '../services/auth.service';
import WriterService from '../services/writer.service';

// UI Import
import { RatingStars, LoadingScreen } from '../ui';

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
               <RatingStars rating={Math.round(story_data.story_review[0].star)} maxRating={5} />
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
         return <LoadingScreen />
      }
   }
}

export default StoryDetail;