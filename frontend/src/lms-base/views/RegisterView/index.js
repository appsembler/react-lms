import React, { Component } from 'react';
import styles from './_RegisterView.scss';
import classNames from 'classnames/bind';
import TextInput from 'components/ui-elements/inputs/TextInput';
import Checkbox from 'components/ui-elements/inputs/Checkbox';
import DropdownAutosuggest from 'components/ui-elements/inputs/DropdownAutosuggest';
import CTAButton from 'components/ui-elements/CTAButton';

import facebookIcon from 'static/images/fontawesome-svg/brands/facebook-f.svg';
import googleIcon from 'static/images/fontawesome-svg/brands/google.svg';
import microsoftIcon from 'static/images/fontawesome-svg/brands/microsoft.svg';

let cx = classNames.bind(styles);

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'de', label: 'German' },
  { value: 'hr', label: 'Croatian' }
]

const educationLevels = [
  { value: 'kg', label: 'Kindergarden' },
  { value: 'ps', label: 'Primary School' },
  { value: 'hs', label: 'High School' },
  { value: 'co', label: 'College' }
]

class RegisterView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: { 'tos-agree': false }
    };

    this.setValueState = this.setValueState.bind(this);
  }

  setValueState = (name, value) => {
    let newValues = this.state.values;
    newValues[name] = value;
    this.setState({
      values: newValues
    }, () => console.log(this.state.values))
  }

  render() {

    return (
      <div className={styles['register-container']}>
        <section className={cx(styles['register-main'], styles['container'])}>
          <div className={styles['register-header']}>
            <h1>Sign up for an account</h1>
            <p>Please sign in below - takes only a few minutes! If you already have a Cool Courses Academy account, you can <a href="/login">log in by going here</a>.</p>
          </div>
          <div className={styles['form-container']}>
            <form className={styles['form']}>
              <div className={styles['form-column']}>
                <h2>Provide us with some basic information:</h2>
                <TextInput
                  name = 'email'
                  label = 'Email address:'
                  type = 'email'
                  placeholder = 'Enter your email address'
                />
                <TextInput
                  name = 'username'
                  label = 'Username:'
                  type = 'text'
                  placeholder = 'Choose your username'
                />
                <TextInput
                  name = 'password'
                  label = 'Your password:'
                  type = 'password'
                  placeholder = 'Choose your password'
                />
              </div>
              <div className={styles['form-column']}>
                <h2>Give us a bit more information about you:</h2>
                <DropdownAutosuggest
                  name = 'country'
                  label = 'Country:'
                  value = ''
                  countrySelector
                  placeholder = 'Select/type your country'
                />
                <DropdownAutosuggest
                  name = 'language'
                  label = 'Primary language:'
                  value = ''
                  options = {languageOptions}
                  placeholder = 'Select/type your primary language'
                />
                <DropdownAutosuggest
                  name = 'education'
                  label = 'Highest level of education completed:'
                  value = ''
                  options = {educationLevels}
                  placeholder = 'Select/type'
                />
                <TextInput
                  name = 'additional'
                  label = 'Something else:'
                  type = 'text'
                  placeholder = 'Blah'
                />
              </div>
              <div className={styles['form-footer']}>
                <div className={styles['helper-text']}>
                  Please take your time to read our <a href="/tos">Terms of Service</a> thoroughly, then choose whether you accept them. You can only sign up if you agree to them.
                </div>
                <div className={styles['checkbox-container']}>
                  <Checkbox
                    name = 'tos-agree'
                    value = 'tos-agree'
                    label = 'I agree to the <a href="/tos">Cool Courses Terms of Service</a> <span>(required)</span>'
                    feedbackFunction = {this.setValueState}
                  />
                </div>
                <CTAButton
                  label = 'Sign me up (Scotty)!'
                  formSubmit
                  disabled = {!this.state.values['tos-agree']}
                />
              </div>
            </form>
            {this.props.socialAuthEnabled && (
              <div className={styles['social-auth-container']}>
                <h2>Alternatively, you can sign up using one of following providers:</h2>
                <p>By using single-sign-on to register using one of the options below, you agree to our <a href="/tos">Terms of Service</a>.</p>
                <button className={cx(styles['sso-button'], styles['facebook'])}>
                  <span className={styles['icon-container']}><img src={facebookIcon} alt='Sign up using Facebook' role='presentation' /></span>
                  <span>Sign up using Facebook</span>
                </button>
                <button className={cx(styles['sso-button'], styles['google'])}>
                  <span className={styles['icon-container']}><img src={googleIcon} alt='Sign up using Google' role='presentation' /></span>
                  <span>Sign up using Google</span>
                </button>
                <button className={cx(styles['sso-button'], styles['microsoft'])}>
                  <span className={styles['icon-container']}><img src={microsoftIcon} alt='Sign up using Microsoft' role='presentation' /></span>
                  <span>Sign up using Microsoft</span>
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
}

RegisterView.defaultProps = {
  socialAuthEnabled: true,
}

export default RegisterView
