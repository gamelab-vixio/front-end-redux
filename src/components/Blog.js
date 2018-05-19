import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';
import TiArrowRight from 'react-icons/lib/ti/arrow-right';

// Service Import
import BlogService from '../services/blog.service';

class Blog extends Component {

   constructor(props){
      super(props);

      this.state = {
         all_blogs: [],
         isLoading: true
      };
   }

   componentWillMount() {
      // Set page to top
      window.scrollTo(0, 0);

      BlogService.getAllBlogPosts()
      .then((res) => {

         this.setState({
            all_blogs: res.data,
            isLoading: false
         })

         console.log(res.data);
      })
      .catch((err) => {
         // console.log(err);
      });
   }

   getPosts() {
      let all_blogs = this.state.all_blogs.data;

      let render_all_blogs = all_blogs.map((blog) =>
         <div key={blog.id} className="col-12 col-sm-4 col-md-4 d-flex">
            <div className="blog-box">
               <h2 className="blog-box-title">{blog.title}</h2>
               <h3 className="blog-box-date">post date: {blog.updated_at} - by administrator</h3>
               <hr className="blog-box-line"/>
               <div className="blog-box-image">
                  <img src={require('../images/lina.png')} alt="blog"/> 
               </div>
               <div className="blog-box-text">
                  <TextTruncate line={5} truncateText="…" text={blog.content}/>
               </div>
               <div className="read-more">   
                  <Link className="btn read-more-button" to={"/blog/" + blog.id}>read more<TiArrowRight /></Link>
               </div>
            </div>   
         </div>
      );

      return render_all_blogs;
   }

   render() {

      if(!this.state.isLoading) {

         return (
            <div className="container-fluid blog animated fadeIn">
               <div className="row no-gutters">
                  <div className="col-12 col-sm-12 col-md-12">
                     <h1 className="blog-title">blog</h1>
                     <hr className="styled-line"/>
                     <div className="row no-gutters">

                        {this.getPosts()}
                        
                     </div>
                     
                     <div className="col-12 col-sm-12 col-md-12 text-center">
                        <button className="btn blog-box-load-more">load more</button>
                     </div>
                     
                     <div className="col-12 col-sm-12 col-md-12 text-center">
                        <div className="older-post-box">
                           <h1 className="older-post-header">
                              <span>older post</span>
                           </h1>
                           
                           <Link className="older-post" to="/blog/">
                              <h1 className="older-post-title">older post 1</h1>
                              <h2 className="older-post-date">january 12, 2018, vixio administrator</h2>
                           </Link>

                           <Link className="older-post" to="/blog">
                              <h1 className="older-post-title">older post 2</h1>
                              <h2 className="older-post-date">december 25, 2017, vixio administrator</h2>
                           </Link>

                           <Link className="older-post" to="/blog">
                              <h1 className="older-post-title">older post 3</h1>
                              <h2 className="older-post-date">november 18, 2017, vixio administrator</h2>
                           </Link>
                        </div>
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

export default Blog;