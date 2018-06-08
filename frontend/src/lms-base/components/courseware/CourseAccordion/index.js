import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './_CourseAccordion.scss';

import gradedIcon from './svg/graded.svg';
import nonGradedIcon from './svg/non-graded.svg';

let cx = classNames.bind(styles);

class CourseAccordion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accordionVisible: this.props.accordionVisible,
      accordionData: this.props.accordionData
    }

    this.toggleAccordionVisibility = this.toggleAccordionVisibility.bind(this);
    this.sectionChangeFunction = this.sectionChangeFunction.bind(this);
  }

  toggleAccordionVisibility = (newView) => {
    this.setState({
      accordionVisible: !this.state.accordionVisible
    })
  }

  sectionChangeFunction = (courseID, chapterID, sectionID) => {
    this.props.changeActiveViewFunction('course-navigation');
    this.props.fetchDataFunction(courseID, chapterID, sectionID);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        accordionData: nextProps.accordionData,
        accordionVisible: nextProps.accordionVisible
      })
    }
  }

  render() {
    const accordionRender = this.state.accordionData && this.state.accordionData.chapters.map((chapter, chapterIndex) => {
      let sectionGraded = false;
      const chapterSections = chapter.sections.map((section, sectionIndex) => {
        if (section.graded) {
          sectionGraded = true;
        }
        return(
          <li className={cx({'section-container': true, 'section-active': section.active})} key={section['url_name']}>
            <button className={styles['section-name']} onClick={() => this.sectionChangeFunction(this.props.courseID, chapter['url_name'], section['url_name'])}>
              <span className={styles['section-graded-indicator']}>
                <img
                  src={section.graded ? gradedIcon : nonGradedIcon}
                  alt={section.graded ? 'Section graded' : 'Section not graded'}
                  role='presentation'
                />
              </span>
              {section['display_name']}
            </button>
          </li>
        )
      })

      return(
        <li className={cx({'chapter-container': true, 'chapter-active': chapter.active})} key={chapter['display_id']}>
          <span className={styles['chapter-name']}>
            <span className={styles['chapter-graded-indicator']}>
              <img
                src={sectionGraded ? gradedIcon : nonGradedIcon}
                alt={sectionGraded ? 'Contains a graded section' : 'No sections in this chapter are graded'}
                role='presentation'
              />
            </span>
            {chapter['display_name']}
          </span>
          <ul className={styles['chapter-sections-container']}>
            {chapterSections}
          </ul>
        </li>
      )
    })

    return (
      <ul className={cx({'course-accordion': true, 'accordion-hidden': !this.state.accordionVisible})}>
        {accordionRender}
      </ul>
    );
  }
}

CourseAccordion.defaultProps = {

}

export default CourseAccordion
