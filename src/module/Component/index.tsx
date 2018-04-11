import * as React from 'react'
import { Props, Theme } from '../definitions/Component'
// @ts-ignore
import { ThemeProvider } from 'react-jss'
import Node from './Node'

class Console extends React.PureComponent<Props, any> {
  render() {
    const filter = this.props.filter || []
    const logs = this.props.logs || []
    const theme: Theme = {
      variant: this.props.variant || 'light',
      styles: this.props.styles || { ARROW_FONT_SIZE: 9 }
    }

    return (
      <ThemeProvider theme={theme}>
        <div>
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
        </div>
      </ThemeProvider>
    )
  }
}

export default Console
