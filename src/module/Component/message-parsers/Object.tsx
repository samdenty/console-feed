import * as React from 'react'
import { Message } from '../../definitions/Component'
import Inspector from '../react-inspector'

interface Props {
  log: Message
}

class ObjectTree extends React.PureComponent<Props, any> {
  render() {
    const { log } = this.props

    return log.data.map((message: any, i: number) => (
      <Inspector data={message} key={i} method={log.method} />
    ))
  }
}

export default ObjectTree
