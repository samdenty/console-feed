import styled from './theme'
import { Context } from '../definitions/Component'

/**
 * Return themed log-method style
 * @param style The style
 * @param type The method
 */
const Themed = (style: string, method: string, styles) =>
  styles[`LOG_${method.toUpperCase()}_${style.toUpperCase()}`] ||
  styles[`LOG_${style.toUpperCase()}`]

interface Props {
  theme: Context
}

/**
 * console-feed
 */
export const Root = styled('div')({
  wordBreak: 'break-word'
})

/**
 * console-message
 */
export const Message = styled<Props, any>('div')(
  ({ theme: { styles, method } }: Props) => ({
    position: 'relative',
    display: 'flex',
    color: Themed('color', method, styles),
    backgroundColor: Themed('background', method, styles),
    borderTop: `1px solid ${Themed('border', method, styles)}`,
    borderBottom: `1px solid ${Themed('border', method, styles)}`,
    marginTop: -1,
    marginBottom: +/^warn|error$/.test(method),
    paddingLeft: 10,
    boxSizing: 'border-box',
    '& *': {
      verticalAlign: 'top',
      boxSizing: 'border-box',
      fontFamily: styles.BASE_FONT_FAMILY,
      whiteSpace: 'pre-wrap',
      fontSize: styles.BASE_FONT_SIZE
    },
    '& a': {
      color: 'rgb(177, 177, 177)'
    }
  })
)

/**
 * message-icon
 */
export const Icon = styled<Props, any>('div')(
  ({ theme: { styles, method } }: Props) => ({
    width: styles.LOG_ICON_WIDTH,
    height: styles.LOG_ICON_HEIGHT,
    backgroundImage: Themed('icon', method, styles),
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 50%'
  })
)

/**
 * console-content
 */
export const Content = styled<Props, any>('div')(
  ({ theme: { styles, method } }: Props) => ({
    clear: 'right',
    position: 'relative',
    padding: styles.PADDING,
    marginLeft: 15,
    minHeight: 18,
    flex: 'auto',
    width: 'calc(100% - 15px)'
  })
)
