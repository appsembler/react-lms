import React, { Component } from 'react';
import styles from './_LoginView.scss';
import classNames from 'classnames/bind';
import TextInput from 'components/ui-elements/inputs/TextInput';
import CTAButton from 'components/ui-elements/CTAButton';

import heroBackground from 'static/images/defaults/default-hero-bg.jpg';

let cx = classNames.bind(styles);

class LoginView extends Component {
  
  render() {

    return (
      <div className={styles['login-container']}>
        <section className={cx(styles['login-main'], styles['container'])} style={{backgroundImage: 'url(' + heroBackground + ')'}}>
          <div className={styles['login-content']}>
            <h1>Log in</h1>
            <p>Please log in below using your credentials. If you are not a registered user of Cool Courses Academy, you can <a href="/register">sign up by clicking here</a> - it only takes a couple of minutes!</p>
            <form className={styles['form']}>
              <TextInput
                name = 'email'
                label = 'Email address:'
                type = 'email'
                placeholder = 'Enter your email address'
              />
              <TextInput
                name = 'password'
                label = 'Your password:'
                type = 'password'
                placeholder = 'Enter your password'
              />
              <CTAButton
                label = 'Log in'
                formSubmit
              />
            </form>
          </div>
        </section>
      </div>
    );
  }
}

LoginView.defaultProps = {

}

export default LoginView
