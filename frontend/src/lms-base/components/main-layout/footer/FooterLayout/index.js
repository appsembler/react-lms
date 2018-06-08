import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './_FooterLayout.scss';

import footerLogo from 'static/images/branding/logo-symbol--positive.svg';
import openEdxLogo from 'static/images/branding/openedx-logo.svg';

import { FooterLinks } from 'config/FooterConfig';

let cx = classNames.bind(styles);

class FooterLayout extends Component {

  render() {

    const footerNavItems = FooterLinks.map((item, index) => {
      return (
        item.separator ? (
          <li key={index} className={styles['nav-separator']}></li>
        ) : (
          <li key={index} className={styles['nav-item-container']}>
            <NavLink
              to={item.target}
              className={styles['nav-item']}
            >
              {item.title}
            </NavLink>
          </li>
        )
      )
    })

    return (
      <footer className={cx(styles['footer-wrapper'])}>
        <div className={cx(styles['container'], styles['footer-container'])}>
          <div className={styles['logo-container']}>
            <NavLink
              to='/'
            >
              <img
                src={footerLogo}
                className={styles['logo-image']}
                alt={this.props.platformName}
              />
            </NavLink>
          </div>
          <div className={styles['content-container']}>
            <div className={styles['copyright']}>
              © 2018 Cool Courses inc. All rights reserved.
            </div>
            <ul className={styles['nav']}>
              {footerNavItems}
            </ul>
          </div>
          <img
            src={openEdxLogo}
            alt="Powered by Open EdX"
            role="presentation"
            className={styles['poweredby-logo']}
          />
        </div>
      </footer>
    );
  }
}

export default FooterLayout
