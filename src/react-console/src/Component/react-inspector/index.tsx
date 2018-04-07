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
import { Theme, Variants } from '../../../definitions/Component'

interface Props {
  theme: Theme
  data: any
  classes: any
}

const styles = (theme: Theme) =>
  ({
    root: {
      '& li': {
        backgroundColor: 'transparent !important',
        '& div:hover': {
          backgroundColor: 'rgba(255, 220, 158, .1) !important'
        }
      }
    },
    inlineHTML: {
      '& > li': {
        display: 'inline-block'
      }
    }
  } as Styles)

class CustomInspector extends React.PureComponent<Props, any> {
  state = {
    theme: null
  }

  render() {
    const { classes } = this.props
    return (
      <span className={classes.root}>
        {this.props.data instanceof HTMLElement ? (
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
    let { depth, name, data, isNonenumerable } = props

    // Root
    if (depth === 0) {
      return <ObjectRootLabel name={name} data={data} />
    }

    // Subobject
    if (name === '__protoname__') {
      name = '__proto__'
    }
    return data instanceof HTMLElement ? (
      <span className={classes.inlineHTML}>
        <ObjectName name={name} />
        <span>: </span>
        <DOMInspector data={data} theme={this.state.theme} />
      </span>
    ) : (
      <ObjectLabel name={name} data={data} isNonenumerable={isNonenumerable} />
    )
  }
}

export default withStyles(styles)(CustomInspector)
