import Immutable from 'immutable';

const initialState = Immutable.Map({
  courseCode: 'ETHX-FC-02X-1',
  courseName: 'Quality of Life: Livability in Future Cities'
})

const course = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default course
