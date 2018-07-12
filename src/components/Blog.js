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
         isLoading: true,
         currentPageNumber: ''
      };

      this.getMoreBlog = this.getMoreBlog.bind(this);
   }

   componentWillMount() {
		
		document.title = "Blog";

      // Set page to top
      window.scrollTo(0, 0);

      BlogService.getAllBlogPosts()
      .then((res) => {

         this.setState({
            all_blogs: res.data,
            isLoading: false,
            currentPageNumber: res.data.current_page
         })

         // console.log(res.data);
      })
      .catch((err) => {
         // console.log(err);
      });
   }

   getMoreBlog() {
      let next_page_number = this.state.currentPageNumber + 1;

      if(next_page_number <= this.state.all_blogs.last_page) {
         BlogService.getAllBlogPosts(next_page_number)
         .then((res) => {
            let result = res.data.data;
            let newArr =this.state.all_blogs;
            result.forEach(function(data, i){
               newArr.data.push(data);
            })
            this.setState({
               all_blogs: newArr,
               currentPageNumber: next_page_number
            })

            
            // console.log(res);
         })
         .catch((err) => {
            // console.log(err);
         });
      }
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
                  <img src={"data:image/jpeg;base64," + blog.image_url} alt="blog"/> 
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
                        <button className="btn blog-box-load-more" onClick={() => this.getMoreBlog()}>load more</button>
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