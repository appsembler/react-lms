import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './_CourseTopNav.scss';

import otherIcon from './svg/otherIcon.svg';
import problemIcon from './svg/problemIcon.svg';
import videoIcon from './svg/videoIcon.svg';
import previousIcon from './svg/chevron-left.svg';
import nextIcon from './svg/chevron-right.svg';

let cx = classNames.bind(styles);

const sequenceIcons = {
  'seq_other': otherIcon,
  'seq_video': videoIcon,
  'seq_problem': problemIcon
}

class CourseTopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSequence: this.props.activeSequence,
      navData: this.props.navData
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        activeSequence: nextProps.activeSequence,
        navData: nextProps.navData
      })
    }
  }

  render() {
    const sequenceButtons = this.props.navData.map((item, index) => {
      return (
        <button
          key = {item.dataIndex}
          className = {cx({'nav-button': true, 'active': this.state.activeSequence === index})}
          onClick = { () => this.props.setActiveSequence(index) }
        >
          <img src={sequenceIcons[item.itemType]} alt={item.itemTitle} />
          <div className={styles['button-hover-text']}>
            {item.itemTitle}
          </div>
        </button>
      )
    })

    return (
      <section className={cx(styles['course-top-nav-wrapper'])}>
        <nav className={cx(styles['course-top-nav'], styles['container'])}>
          <button
            className = {cx(styles['nav-button'], styles['previous'])}
            onClick = { () => this.props.setActiveSequence(this.props.activeSequence - 1) }
            disabled = {this.props.activeSequence === 0}
          >
            <img src={previousIcon} alt={'Go to previous'} />
            <div className={styles['button-hover-text']}>
              Go to previous
            </div>
          </button>
          {sequenceButtons}
          <button
            className = {cx(styles['nav-button'], styles['next'])}
            onClick = { () => this.props.setActiveSequence(this.props.activeSequence + 1) }
            disabled = {this.props.activeSequence === this.props.navData.length}
          >
            <img src={nextIcon} alt={'Go to next'} />
            <div className={styles['button-hover-text']}>
              Go to next
            </div>
          </button>
        </nav>
      </section>
    );
  }
}

CourseTopNav.defaultProps = {

}

export default CourseTopNav
