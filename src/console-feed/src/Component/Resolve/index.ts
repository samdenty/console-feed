import * as CircularJSON from 'circular-json'
import { Message } from '../../../definitions/Component'
import { UntypedProto } from './UntypedProto'

export function Resolve(log: Message): Message {
  // Resolve references
  log.data = UntypedProto(log.data)

  return {
    ...log,
    resolved: true
  }
}
