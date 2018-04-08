import Is from './Is'

export function UntypedProto(data: any[]) {
  return TArray(data, data)
}

/**
 * Type check may be referencing objects from outside of the
 * current page. As a result, checks such as 'instanceOf' won't work
 * @param data
 */
function TypeCheck(root: any[], data: any) {
  // Undefined
  if (Is('Undefined', data)) return undefined
  // Array
  if (Is('Array', data)) return TArray(root, data)
  // Function
  if (Is('Function', data)) return TFunction(root, data)
  // HTMLElement
  if (Is('HTMLElement', data)) return THTML(root, data)
  // Object
  if (Is('Object', data)) return TObject(root, data)
  // String
  if (Is('String', data)) return TString(root, data)
  return data
}

// Resolve a string (with circular references)
function TString(root: any, data: string) {
  if (data.substring(0, 3) === '~△~') {
    try {
      let route = JSON.parse(data.slice(3))
      let destination = root
      for (let path of route) {
        destination = destination[path]
      }
      return destination
    } catch (e) {
      return data
    }
  }
  return data
}

// Iterate through an array and recursively resolve it's childrens
function TArray(root: any[], data: any[]) {
  for (let i in data) {
    data[i] = TypeCheck(root, data[i])
  }
  return data
}

// Resolve a function call to a named function
function TFunction(root: any[], data: any) {
  try {
    const tempFunc = function() {}
    Object.defineProperty(tempFunc, 'name', {
      value: data.__fn__,
      writable: false
    })
    return tempFunc
  } catch (e) {
    return data
  }
}

// Resolve HTML objects to a DOM element
function THTML(root: any[], data: any) {
  try {
    const element = document.createElement(data.__tagName__) as HTMLElement
    element.innerHTML = data.__innerHTML__
    for (let attribute of Object.keys(data.__attributes__)) {
      try {
        element.setAttribute(attribute, data.__attributes__[attribute])
      } catch (e) {}
    }
    return element
  } catch (e) {
    return data
  }
}

// Resolve an Object
function TObject(root: any[], data: any) {
  Object.defineProperty(data, 'constructor', {
    value: {
      name: data.__protoname__,
      __overridden__: true
    },
    writable: false
  })

  for (let key of Object.keys(data)) {
    if (key !== '__protoname__') {
      data[key] = TypeCheck(root, data[key])
    }
  }

  return data
}
