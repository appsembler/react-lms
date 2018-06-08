import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './_DropdownNav.scss';
import caretDown from 'static/images/fontawesome-svg/solid/caret-down.svg';

class DropdownNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownExpanded: false
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown = () => {
    this.setState({
      dropdownExpanded: !this.state.dropdownExpanded
    })
  }

  render() {
    const dropdownItems = this.props.dropdownItems.map((item, index) => {
      return (
        item.separator ? (
          <li key={index} className={styles['dropdown-separator']}></li>
        ) : (
          <li key={index} className={styles['dropdown-item']}>
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
      <div className={styles['dropdown-nav']}>
        <button onClick={() => this.toggleDropdown()} className={styles['label-container']}>
          <span className={styles['label']}>{this.props.label}</span>
          <img src={caretDown} className={styles['icon']} alt="Click to expand" role="presentation" />
        </button>
        {this.state.dropdownExpanded && (
          <ul className={styles['dropdown-container']}>
            {dropdownItems}
          </ul>
        )}
      </div>
    );
  }
}

DropdownNav.defaultProps = {
  label: 'EN'
}

export default DropdownNav
