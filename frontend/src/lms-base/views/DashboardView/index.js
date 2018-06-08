import React, { Component } from 'react';
import styles from './_DashboardView.scss';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import UserHello from 'components/dashboard/UserHello';
import CoursesListItem from 'components/dashboard/CoursesListItem';

import courseImage from 'static/images/course-test/course-1.jpeg';

let cx = classNames.bind(styles);

const courseEnrollmentAPI = '/api/enrollment/v1/enrollment'

class DashboardView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coursesList: [],
      apiFetchActive: false
    };

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
    fetch(courseEnrollmentAPI, { credentials: "same-origin" })
      .then(response => response.json())
      .then(json => this.setState({
        coursesList: json
      }, this.triggerApiFetchActive()))
  }

  componentDidMount = () => {
    this.fetchCourseData()
  }

  render() {
    const coursesRender = this.state.coursesList && this.state.coursesList.map((course, index) => {
      return(
        <CoursesListItem courseId = {course['course_details']['course_id']} key = {index} />
      )
    })

    return (
      <div className={styles['dashboard-container']}>
        <section className={cx(styles['dashboard-header-container'], styles['container'])}>
          <UserHello />
        </section>
        <section className={styles['dashboard-courses']}>
          <div className={cx(styles['dashboard-courses-container'], styles['container'])}>
            {coursesRender}
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
)(DashboardView)
