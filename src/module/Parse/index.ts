import { Methods } from '../definitions/Console'
import { Payload } from '../definitions/Payload'
import { TypedProto } from './TypedProto'
import GUID from './GuidGenerator'
import Decycle from '../Cycler/Decycle'
import { stringify } from 'circular-json'

/**
 * Parses a console log and converts it to a special Log object
 * @argument method The console method to parse
 * @argument data The arguments passed to the console method
 */
export default function Parse(method: Methods, data: any[]): Payload | false {
  // If the method params were empty, return false
  if (data.length === 0) return false

  const id = GUID()
  // Parse the methods
  switch (method) {
    case 'clear': {
      return {
        method,
        id
      }
    }

    case 'error': {
      const errors = data.map((error) => {
        try {
          return error.stack || error
        } catch (e) {
          return error
        }
      })

      return {
        method,
        id,
        data: errors
      }
    }

    default: {
      try {
        // Attempt to Decycle data whilst retaining constructors
        data = Decycle(data)
      } catch (e) {
        // Fallback decycle (constructors are lost)
        data = JSON.parse(stringify(data))
      }
      return {
        method,
        id,
        data: TypedProto(data)
      }
    }
  }
}
