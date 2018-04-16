import * as React from 'react'
import { MessageProps } from '../definitions/Component'
import { ThemeProvider } from 'emotion-theming'

import { Message, Icon, Content } from './elements'

import Formatted from './message-parsers/Formatted'
import ObjectTree from './message-parsers/Object'
import ErrorPanel from './message-parsers/Error'

class ConsoleMessage extends React.PureComponent<MessageProps, any> {
  theme = (theme) => ({
    ...theme,
    method: this.props.log.method
  })

  render() {
    const { log } = this.props
    return (
      <ThemeProvider theme={this.theme}>
        <Message data-method={log.method}>
          <Icon />
          <Content>{this.getNode()}</Content>
        </Message>
      </ThemeProvider>
    )
  }

  getNode() {
    const { log } = this.props

    // Error handling
    const error = this.typeCheck(log)
    if (error) return error

    // Chrome formatting
    if (
      log.data.length > 0 &&
      typeof log.data[0] === 'string' &&
      log.data[0].indexOf('%') > -1
    ) {
      return <Formatted data={log.data} />
    }

    // Error panel
    if (
      log.data.every((message) => typeof message === 'string') &&
      log.method === 'error'
    ) {
      return <ErrorPanel log={log} />
    }

    // Normal inspector
    const quoted = typeof log.data[0] !== 'string'
    return <ObjectTree log={log} quoted={quoted} />
  }

  typeCheck(log: any) {
    if (!log) {
      return (
        <Formatted
          data={[
            `%c[console-feed] %cFailed to parse message! %clog was typeof ${typeof log}, but it should've been a log object`,
            'color: red',
            'color: orange',
            'color: cyan'
          ]}
        />
      )
    } else if (!(log.data instanceof Array)) {
      return (
        <Formatted
          data={[
            '%c[console-feed] %cFailed to parse message! %clog.data was not an array!',
            'color: red',
            'color: orange',
            'color: cyan'
          ]}
        />
      )
    }
    return false
  }
}

export default ConsoleMessage
