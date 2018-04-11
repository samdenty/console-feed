import {
  HookedConsole,
  Callback,
  Storage,
  Methods as ConsoleMethods,
  Message
} from '../definitions/Console'
import Methods from '../definitions/Methods'
import Parse from './parse'
import Unhook from '../Unhook'
import { Encode } from '../Transform'

/**
 * Hook a console constructor and forward messages to a callback
 * @argument console The Console constructor to Hook
 * @argument callback The callback to be called once a message is logged
 */
export default function Hook(console: Console, callback: Callback) {
  let TargetConsole = console as HookedConsole
  const Storage = {
    pointers: {}
  } as Storage

  // Override console methods
  for (let method of Methods) {
    const NativeMethod = TargetConsole[method]

    // Override
    TargetConsole[method] = function() {
      // Pass back to native method
      NativeMethod.apply(this, arguments)

      // Parse arguments and send to transport
      const args = [].slice.call(arguments)

      // setTimeout to prevent lag
      setTimeout(() => {
        const parsed = Parse(method as ConsoleMethods, args)
        if (parsed) {
          const encoded = Encode(parsed) as Message
          callback(encoded, parsed)
        }
      })
    }

    // Store native methods
    Storage.pointers[method] = NativeMethod
  }

  TargetConsole.feed = Storage

  return TargetConsole
}
