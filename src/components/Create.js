import React, { Component } from 'react';

import TextTruncate from 'react-text-truncate';
import TextareaAutosize from 'react-autosize-textarea';
import FaPlus from 'react-icons/lib/fa/plus';
import Checkbox from 'rc-checkbox';

import { AuthService, StoryService } from '../services';
class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: 'Beginning',
          paragraphs: [
            {
              content: 'Welcome to create story',
              choices: [],
              links: [],
            },
          ],
        },
      ],
      isLoading: true,
      choiceInput: '',
      isToggle: false,
      isSideMenu: false,
      clickedIndex: '',
      clickedParagraphIndex: '',
      clickedChoiceIndex: '',
      dataMapping: [
        {
          section: 0,
          paragraph: 0,
          choice: '',
          linkS: '',
          linkP: '',
        },
      ],
      storyCategories: '',
      story_title: '',
      story_description: '',
      checked_categories: [],
      selected_file: null,
    };

    this.Auth = new AuthService();

    this.editParagraphText = this.editParagraphText.bind(this);
    this.addChoice = this.addChoice.bind(this);
    this.deleteChoice = this.deleteChoice.bind(this);
    this.deleteSection = this.deleteSection.bind(this);
    this.openSideMenu = this.openSideMenu.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.save = this.save.bind(this);
  }

  componentWillMount() {
    document.title = 'Vixio - Create Story';

    StoryService.getStoryCategories()
      .then(res => {
        this.setState({
          storyCategories: res.data,
          isLoading: false,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getLinks(p) {
    let data = this.state.data;
    let res = false;
    data.forEach(function(section, i) {
      if (i === p['section']) {
        res = section['name'] + '.p' + p['paragraph'];
      }
    });
    if (!res) res = 'END';

    this.setState({
      data: data,
      isLoading: false,
    });

    return res;
  }

  inkResult() {
    let data = this.state.data;
    let knot = '->' + data[0].name + '.p0\\n';

    data.forEach(function(section, i) {
      knot += '=== ' + section['name'] + '\n';
      section['paragraphs'].forEach(function(paragraph, j) {
        knot += '\t= p' + j + '\n';
        knot += '\t' + paragraph['content'] + '\n';
        if (paragraph['links'].length === 0) {
          knot += '\t->END\n';
        }
        for (let k = 0; k <= paragraph['choices'].length - 1; k++) {
          knot += '\t* ' + paragraph['choices'][k] + '\n';
          let res = false;
          let p = paragraph['links'][k];
          data.forEach(function(innerSection, innerI) {
            if (innerI === p['innerSection']) {
              res = innerSection['name'] + '.p' + p['paragraph'];
            }
          });
          if (!res) {
            res = 'END';
          }

          let link = res;
          knot += '\t->' + link + '\n';
        }
      });
    });

    this.setState({
      data: data,
      isLoading: false,
    });
  }

  /******************************* SECTION (START) *******************************/
  addSection(newSection, sectionIndex, paragraphIndex = -1) {
    let exist = true;
    let data = this.state.data;
    let dataMapping = this.state.dataMapping;
    data.forEach(function(item, i) {
      if (newSection === item['name'] && item['name'] !== '') {
        alert('Section named ' + newSection + ' is already there');
        exist = false;
      }
    });

    if (!exist) {
      return;
    }

    data.push({
      name: newSection,
      paragraphs: [
        {
          content: '',
          choices: [],
          links: [],
        },
      ],
    });

    const choiceIndex = this.addChoice(sectionIndex, paragraphIndex);

    this.editLink(sectionIndex, paragraphIndex, choiceIndex, data.length - 1, 0);

    /*dataMapping.push({
         section: data.length - 1,
         paragraph: 0,
         choice: '',
         linkS: '',
         linkP: ''
      });*/

    /*else{
         data.push({
            name: newSection,
            paragraphs: [data[sectionIndex]['paragraphs'][paragraphIndex]]
         });

         data[sectionIndex]['paragraphs'].splice(paragraphIndex,1);

         data.forEach(function(section, i){
            section['paragraphs'].forEach(function(paragraph, j){
               paragraph['links'].forEach(function(link,k){
                  if(link['section'] === sectionIndex && link['paragraph'] === paragraphIndex){
                     link['section'] = data.length-1;
                     link['paragraph'] = 0;
                  }
               });
            });
         });
      }*/

    this.setState({
      data: data,
      isLoading: false,
      dataMapping: dataMapping,
    });
  }

  editSection(oldSectionIndex, e) {
    let data = this.state.data;
    let newSection = e.target.value;
    let exist = true;
    data.forEach(function(item, i) {
      if (newSection === item['name']) {
        alert('Section named ' + newSection + ' is already there');
        exist = false;
      }
    });

    if (exist) {
      data[oldSectionIndex]['name'] = newSection;
      this.setState({
        data: data,
        isLoading: false,
      });
    }
  }

  deleteSection(sectionIndex) {
    if (sectionIndex !== 0) {
      let data = this.state.data;
      let upperSectionLength = data[sectionIndex - 1]['paragraphs'].length;
      //change link of the parent section
      data[sectionIndex - 1]['paragraphs'].forEach(function(item, i) {
        item['links'].forEach(function(link, j) {
          if (link.hasOwnProperty('paragraph') && link['section'] === sectionIndex) {
            link['paragraph'] += upperSectionLength;
            link['section'] = sectionIndex - 1;
          }
        });
      });
      //change link of the deleted section
      data[sectionIndex]['paragraphs'].forEach(function(item, i) {
        item['links'].forEach(function(link, j) {
          if (link.hasOwnProperty('paragraph') && link['section'] === sectionIndex) {
            link['paragraph'] += upperSectionLength;
            link['section'] = sectionIndex - 1;
          }
        });
      });

      //splicing
      let selectedSection = data[sectionIndex]['paragraphs'];
      selectedSection.forEach(function(item, i) {
        data[sectionIndex - 1]['paragraphs'].push(item);
      });

      data.splice(sectionIndex, 1);

      this.rewindStory(sectionIndex - 1);

      this.setState({
        data: data,
        isLoading: false,
      });
    } else {
      alert('First section cannot be deleted');
    }
  }

  addParagraph(sectionIndex) {
    let data = this.state.data;

    data[sectionIndex]['paragraphs'].push({
      content: '',
      choices: [],
      links: [],
    });

    this.setState({
      data: data,
      isLoading: false,
    });

    let newParagraph = {
      section: sectionIndex,
      paragraph: data[sectionIndex]['paragraphs'].length - 1,
    };

    return newParagraph;
  }

  deleteParagraph(sectionIndex, paragraphIndex, lineIndex) {
    if (sectionIndex !== 0 || paragraphIndex !== 0) {
      let data = this.state.data;

      data[sectionIndex]['paragraphs'].splice(paragraphIndex, 1);

      data.forEach(function(section, i) {
        section['paragraphs'].forEach(function(paragraph, j) {
          paragraph['links'].forEach(function(link, k) {
            if (link['section'] === sectionIndex && link['paragraph'] === paragraphIndex) {
              paragraph['choices'].splice(k, 1);
              paragraph['links'].splice(k, 1);
            }
          });
        });
      });

      if (data[sectionIndex].name === '' && data[sectionIndex]['paragraphs'].length === 0) {
        this.deleteSection(sectionIndex);
      }

      const dataMapping = this.state.dataMapping;
      dataMapping.splice(lineIndex, 1);

      this.setState({
        data: data,
        dataMapping: dataMapping,
        isLoading: false,
      });
    } else {
      alert('Cannot delete first paragraph');
    }
  }

  editParagraphText(sectionIndex, paragraphIndex, e) {
    let contentText = e.target.value;

    let data = this.state.data;
    data[sectionIndex]['paragraphs'][paragraphIndex]['content'] = contentText;

    this.setState({
      data: data,
      isLoading: false,
    });
  }

  /******************************* PARAGRAPH (END) *******************************/

  /******************************* CHOICES (START) *******************************/
  addChoice(sectionIndex, paragraphIndex) {
    let data = this.state.data;

    data[sectionIndex]['paragraphs'][paragraphIndex]['choices'].push('');
    data[sectionIndex]['paragraphs'][paragraphIndex]['links'].push({ section: 'END' });

    this.setState({
      data: data,
      isLoading: false,
    });

    return data[sectionIndex]['paragraphs'][paragraphIndex]['choices'].length - 1;
  }

  editChoice(sectionIndex, paragraphIndex, choiceIndex, e) {
    let choiceText = e.target.value;

    let data = this.state.data;

    data[sectionIndex]['paragraphs'][paragraphIndex]['choices'][choiceIndex] = choiceText;

    this.setState({
      data: data,
      isLoading: false,
    });
  }

  deleteChoice(sectionIndex, paragraphIndex, choiceIndex) {
    let data = this.state.data;

    data[sectionIndex]['paragraphs'][paragraphIndex]['choices'].splice(choiceIndex, 1);
    data[sectionIndex]['paragraphs'][paragraphIndex]['links'].splice(choiceIndex, 1);

    this.setState({
      data: data,
      isLoading: false,
    });
  }

  /******************************* CHOICES (END) *******************************/

  /******************************* LINKS (START) *******************************/
  editLink(sectionIndex, paragraphIndex, choiceIndex, linkSection = null, linkParagraph = null) {
    //1. link to new paragraph
    if (sectionIndex !== '') {
      let data = this.state.data;
      let linkText;
      let dataMapping = this.state.dataMapping;

      dataMapping[dataMapping.length - 1]['choice'] = choiceIndex;

      if (linkSection == null) {
        let newParagraph = this.addParagraph(sectionIndex);
        linkText = { section: newParagraph['section'], paragraph: newParagraph['paragraph'] };
        dataMapping[dataMapping.length - 1]['linkS'] = newParagraph['section'];
        dataMapping[dataMapping.length - 1]['linkP'] = newParagraph['paragraph'];
        dataMapping.push({
          section: newParagraph['section'],
          paragraph: newParagraph['paragraph'],
          choice: '',
          linkS: '',
          linkP: '',
        });
      }
      //link to existing paragraph
      else {
        linkText = { section: linkSection, paragraph: linkParagraph };
        dataMapping[dataMapping.length - 1]['linkS'] = linkSection;
        dataMapping[dataMapping.length - 1]['linkP'] = linkParagraph;
        dataMapping.push({
          section: linkSection,
          paragraph: linkParagraph,
          choice: '',
          linkS: '',
          linkP: '',
        });
      }

      data[sectionIndex]['paragraphs'][paragraphIndex]['links'][choiceIndex] = linkText;

      this.setState({
        data: data,
        isLoading: false,
        clickedIndex: '',
        clickedParagraphIndex: '',
        clickedChoiceIndex: '',
        dataMapping: dataMapping,
        isSideMenu: false,
      });
    }
  }

  deleteLink(sectionIndex, paragraphIndex, choiceIndex, lineIndex) {
    let data = this.state.data;
    let dataMapping = this.state.dataMapping;

    const { name = false } = data[lineIndex] || {};

    data[sectionIndex]['paragraphs'][paragraphIndex]['links'][choiceIndex] = { section: 'END' };
    if (name === '') {
      this.deleteSection(lineIndex);
    }

    dataMapping.splice(lineIndex, 1);

    this.setState({
      data: data,
      isLoading: false,
      dataMapping: dataMapping,
    });
  }

  rewindStory(lineIndex) {
    let dataMapping = this.state.dataMapping;

    dataMapping.splice(lineIndex + 1, dataMapping.length - 1 - lineIndex);

    this.setState({
      dataMapping: dataMapping,
    });
  }

  storyLinking(lineIndex, sectionIndex, paragraphIndex, choiceIndex) {
    let data = this.state.data;
    let dataMapping = this.state.dataMapping;

    dataMapping[lineIndex].choice = choiceIndex;
    dataMapping[lineIndex].linkS = data[sectionIndex]['paragraphs'][paragraphIndex]['links'][choiceIndex]['section'];
    dataMapping[lineIndex].linkP = data[sectionIndex]['paragraphs'][paragraphIndex]['links'][choiceIndex]['paragraph'];

    dataMapping.push({
      section: data[sectionIndex]['paragraphs'][paragraphIndex]['links'][choiceIndex]['section'],
      paragraph: data[sectionIndex]['paragraphs'][paragraphIndex]['links'][choiceIndex]['paragraph'],
      choice: '',
      linkS: '',
      linkP: '',
    });

    this.setState({
      dataMapping: dataMapping,
    });
  }

  openSideMenu(sectionIndex, paragraphIndex, choiceIndex) {
    this.setState({
      isSideMenu: true,
      clickedIndex: sectionIndex,
      clickedParagraphIndex: paragraphIndex,
      clickedChoiceIndex: choiceIndex,
    });
  }

  renderStory() {
    let renderData = this.state.dataMapping.map((line, l_index) => {
      return this.state.data.map((section, index) => {
        if (line.section === index) {
          return section.paragraphs.map((paragraph, p_index) => {
            if (l_index === this.state.dataMapping.length - 1) {
              if (line.paragraph === p_index) {
                return (
                  <div key={l_index + '' + index + '' + p_index} className="section-block">
                    <div className="col-md-12 section-wrapper">
                      <div className="section-title-wrapper">
                        <label>section</label>
                        <TextareaAutosize
                          className="form-control add-section"
                          rows={1}
                          placeholder="Section name"
                          autoComplete="off"
                          value={section.name}
                          onChange={e => this.editSection(index, e)}
                        />
                        <button className="btn add-section-button" onClick={() => this.addSection('', index, p_index)}>
                          <FaPlus size={15} /> section
                        </button>
                        <button className="btn delete-option-button" onClick={() => this.deleteSection(index)}>
                          <FaPlus size={15} /> section
                        </button>
                      </div>
                      <div className="paragraph-wrapper">
                        <TextareaAutosize
                          className="paragraph"
                          rows={5}
                          placeholder={paragraph.content}
                          onChange={e => this.editParagraphText(index, p_index, e)}
                          autoComplete="off"
                        />
                        <button
                          className="btn delete-option-button"
                          onClick={() => this.deleteParagraph(index, p_index, l_index)}
                        >
                          <FaPlus size={15} /> paragraph
                        </button>
                      </div>
                      {paragraph.choices.map((choice, c_index) => {
                        if (l_index === this.state.dataMapping.length - 1) {
                          if (!paragraph.links[c_index].hasOwnProperty('paragraph')) {
                            return (
                              <div
                                key={l_index + '' + index + '' + p_index + '' + c_index}
                                className="choices-wrapper animated fadeIn"
                              >
                                <label htmlFor="option-1">option {c_index + 1} </label>
                                <TextareaAutosize
                                  className="choices"
                                  rows={1}
                                  placeholder="Write your option here"
                                  value={choice}
                                  onChange={e => this.editChoice(index, p_index, c_index, e)}
                                  autoComplete="off"
                                />
                                <button
                                  className="btn delete-option-button"
                                  onClick={() => this.deleteChoice(index, p_index, c_index)}
                                >
                                  <FaPlus size={15} />
                                </button>
                                <button
                                  className="btn add-link-button"
                                  onClick={() => this.openSideMenu(index, p_index, c_index)}
                                >
                                  add link
                                </button>
                              </div>
                            );
                          } else {
                            return (
                              <div
                                key={l_index + '' + index + '' + p_index + '' + c_index}
                                className="choices-wrapper animated fadeIn"
                              >
                                <label htmlFor="option-1">option {c_index + 1} </label>
                                <TextareaAutosize
                                  className="choices"
                                  rows={1}
                                  placeholder="Write your option here"
                                  value={choice}
                                  onChange={e => this.editChoice(index, p_index, c_index, e)}
                                  autoComplete="off"
                                />
                                <button
                                  className="btn delete-option-button"
                                  onClick={() => this.deleteChoice(index, p_index, c_index)}
                                >
                                  <FaPlus size={15} />
                                </button>
                                <button
                                  className="btn add-link-button"
                                  onClick={() => this.storyLinking(l_index, index, p_index, c_index)}
                                >
                                  Go to link
                                </button>
                              </div>
                            );
                          }
                        } else {
                          if (c_index === line.choice) {
                            return (
                              <div
                                key={l_index + '' + index + '' + p_index + '' + c_index}
                                className="choices-wrapper animated fadeIn"
                              >
                                <label htmlFor="option-1">option {c_index + 1} </label>
                                <TextareaAutosize
                                  className="choices"
                                  rows={1}
                                  placeholder="Write your option here"
                                  value={choice}
                                  onChange={e => this.editChoice(index, p_index, c_index, e)}
                                  autoComplete="off"
                                />
                              </div>
                            );
                          } else {
                            return '';
                          }
                        }
                      })}
                      <button className="btn add-option-button" onClick={() => this.addChoice(index, p_index)}>
                        <FaPlus size={15} /> option
                      </button>
                    </div>
                  </div>
                );
              } else {
                return '';
              }
            } else if (l_index === this.state.dataMapping.length - 2) {
              if (line.paragraph === p_index) {
                return (
                  <div key={l_index + '' + index + '' + p_index} className="section-block">
                    <div className="col-md-12 section-wrapper">
                      <div className="section-title-wrapper">
                        <label onClick={() => this.rewindStory(l_index)} className="back-button">
                          Back
                        </label>
                        <label>section</label>
                        <TextareaAutosize
                          className="form-control add-section"
                          rows={1}
                          placeholder="Section name"
                          autoComplete="off"
                          value={section.name}
                          onChange={e => this.editSection(index, e)}
                        />
                      </div>
                      <div className="paragraph-wrapper">
                        <TextareaAutosize
                          className="paragraph"
                          rows={5}
                          placeholder={paragraph.content}
                          onChange={e => this.editParagraphText(index, p_index, e)}
                          autoComplete="off"
                        />
                      </div>
                      {paragraph.choices.map((choice, c_index) => {
                        if (l_index === this.state.dataMapping.length - 1) {
                          return (
                            <div
                              key={l_index + '' + index + '' + p_index + '' + c_index}
                              className="choices-wrapper animated fadeIn"
                            >
                              <label htmlFor="option-1">option {c_index + 1} </label>
                              <TextareaAutosize
                                className="choices"
                                rows={1}
                                placeholder="Write your option here"
                                value={choice}
                                onChange={e => this.editChoice(index, p_index, c_index, e)}
                                autoComplete="off"
                              />
                              <button
                                className="btn delete-option-button"
                                onClick={() => this.deleteChoice(index, p_index, c_index)}
                              >
                                <FaPlus size={15} />
                              </button>
                              <button
                                className="btn add-link-button"
                                onClick={() => this.openSideMenu(index, p_index, c_index)}
                              >
                                add link
                              </button>
                            </div>
                          );
                        } else {
                          if (c_index === line.choice) {
                            return (
                              <div
                                key={l_index + '' + index + '' + p_index + '' + c_index}
                                className="choices-wrapper animated fadeIn"
                              >
                                <label htmlFor="option-1">option {c_index + 1} </label>
                                <TextareaAutosize
                                  className="choices"
                                  rows={1}
                                  placeholder="Write your option here"
                                  value={choice}
                                  onChange={e => this.editChoice(index, p_index, c_index, e)}
                                  autoComplete="off"
                                />
                              </div>
                            );
                          } else {
                            return '';
                          }
                        }
                      })}
                    </div>
                    <div className="section-link-wrapper">
                      <div
                        className="section-link"
                        onClick={() => this.deleteLink(line.section, line.paragraph, line.choice, l_index + 1)}
                      />
                    </div>
                  </div>
                );
              } else {
                return '';
              }
            } else {
              if (line.paragraph === p_index) {
                return (
                  <div key={l_index + '' + index + '' + p_index} className="section-block">
                    <div className="col-md-12 section-wrapper">
                      <div className="section-title-wrapper">
                        <label onClick={() => this.rewindStory(l_index)} className="back-button">
                          Back
                        </label>
                        <label>section</label>
                        <TextareaAutosize
                          className="form-control add-section"
                          rows={1}
                          placeholder="Section name"
                          autoComplete="off"
                          value={section.name}
                          onChange={e => this.editSection(index, e)}
                        />
                      </div>
                      <div className="paragraph-wrapper">
                        <TextareaAutosize
                          className="paragraph"
                          rows={5}
                          placeholder={paragraph.content}
                          onChange={e => this.editParagraphText(index, p_index, e)}
                          autoComplete="off"
                        />
                      </div>
                      {paragraph.choices.map((choice, c_index) => {
                        if (l_index === this.state.dataMapping.length - 1) {
                          return (
                            <div
                              key={l_index + '' + index + '' + p_index + '' + c_index}
                              className="choices-wrapper animated fadeIn"
                            >
                              <label htmlFor="option-1">option {c_index + 1} </label>
                              <TextareaAutosize
                                className="choices"
                                rows={1}
                                placeholder="Write your option here"
                                value={choice}
                                onChange={e => this.editChoice(index, p_index, c_index, e)}
                                autoComplete="off"
                              />
                              <button
                                className="btn delete-option-button"
                                onClick={() => this.deleteChoice(index, p_index, c_index)}
                              >
                                <FaPlus size={15} />
                              </button>
                              <button
                                className="btn add-link-button"
                                onClick={() => this.openSideMenu(index, p_index, c_index)}
                              >
                                add link
                              </button>
                            </div>
                          );
                        } else {
                          if (c_index === line.choice) {
                            return (
                              <div
                                key={l_index + '' + index + '' + p_index + '' + c_index}
                                className="choices-wrapper animated fadeIn"
                              >
                                <label htmlFor="option-1">option {c_index + 1} </label>
                                <TextareaAutosize
                                  className="choices"
                                  rows={1}
                                  placeholder="Write your option here"
                                  value={choice}
                                  onChange={e => this.editChoice(index, p_index, c_index, e)}
                                  autoComplete="off"
                                />
                              </div>
                            );
                          } else {
                            return '';
                          }
                        }
                      })}
                    </div>
                    <div className="section-link-wrapper">
                      <div className="section-link" />
                    </div>
                  </div>
                );
              } else {
                return '';
              }
            }
          });
        } else {
          return '';
        }
      });
    });

    return renderData;
  }

  renderContents() {
    let renderData = this.state.data.map((section, index) => {
      return (
        <div key={index} className="section-block">
          <div className="col-md-12 section-wrapper">
            <div className="section-title-wrapper">
              <h2>{section.name}</h2>
            </div>
            {section.paragraphs.map((paragraph, p_index) => {
              return (
                <div key={p_index} className="paragraph-wrapper">
                  <div
                    className="paragraph-sidebar"
                    onClick={() =>
                      this.editLink(
                        this.state.clickedIndex,
                        this.state.clickedParagraphIndex,
                        this.state.clickedChoiceIndex,
                        index,
                        p_index
                      )
                    }
                  >
                    <span>{'paragraph ' + (p_index + 1) + ':'}</span>
                    <TextTruncate line={3} truncateText="…" text={paragraph.content} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    });

    return renderData;
  }

  renderCheckbox() {
    let storyGenres = this.state.storyCategories;

    let renderStoryGenres = storyGenres.map((storyGenre, index) => {
      return (
        <div key={storyGenre.id} className="checkbox">
          <label className="title">{storyGenre.genre}</label>

          {storyGenre.category_type.map(function(storyCategory, index) {
            return (
              <label key={storyCategory.id}>
                <Checkbox
                  // checkboxDepth={2}
                  name={storyCategory.name}
                  value={storyCategory.id}
                  onChange={e => this.checkBoxValue(e)}
                />
                {storyCategory.name}
              </label>
            );
          }, this)}
        </div>
      );
    });

    return renderStoryGenres;
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  checkBoxValue = e => {
    this.setState({
      checked_categories: [...this.state.checked_categories, e.target.value],
    });
  };

  fileChangedHandler(e) {
    this.setState({ selectedFile: e.target.files[0] });
  }

  save() {
    let data = JSON.stringify(this.state.data);
    let token = this.Auth.getToken();
    const storyData = new FormData();

    storyData.append('title', this.state.story_title);
    storyData.append('description', this.state.story_description);
    storyData.append('categories', JSON.stringify(this.state.checked_categories));
    storyData.append('photo', this.state.selectedFile);
    storyData.append('content', data);

    StoryService.createStory(token, storyData)
      .then(res => {
        this.props.history.push('/writer');
      })
      .catch(err => {
        //  console.log(err.response);
      });
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <div className="container-fluid create animated fadeInDown">
          <div className="row no-gutters">
            <div className="col-12 col-sm-12 col-md-12">
              <h1 className="create-title">create story</h1>
              <hr className="styled-line" />
            </div>
            <div className="col-12 col-sm-12 col-md-3 right-bar">
              <div className="left-side-bar-wrapper">
                <label htmlFor="story-title">story title</label>
                <input
                  type="text"
                  className="form-control"
                  name="story_title"
                  value={this.state.story_title}
                  onChange={this.handleChange}
                />

                <label htmlFor="story-description">story description</label>
                <input
                  type="text"
                  className="form-control"
                  name="story_description"
                  value={this.state.story_description}
                  onChange={this.handleChange}
                />

                <label htmlFor="edit-profile-image">story image</label>
                <input type="file" className="upload-image" onChange={this.fileChangedHandler} />

                {this.renderCheckbox()}
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6">
              <div className="row no-gutters">
                <div className="col-md-12 create-read">{this.renderStory()}</div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-3 side-bar">
              <div className="side-bar-wrapper">
                {this.state.isSideMenu && <h3 className="create-title link-to">Link to...</h3>}
                <div className="top-menu text-center">
                  <button
                    className="btn"
                    onClick={() =>
                      this.editLink(
                        this.state.clickedIndex,
                        this.state.clickedParagraphIndex,
                        this.state.clickedChoiceIndex
                      )
                    }
                  >
                    new paragraph
                  </button>
                </div>
                <hr />
                <div className="bottom-menu">
                  <h1>contents</h1>
                  {this.renderContents()}
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-12">
              <div className="bottom-wrapper text-center">
                <button className="btn save-and-quit" onClick={this.save}>
                  save and quit
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return '';
    }
  }
}

export default Create;
