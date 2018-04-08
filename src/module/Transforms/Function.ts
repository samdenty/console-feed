interface Storage {
  name: string
  contents: string
  constructor: string
}

/**
 * Serialize a HTML element into JSON
 */
export default {
  type: 'Function',
  shouldTransform(type: any, obj: any) {
    return typeof obj === 'function'
  },
  toSerializable(func: Function) {
    return {
      name: func.name,
      contents: func.toString(),
      constructor: Object.getPrototypeOf(func).constructor.name
    } as Storage
  },
  fromSerializable(data: Storage) {
    try {
      const tempFunc = function() {}
      Object.defineProperty(tempFunc, 'name', {
        value: data.name,
        writable: false
      })
      return tempFunc
    } catch (e) {
      return data
    }
  }
}
