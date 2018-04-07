import * as CircularJSON from 'circular-json'
import { Message } from '../../../definitions/Component'
import { UntypedProto } from './UntypedProto'

export function Resolve(log: Message): Message {
  // Resolve cirular references
  log.data = CircularJSON.parse(JSON.stringify(log.data))

  // Resolve typed __protonames__
  log.data = UntypedProto(log.data)

  return {
    ...log,
    resolved: true
  }
}
