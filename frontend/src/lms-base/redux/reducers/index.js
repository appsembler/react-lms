import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './UserReducers';
import platform from './PlatformReducers';
import course from './CourseReducers';

export default combineReducers({
  platform,
  user,
  course,
  routing: routerReducer,
})
