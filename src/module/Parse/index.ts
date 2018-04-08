import { Methods } from '../definitions/Console'
import { Payload } from '../definitions/Payload'
import { TypedProto } from './TypedProto'
import GUID from './GuidGenerator'
import Decycle from '../Cycler/Decycle'

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
      const errors = data.map(
        (error) => (error instanceof Error ? 'Error: ' + error.message : error)
      )

      return {
        method,
        id,
        data: errors
      }
    }

    default: {
      for (let i in data) {
        try {
          data[i] = Decycle(data[i])
        } catch (e) {
          data[i] = [`Unable to display message, open DevTools to read it's contents 🙁`]
        }
      }
      return {
        method,
        id,
        data: TypedProto(data)
      }
    }
  }
}
