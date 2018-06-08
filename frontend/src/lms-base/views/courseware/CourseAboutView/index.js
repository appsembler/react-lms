import React, { Component } from 'react';
import styles from './_CourseAboutView.scss';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import classNames from 'classnames/bind';
import CTAButton from 'components/ui-elements/CTAButton';

import courseImage from 'static/images/course-test/course-1.jpeg';
import arrowRight from 'static/images/fontawesome-svg/solid/arrow-right.svg';
import aboutIcon from 'static/images/fontawesome-svg/regular/comment-dots.svg';
import metaIcon from 'static/images/fontawesome-svg/regular/check-circle.svg';
import staffIcon from 'static/images/fontawesome-svg/regular/user-circle.svg';

let cx = classNames.bind(styles);

const courseInfoAPI = '/api/courses/v1/courses/'

class CourseAboutView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseData: Immutable.Map({
        "media": {
          "course_image": "",
          "course_video": "",
          "image": {
            "raw": "",
            "small": "",
            "large": ""
          }
        },
        "overview": ""
      })
    };

    this.fetchCourseData = this.fetchCourseData.bind(this);
    this.triggerApiFetchActive = this.triggerApiFetchActive.bind(this);
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
        courseData: Immutable.Map(json)
      }, this.triggerApiFetchActive()))
  }

  componentDidMount = () => {
    this.fetchCourseData()
  }

  render() {
    const staffRender = this.state.courseData.get('overview')['course_instructors'] ? (
      this.state.courseData.get('overview')['course_instructors'].map((staffMember, index) => {
        return(
          <li key={staffMember['full_name']} className={styles['staff-member']}>
            {staffMember['image'] && <img src={staffMember['image']} alt={staffMember['full_name']} />}
            <div className={styles['info']}>
              <span className={styles['name']}>{staffMember['full_name']}</span>
              <span className={styles['description']}>{staffMember['description']}</span>
              <span className={styles['organisation']}>{staffMember['organisation']}</span>
            </div>
          </li>
        )
      })
    ) : null;

    return (
      <div className={styles['course-about-container']}>
        <section className={cx(styles['course-about-header-container'], styles['container'])}>
          <div className={styles['course-about-header']} style={{backgroundImage: 'url(' + this.state.courseData.get('media')['image']['large'] + ')'}}>
            <div className={styles['header-content-wrapper']}>
              <div className={styles['header-content']}>
                <h1 className={styles['course-title']}>{this.state.courseData.get('name')}</h1>
                <p>
                  {this.state.courseData.get('short_description')}
                </p>
                {this.state.courseData.get('media')['course_video']['uri'] && (
                  <div className={styles['video-cta-wrapper']}>
                    <CTAButton
                      label = 'Play video'
                      function = {() => console.log('Playing video...')}
                      negative
                      importance = 'secondary'
                      size = 'small'
                    />
                  </div>
                )}
              </div>
              <NavLink to={this.props.userAuthenticated ? '/course/' : '/login'} className={styles['header-button']}>
                <span>{this.props.userAuthenticated ? 'Go to course content' : 'Log in to enroll in this course'}</span>
                <img src={arrowRight} alt="Log in to enroll in this course" role="presentation" />
              </NavLink>
            </div>
          </div>
        </section>
        <section className={cx(styles['course-about-content'], styles['container'])}>
          <div className={styles['course-about']}>
            <div className={styles['visual-section-heading']}>
              <img src={aboutIcon} alt="About this course" role="presentation" />
              <h2>About this course</h2>
            </div>
            <div dangerouslySetInnerHTML={{__html: this.state.courseData.get('overview')}} />
          </div>
          <div className={styles['course-meta']}>
            <div className={styles['visual-section-heading']}>
              <img src={metaIcon} alt="Course basic information" role="presentation" />
              <h2>Course info</h2>
            </div>
            <ul className={styles['course-meta-list']}>
              <li className={styles['course-meta-item']}>
                <span className={styles['label']}>Starts:</span>
                <span className={styles['value']}>{this.state.courseData.get('start_display') ? this.state.courseData.get('start_display') : this.state.courseData.get('start')}</span>
              </li>
              {this.state.courseData.get('end') && (
                <li className={styles['course-meta-item']}>
                  <span className={styles['label']}>Ends:</span>
                  <span className={styles['value']}>{this.state.courseData.get('end_display') ? this.state.courseData.get('end_display') : this.state.courseData.get('end')}</span>
                </li>
              )}
              <li className={styles['course-meta-item']}>
                <span className={styles['label']}>Pacing:</span>
                <span className={styles['value']}>{this.state.courseData.get('pacing')}</span>
              </li>
              {this.state.courseData.get('effort') && (
                <li className={styles['course-meta-item']}>
                  <span className={styles['label']}>Effort:</span>
                  <span className={styles['value']}>{this.state.courseData.get('effort')}</span>
                </li>
              )}
              <li className={styles['course-meta-item']}>
                <span className={styles['label']}>Course code:</span>
                <span className={styles['value']}>{this.state.courseData.get('number')}</span>
              </li>
            </ul>
          </div>
        </section>
        <section className={styles['course-staff']}>
          <div className={cx(styles['container'], styles['course-staff-container'])}>
            <div className={styles['visual-section-heading']}>
              <img src={staffIcon} alt="Course staff" role="presentation" />
              <h2>Course staff</h2>
            </div>
            <ul className={styles['staff-list-wrapper']}>
              {staffRender}
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  userAuthenticated: state.user['isAuthenticated']
})

export default connect(
  mapStateToProps
)(CourseAboutView)
