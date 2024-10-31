import { ComponentType } from 'react'
import { Message } from './Component'

export interface ComponentOverrides {
  Message?: ComponentType<{
    node?: JSX.Element
    log?: Message
    children: React.ReactNode
  }>
}
