import * as React from 'react'
import { Props, Theme } from '../definitions/Component'
// @ts-ignore
import { ThemeProvider } from 'react-jss'
import Node from './Node'

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
            return <Node log={log} key={i} />
          })}
        </div>
      </ThemeProvider>
    )
  }
}

export default Console
