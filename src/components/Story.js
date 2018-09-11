import React, { Component } from 'react';

import TextTruncate from 'react-text-truncate';
import FaSearch from 'react-icons/lib/fa/search';
import { Link } from 'react-router-dom';

import { StoryService } from '../services';
import { RatingStars, LoadingScreen } from '../ui';
class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_stories: [],
      search_stories: [],
      isLoading: true,
      currentPageNumber: '',
      search: '',
    };
  }

  componentWillMount() {
    document.title = 'Vixio - Story';

    // Set page to top
    window.scrollTo(0, 0);

    this.retrieveStoryData();
  }

  retrieveStoryData = page_number => {
    StoryService.getAllStories(page_number)
      .then(res => {
        this.setState({
          all_stories: res.data,
          isLoading: false,
          currentPageNumber: res.data.current_page,
        });

        // console.log(res.data);
      })
      .catch(err => {
        // console.log(err);
      });
  };

  getMoreStory = () => {
    let next_page_number = this.state.currentPageNumber + 1;
    let search_name = this.state.search;

    if (this.state.search.length !== 0) {
      if (next_page_number <= this.state.search_stories.last_page) {
        StoryService.searchStory(search_name, next_page_number)
          .then(res => {
            let result = res.data.data;
            let newArr = this.state.search_stories;
            result.forEach(function(data, i) {
              newArr.data.push(data);
            });
            this.setState({
              search_stories: newArr,
              currentPageNumber: next_page_number,
            });
            console.log(res);
          })
          .catch(err => {
            // console.log(err);
          });
      }
    } else {
      if (next_page_number <= this.state.all_stories.last_page) {
        StoryService.getAllStories(next_page_number)
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
    }
  };

  handleSearch = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchStory = () => {
    let search = this.state.search;

    StoryService.searchStory(search)
      .then(res => {
        this.setState({
          search_stories: res.data,
          currentPageNumber: res.data.current_page,
        });
      })
      .catch(err => {
        // console.log(err);
      });
  };

  renderStories() {
    let all_stories;
    if (this.state.search.length !== 0) {
      all_stories = this.state.search_stories;
    } else {
      all_stories = this.state.all_stories;
    }

    if (all_stories.length !== 0) {
      var render_all_stories = all_stories.data.map((story, index) => {
        return (
          <div key={index} className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 story-box-wrapper">
            <Link to={'/story/' + story.id}>
              <div className="card story-box">
                <div className="card-header">
                  <div className="image-wrapper">
                    <img className="story-image" src={'data:image/jpeg;base64,' + story.image_url} alt="IF" />
                  </div>
                </div>
                <div className="card-body">
                  <h1 className="card-title">
                    <TextTruncate line={2} truncateText="…" text={story.title} />
                  </h1>
                  <h2 className="card-author">{story.user.name}</h2>
                  <h2 className="card-author">
                    category :&nbsp;
                    <br />
                    {story.story_category.map((category, index) => {
                      return (
                        <label key={index} className="category">
                          {category.category_type.name}
                        </label>
                      );
                    })}
                  </h2>
                  <RatingStars rating={Math.round(story.story_review[0].star)} />
                </div>
              </div>
            </Link>
          </div>
        );
      });
    }

    return render_all_stories;
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <div className="container-fluid story animated fadeIn">
          <div className="row no-gutters">
            <div className="col-12 col-sm-12 col-md-12">
              <h1 className="story-title">story</h1>
              <hr className="styled-line" />
              <div className="search-bar">
                <input
                  type="text"
                  className="form-control search-input"
                  name="search"
                  value={this.state.search}
                  onChange={this.handleSearch}
                  placeholder="Search story to play..."
                  autoComplete="off"
                />
                <button type="submit" className="search-button" onClick={this.searchStory}>
                  <FaSearch />
                </button>
              </div>
              {this.state.search.length !== 0 ? (
                <div className="search-result text-right">
                  <br />
                  <h1>
                    search result for "{this.state.search}
                    "...
                  </h1>
                </div>
              ) : (
                <div className="search-result text-right">
                  <br />
                  <h1>displaying all result...</h1>
                </div>
              )}
              <div className="row no-gutters search-story-wrapper">{this.renderStories()}</div>

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
