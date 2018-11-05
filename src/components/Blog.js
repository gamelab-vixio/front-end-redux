import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TiArrowRight from 'react-icons/lib/ti/arrow-right';
import ReactHtmlParser from 'react-html-parser';
import { BlogService } from '../services';
import { LoadingScreen, Title } from '../ui';
class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBlogs: [],
      isLoading: true,
      currentPageNumber: '',
    };
  }

  componentWillMount() {
    document.title = 'Vixio - Blog';
    window.scrollTo(0, 0);

    BlogService.getAllBlogPosts()
      .then(res => {
        this.setState({
          allBlogs: res.data,
          isLoading: false,
          currentPageNumber: res.data.current_page,
        });
      })
      .catch(err => {});
  }

  getMoreBlog = () => {
    let nextPageNumber = this.state.currentPageNumber + 1;

    if (nextPageNumber <= this.state.allBlogs.last_page) {
      BlogService.getAllBlogPosts(nextPageNumber)
        .then(res => {
          const result = res.data.data;
          let newArr = this.state.allBlogs;
          result.forEach(function(data, i) {
            newArr.data.push(data);
          });
          this.setState({
            allBlogs: newArr,
            currentPageNumber: nextPageNumber,
          });
        })
        .catch(err => {});
    }
  };

  getPosts() {
    const allBlogs = this.state.allBlogs.data;

    const renderAllBlogs = allBlogs.map(blog => (
      <div key={blog.id} className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 d-flex">
        <div className="blog-box">
          <h2 className="blog-box-title">{blog.title}</h2>
          <h3 className="blog-box-date">post date: {blog.updated_at} - by administrator</h3>
          <hr className="blog-box-line" />
          <div className="blog-box-image">
            <img src={'data:image/jpeg;base64,' + blog.image_url} alt="blog" />
          </div>
          <div className="blog-box-text">{ReactHtmlParser(blog.content)}</div>
          <div className="blog-separator" />
          <div className="read-more">
            <Link className="btn read-more-button" to={'/blog/' + blog.id}>
              read more
              <TiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    ));

    return renderAllBlogs;
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <div className="container-fluid blog animated fadeIn">
          <div className="row no-gutters">
            <div className="col-12 col-sm-12 col-md-12">
              <Title text={'Blog'} />
              <div className="row no-gutters">{this.getPosts()}</div>
              <div className="col-12 col-sm-12 col-md-12 text-center">
                <button className="btn blog-box-load-more" onClick={this.getMoreBlog}>
                  load more
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <LoadingScreen />;
    }
  }
}

export default Blog;
