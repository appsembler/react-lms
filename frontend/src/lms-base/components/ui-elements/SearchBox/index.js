import React, { Component } from 'react';
import styles from './_SearchBox.scss';

import searchIcon from './svg/search.svg';

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange = (newValue) => {
    this.setState({
      value: newValue
    });
  }

  render() {
    const tags = this.props.tags.map((tag, index) => {
      return (
        <button key={index} className={styles['tag']} onClick={() => this.onChange(tag)}>
          {tag}
        </button>
      )
    })

    return (
      <div className={styles['search-container']}>
        <div className={styles['input-wrapper']}>
          <input type='text' className={styles['input']} onChange={(e) => this.onChange(e.target.value)} value={this.state.value} placeholder={this.props.inputPlaceholder} />
          <img src={searchIcon} className={styles['input-icon']} alt="Type your search query" role="presentation" />
        </div>
        <div className={styles['tags-container']}>
          <h4>Here are some keyword suggestions:</h4>
          {tags}
        </div>
      </div>
    );
  }
}

SearchBox.defaultProps = {
  inputPlaceholder: 'Search here...'
}

export default SearchBox
