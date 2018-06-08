import React, { Component } from 'react';
import Immutable from 'immutable';
import styles from './_CourseContentView.scss';

import testData from './testData';

import CourseTopNav from 'components/courseware/CourseTopNav';
import CourseContent from 'components/courseware/CourseContent';

var decode = require('unescape');

//const sequenceData = rawData.find(data => data.get('attr').get('class') === 'sequence')

class CourseContentView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseData: {},
      navData: [],
      contentData: Immutable.List(),
      activeSequence: 0,
      apiFetchActive: false
    };

    this.triggerApiFetchActive = this.triggerApiFetchActive.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.extractSequenceData = this.extractSequenceData.bind(this);
    this.parseData = this.parseData.bind(this);
    this.parseSequenceNav = this.parseSequenceNav.bind(this);
    this.setActiveSequence = this.setActiveSequence.bind(this);
  }

  triggerApiFetchActive = () => {
    this.setState({
      apiFetchActive: !this.state.apiFetchActive
    })
  }

  fetchData = (courseID, courseChapter, courseSection) => {
    const courseChapterURLPart = courseChapter ? courseChapter + '/' : '';
    const courseSectionURLPart = courseSection ? courseSection + '/' : '';
    const fetchURL = '/react-lms/courses/' + courseID + '/courseware/' + courseChapterURLPart + courseSectionURLPart;
    this.triggerApiFetchActive();
    this.setActiveSequence(0);
    fetch(fetchURL, { credentials: "same-origin" })
      .then(response => response.json())
      .then(json => this.setState({
        courseData: json,
        accordionData: json['accordion_json']
      }, () => {
        this.triggerApiFetchActive();
        const rawData = require('html2json').html2json(this.state.courseData.content)['child'][0]['child'];
        this.extractSequenceData(rawData);
      }))
  }

  extractSequenceData = (rawData) => {
    let sequenceData = [];
    rawData.forEach((element, index) => {
      if (element.attr) {
        if (element.attr['class'] === 'sequence') {
          sequenceData = element
        }
      }
    });
    this.parseData(sequenceData)
  }

  parseData = (sequenceData) => {
    let navData = {};
    const contentData = [];
    sequenceData.child.forEach(function(element, index) {
      if (element.attr) {
        if (element.attr.class) {
          if (element.attr.class.indexOf('seq_contents') !== -1) {
            contentData.push(element)
          } else if (element.attr.class === 'sequence-nav') {
            navData = element;
          }
        }
      }
    })
    this.setState({
      contentData: Immutable.List(contentData),
    })
    this.parseSequenceNav(navData);
  }

  parseSequenceNav = (navData) => {
    let navParsed = []
    navData.child.forEach((element, index) => {
      if (element.attr) {
        if (element.attr.class === 'sequence-list-wrapper') {
          element.child[1].child.forEach((navItem, i) => {
            if (navItem.node === 'element') {
              let tempElement = {}
              navItem.child.forEach((item, j) => {
                if (item.tag === 'button') {
                  tempElement.itemType = item.attr['class'][0]
                  tempElement.dataId = item.attr['data-id']
                  tempElement.dataIndex = item.attr['data-index']
                } else if (item.tag === 'div') {
                  tempElement.itemTitle = item.child[1].text
                }
              })
              navParsed.push(tempElement)
            }
          })
        }
      }
    })
    this.setState({
      navData: navParsed
    })
  }

  setActiveSequence = (sequenceNumber) => {
    this.setState({
      activeSequence: sequenceNumber
    })
  }

  componentDidMount = () => {
    this.fetchData(this.props.courseId, '', '');
  }

  render() {

    return (
      <div className={styles['courseware-wrapper']}>
        <CourseTopNav
          navData = {this.state.navData}
          activeSequence = {this.state.activeSequence}
          setActiveSequence = {this.setActiveSequence}
        />
        <CourseContent
          courseContent = {this.state.contentData.get(this.state.activeSequence) ? decode(this.state.contentData.get(this.state.activeSequence).child[0].text) : ''}
          accordionData = {this.state.accordionData}
          fetchDataFunction = {this.fetchData}
          courseID = {this.props.courseId}
        />
      </div>
    );
  }
}

export default CourseContentView
