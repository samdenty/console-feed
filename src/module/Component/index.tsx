import * as React from 'react'
import { Props, Theme } from '../definitions/Component'
// @ts-ignore
import { ThemeProvider } from 'react-jss'
import Node from './Node'
import { Decode } from '../Transforms'

class Console extends React.PureComponent<Props, any> {
  render() {
    const logs = this.props.logs || []
    const theme: Theme = {
      variant: this.props.variant || 'light'
    }

    return (
      <ThemeProvider theme={theme}>
        <div>
          {logs.map((log, i) => {
            // Resolve descended types etc.
            if (!log.resolved) {
              log = Decode(log)
              log.resolved = true
            }
            return <Node log={log} key={log.id} />
          })}
        </div>
      </ThemeProvider>
    )
  }
}

export default Console
