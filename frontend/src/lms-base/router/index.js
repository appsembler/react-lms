import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { history } from 'redux/store';

import HeaderLayout from 'components/main-layout/header/HeaderLayout';
import FooterLayout from 'components/main-layout/footer/FooterLayout';

import IndexView from 'views/IndexView';
import LoginView from 'views/LoginView';
import RegisterView from 'views/RegisterView';
import CourseAboutView from 'views/courseware/CourseAboutView';
import CourseContentView from 'views/courseware/CourseContentView';
import DashboardView from 'views/DashboardView';
import LogoutView from 'views/LogoutView';

import styles from 'sass-core/app-root-styles.scss';

class RouterRoot extends Component {
  render() {
    return (
      <div className={styles['lms-root']}>
        <Switch location={history.location}>
          <Route path='/react-lms/courseware/course/:urlString' render={({ match }) => {return(<HeaderLayout courseId={match.params.urlString} isCourseware={true} />)} } />
          <Route component={HeaderLayout} />
        </Switch>
        <div className={styles['lms-content']}>
          <Switch location={history.location}>
            <Route exact path='/react-lms/' component={IndexView} />
            <Route exact path='/react-lms/login' component={LoginView} />
            <Route exact path='/react-lms/logout' render={() => {return(<LogoutView history={history} />)}} />
            <Route exact path='/react-lms/register' component={RegisterView} />
            <Route exact path='/react-lms/dashboard' component={DashboardView} />
            <Route path='/react-lms/course/:urlString' render={({ match }) => {return(<CourseAboutView courseId={match.params.urlString} />)} } />
            <Route path='/react-lms/course-experience/course/:urlString' render={({ match }) => {return(<CourseContentView courseId={match.params.urlString} />)} } />
            <Route path='/react-lms/:urlString' render={({ match }) => {return(<p>{match.params.urlString}</p>)}} />
          </Switch>
        </div>
        <FooterLayout />
      </div>
    );
  }
}

export default RouterRoot;
