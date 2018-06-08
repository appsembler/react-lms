import * as types from './ActionTypes';

export const setActiveUsername = fetchData => ({
  type: types.SET_ACTIVE_USERNAME,
  username: fetchData['username']
})

export const setAuthStatus = newStatus => ({
  type: types.SET_AUTH_STATUS,
  newStatus: newStatus
})

export function fetchAuthStatus() {
  return dispatch => {
    return fetch('/api/user/v1/me', { credentials: "same-origin" })
      .then(response => response.json())
      .then(json => dispatch(setActiveUsername(json)))
  }
}

export const setUserData = userData => ({
  type: types.SET_USER_DATA,
  userData: userData
})

export function fetchUserData(apiURL) {
  return dispatch => {
    console.log(apiURL)
    return fetch(apiURL, { credentials: "same-origin" })
      .then(response => response.json())
      .then(json => dispatch(setUserData(json)));
  }
}
