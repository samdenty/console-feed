import { Payload } from './Payload'

export type Variants = 'light' | 'dark'

export interface Theme {
  variant: Variants
}

interface Message extends Payload {
  data: any[]
}

export interface Props {
  logs: Message[]
  variant?: Variants
}

export interface NodeProps {
  log: Message
}
