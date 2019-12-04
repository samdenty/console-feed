# console-feed

[![npm version](https://img.shields.io/npm/v/console-feed.svg?style=flat-square)](https://www.npmjs.com/package/console-feed)
[![CircleCI](https://img.shields.io/circleci/project/github/samdenty99/console-feed.svg?style=flat-square)](https://circleci.com/gh/samdenty99/console-feed)
[![npm downloads](https://img.shields.io/npm/dm/console-feed.svg?style=flat-square)](https://www.npmjs.com/package/console-feed)
[![Demo](https://img.shields.io/badge/CodeSandbox-Demo-yellow.svg?style=flat-square)](https://codesandbox.io/s/rl7pk9w2ym)

A React component that displays console logs from the current page, an iframe or transported across a server.

![Demo](https://user-images.githubusercontent.com/13242392/38513414-1bc32870-3c26-11e8-9a8f-0989d2142b1c.png)

## Who's using it

- [CodeSandbox.io](https://codesandbox.io)
- [Framer](https://www.framer.com)
- [Plunker](https://plnkr.co)
- [P5.js Editor](https://editor.p5js.org)

## Features

- **Console formatting** - [style and give your logs color](https://stackoverflow.com/questions/22155879/how-do-i-create-formatted-javascript-console-log-messages), and makes links clickable
- **DOM nodes** - easily inspect & expand HTML elements, with syntax highlighting
- **`console.table`** - view your logs in a table format
- **Other console methods**:
  - `console.time` - view the time in milliseconds it takes to complete events
  - `console.assert` - assert that a statement is truthy
  - `console.count` - count how many times something occurs
- **Inbuilt JSON serialization** - Objects, Functions & DOM elements can be encoded / decoded to and from JSON

## Install

```sh
yarn add console-feed
# or
npm install console-feed
```

## Basic usage

[CodeSandbox](https://codesandbox.io/s/rl7pk9w2ym)

```js
import React from 'react'
import { Hook, Console, Decode } from 'console-feed'

class App extends React.Component {
  state = {
    logs: []
  }

  componentDidMount() {
    Hook(window.console, log => {
      this.setState(({ logs }) => ({ logs: [...logs, Decode(log)] }))
    })

    console.log(`Hello world!`)
  }

  render() {
    return (
      <div style={{ backgroundColor: '#242424' }}>
        <Console logs={this.state.logs} variant="dark" />
      </div>
    )
  }
}
```

## Props for `<Console />` component

### `logs: Log[]`

An array consisting of Log objects. Required

### `filter?: Methods[]`

Filter the logs, only displaying messages of certain methods.

### `variant?: 'light' | 'dark'`

Sets the font color for the component. Default - `light`

### `style?: Styles`

Defines the custom styles to use on the component - see [`Styles.d.ts`](https://github.com/samdenty99/console-feed/blob/master/src/definitions/Styles.d.ts)

### `searchKeywords?: string`

A string value to filter logs

### `logFilter?: Function`

If you want to use a custom log filter function, you can provide your own implementation

## Log methods

Each log has a method assigned to it. The method is used to determine the style of the message and for the `filter` prop.

```ts
type Methods =
  | 'log'
  | 'warn'
  | 'error'
  | 'info'
  | 'debug'
  | 'command'
  | 'result'
```

## `Log` object

A log object consists of the following:

```ts
type Logs = Log[]

interface Log {
  // The log method
  method: Methods
  // The arguments passed to console API
  data: any[]
}
```

## Serialization

By default when you use the `Hook()` API, logs are serialized so that they will safely work with `JSON.stringify`. In order to restore a log back to format compatible with the `<Console />` component, you need to call the `Decode()` method.

### Disabling serialization

If the `Hook` function and the `<Console />` component are on the same origin, you can disable serialization to increase performance.

```js
Hook(
  window.console,
  log => {
    this.setState(({ logs }) => ({ logs: [...logs, log] }))
  },
  false
)
```

---

## Developing

To run `console-feed` locally, simply run:

```bash
yarn
yarn start
yarn test:watch
```

Head over to `http://localhost:3000` in your browser, and you'll see the demo page come up. After you make changes you'll need to reload, but the jest tests will automatically restart.
