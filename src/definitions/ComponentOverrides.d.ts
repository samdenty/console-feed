import { ComponentType } from 'react'
import { Message } from './Console'

export interface ComponentOverrides {
  Message?: ComponentType<{
    node?: JSX.Element
    log?: Message
    children: React.ReactNode
  }>
}
