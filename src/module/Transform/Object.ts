interface Storage {
  constructor: string
}

/**
 * Serialize an Object into JSON
 */
export default {
  type: 'Object',
  shouldTransform(type: any, obj: any) {
    return typeof obj === 'object' && obj !== null
  },
  toSerializable(obj: { [key: string]: any }) {
    const prototype = Object.getPrototypeOf(obj)
    if (prototype && prototype.constructor && prototype.constructor.name) {
      return {
        constructor: prototype,
        data: obj
      } as Storage
    }
    return obj
  },
  fromSerializable(obj: Storage) {
    Object.defineProperty(obj, 'constructor', {
      value: {
        name: obj.constructor,
        __overridden__: true
      },
      writable: false
    })
    return obj
  }
}
