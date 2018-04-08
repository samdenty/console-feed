import HTML from './HTML'
import Function from './Function'
import Object from './Object'

const transforms = [HTML, Function]

// ReplicatorJS
const Replicator = require('replicator')
const replicator = new Replicator()
replicator.addTransforms(transforms)

export function Encode<T>(data: any): T {
  return JSON.parse(replicator.encode(data))
}

export function Decode<T>(data: any): T {
  console.log('decoding')
  return replicator.decode(JSON.stringify(data))
}
