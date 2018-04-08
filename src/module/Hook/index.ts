import {
  HookedConsole,
  Callback,
  Storage,
  Methods as ConsoleMethods,
  Message
} from '../definitions/Console'
import Methods from '../definitions/Methods'
import Parse from '../Parse'
import Unhook from '../Unhook'
import { Encode } from '../Transform'

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
      // Pass back to native method
      NativeMethod.apply(this, arguments)

      // Parse arguments and send to transport
      const args = [].slice.call(arguments)
      setTimeout(() => {
        const parsed = Encode(Parse(method as ConsoleMethods, args)) as Message
        if (parsed) callback(parsed, TargetConsole)
      })
    }

    // Store native methods
    Storage.NativeMethods[method] = NativeMethod
  }

  TargetConsole.__react_console__ = Storage

  return TargetConsole
}
