import * as React from 'react'
import { Props, Theme } from '../definitions/Component'
import defaultStyles from './DefaultStyles'

import { ThemeProvider } from 'react-jss'
import Node from './Node'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'console-feed': any
    }
  }
}

class Console extends React.PureComponent<Props, any> {
  render() {
    const filter = this.props.filter || []
    const logs = this.props.logs || []
    const theme: Theme = {
      variant: this.props.variant || 'light',
      styles: {
        ...defaultStyles,
        ...this.props.styles
      }
    }

    return (
      <ThemeProvider theme={theme}>
        <console-feed style={{ wordBreak: 'break-word' }}>
          {logs.map((log, i) => {
            // If the filter is defined and doesn't include the method
            if (
              filter.length !== 0 &&
              log.method &&
              filter.indexOf(log.method) === -1
            ) {
              return null
            }

            // Return the Node
            return <Node log={log} key={i} />
          })}
        </console-feed>
      </ThemeProvider>
    )
  }
}

export default Console
