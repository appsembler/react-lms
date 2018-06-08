import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './_CoursesListItem.scss';
import classNames from 'classnames/bind';

import facebookIcon from 'static/images/fontawesome-svg/brands/facebook-f.svg';
import twitterIcon from 'static/images/fontawesome-svg/brands/twitter.svg';

let cx = classNames.bind(styles);

const courseInfoAPI = '/api/courses/v1/courses/'


class CoursesListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiFetchActive: false,
      courseData: {}
    }

    this.triggerApiFetchActive = this.triggerApiFetchActive.bind(this);
    this.fetchCourseData = this.fetchCourseData.bind(this);
  }

  triggerApiFetchActive = () => {
    this.setState({
      apiFetchActive: !this.state.apiFetchActive
    })
  }

  fetchCourseData = () => {
    this.triggerApiFetchActive();
    fetch(courseInfoAPI + this.props.courseId, { credentials: "same-origin" })
      .then(response => response.json())
      .then(json => this.setState({
        courseData: json
      }, this.triggerApiFetchActive()))
  }

  componentDidMount = () => {
    this.fetchCourseData()
  }

  render() {

    const renderView = this.state.courseData['media'] && (
      <div className={styles['course-container']}>
        <span
          className={styles['course-image-container']}
          style={{backgroundImage: 'url(' + this.state.courseData['media']['course_image']['uri'] + ')'}}
        />
        <div className={styles['course-info-container']}>
          <div className={styles['course-info-upper']}>
            <h2 className={styles['title']}>{this.state.courseData['name']}</h2>
            <span className={styles['code']}>{this.state.courseData['number']}</span>
            <div className={styles['course-dates']}>
              {this.state.courseData['start'] && (
                <span className={styles['course-date']}>
                  Starts: <b>{this.state.courseData['start']}</b>
                </span>
              )}
              {this.state.courseData['end'] && (
                <span className={styles['course-date']}>
                  Ends: <b>{this.state.courseData['end']}</b>
                </span>
              )}
            </div>
          </div>
          <div className={styles['course-info-bottom']}>
            <button className={styles['footer-control']} onClick={() => console.log('Email settings')}>Email settings</button>
            <button className={styles['footer-control']} onClick={() => console.log('Unenroll')}>Unenroll</button>
            <div className={styles['course-share-container']}>
              <span>Share on:</span>
              <button className={cx(styles['share-button'], styles['facebook'])} onClick={() => console.log('share-fb')}><img src={facebookIcon} alt='Share on Facebook' /></button>
              <button className={cx(styles['share-button'], styles['twitter'])} onClick={() => console.log('share-tw')}><img src={twitterIcon} alt='Share on Twitter' /></button>
            </div>
          </div>
        </div>
        <div className={styles['course-cta-container']}>
          <NavLink
            to = {'/react-lms/course-experience/course/' + this.props.courseId}
            className = {styles['course-button']}
          >
            Go to the course
          </NavLink>
        </div>
      </div>
    )

    return (
      <article className={styles['course-wrapper']}>
        {renderView}
      </article>
    );
  }
}


CoursesListItem.propTypes = {
  courseData: PropTypes.object
}

export default CoursesListItem
