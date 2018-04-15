import * as React from 'react'
import { Theme } from '../../definitions/Component'
// @ts-ignore
import { withTheme } from 'react-jss'

// @ts-ignore
import * as Linkify from 'linkifyjs/react'
import { Message } from '../../definitions/Component'
import Inspector from '../react-inspector'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'message-section': any
    }
  }
}

interface Props {
  log: Message
  quoted: boolean
  theme: Theme
}

class ObjectTree extends React.PureComponent<Props, any> {
  render() {
    const { theme, quoted, log } = this.props

    return log.data.map((message: any, i: number) => {
      if (typeof message === 'string') {
        const string =
          !quoted && message.length ? (
            `${message} `
          ) : (
            <span>
              <span>"</span>
              <span
                style={{
                  color: theme.styles.OBJECT_VALUE_STRING_COLOR
                }}>
                {message}
              </span>
              <span>" </span>
            </span>
          )

        return (
          <message-section data-type="string" key={i}>
            <Linkify>{string}</Linkify>
          </message-section>
        )
      }

      return <Inspector data={message} key={i} method={log.method} />
    })
  }
}

export default withTheme(ObjectTree)
