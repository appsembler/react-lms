import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './_UserHello.scss';

import startedIcon from 'static/images/fontawesome-svg/regular/flag.svg';
import finishedIcon from 'static/images/fontawesome-svg/solid/flag-checkered.svg';
import certIcon from 'static/images/fontawesome-svg/solid/certificate.svg';

class UserHello extends Component {

  render() {

    return (
      <div className={styles['user-container']}>
        <img src={this.props.user['profile_image']['image_url_large']} className={styles['user-image']} alt={this.props.user['name']} />
        <div className={styles['user-info']}>
          <span className={styles['hello-text']}>
            Hi, {this.props.user['name'].split(' ')[0]}!
          </span>
          <p>Welcome back to your Dashboard! Great to see you! You are currently enrolled into 3 courses - better get started!</p>
          <ul className={styles['stats']}>
            <li>
              <span className={styles['stat-icon']}>
                <img src={startedIcon} alt='Courses started' role='presentation' />
              </span>
              <span className={styles['stat-text']}>
                <b>{this.props.userCoursesEnrolled}</b> courses started
              </span>
            </li>
            <li>
              <span className={styles['stat-icon']}>
                <img src={finishedIcon} alt='Courses completed' role='presentation' />
              </span>
              <span className={styles['stat-text']}>
                <b>{this.props.userCoursesCompleted}</b> courses completed
              </span>
            </li>
            <li>
              <span className={styles['stat-icon']}>
                <img src={certIcon} alt='Certificates earned' role='presentation' />
              </span>
              <span className={styles['stat-text']}>
                <b>{this.props.userCertsEarned}</b> certificates earned
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

UserHello.defaultProps = {
  userCoursesEnrolled: 3,
  userCoursesCompleted: 0,
  userCertsEarned: 0
}

UserHello.propTypes = {
  userCoursesEnrolled: PropTypes.number,
  userCoursesCompleted: PropTypes.number,
  userCertsEarned: PropTypes.number
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user
})

export default connect(
  mapStateToProps
)(UserHello)
