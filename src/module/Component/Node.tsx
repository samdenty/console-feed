import * as React from 'react'
import { NodeProps, Theme } from '../definitions/Component'

import * as classNames from 'classnames'
// @ts-ignore
import withStyles from 'react-jss'
import { Styles } from 'jss'

import Formatted from './message-parsers/Formatted'
import ObjectTree from './message-parsers/Object'
import ErrorPanel from './message-parsers/Error'

const styles = (theme: Theme) =>
  ({
    row: {
      position: 'relative',
      display: 'flex',
      color: theme.styles.LOG_COLOR,
      backgroundColor: theme.styles.LOG_BACKGROUND,
      borderTop: `1px solid ${theme.styles.LOG_BORDER}`,
      borderBottom: `1px solid ${theme.styles.LOG_BORDER}`,
      marginTop: -1,
      paddingLeft: 10,
      boxSizing: 'border-box',
      '& *': {
        verticalAlign: 'top',
        boxSizing: 'border-box',
        fontFamily: theme.styles.BASE_FONT_FAMILY,
        whiteSpace: 'pre-wrap',
        fontSize: theme.styles.BASE_FONT_SIZE
      },
      '& a': {
        color: 'rgb(177, 177, 177)'
      }
    },
    warn: {
      backgroundColor: theme.styles.LOG_WARN_BACKGROUND,
      color: theme.styles.LOG_WARN_COLOR,
      borderColor: theme.styles.LOG_WARN_BORDER,
      marginBottom: 1
    },
    error: {
      backgroundColor: theme.styles.LOG_ERROR_BACKGROUND,
      borderColor: theme.styles.LOG_ERROR_BORDER,
      color: theme.styles.LOG_ERROR_COLOR,
      marginBottom: 1
    },
    debug: {
      backgroundColor: theme.styles.LOG_DEBUG_BACKGROUND,
      borderColor: theme.styles.LOG_DEBUG_BORDER,
      color: theme.styles.LOG_DEBUG_COLOR
    },

    // Icons
    icon: {
      width: theme.styles.LOG_ICON_WIDTH,
      height: theme.styles.LOG_ICON_HEIGHT,
      backgroundImage: theme.styles.LOG_ICON,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 50%'
    },
    commandIcon: {
      backgroundImage: theme.styles.LOG_COMMAND_ICON
    },
    resultIcon: {
      backgroundImage: theme.styles.LOG_RESULT_ICON
    },
    debugIcon: {
      backgroundImage: theme.styles.LOG_DEBUG_ICON
    },
    warnIcon: {
      backgroundImage: theme.styles.LOG_WARN_ICON
    },
    infoIcon: {
      backgroundImage: theme.styles.LOG_INFO_ICON
    },
    errorIcon: {
      backgroundImage: theme.styles.LOG_ERROR_ICON
    },

    // Message
    message: {
      clear: 'right',
      position: 'relative',
      padding: theme.styles.PADDING,
      marginLeft: 15,
      minHeight: 18,
      flex: 'auto',
      width: 'calc(100% - 15px)'
    }
  } as Styles)

class Node extends React.PureComponent<NodeProps, any> {
  render() {
    const { log, classes } = this.props
    return (
      <article
        data-method={log.method}
        className={classNames({
          [classes.row]: true,
          [classes[log.method]]: !!classes[log.method]
        })}>
        <span
          className={classNames({
            [classes.icon]: true,
            [classes[`${log.method}Icon`]]: classes[`${log.method}Icon`]
          })}
        />
        <section className={classes.message}>{this.getNode()}</section>
      </article>
    )
  }

  getNode() {
    let { log, classes } = this.props

    // Error handling
    const error = this.typeCheck(log)
    if (error) return error

    // Chrome formatting
    if (
      log.data.length > 0 &&
      typeof log.data[0] === 'string' &&
      log.data[0].indexOf('%') > -1
    ) {
      return <Formatted data={log.data} />
    }

    // Error panel
    if (
      log.data.every((message) => typeof message === 'string') &&
      log.method === 'error'
    ) {
      return <ErrorPanel log={log} />
    }

    // Normal inspector
    const quoted = typeof log.data[0] !== 'string'
    return <ObjectTree log={log} quoted={quoted} />
  }

  typeCheck(log: any) {
    if (!log) {
      return (
        <Formatted
          data={[
            `%c[console-feed] %cFailed to parse message! %clog was typeof ${typeof log}, but it should've been a log object`,
            'color: red',
            'color: orange',
            'color: cyan'
          ]}
        />
      )
    } else if (!(log.data instanceof Array)) {
      return (
        <Formatted
          data={[
            '%c[console-feed] %cFailed to parse message! %clog.data was not an array!',
            'color: red',
            'color: orange',
            'color: cyan'
          ]}
        />
      )
    }
    return false
  }
}

export default withStyles(styles)(Node)
