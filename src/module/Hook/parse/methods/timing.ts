import { state } from '../../store/state'
import dispatch from '../../store/dispatch'
import { timeStart, timeEnd } from '../../store/actions'

export function start(name: string) {
  dispatch(timeStart(name))
}

export function stop(name: string): any {
  const timing = state.timings[name]
  if (timing && !timing.end) {
    dispatch(timeEnd(name))
    const { time } = state.timings[name]

    return {
      method: 'log',
      data: [`${name}: ${time}ms`]
    }
  }
  return {
    method: 'warn',
    data: [`Timer '${name}' does not exist`]
  }
}
