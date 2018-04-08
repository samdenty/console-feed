type Types = 'Array' | 'String' | 'HTMLElement' | 'Function' | 'Undefined' | 'Object'

export default function Is(type: Types, obj: any): boolean | null {
  const proto = obj ? obj.__protoname__ : null

  switch (type) {
    case 'Undefined': {
      return proto === 'undefined'
    }
    case 'String': {
      return typeof obj === 'string'
    }
    case 'Array': {
      return Array.isArray(obj)
    }
    case 'Object': {
      return obj instanceof Object && proto !== null
    }
    case 'Function': {
      return proto === 'Function'
    }
    case 'HTMLElement': {
      return proto === 'HTMLElement'
    }
    default: {
      return null
    }
  }
}
