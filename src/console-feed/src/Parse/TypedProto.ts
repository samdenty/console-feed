import Is from './Is'

export function TypedProto(data: any[]) {
  return TArray(data)
}

/**
 * Type check may be referencing objects from outside of the
 * current page. As a result, checks such as 'instanceOf' won't work
 * @param data
 */
function TypeCheck(data: any) {
  // Undefined
  if (Is('Undefined', data)) return TUndefined(data)
  // Array
  if (Is('Array', data)) return TArray(data)
  // Types
  if (Is('ValueType', data)) return data
  // Function
  if (Is('Function', data)) return TFunction(data)
  // HTMLElement
  if (Is('HTMLElement', data)) return THTML(data)
  // Object
  console.log(data, Is('Object', data))
  if (Is('Object', data)) return TObject(data)


  return data
}

function TArray(data: any[]) {
  for (let i in data) {
    data[i] = TypeCheck(data[i])
  }
  return data
}

function TObject(data: any) {
  const prototype = Object.getPrototypeOf(data)
  if (prototype && prototype.constructor && prototype.constructor.name) {
    data = {
      ...data,
      __protoname__: prototype.constructor.name
    }
  }
  for (let key of Object.keys(data)) {
    if (key !== '__protoname__') {
      data[key] = TypeCheck(data[key])
    }
  }
  return data
}

function TFunction(data: Function) {
  return {
    __fn__: data.name,
    __fnContents: data.toString(),
    __protoname__: Object.getPrototypeOf(data).constructor.name
  }
}

function TUndefined(data: undefined) {
  return {
    __protoname__: 'undefined'
  }
}

function objectifyAttributes(element: any) {
  const data = {}
  for (let attribute of element.attributes) {
    data[attribute.name] = attribute.value
  }
  return data
}

function THTML(data: HTMLElement) {
  return {
    __protoname__: 'HTMLElement',
    __tagName__: data.tagName.toLowerCase(),
    __attributes__: objectifyAttributes(data),
    __innerHTML__: data.innerHTML
  }
}
