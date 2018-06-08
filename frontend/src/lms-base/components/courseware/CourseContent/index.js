import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './_CourseContent.scss';
import Interweave from 'interweave';
import CourseAccordion from 'components/courseware/CourseAccordion';

import menuIcon from './svg/bars.svg';
import searchIcon from './svg/search.svg';
import bookmarkIcon from './svg/bookmark.svg';

let cx = classNames.bind(styles);

class CourseContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseContent: this.props.courseContent,
      activeView: 'course-content',
      accordionData: this.props.accordionData,
      accordionVisible: false,
    }

    this.changeActiveView = this.changeActiveView.bind(this);
  }

  changeActiveView = (newView) => {
    this.setState({
      activeView: (newView === this.state.activeView) ? 'course-content' : newView,
      accordionVisible: (newView === 'course-navigation') && !this.state.accordionVisible
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        courseContent: nextProps.courseContent,
        accordionData: nextProps.accordionData
      })
    }
  }

  render() {
    const courseContentDisplay = <div className={styles['content-display']}><Interweave content={this.state.courseContent} /></div>

    return (
      <section className={cx(styles['course-content-container'], styles['container'])}>
        <div className={styles['content-sidebar']}>
          <button className={cx({'sidebar-button': true, 'active': this.state.activeView === 'course-navigation'})} onClick={() => this.changeActiveView('course-navigation')}>
            <img src={menuIcon} alt="Expand course navigation" />
            <span>Expand course navigation</span>
          </button>
          <button className={cx({'sidebar-button': true, 'active': this.state.activeView === 'course-search'})} onClick={() => this.changeActiveView('course-search')}>
            <img src={searchIcon} alt="Search this course" />
            <span>Search this course</span>
          </button>
          <button className={styles['sidebar-button']} onClick={() => console.log('Bookmarked that, kind sir!')}>
            <img src={bookmarkIcon} alt="Bookmark this page" />
            <span>Bookmark this page</span>
          </button>
        </div>
        <main className={styles['content-main-wrapper']}>
          <CourseAccordion
            accordionData = {this.state.accordionData}
            accordionVisible = {this.state.accordionVisible}
            fetchDataFunction = {this.props.fetchDataFunction}
            changeActiveViewFunction = {this.changeActiveView}
            courseID = {this.props.courseID}
          />
          {(this.state.activeView === 'course-content') && courseContentDisplay}
        </main>
      </section>
    );
  }
}

CourseContent.defaultProps = {

}

export default CourseContent
