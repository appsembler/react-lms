import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './_ResponsiveImgLazyLoad.scss';
import classNames from 'classnames/bind';
import LazyLoad from 'react-image-lazy-load';

let cx = classNames.bind(styles);

class ResponsiveImgLazyLoad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageLoaded: false
    }

    this.imageLoadedSet = this.imageLoadedSet.bind(this);
  }

  imageLoadedSet = () => {
    this.setState({
      imageLoaded: true,
    });
  }

  render() {

    return (
      <div className={cx({ 'responsive-image': true, 'image-loaded': this.state.imageLoaded })}>
        <LazyLoad
          imageProps={{
            src: this.props.src,
            alt: this.props.alt,
            ref: 'image',
          }}
          onContentVisible= {() => this.imageLoadedSet()}
        />
      </div>
    );
  }
}

ResponsiveImgLazyLoad.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
}

export default ResponsiveImgLazyLoad
