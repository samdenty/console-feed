export function timeStart(name: string) {
  return {
    type: 'TIME_START',
    name
  }
}

export function timeEnd(name: string) {
  return {
    type: 'TIME_END',
    name
  }
}
