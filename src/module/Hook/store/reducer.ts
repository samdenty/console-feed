import { Action } from '../../definitions/Store'

export const initialState = {
  timings: {}
}

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case 'TIME_START': {
      return {
        ...state,
        timings: {
          ...state.timings,
          [action.name]: {
            start: performance.now() || +new Date()
          }
        }
      }
    }

    case 'TIME_END': {
      const timing = state.timings[action.name]

      const end = performance.now() || +new Date()
      const { start } = timing

      const time = end - start

      return {
        ...state,
        timings: {
          ...state.timings,
          [action.name]: {
            ...timing,
            end,
            time
          }
        }
      }
    }

    default: {
      return state
    }
  }
}
