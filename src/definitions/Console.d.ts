import { Methods } from './Methods'

export interface Storage {
  pointers: {
    [name: string]: Function
  }
}

export interface HookedConsole extends Console {
  feed: Storage
}

export type Methods = Methods

export interface Message {
  method: Methods
  data?: any[]
}

export type Callback = (encoded: any, message: Message) => void
