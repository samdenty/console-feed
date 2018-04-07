import * as React from 'react'
import { NodeProps } from '../../definitions/Component'
import Inspector from './react-inspector'

import formatMessage from './devtools-parser'
import { Resolve } from './Resolve'

class Node extends React.PureComponent<NodeProps, any> {
  render() {
    let { log } = this.props

    // Resolve descended types etc.
    if (!log.resolved) {
      log = Resolve(log)
    }

    if (
      log.data.length > 0 &&
      typeof log.data[0] === 'string' &&
      log.data[0].indexOf('%') > -1
    ) {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: formatMessage(log.data || [])
          }}
        />
      )
    }

    return log.data.map((message: any, i: number) => (
      <Inspector data={message} key={i} />
    ))
  }
}

export default Node
