import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './_Navigation.scss';
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

class Navigation extends Component {

  render() {
    const navItems = this.props.mainItems.map((item, index) => {
      return (
        item.separator ? (
          <span key={index} className={styles['nav-separator']}></span>
        ) : (
          <NavLink
            to={item.target}
            className={cx({ 'nav-item': true, 'nav-cta': item.isCTA})}
            key={index}
          >
            {item.title}
          </NavLink>
        )
      )
    })

    return (
      <nav className={styles['header-nav']}>
        {navItems}
      </nav>
    );
  }
}

Navigation.defaultProps = {

}

export default Navigation
