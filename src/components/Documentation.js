import React, { Component } from 'react';
import { Link, Element, animateScroll } from 'react-scroll';
import { DocumentationService } from '../services';
import { LoadingScreen, Title } from '../ui';

class Documentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTitleId: 1,
      documentationContent: [],
      isLoading: true,
    };
  }

  componentWillMount() {
    document.title = 'Vixio - Documentation';
    window.scrollTo(0, 0);

    this.setState({ isLoading: true });
    DocumentationService.getTableOfContent()
      .then(res => {
        this.setState({
          documentationContent: res.data,
          isLoading: false,
        });
      })
      .catch(error => {});
  }

  getDocumentationSelectBox() {
    const documentationSelect = this.state.documentationContent;
    let renderDocumentationSelect = documentationSelect.map(firstLevel => (
      <option key={'select-toc-' + firstLevel.id} value={firstLevel.id}>
        {firstLevel.title}
      </option>
    ));

    return renderDocumentationSelect;
  }

  handleChange = e => {
    this.setState({ selectedTitleId: e.target.value });
  };

  getDocumentationLeftContent() {
    const documentationLeftContent = this.state.documentationContent;

    let renderDocumentationLeftContent = documentationLeftContent.map(firstLevel => (
      <li key={'select-toc-' + firstLevel.id} value={firstLevel.id} onClick={this.handleChange}>
        {firstLevel.title}
      </li>
    ));

    return renderDocumentationLeftContent;
  }

  getDocumentationTableOfContent() {
    const selectedTitleId = parseInt(this.state.selectedTitleId, 10);
    const documentationToc = this.state.documentationContent;
    let linkCounter = 0;

    let renderDocumentationToc = documentationToc.filter(e => e.id === selectedTitleId).map(firstLevel => (
      <div key={'title-toc-' + firstLevel.id}>
        <h1 className="first-level-toc">{firstLevel.title}</h1>
        {firstLevel.subtitle.map((secondLevel, index) => {
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
                {secondLevel.subtitle}
              </Link>
              {secondLevel.content.map((thirdLevel, index) => {
                linkCounter = linkCounter + 1;

                return (
                  <div key={'header-content-' + index.toString()} className="third-level-toc">
                    <Link
                      activeClass="active"
                      to={'content-header-toc-' + linkCounter}
                      spy={true}
                      smooth={true}
                      duration={500}
                      offset={-75}
                    >
                      {thirdLevel.header}
                    </Link>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    ));

    return renderDocumentationToc;
  }

  getDocumentation() {
    let elementCounter = 0;
    const selectedTitleId = parseInt(this.state.selectedTitleId, 10);
    const documentation = this.state.documentationContent[selectedTitleId - 1].subtitle;

    let renderDocumentation = documentation.map((secondLevel, index) => (
      <div key={'subtitle-' + index.toString()}>
        <Element className="element second-level" name={'subtitle-toc-' + index.toString()}>
          <h2>{secondLevel.subtitle}</h2>
          {secondLevel.content.map((thirdLevel, index) => {
            elementCounter = elementCounter + 1;

            return (
              <Element
                key={'header-content-' + index.toString()}
                className="element third-level"
                name={'content-header-toc-' + elementCounter}
              >
                <h3>{thirdLevel.header}</h3>
                <p>{thirdLevel.content}</p>
              </Element>
            );
          })}
        </Element>
      </div>
    ));

    return renderDocumentation;
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
              <Title text={'Documentation'} />

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
                      {this.getDocumentationSelectBox()}
                    </select>
                  </div>

                  {this.getDocumentationTableOfContent()}

                  <hr className="toc-divider" />

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
