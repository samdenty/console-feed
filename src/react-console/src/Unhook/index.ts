import { HookedConsole } from '../../definitions/Console'

/**
 * Unhook a console constructor and restore back the Native methods
 * @argument console The Console constructor to Hook
 */
export default function Hook(console: HookedConsole): boolean {
  if (console.__react_console__) {
    for (const method of Object.keys(console.__react_console__.NativeMethods)) {
      console[method] = console.__react_console__.NativeMethods[method]
    }
    return delete console.__react_console__
  } else {
    return false
  }
}
