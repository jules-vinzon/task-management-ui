import actions from './actions'

const initialState = {
  sampleState: null,
}

export default function sampleReducer(state = initialState, action) {
  switch (action.type) {

    case actions.SAMPLE_ACTION:
      return {
        ...state,
        initialState,
      };
    default:
      return state
  }
}
