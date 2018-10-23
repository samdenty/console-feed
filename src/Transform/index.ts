import { Message } from '../definitions/Console'
import Arithmetic from './arithmetic'
import Function from './Function'
import HTML from './HTML'
import Map from './Map'

import Replicator from './replicator'

const transforms = [HTML, Function, Arithmetic, Map]

const replicator = new Replicator()
replicator.addTransforms(transforms)

export function Encode<T>(data: any): T {
  return JSON.parse(replicator.encode(data))
}

export function Decode(data: any): Message {
  return replicator.decode(JSON.stringify(data))
}
