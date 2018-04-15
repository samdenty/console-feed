import { HookedConsole } from '../../definitions/Console'

interface Console extends HookedConsole {
  logs: any[]
  $log: Function
}

declare const console: Console
console.logs = []
;['log', 'warn', 'info', 'error', 'debug', 'assert', 'time', 'timeEnd'].forEach(
  (method) => {
    console[`$${method}`] = console[method]
    console[method] = () => {}
  }
)

export default console
