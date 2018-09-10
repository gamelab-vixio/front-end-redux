import React, { Component } from 'react';

import { Link, Element, animateScroll } from 'react-scroll';

import { DocumentationService } from '../services';
import { LoadingScreen } from '../ui';
class Documentation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected_title_id: 1,
      documentation_content: [],
      isLoading: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    document.title = 'Vixio - Documentation';

    // Set page to top
    window.scrollTo(0, 0);

    this.setState({ isLoading: true });

    DocumentationService.getTableOfContent()
      .then(res => {
        // console.log(res.data);

        this.setState({
          documentation_content: res.data,
          isLoading: false,
        });

        // console.log(this.state.documentation_content);
      })
      .catch(error => {
        // console.log(error);
      });
  }

  getDocumentationSelectBox() {
    let documentation_select = this.state.documentation_content;

    let render_documentation_select = documentation_select.map(first_level => (
      <option key={'select-toc-' + first_level.id} value={first_level.id}>
        {first_level.title}
      </option>
    ));

    return render_documentation_select;
  }

  handleChange(e) {
    this.setState({ selected_title_id: e.target.value });
  }

  getDocumentationLeftContent() {
    let documentation_left_content = this.state.documentation_content;

    let render_documentation_left_content = documentation_left_content.map(first_level => (
      <li key={'select-toc-' + first_level.id} value={first_level.id} onClick={this.handleChange}>
        {first_level.title}
      </li>
    ));

    return render_documentation_left_content;
  }

  getDocumentationTableOfContent() {
    let selected_title_id = parseInt(this.state.selected_title_id, 10);

    let documentation_toc = this.state.documentation_content;

    let link_counter = 0;

    const render_documentation_toc = documentation_toc.filter(e => e.id === selected_title_id).map(first_level => (
      <div key={'title-toc-' + first_level.id}>
        <h1 className="first-level-toc">{first_level.title}</h1>
        {first_level.subtitle.map((second_level, index) => {
          return (
            <div key={'subtitle-toc-' + index.toString()} className="second-level-toc">
              <Link
                activeClass="active"
                to={'subtitle-toc-' + index.toString()}
                spy={true}
                smooth={true}
                duration={500}
                offset={-75}
              >
                {second_level.subtitle}
              </Link>
              {second_level.content.map((third_level, index) => {
                link_counter = link_counter + 1;

                return (
                  <div key={'header-content-' + index.toString()} className="third-level-toc">
                    <Link
                      activeClass="active"
                      to={'content-header-toc-' + link_counter}
                      spy={true}
                      smooth={true}
                      duration={500}
                      offset={-75}
                    >
                      {third_level.header}
                    </Link>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    ));

    return render_documentation_toc;
  }

  getDocumentation() {
    let element_counter = 0;

    let selected_title_id = parseInt(this.state.selected_title_id, 10);
    // console.log(selected_title_id);

    let documentation = this.state.documentation_content[selected_title_id - 1].subtitle;
    // console.log(documentation);

    let render_documentation = documentation.map((second_level, index) => (
      <div key={'subtitle-' + index.toString()}>
        <Element className="element second-level" name={'subtitle-toc-' + index.toString()}>
          <h2>{second_level.subtitle}</h2>
          {second_level.content.map((third_level, index) => {
            element_counter = element_counter + 1;

            return (
              <Element
                key={'header-content-' + index.toString()}
                className="element third-level"
                name={'content-header-toc-' + element_counter}
              >
                <h3>{third_level.header}</h3>
                <p>{third_level.content}</p>
              </Element>
            );
          })}
        </Element>
      </div>
    ));

    return render_documentation;
  }

  scrollToTop() {
    animateScroll.scrollToTop();
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <div className="container-fluid documentation animated fadeIn">
          <div className="row no-gutters">
            <div className="col-12 col-sm-12 col-md-12">
              <h1 className="documentation-title">documentation</h1>
              <hr className="styled-line" />

              <div className="row no-gutters documentation-read">
                <div className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 left-content">
                  <ul>{this.getDocumentationLeftContent()}</ul>
                </div>

                <div className="col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9 right-content">
                  <div className="first-level-select">
                    <label className="select-title-label" htmlFor="select_title">
                      Select Title
                    </label>
                    <select className="form-control" id="select_title" onChange={this.handleChange}>
                      {/* Select Box Title*/}
                      {this.getDocumentationSelectBox()}
                    </select>
                  </div>

                  {/* Table Of Content*/}
                  {this.getDocumentationTableOfContent()}

                  <hr className="toc-divider" />

                  {/* Documentation Content*/}
                  {this.getDocumentation()}
                  <button className="btn scroll-top" onClick={this.scrollToTop}>
                    back to top
                  </button>
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

export default Documentation;
