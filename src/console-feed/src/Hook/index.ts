import {
  HookedConsole,
  Callback,
  Storage,
  Methods as ConsoleMethods
} from '../../definitions/Console'
import Methods from './Methods'
import Parse from '../Parse'
import Unhook from '../Unhook'

/**
 * Hook a console constructor and forward messages to a callback
 * @argument console The Console constructor to Hook
 * @argument callback The callback to be called once a message is logged
 */
export default function Hook(console: Console, callback: Callback) {
  let TargetConsole = console as HookedConsole
  const Storage: Storage = {
    NativeMethods: {}
  }

  // Unhook any previous listeners
  Unhook(TargetConsole)

  // Add a debug log function
  TargetConsole._log = TargetConsole.log

  // Override console methods
  for (let method of Methods) {
    const NativeMethod = TargetConsole[method]

    // Override
    TargetConsole[method] = function() {
      const parsed = Parse(method as ConsoleMethods, [].slice.call(arguments))
      if (parsed) callback(parsed, TargetConsole)
      // Pass back to native method
      NativeMethod.apply(this, arguments)
    }

    // Store native methods
    Storage.NativeMethods[method] = NativeMethod
  }

  TargetConsole.__react_console__ = Storage

  return TargetConsole
}
