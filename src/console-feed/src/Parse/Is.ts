type Types = 'Array' | 'Object' | 'HTMLElement' | 'Function' | 'ValueType' | 'Undefined'

export default function Is(type: Types, obj: any): boolean | null {
  switch (type) {
    case 'Undefined': {
      return typeof obj === 'undefined'
    }
    case 'ValueType': {
      return /^string|boolean|number$/.test(typeof obj) || obj === null
    }
    case 'Array': {
      return Array.isArray(obj)
    }
    case 'Object': {
      return typeof obj === 'object' && obj !== null
    }
    case 'Function': {
      return typeof obj === 'function'
    }
    case 'HTMLElement': {
      return (
        obj &&
        obj.children &&
        typeof obj.innerHTML === 'string' &&
        typeof obj.tagName === 'string'
      )
    }
    default: {
      return null
    }
  }
}
