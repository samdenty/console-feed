import * as React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { Props } from '../definitions/Component'
import Styles from './theme/default'

import { Root } from './elements'
import Message from './Message'

// https://stackoverflow.com/a/48254637/4089357
const customStringify = function(v) {
  const cache = new Set()
  return JSON.stringify(v, function(key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.has(value)) {
        // Circular reference found, discard key
        return
      }
      // Store value in our set
      cache.add(value)
    }
    return value
  })
}

class Console extends React.PureComponent<Props, any> {
  theme = () => ({
    variant: this.props.variant || 'light',
    styles: {
      ...Styles(this.props),
      ...this.props.styles
    }
  })

  render() {
    let { filter = [], logs = [], searchKeywords, logFilter } = this.props

    const regex = new RegExp(searchKeywords)

    const filterFun = logFilter
      ? logFilter
      : log => regex.test(customStringify(log))

    // @ts-ignore
    logs = logs.filter(filterFun)

    return (
      <ThemeProvider theme={this.theme}>
        <Root>
          {logs.map((log, i) => {
            // If the filter is defined and doesn't include the method
            const filtered =
              filter.length !== 0 &&
              log.method &&
              filter.indexOf(log.method) === -1

            return filtered ? null : <Message log={log} key={i} />
          })}
        </Root>
      </ThemeProvider>
    )
  }
}

export default Console
