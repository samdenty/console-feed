import { Methods } from './Methods'

export interface Storage {
  NativeMethods: {
    [name: string]: Function
  }
}

export interface HookedConsole extends Console {
  __react_console__: Storage
  _log: Function
}

export type Methods = Methods

export interface Message {
  method: Methods
  data?: any[]
}

export type Callback = (message: Message, console: HookedConsole) => void
