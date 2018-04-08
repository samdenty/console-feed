import * as React from 'react'
// @ts-ignore
import withStyles from 'react-jss'
import { Styles } from 'jss'
import {
  ObjectRootLabel,
  ObjectLabel,
  ObjectName,
  Inspector,
  DOMInspector,
  chromeDark,
  chromeLight
  // @ts-ignore
} from 'react-inspector'
import { Theme, Variants } from '../../definitions/Component'
import * as classNames from 'classnames'

interface Props {
  theme: Theme
  data: any
  classes: any
}

const styles = (theme: Theme) =>
  ({
    root: {
      paddingRight: 10,
      '& li': {
        backgroundColor: 'transparent !important'
      }
    },
    dom: {
      '& div:hover': {
        backgroundColor: 'rgba(255, 220, 158, .05) !important',
        borderRadius: '2px'
      }
    },
    inlineHTML: {
      '& > li': {
        display: 'inline-block'
      }
    },
    proto: {
      '& > span > span:nth-child(1)': {
        opacity: 0.6
      }
    },
    promise: {
      fontStyle: 'italic',
      '& span': {
        opacity: 0.6
      }
    }
  } as Styles)

class CustomInspector extends React.PureComponent<Props, any> {
  state = {
    theme: null
  }

  render() {
    const dom = this.props.data instanceof HTMLElement
    const { classes } = this.props

    return (
      <span
        className={classNames({
          [classes.root]: true,
          [classes.dom]: dom
        })}>
        {dom ? (
          <DOMInspector {...this.props} theme={this.state.theme} />
        ) : (
          <Inspector
            {...this.props}
            nodeRenderer={this.nodeRenderer.bind(this)}
            theme={this.state.theme}
          />
        )}
      </span>
    )
  }

  componentWillMount() {
    this.setTheme(this.props.theme.variant)
  }

  setTheme = (variant: Variants) => {
    const theme = variant === 'dark' ? chromeDark : chromeLight
    this.setState({
      theme: { ...theme, ...{ ARROW_FONT_SIZE: 9 } }
    })
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.theme.variant !== this.props.theme.variant) {
      this.setTheme(nextProps.theme.variant)
    }
  }

  nodeRenderer(props: any) {
    const { classes } = this.props
    let proto = false
    let { depth, name, data, isNonenumerable } = props

    // Root
    if (depth === 0) {
      if (data instanceof Object && !(data instanceof Array)) {
        const constructor = data.constructor.name
        data = Object.assign({}, data)
        delete data.__protoname__
        // Override constructor
        if (data.constructor.name !== constructor) {
          Object.defineProperty(data, 'constructor', {
            value: {
              name: constructor,
              __overridden__: true
            },
            writable: false
          })
        }
      }
      return data.constructor.name === 'Promise' ? (
        <span className={classes.promise}>
          Promise {`{`}
          <span>{`<pending>`}</span>
          {`}`}
        </span>
      ) : (
        <ObjectRootLabel name={name} data={data} />
      )
    }

    // Subobject
    if (name === '__protoname__') {
      name = '__proto__'
      proto = true
    }
    return data instanceof HTMLElement ? (
      <span className={classNames(classes.inlineHTML, classes.dom)}>
        <ObjectName name={name} />
        <span>: </span>
        <DOMInspector data={data} theme={this.state.theme} />
      </span>
    ) : (
      <span className={proto ? classes.proto : ''}>
        <ObjectLabel
          name={name}
          data={data}
          isNonenumerable={isNonenumerable}
        />
      </span>
    )
  }
}

export default withStyles(styles)(CustomInspector)
