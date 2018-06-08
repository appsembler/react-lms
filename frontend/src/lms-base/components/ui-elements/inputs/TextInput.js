import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './_TextInput.scss';

class TextInput extends Component {

  render() {

    return (
      <div className={styles['input-container']}>
        <label htmlFor={this.props.name} className={styles['label']}>
          {this.props.label}
        </label>
        <input type={this.props.type} placeholder={this.props.placeholder} disabled={this.props.disabled && 'disabled'} className={styles['input']} />
        <span className={styles['helper-text']} dangerouslySetInnerHTML={{__html: this.props.helperText}} />
      </div>
    );
  }
}

TextInput.defaultProps = {
  disabled: false,
  type: 'text',
}

TextInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
}

export default TextInput
