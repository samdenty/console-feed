import { withTheme } from 'emotion-theming'
import * as React from 'react'
import {
  DOMInspector,
  Inspector,
  ObjectLabel,
  ObjectName,
  ObjectRootLabel,
  ObjectValue
} from 'react-inspector'
import ObjectPreview from 'react-inspector/lib/object-inspector/ObjectPreview'

import { Context } from '../../definitions/Component'
import { Constructor, HTML, Root, Table } from './elements'

interface Props {
  theme?: Context
  data: any
}

const CustomObjectLabel = ({ name, data, isNonenumerable = false }) => (
  <span>
    {typeof name === 'string' ? (
      <ObjectName name={name} dimmed={isNonenumerable} />
    ) : (
      <ObjectPreview data={name} />
    )}
    <span>: </span>
    <ObjectValue object={data} />
  </span>
)

class CustomInspector extends React.PureComponent<Props, any> {
  render() {
    const { data, theme } = this.props
    const { styles, method } = theme

    const dom = data instanceof HTMLElement
    const table = method === 'table'

    return (
      <Root data-type={table ? 'table' : dom ? 'html' : 'object'}>
        {table ? (
          <Table>
            <Inspector {...this.props} theme={styles} table />
            <Inspector {...this.props} theme={styles} />
          </Table>
        ) : dom ? (
          <HTML>
            <DOMInspector {...this.props} theme={styles} />
          </HTML>
        ) : (
          <Inspector
            {...this.props}
            theme={styles}
            nodeRenderer={this.nodeRenderer.bind(this)}
          />
        )}
      </Root>
    )
  }

  getCustomNode(data: any) {
    const { styles } = this.props.theme
    const constructor = data && data.constructor ? data.constructor.name : null

    if (constructor === 'Function')
      return (
        <span style={{ fontStyle: 'italic' }}>
          <ObjectPreview data={data} />
          {` {`}
          <span style={{ color: 'rgb(181, 181, 181)' }}>{data.body}</span>
          {`}`}
        </span>
      )

    if (constructor === 'Promise')
      return (
        <span style={{ fontStyle: 'italic' }}>
          Promise {`{`}
          <span style={{ opacity: 0.6 }}>{`<pending>`}</span>
          {`}`}
        </span>
      )

    if (data instanceof HTMLElement)
      return (
        <HTML>
          <DOMInspector data={data} theme={styles} />
        </HTML>
      )
    return null
  }

  nodeRenderer(props: any) {
    let { depth, name, data, isNonenumerable } = props

    // Root
    if (depth === 0) {
      const customNode = this.getCustomNode(data)
      return customNode || <ObjectRootLabel name={name} data={data} />
    }

    if (name === 'constructor')
      return (
        <Constructor>
          <ObjectLabel
            name="<constructor>"
            data={data.name}
            isNonenumerable={isNonenumerable}
          />
        </Constructor>
      )

    const customNode = this.getCustomNode(data)

    return customNode ? (
      <Root>
        <ObjectName name={name} />
        <span>: </span>
        {customNode}
      </Root>
    ) : (
      <CustomObjectLabel
        name={name}
        data={data}
        isNonenumerable={isNonenumerable}
      />
    )
  }
}

export default withTheme(CustomInspector)
