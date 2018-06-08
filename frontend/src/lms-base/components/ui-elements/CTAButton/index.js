import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './_CTAButton.scss';
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);


class CTAButton extends Component {

  render() {
    const CTAClass = cx({
      'cta-button': true,
      'large': (this.props.size === 'large'),
      'medium': (this.props.size === 'medium'),
      'small': (this.props.size === 'small'),
      'primary': (this.props.importance === 'primary'),
      'secondary': (this.props.importance === 'secondary'),
      'positive': !this.props.negative,
      'negative': this.props.negative
    })

    return (
      (this.props.function || this.props.formSubmit) ? (
        <button className={CTAClass} onClick={() => this.props.function()} type={this.props.formSubmit ? 'submit' : 'button'} disabled={this.props.disabled}>
          <div className={styles['content']}>
            {this.props.icon && (
              <img src={this.props.icon} alt={this.props.label} role='presentation' className={styles['cta-icon']} />
            )}
            {this.props.label}
          </div>
        </button>
      ) : (
        <a className={CTAClass} href={this.props.target} target={this.props.openInNewWindow ? '_blank' : '_self'}>
          <div className={styles['content']}>
            {this.props.icon && (
              <img src={this.props.icon} alt={this.props.label} role='presentation' className={styles['cta-icon']} />
            )}
            {this.props.label}
          </div>
        </a>
      )
    );
  }
}

CTAButton.defaultProps = {
  size: 'medium',
  importance: 'primary',
  negative: false,
  openInNewWindow: false,
  formSubmit: false,
  disabled: false,
}

CTAButton.propTypes = {
  label: PropTypes.string,
  target: PropTypes.string,
  openInNewWindow: PropTypes.bool,
  formSubmit: PropTypes.bool,
  size: PropTypes.string,
  importance: PropTypes.string,
  negative: PropTypes.bool,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
}

export default CTAButton
