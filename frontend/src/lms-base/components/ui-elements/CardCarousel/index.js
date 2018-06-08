import React, { Component } from 'react';
import styles from './_CardCarousel.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Card from './Card';
import Controls from './Controls';

let cx = classNames.bind(styles);

class CardCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: 0,
      cardData: []
    };

    this.nextCard = this.nextCard.bind(this);
    this.previousCard = this.previousCard.bind(this);
    this.setActiveCard = this.setActiveCard.bind(this);
  }

  nextCard = () => {
    this.setState({
      activeCard: this.state.activeCard + 1
    })
  }

  previousCard = () => {
    this.setState({
      activeCard: this.state.activeCard - 1
    })
  }

  setActiveCard = (index) => {
    this.setState({
      activeCard: index
    })
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      cardData: nextProps.cardData
    })
  }

  render() {
    const cardsView = this.state.cardData.map((item, index) => {
      return (
        <Card
          key = {index}
          itemIsActive = {index === this.state.activeCard}
          itemIsPast = {index < this.state.activeCard}
          index = {index}
          activeItem = {this.state.activeCard}
          itemData = {{
            courseImage: item.media['course_image']['uri'],
            courseTitle: item.name,
            courseCode: item.number,
            courseStart: item.startDisplay ? item.startDisplay : item.start,
            courseURL: '/react-lms/course/' + item.id,
          }}
          setActiveItem = {this.setActiveCard}
        />
      )
    })

    return (
      <div className={cx(styles['container'], styles['carousel-container'])}>
        <div className={styles['cards-container']}>
          {cardsView}
        </div>
        <Controls
          goToPrevious = {this.previousCard}
          goToNext = {this.nextCard}
          activeItem = {this.state.activeCard}
          setActiveItem = {this.setActiveCard}
          items = {this.props.cardData}
        />
      </div>
    );
  }
}

CardCarousel.defaultProps = {

}

CardCarousel.propTypes = {
  cardData: PropTypes.array
}

export default CardCarousel
