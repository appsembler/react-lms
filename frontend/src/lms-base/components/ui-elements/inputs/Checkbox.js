import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './_Checkbox.scss';

class Checkbox extends Component {

  render() {

    return (
      <div className={styles['input-container']}>
        <div className={styles['input-inner']}>
          <input type='checkbox' value={this.props.value} disabled={this.props.disabled && 'disabled'} className={styles['input']} onChange={(e) => this.props.feedbackFunction && this.props.feedbackFunction(this.props.name, e.target.checked)} />
          <label htmlFor={this.props.name} className={styles['label']} dangerouslySetInnerHTML={{__html: this.props.label}} />
        </div>
        <span className={styles['helper-text']} dangerouslySetInnerHTML={{__html: this.props.helperText}} />
      </div>
    );
  }
}

Checkbox.defaultProps = {
  disabled: false,
}

Checkbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
}

export default Checkbox
