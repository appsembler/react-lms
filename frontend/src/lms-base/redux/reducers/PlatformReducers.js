import Immutable from 'immutable';

const initialState = Immutable.Map({
  platformName: 'This is a test'
})

const platform = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default platform
