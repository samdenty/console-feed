import { Methods } from './Methods'

export interface Storage {
  _backup: {
    [name: string]: Function
  }
}

export interface HookedConsole extends Console {
  feed: Storage
  _log: Function
}

export type Methods = Methods

export interface Message {
  method: Methods
  data?: any[]
}

export type Callback = (encoded: any, message: Message) => void
