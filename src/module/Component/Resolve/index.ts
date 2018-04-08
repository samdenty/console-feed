import { Message } from '../../definitions/Component'
import { Decode } from '../../Transforms'

export function Resolve(log: Message): Message {
  // Resolve references
  log.data = Decode(log.data)

  return {
    ...log,
    resolved: true
  }
}
