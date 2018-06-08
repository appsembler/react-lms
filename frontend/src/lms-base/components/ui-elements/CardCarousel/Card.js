import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './_Card.scss';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

let cx = classNames.bind(styles);


class Card extends Component {

  render() {
    const cardStyle = {
      left: this.props.itemIsActive ? 0 : (this.props.index - this.props.activeItem)*280 + 20,
      backgroundImage: 'url(' + this.props.itemData.courseImage + ')'
    }

    return (
      <div key={this.props.index} className={cx({ 'card': true, 'card-past': this.props.itemIsPast, 'card-active': this.props.itemIsActive})} style={cardStyle}>
        <div className={styles['card-inner']} onClick={() => this.props.setActiveItem(this.props.index)}>
          <h2 className={styles['course-title']}>{this.props.itemData.courseTitle}</h2>
          <span className={styles['course-code']}>{this.props.itemData.courseCode}</span>
          <span className={styles['course-start']}>{this.props.itemData.startDate}</span>
        </div>
        {this.props.itemIsActive && (
          <NavLink
            className={styles['course-cta']}
            to={this.props.itemData.courseURL}
          >
            View details & enroll
          </NavLink>
        )}
      </div>
    );
  }
}

Card.defaultProps = {

}

Card.propTypes = {
  itemIsActive: PropTypes.bool,
  index: PropTypes.number,
  activeItem: PropTypes.number,
  itemData: PropTypes.object,
}

export default Card
