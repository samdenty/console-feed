interface Storage {
  name: string
  body: string
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
    let body = ''
    try {
      body = func.toString()
      body = body.substring(body.indexOf('{') + 1, body.lastIndexOf('}'))
    } catch (e) {}

    return {
      name: func.name,
      body,
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
      Object.defineProperty(tempFunc, 'body', {
        value: data.body,
        writable: false
      })
      // @ts-ignore
      tempFunc.constructor = {
        name: data.constructor
      }
      return tempFunc
    } catch (e) {
      return data
    }
  }
}
