import HTML from './HTML'
import Function from './Function'

const transforms = [HTML, Function]

// ReplicatorJS
import Replicator from './replicator'
import { Message } from '../definitions/Console'
const replicator = new Replicator()
replicator.addTransforms(transforms)

export function Encode<T>(data: any): T {
  return JSON.parse(replicator.encode(data))
}

export function Decode(data: any): Message {
  return replicator.decode(JSON.stringify(data))
}
