import { Methods } from './Methods'
import { Payload } from './Payload'

export interface Storage {
  pointers: {
    [name: string]: Function
  }
  src: any
}

export interface HookedConsole extends Console {
  feed: Storage
}

export type Methods = Methods

export interface Message {
  method: Methods
  data?: any[]
}

export type Callback = (encoded: Message, message: Payload) => void
