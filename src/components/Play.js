import React, { Component } from 'react';
import { Story } from 'inkjs';
import ReactStars from 'react-stars';

import { AuthService, StoryService } from '../services';
import { Token, LoadingScreen } from '../ui';
class Writer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      story_id: this.props.match.params.story_id,
      inkle: '',
      story_data: '',
      story_continue: [],
      isLoading: true,
      isStartReading: false,
      isReview: false,
      isThx: false,
    };

    this.Auth = new AuthService();
  }

  componentWillMount() {
    document.title = 'Vixio - Play Story';

    // Set page to top
    window.scrollTo(0, 0);

    let story_id = this.state.story_id;

    StoryService.playStory(story_id)
      .then(res => {
        // console.log(res.data.inkle);
        this.setState(
          {
            inkle: res.data.inkle,
          },
          () => {
            let story = new Story(res.data.inkle.replace(/\s/, ''));
            this.setState({
              story_data: story,
              isLoading: false,
            });
          }
        );
      })
      .catch(err => {
        // console.log(err);
      });
  }

  continueStory = () => {
    while (this.state.story_data.canContinue) {
      let data = this.state.story_continue;

      data.push(this.state.story_data.Continue());

      this.setState({
        story_continue: data,
      });
    }

    if (this.state.story_data.currentChoices.length === 0 && this.Auth.getToken()) {
      this.setState({
        isReview: true,
      });
    }

    if (this.state.story_data.currentChoices.length === 0) {
      this.setState({
        isThx: true,
      });
    }
  };

  sendReview = newRating => {
    let story_id = this.state.story_id;
    let star = newRating;
    let token = this.Auth.getToken();

    let data = {
      star: star,
    };

    StoryService.addReviewStory(story_id, token, data)
      .then(res => {
        this.setState({
          isReview: false,
          isThx: true,
        });

        // console.log(res);
      })
      .catch(err => {
        // console.log(err);
      });
  };

  chooseChoice = choice => {
    this.state.story_data.ChooseChoiceIndex(choice.index);
    this.continueStory();
  };

  renderParagraph() {
    let render_paragraph = this.state.story_continue.map((text, index) => {
      return (
        <div key={index} className="animated fadeIn">
          <p>{text}</p>
        </div>
      );
    });

    return render_paragraph;
  }

  renderChoice() {
    let render_choice = this.state.story_data.currentChoices.map((choice, index) => {
      return (
        <a key={index} className="choice-text" onClick={e => this.chooseChoice(choice)}>
          {choice.text}
        </a>
      );
    });

    return render_choice;
  }

  startReading = () => {
    let story_id = this.state.story_id;
    let token = this.Auth.getToken();
    StoryService.addPlayed(story_id, token)
      .then(res => {
        this.setState({
          isStartReading: true,
        });

        // console.log(res);
      })
      .catch(err => {
        // console.log(err);
      });
  };

  backToStoryList() {
    this.props.history.push('/story/' + this.state.story_id);
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <div className="container-fluid play animated fadeInDownBig">
          <div className="row no-gutters">
            <div className="col-12 col-sm-12 col-md-12">
              <h1 className="play-title">play story</h1>
              <hr className="styled-line" />
            </div>
            <div className="col-12 col-sm-12 col-md-6 offset-md-3">
              <div className="play-read">
                {!this.state.isStartReading ? (
                  <div className="text-center">
                    <button
                      className="btn start-read"
                      onClick={e => {
                        this.continueStory();
                        this.startReading();
                      }}
                    >
                      start reading
                    </button>
                  </div>
                ) : (
                  ''
                )}
                {this.renderParagraph()}
                {this.renderChoice()}
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 offset-md-3">
              {this.state.isReview ? (
                <div className="review animated fadeIn">
                  <h1>rate this story</h1>
                  <ReactStars count={5} onChange={this.sendReview} size={30} half={false} color2={Token.color.yellow} />
                </div>
              ) : (
                ''
              )}

              {this.state.isThx ? (
                <div className="review animated fadeIn">
                  <h1>thank you for playing!</h1>
                  <div className="play-read">
                    <button
                      className="btn start-read"
                      onClick={e => {
                        this.backToStoryList();
                      }}
                    >
                      back to story info
                    </button>
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

export default Writer;
