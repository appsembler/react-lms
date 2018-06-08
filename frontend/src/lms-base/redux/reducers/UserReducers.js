import { SET_USER_DATA, SET_ACTIVE_USERNAME, SET_AUTH_STATUS } from '../actions/ActionTypes';

const initialState = {
  isAuthenticated: true,
  biography: '',
  country: 'US',
  date_joined: '',
  email: 'joanne.west91@example.com',
  gender: '',
  goals: '',
  is_active: '',
  language: '',
  language_proficiencies: '',
  level_of_education: '',
  mailing_address: '',
  name: 'Joanne West',
  profile_image: {
    "image_url_full": "https://randomuser.me/api/portraits/women/24.jpg",
    "image_url_large": "https://randomuser.me/api/portraits/women/24.jpg",
    "image_url_medium": "https://randomuser.me/api/portraits/women/24.jpg",
    "image_url_small": "https://randomuser.me/api/portraits/women/24.jpg",
    "has_image": true
  },
  requires_parental_consent: '',
  social_links: '',
  username: 'jwest',
  year_of_birth: '1974',
  account_privacy: '',
  accomplishments_shared: '',
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_USERNAME:
      if (action.username) {
        return Object.assign({}, state, {
          isAuthenticated: true,
          username: action.username
        })
      } else {
        return Object.assign({}, state, {
          isAuthenticated: false
        })
      }
    case SET_USER_DATA:
      return Object.assign({}, state, {
        isAuthenticated: true,
        ...
        action.userData
      })
    case SET_AUTH_STATUS:
      return Object.assign({}, state, {
        isAuthenticated: action.newStatus
      })
    default:
      return state
  }
}

export default user
