import * as React from 'react'
import { ThemeProvider } from '@emotion/react'
import { Props } from '../definitions/Component'
import Methods from '../definitions/Methods'
import Styles from './theme/default'

import { Root } from './elements'
import Message from './Message'

// https://stackoverflow.com/a/48254637/4089357
const customStringify = function (v) {
  const cache = new Set()
  return JSON.stringify(v, function (key, value) {
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
      ...this.props.styles,
    },
    method: null,
  })

  render() {
    let {
      filter = [],
      logs = [],
      searchKeywords,
      logFilter,
      logGrouping = true,
    } = this.props

    if (searchKeywords) {
      const regex = new RegExp(searchKeywords)

      const filterFun = logFilter
        ? logFilter
        : (log) => {
            try {
              return regex.test(customStringify(log))
            } catch (e) {
              return true
            }
          }

      // @ts-ignore
      logs = logs.filter(filterFun)
    }

    if (logGrouping) {
      // @ts-ignore
      logs = logs.reduce((acc, log) => {
        const prevLog = acc[acc.length - 1]

        if (
          prevLog &&
          prevLog.amount &&
          prevLog.method === log.method &&
          prevLog.data.length === log.data.length &&
          prevLog.data.every((value, i) => log.data[i] === value)
        ) {
          prevLog.amount += 1

          return acc
        }

        acc.push({ ...log, amount: 1 })

        return acc
      }, [])
    }

    return (
      <ThemeProvider theme={this.theme}>
        <Root>
          {logs.map((log, i) => {
            // If the filter is defined and doesn't include the method
            const filtered =
              filter.length !== 0 &&
              log.method &&
              filter.indexOf(log.method) === -1

            return filtered ? null : (
              <Message
                log={log}
                key={log.id || `${log.method}-${i}`}
                linkifyOptions={this.props.linkifyOptions}
              />
            )
          })}
        </Root>
      </ThemeProvider>
    )
  }
}

export default Console
