import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAuthStatus, fetchUserData } from 'redux/actions/Actions';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './_HeaderLayout.scss';

import fullLogoPositive from 'static/images/branding/logo-full-horizontal--positive.svg';
import logoSymbolPositive from 'static/images/branding/logo-symbol--positive.svg';

import Navigation from 'components/main-layout/header/Navigation';
import DropdownNav from 'components/ui-elements/DropdownNav';

import { HeaderLinksNonAuth, HeaderLinksAuth, UserDropdownMenu, LanguagesDropdownMenu } from 'config/HeaderConfig';

let cx = classNames.bind(styles);

class HeaderLayout extends Component {

  componentDidMount = () => {
    this.props.fetchAuthStatus();
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps.userAuthenticated)
    if ((nextProps.userAuthenticated) && (nextProps.username !== this.props.username)) {
      this.props.fetchUserData('/api/user/v1/accounts/' + nextProps.username)
    }
  }

  render() {

    const headerLogo = this.props.inCourseware ? logoSymbolPositive : fullLogoPositive;

    return (
      <header className={cx(styles['header-wrapper'])}>
        <div className={cx(styles['container'], styles['header-container'])}>
          <div className={styles['logo-contaner']}>
            <NavLink
              to='/react-lms'
            >
              <img
                src={headerLogo}
                className={styles['logo-image']}
                alt={this.props.platformName}
              />
            </NavLink>
          </div>
          {(this.props.isCourseware && this.props.userAuthenticated) && (
            <div className={styles['course-name']}>
              <span className={styles['course-code']}>{this.props.course.get('courseCode')}</span>
              <span>{this.props.course.get('courseName')}</span>
            </div>
          )}
          {(this.props.isCourseware && this.props.userAuthenticated) ? (
            <div>WOAH</div>
          ) : (
            <Navigation
              mainItems = {this.props.userAuthenticated ? HeaderLinksAuth : HeaderLinksNonAuth}
            />
          )}
          {this.props.userAuthenticated && (
            <div className={styles['user-container']}>
              <span className={styles['nav-separator']} />
              <img
                src={this.props.user['profile_image']['image_url_medium']}
                alt={this.props.user['name']}
                role='presentation'
                className={styles['user-avatar']}
              />
              <DropdownNav
                dropdownItems={UserDropdownMenu}
                label={this.props.user['name']}
              />
            </div>
          )}
          {(!this.props.userAuthenticated && this.props.languageDropdownEnabled) && (
            <div className={styles['language-dropdown-container']}>
              <span className={styles['nav-separator']} />
              <DropdownNav
                dropdownItems={LanguagesDropdownMenu}
                label='En'
              />
            </div>
          )}
        </div>
      </header>
    );
  }
}

HeaderLayout.defaultProps = {
  languageDropdownEnabled: true,
  inCourseware: false,
}

const mapStateToProps = (state, ownProps) => ({
  userAuthenticated: state.user['isAuthenticated'],
  user: state.user,
  platformName: state.platform.platformName,
  course: state.course,
  username: state.user.username,
  apiFetching: state.platform.apiFetching,
})

const mapDispatchToProps = dispatch => ({
  fetchAuthStatus: () => dispatch(fetchAuthStatus()),
  fetchUserData: (apiURL) => dispatch(fetchUserData(apiURL)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderLayout)
