import React, { Component } from 'react';

// import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-autosize-textarea';
import Alert from 'react-s-alert';
// import TiArrowRight from 'react-icons/lib/ti/arrow-right';
// import TiArrowLeft from 'react-icons/lib/ti/arrow-left';
import ReactHtmlParser from 'react-html-parser';
import FaMailReply from 'react-icons/lib/fa/mail-reply';
import FaAngleUp from 'react-icons/lib/fa/angle-up';
import FaAngleDown from 'react-icons/lib/fa/angle-down';

import { AuthService, BlogService } from '../services';
import { LoadingScreen } from '../ui';
class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog_id: this.props.match.params.blog_detail,
      blog_content: '',
      display_message: ['Show Reply', 'Hide Reply'],
      global_status_comment: [],
      commentParent: '',
      isLoading: true,
      commentParentIdFromChild: '',
      isReply: false,
      commentChild: '',
    };

    this.Auth = new AuthService();
    this.childCommentReply = this.childCommentReply.bind(this);
    this.view_reply_toggle.bind(this);
    this.cancelComment = this.cancelComment.bind(this);
    this.handleChildCommentValue = this.handleChildCommentValue.bind(this);
    this.handleChildCommentReplySubmit = this.handleChildCommentReplySubmit.bind(this);
    this.handleCommentParentValue = this.handleCommentParentValue.bind(this);
    this.handleCommentParentSubmit = this.handleCommentParentSubmit.bind(this);
  }

  componentWillMount() {
    // Set page to top
    document.title = 'Vixio - Blog Content';
    window.scrollTo(0, 0);

    let passed_blog_id = this.state.blog_id;

    BlogService.getPostById(passed_blog_id)
      .then(res => {
        // Initialized comment status
        let comment_length = res.data.blog_comment.length;
        let joined = [];
        for (let i = 0; i < comment_length; i++) {
          let comment_id = res.data.blog_comment[i].id;
          joined = joined.concat([[comment_id, 0]]);
        }

        this.setState({
          global_status_comment: joined,
          blog_content: res.data,
          isLoading: false,
        });

        // console.log(res);
      })
      .catch(err => {
        // console.log(err);
      });
  }

  getContent() {
    let blog_content = this.state.blog_content;
    // let blog_content_id = parseInt(blog_content.id, 10);
    // let blog_content_id_prev = (blog_content_id - 1);
    // let blog_content_id_next = (blog_content_id + 1);

    return (
      <div>
        <div className="blog-content">
          <h2 className="blog-detail-box-title">{blog_content.title}</h2>
          <h3 className="blog-detail-box-date">post date: {blog_content.updated_at} - by administrator</h3>
          <hr className="blog-detail-box-line" />
          <div className="blog-detail-box-image">
            <img
              className="story-image"
              src={'data:image/jpeg;base64,' + blog_content.image_url}
              alt="blog_thumbnail"
            />
          </div>
          <p className="blog-detail-box-text">{ReactHtmlParser(blog_content.content)}</p>
        </div>

        {/*
            <div className="change-post">
               <Link className="previous-post" to={{pathname: '/blog/' + blog_content_id_prev}}><TiArrowLeft/>previous post</Link>
               <Link className="next-post" to={{pathname: '/blog/' + blog_content_id_next}}>next post<TiArrowRight/></Link>
            </div> */}
      </div>
    );
  }

  getComment() {
    let all_comments = this.state.blog_content.blog_comment;

    let render_all_comments = all_comments.map((comment, index) => (
      <div key={comment.id.toString()} className="col-12 col-sm-12 col-md-12 first-level-comment-wrapper">
        <div className="first-level-comment">
          <div className="col-2 col-sm-1 col-md-1 comment-profile-image-wrapper">
            <div className="comment-profile-image">
              <img src={require('../images/profile.png')} alt="profile" />
            </div>
          </div>
          <div className="col-10 col-sm-11 col-md-11 comment-text-wrapper">
            <div className="comment-text">
              <h4 className="commentator">{comment.user.name}</h4>
              <p className="content">{comment.comment}</p>
              <button className="btn reply-button" onClick={() => this.childCommentReply(comment.id)}>
                reply&nbsp;
                <FaMailReply size={10} />
              </button>
              {comment.reply.length > 0
                ? [
                    <button
                      key={'reply-button-' + index.toString()}
                      className="btn view-reply-button"
                      onClick={() => this.view_reply_toggle(comment.id)}
                    >
                      {this.state.global_status_comment[index][1] === 0 ? 'Show Reply' : 'Hide Reply'}
                      &nbsp;
                      {this.state.global_status_comment[index][1] === 0 ? <FaAngleDown /> : <FaAngleUp />}
                    </button>,
                    this.state.global_status_comment[index][1] === 1
                      ? comment.reply.map((second_level_comment, index) => (
                          <div
                            key={'level-2-comment-' + index.toString()}
                            className="col-12 col-sm-12 col-md-12 second-level-comment-wrapper"
                          >
                            <div className="second-level-comment">
                              <div className="col-2 col-sm-1 col-md-1 comment-profile-image-wrapper">
                                <div className="comment-profile-image">
                                  <img src={require('../images/profile.png')} alt="profile" />
                                </div>
                              </div>
                              <div className="col-10 col-sm-11 col-md-11 comment-text-wrapper">
                                <h4 className="commentator">{second_level_comment.user.name}</h4>
                                <p className="content">{second_level_comment.comment}</p>
                                <button className="btn reply-button" onClick={() => this.childCommentReply(comment.id)}>
                                  reply&nbsp;
                                  <FaMailReply size={10} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      : '',
                  ]
                : ''}
            </div>
          </div>
        </div>
      </div>
    ));

    return render_all_comments;
  }

  handleChildCommentValue(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  childCommentReply(commentParentId) {
    this.setState({
      isReply: true,
      commentParentIdFromChild: commentParentId,
    });
  }

  handleChildCommentReplySubmit(e) {
    e.preventDefault();
    let blog_id = this.state.blog_id;
    let commentParentId = this.state.commentParentIdFromChild;
    let reply = this.state.commentChild;
    let token = this.Auth.getToken();

    let data = {
      comment: reply,
    };

    if (this.Auth.getToken()) {
      BlogService.createComment(data, blog_id, token, commentParentId)
        .then(res => {
          // Clear state and show success alert
          this.setState({
            commentChild: '',
          });

          //Refresh page
          window.location.reload();

          // console.log(res.data);
        })
        .catch(err => {
          // console.log(err.response);
        });
    } else {
      this.nonLoginAlert();
    }
  }

  cancelComment() {
    this.setState({
      isReply: false,
    });
  }

  view_reply_toggle(comment_id) {
    let new_value;
    let array_length = this.state.global_status_comment.length;
    for (let i = 0; i < array_length; i++) {
      if (this.state.global_status_comment[i][0] === comment_id) {
        new_value = this.state.global_status_comment.slice();

        let current_status = this.state.global_status_comment[i][1];
        if (current_status === 0) {
          new_value[i][1] = 1;
        } else {
          new_value[i][1] = 0;
        }

        this.setState({
          global_status_comment: new_value,
        });
      }
    }
  }

  handleCommentParentValue(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleCommentParentSubmit(e) {
    e.preventDefault();

    // JSON into Variable
    let commentParentData = {
      comment: this.state.commentParent,
    };

    if (this.Auth.getToken()) {
      let blogId = this.state.blog_content.id;
      let token = this.Auth.getToken();
      BlogService.createComment(commentParentData, blogId, token)
        .then(res => {
          // Clear state and show success alert
          this.setState({
            commentParent: '',
          });

          //Refresh page
          window.location.reload();

          // console.log(res.data);
        })
        .catch(err => {
          // console.log(err.response);
        });
    } else {
      this.nonLoginAlert();
    }
  }

  nonLoginAlert() {
    Alert.error('<h5>Please sign in first to comment in this blog post</h5>', {
      position: 'bottom-right',
      effect: 'slide',
      offset: 50,
    });
  }

  render() {
    let { commentParent, commentChild } = this.state;

    if (!this.state.isLoading) {
      return (
        <div className="container-fluid blog-detail animated fadeInDownBig">
          <div className="row no-gutters">
            <div className="col-12 col-sm-10 col-md-10 col-lg-8 col-xl-6 offset-sm-1 offset-md-1 offset-lg-2 offset-xl-3">
              <div className="blog-detail-read">
                {/*Render Blog*/}
                {this.getContent()}

                <div className="blog-detail-comment">
                  <h2 className="comment-title">comments</h2>

                  {!this.state.isReply ? (
                    <form onSubmit={this.handleCommentParentSubmit} className="animated fadeInUp">
                      <div className="comment-form-wrapper col-12 col-sm-12 col-md-12">
                        <div className="form-group comment-form">
                          <div className="comment-profile-image-wrapper col-2 col-sm-1 col-md-1">
                            <div className="comment-profile-image">
                              <img src={require('../images/profile.png')} alt="profile" />
                            </div>
                          </div>
                          <div className="create-comment-wrapper col-10 col-sm-11 col-md-11">
                            <div className="create-comment">
                              <TextareaAutosize
                                className="form-control comment-box"
                                rows={1}
                                value={commentParent}
                                name="commentParent"
                                placeholder="Add a public comment..."
                                autoComplete="off"
                                onChange={this.handleCommentParentValue}
                              />
                              <button type="submit" className="btn submit-comment">
                                comment
                              </button>
                              <Alert stack={{ limit: 3 }} timeout={5000} html={true} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={this.handleChildCommentReplySubmit} className="animated fadeInDown">
                      <div className="comment-form-wrapper col-12 col-sm-12 col-md-12">
                        <div className="form-group comment-form">
                          <div className="comment-profile-image-wrapper col-2 col-sm-1 col-md-1">
                            <div className="comment-profile-image">
                              <img src={require('../images/profile.png')} alt="profile" />
                            </div>
                          </div>
                          <div className="create-comment-wrapper col-10 col-sm-11 col-md-11">
                            <div className="create-comment">
                              <TextareaAutosize
                                className="form-control comment-box"
                                rows={1}
                                value={commentChild}
                                name="commentChild"
                                placeholder="Reply comment..."
                                autoComplete="off"
                                onChange={this.handleChildCommentValue}
                              />
                              <button className="btn cancel-comment" onClick={this.cancelComment}>
                                cancel
                              </button>
                              <button type="submit" className="btn submit-comment">
                                reply comment
                              </button>
                              <Alert stack={{ limit: 3 }} timeout={5000} html={true} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}

                  {this.state.global_status_comment.length !== 0 ? (
                    this.getComment()
                  ) : (
                    <div className="alert alert-info text-center">
                      <span>
                        Be the <strong>first</strong> comment in this blog
                      </span>
                    </div>
                  )}
                </div>
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

export default BlogDetail;
