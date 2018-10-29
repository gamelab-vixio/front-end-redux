import React, { Component } from 'react';

import TextTruncate from 'react-text-truncate';
import { Link } from 'react-router-dom';

import { AuthService, UserService } from '../services';
import { RatingStars, LoadingScreen, Title } from '../ui';

class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_stories: [],
      isLoading: true,
      currentPageNumber: '',
    };
    this.Auth = new AuthService();
  }

  componentWillMount() {
    document.title = 'Vixio - My History';
    window.scrollTo(0, 0);
    this.retrieveStoryData();
  }

  retrieveStoryData = page_number => {
    const token = this.Auth.getToken();

    UserService.getHistory(page_number, token)
      .then(res => {
        this.setState({
          all_stories: res.data,
          isLoading: false,
          currentPageNumber: res.data.current_page,
        });
      })
      .catch(err => {
        // console.log(err);
      });
  };

  getMoreStory = () => {
    let next_page_number = this.state.currentPageNumber + 1;

    if (next_page_number <= this.state.all_stories.last_page) {
      UserService.getHistory(next_page_number)
        .then(res => {
          let result = res.data.data;
          let newArr = this.state.all_stories;
          result.forEach(function(data, i) {
            newArr.data.push(data);
          });
          this.setState({
            all_stories: newArr,
            currentPageNumber: next_page_number,
          });

          // console.log(res);
        })
        .catch(err => {
          // console.log(err);
        });
    }
  };

  renderStories() {
    let all_stories = this.state.all_stories;
    let render_all_stories = all_stories.data.map((story, index) => {
      return (
        <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 story-box-wrapper">
          <Link to={'/story/' + story.id}>
            <div className="card story-box">
              <div className="card-header">
                <div className="image-wrapper">
                  <img className="story-image" src={'data:image/jpeg;base64,' + story.image_url} alt="IF" />
                </div>
              </div>
              <div className="card-body">
                <h1 className="card-title">
                  <TextTruncate line={2} truncateText="…" text={story.story.title} />
                </h1>
                <h2 className="card-author">{story.story.user.name}</h2>
                <h2 className="card-author">
                  category :&nbsp;
                  <br />
                  {story.story.story_category.map((category, index) => {
                    return (
                      <label key={index} className="category">
                        {category.category_type.name}
                      </label>
                    );
                  })}
                </h2>
                <RatingStars rating={Math.round(story.story.story_review[0].star)} />
              </div>
            </div>
          </Link>
        </div>
      );
    });

    return render_all_stories;
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <div className="container-fluid story animated fadeIn">
          <div className="row no-gutters">
            <div className="col-12 col-sm-12 col-md-12">
              <Title text={'Recently Played'} />
              <div className="row no-gutters">{this.renderStories()}</div>
              <div className="col-12 col-sm-12 col-md-12 text-center">
                <button className="btn story-box-load-more" onClick={this.getMoreStory}>
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

export default Story;
