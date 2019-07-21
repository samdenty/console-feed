import Hook from '..'
import console from './console'
import Log from './Log'
import { Decode } from '../..'

it('hooks the console', () => {
  Hook(console, log => {
    console.logs.push(log)
  })
  expect(console.feed).toBeTruthy()
})

it('forwards log events', async () => {
  const result = await Log('log', 'test')
  expect(result).toBeTruthy()
})

it('decodes messages', () => {
  const decoded = Decode(console.logs[0])
  expect(decoded.method).toEqual('log')
  expect(decoded.data).toMatchSnapshot()
})

it('correctly encodes a HTMLElement', async () => {
  const result = await Log('warn', document.documentElement)
  expect(result).toBeTruthy()

  const decoded = Decode(result)
  expect(decoded.method).toEqual('warn')
  expect(decoded.data).toMatchSnapshot()
})

it('correctly encodes Functions', async () => {
  // prettier-ignore
  const result = await Log('error', function myFunc() { /* body */ })

  const decoded = Decode(result)
  expect(decoded.method).toEqual('error')
  expect(decoded.data).toMatchSnapshot()
})

it('correctly encodes nested values', async () => {
  const input = {
    function: function myFunc() {},
    document: document.documentElement,
    nested: [[[new Promise(() => {})]]],
    recursive: null
  }
  input.recursive = input

  const result = await Log('debug', input)

  const decoded = Decode(result)
  expect(decoded.method).toEqual('debug')
  expect(decoded.data).toMatchSnapshot()
})

it('disables encoding with a flag', async () => {
  Hook(
    console,
    log => {
      console.logs.push(log)
    },
    false
  )
  const input = {
    function: function myFunc() {},
    document: document.documentElement,
    nested: [[[new Promise(() => {})]]],
    recursive: null
  }
  input.recursive = input

  const result: any = await Log('debug', input)

  expect(result.data).toMatchSnapshot()
})
