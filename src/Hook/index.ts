import {
  HookedConsole,
  Callback,
  Storage,
  Methods as ConsoleMethods,
  Message,
} from '../definitions/Console'
import Methods from '../definitions/Methods'

import Parse from './parse'
import Unhook from '../Unhook'
import { Encode } from '../Transform'
// import Construct from './construct'

export interface HookOptions {
  encode?: boolean
  async?: boolean
}

const optionsDefault: HookOptions = { encode: true, async: true }

function runImmediately(f: () => void): void {
  f()
}

/**
 * Hook a console constructor and forward messages to a callback
 * @argument console The Console constructor to Hook
 * @argument callback The callback to be called once a message is logged
 */
export default function Hook(
  console: Console,
  callback: Callback,
  optionsIn: boolean | HookOptions = true
) {
  const options: HookOptions = (() => {
    // Support old call style, where third argument is just `encode`
    if (typeof optionsIn === 'boolean') {
      optionsIn = { encode: optionsIn }
    }
    // Set defaults
    optionsIn = Object.assign({}, optionsDefault, optionsIn)
    return optionsIn
  })()

  const TargetConsole = console as HookedConsole
  const Storage: Storage = {
    pointers: {},
    src: {
      npm: 'https://npmjs.com/package/console-feed',
      github: 'https://github.com/samdenty99/console-feed',
    },
  }

  // Override console methods
  for (let method of Methods) {
    const NativeMethod = TargetConsole[method]

    // Override
    TargetConsole[method] = function () {
      // Pass back to native method
      NativeMethod.apply(this, arguments)

      // Parse arguments and send to transport
      const args = [].slice.call(arguments)

      // setTimeout to prevent lag, unless disabled
      const maybeSetTimeout = options.async ? setTimeout : runImmediately
      maybeSetTimeout(() => {
        const parsed = Parse(method as ConsoleMethods, args)
        if (parsed) {
          let encoded: Message = parsed as Message
          if (options.encode) {
            encoded = Encode(parsed) as Message
          }
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
