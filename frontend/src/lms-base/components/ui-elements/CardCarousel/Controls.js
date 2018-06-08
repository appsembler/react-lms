import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './_Controls.scss';
import classNames from 'classnames/bind';

import previousArrow from './svg/arrow-left.svg';
import nextArrow from './svg/arrow-right.svg';

let cx = classNames.bind(styles);


class Controls extends Component {

  render() {
    const ticks = this.props.items.map((item, index) => {
      return (
        <li key={index} className={cx({'tick': true, 'tick-active': this.props.activeItem === index})} onClick={() => this.props.setActiveItem(index)}>

        </li>
      )
    })

    return (
      <div className={styles['controls-container']}>
        <button className={cx(styles['control-button'], styles['buton-previous'])} onClick={() => this.props.goToPrevious()} disabled={(this.props.activeItem === 0)}>
          <img src={previousArrow} alt={'Previous item'} />
        </button>
        <ul className={styles['ticks-container']}>
          {ticks}
        </ul>
        <button className={cx(styles['control-button'], styles['buton-next'])} onClick={() => this.props.goToNext()} disabled={(this.props.activeItem === (this.props.items.length - 1))}>
          <img src={nextArrow} alt={'Next item'} />
        </button>
      </div>
    );
  }
}

Controls.defaultProps = {

}

Controls.propTypes = {
  activeItem: PropTypes.number,
  items: PropTypes.array
}

export default Controls
