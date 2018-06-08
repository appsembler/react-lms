import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthStatus } from 'redux/actions/Actions';

class LogoutView extends Component {

  componentDidMount = () => {
    this.props.setAuthStatus(false);
    fetch('/logout', { credentials: "same-origin" });
    this.props.history.push('/react-lms');
  }

  render() {

    return (
      <div></div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = dispatch => ({
  setAuthStatus: newStatus => dispatch(setAuthStatus(newStatus)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutView)
