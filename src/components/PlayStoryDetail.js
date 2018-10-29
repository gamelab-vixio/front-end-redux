import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-autosize-textarea';
import Alert from 'react-s-alert';
import FaMailReply from 'react-icons/lib/fa/mail-reply';
import FaAngleUp from 'react-icons/lib/fa/angle-up';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import { AuthService, StoryService, ReportService } from '../services';
import { RatingStars, LoadingScreen } from '../ui';
class PlayStoryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      story_id: this.props.match.params.story_id,
      story_content: '',
      story_read: '',
      image: '',
      isLoading: true,
      isReport: false,
      reason: '',
      selectedStoryFile: null,
      global_status_comment: [],
      commentParentIdFromChild: '',
      isReply: false,
      commentChild: '',
      commentParent: '',
      display_message: ['Show Reply', 'Hide Reply'],
      itemBased: [],
    };

    this.Auth = new AuthService();
  }

  componentWillMount() {
    document.title = 'Vixio - Story Info';
    window.scrollTo(0, 0);
    let story_id = this.state.story_id;
    StoryService.getStoryContent(story_id)
      .then(res => {
        // Initialized comment status
        let comment_length = res.data.story_comment.length;
        let joined = [];
        for (let i = 0; i < comment_length; i++) {
          let comment_id = res.data.story_comment[i].id;
          joined = joined.concat([[comment_id, 0]]);
        }

        this.setState({
          global_status_comment: joined,
          story_read: res.data,
          isLoading: false,
        });
        // console.log(res.data);
      })
      .catch(err => {
        // console.log(err);
      });
  }

  getComment() {
    let all_comments = this.state.story_read.story_comment;

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
                      onClick={() => this.viewReplyToggle(comment.id)}
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

  handleChildCommentValue = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  childCommentReply = commentParentId => {
    this.setState({
      isReply: true,
      commentParentIdFromChild: commentParentId,
    });
  };

  handleChildCommentReplySubmit = e => {
    e.preventDefault();
    let story_id = this.state.story_id;
    let commentParentId = this.state.commentParentIdFromChild;
    let reply = this.state.commentChild;
    let token = this.Auth.getToken();

    let data = {
      comment: reply,
    };

    if (this.Auth.getToken()) {
      StoryService.createComment(data, story_id, token, commentParentId)
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
  };

  cancelComment = () => {
    this.setState({
      isReply: false,
    });
  };

  viewReplyToggle = comment_id => {
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
  };

  handleCommentParentValue = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCommentParentSubmit = e => {
    e.preventDefault();

    // JSON into Variable
    let commentParentData = {
      comment: this.state.commentParent,
    };

    if (this.Auth.getToken()) {
      let story_id = this.state.story_id;
      let token = this.Auth.getToken();
      StoryService.createComment(commentParentData, story_id, token)
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
  };

  nonLoginAlert() {
    Alert.error('<h5>Please sign in first to comment in this blog post</h5>', {
      position: 'bottom-right',
      effect: 'slide',
      offset: 50,
    });
  }

  handleStoryReport = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  storyFileChangedHandler = e => {
    this.setState({ selectedStoryFile: e.target.files[0] });
  };

  reportStoryStatus = () => {
    this.setState({
      isReport: !this.state.isReport,
    });
  };

  reportStory = () => {
    let story_id = this.state.story_id;
    let token = this.Auth.getToken();

    const formData = new FormData();

    formData.append('reason', this.state.reason);

    if (this.state.selectedStoryFile !== null) {
      formData.append('photo', this.state.selectedStoryFile, this.state.selectedStoryFile.name);
    }

    ReportService.reportStory(story_id, token, formData)
      .then(res => {
        this.setState(
          {
            isReport: !this.state.isReport,
            reason: '',
            selectedStoryFile: null,
          },
          () => this.successAlert()
        );

        // console.log(res);
      })
      .catch(err => {
        this.errorAlert();
        // console.log(err);
      });
  };

  successAlert() {
    Alert.success('<h5>Thank For Creating Better Community in Vixio :)</h5>', {
      position: 'bottom-right',
      effect: 'jelly',
      offset: 500,
    });
  }

  errorAlert() {
    Alert.error('<h5>"Reason" input field cannot be empty!</h5>', {
      position: 'bottom-right',
      effect: 'slide',
      offset: 500,
    });
  }

  renderContent() {
    let story_data = this.state.story_read;
    let story_id = this.state.story_id;
    return (
      <div className="card story-box">
        <div className="card-header">
          <div className="image-wrapper">
            <img className="story-image" src={'data:image/jpeg;base64,' + story_data.image_url} alt="IF" />
          </div>
        </div>
        <div className="card-body">
          <h1 className="card-title">{story_data.title}</h1>
          <p>{story_data.description}</p>
          <h2 className="card-author">
            category :&nbsp;
            <br />
            {story_data.story_category.map((category, index) => {
              return (
                <label key={index} className="category">
                  {category.category_type.name}
                </label>
              );
            })}
          </h2>
          <RatingStars rating={Math.round(story_data.story_review[0].star)} />

          <div className="bottom-button">
            <Link to={'/play/' + story_id}>
              <button className="btn">play story</button>
            </Link>

            {this.Auth.getToken() ? (
              <button className="btn" onClick={this.reportStoryStatus}>
                report story
              </button>
            ) : (
              ''
            )}
          </div>

          {this.state.isReport ? (
            <div className="report-box animated fadeIn">
              <h1>story report</h1>
              <label>reason:</label>
              <TextareaAutosize
                className="form-control"
                rows={1}
                name="reason"
                value={this.state.reason}
                onChange={this.handleStoryReport}
                placeholder="Reason to report..."
                autoComplete="off"
              />
              <label>screenshot:</label>
              <input type="file" className="upload-image" onChange={this.storyFileChangedHandler} />
              <button type="submit" className="btn submit-button" onClick={this.reportStory}>
                submit report
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }

  render() {
    let { commentParent, commentChild } = this.state;

    if (!this.state.isLoading) {
      return (
        <div className="container-fluid story-detail animated fadeInDownBig">
          <div className="row no-gutters">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 offset-sm-1 offset-md-2 offset-lg-3 offset-xl-4">
              <div className="story-detail-read">
                {this.renderContent()}
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
                <Alert stack={{ limit: 3 }} timeout={5000} html={true} />
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

export default PlayStoryDetail;
