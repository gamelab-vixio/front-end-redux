import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { StoryService } from '../services';
import { RatingStars, LoadingScreen, Title } from '../ui';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostPopular: [],
      newAvailable: [],
      isLoading: true,
    };
  }

  componentWillMount() {
    document.title = 'Vixio - Home';
    window.scrollTo(0, 0);
    this.retrieveMostPopular();
    this.retrieveNewAvailable();
  }

  retrieveMostPopular = () => {
    StoryService.mostPopular()
      .then(res => {
        this.setState({
          mostPopular: res.data,
          isLoading: false,
        });
      })
      .catch(err => {
        // console.log(err);
      });
  };

  retrieveNewAvailable = () => {
    StoryService.newAvailable()
      .then(res => {
        this.setState({
          newAvailable: res.data,
          isLoading: false,
        });
      })
      .catch(err => {
        // console.log(err);
      });
  };

  renderCategory(category) {
    const allStories = category === 1 ? this.state.mostPopular : this.state.newAvailable;
    return (
      <div className="row no-gutters">
        {allStories.map((story, index) => {
          return (
            <div key={story.id} className="col-12 col-sm-6 col-md-3 col-lg-3 col-xl-3 story-box-wrapper">
              <Link to={'/story/' + story.id}>
                <div className="card story-box">
                  <div className="card-header">
                    <div className="image-wrapper">
                      <img className="story-image" src={'data:image/jpeg;base64,' + story.image_url} alt="IF" />
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="story-title">
                      <h2>title :</h2>
                      <label>{story.title}</label>
                    </div>
                    <div className="story-author">
                      <h2>author :</h2>
                      <label>{story.user.name}</label>
                    </div>
                    <div className="story-category-list">
                      <h2>category :</h2>
                      {story.story_category.map((category, index) => {
                        return (
                          <label key={index} className="label-category">
                            {category.category_type.name}
                          </label>
                        );
                      })}
                    </div>
                    <RatingStars rating={Math.round(story.story_review[0].star)} />
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <div className="container-fluid home animated fadeIn">
          <div className="row no-gutters">
            <div className="col-12 col-sm-12 col-md-12">
              {!this.state.isLoading ? (
                <div>
                  <div className="story-category-wrapper">
                    <Title text={'Most Popular'} />
                    {this.renderCategory(1)}
                  </div>

                  <div className="story-category-wrapper">
                    <Title text={'New Available'} />
                    {this.renderCategory(2)}
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return <LoadingScreen />;
    }
  }
}

export default Home;
