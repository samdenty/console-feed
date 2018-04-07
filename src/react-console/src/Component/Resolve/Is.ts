type Types = 'Array' | 'HTMLElement' | 'Function' | 'ValueType' | 'Undefined'

export default function Is(type: Types, obj: any): boolean | null {
  const proto = obj ? obj.__protoname__ : ''

  switch (type) {
    case 'Undefined': {
      return proto === 'undefined'
    }
    case 'ValueType': {
      return /^string|boolean|number$/.test(typeof obj) || obj === null
    }
    case 'Array': {
      return Array.isArray(obj)
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
