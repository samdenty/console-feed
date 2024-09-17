import styled from './theme'

/**
 * Return themed log-method style
 * @param style The style
 * @param type The method
 */

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  method: string
  theme: {
    styles: {
      [name: string]: string
    }
  }
}

const Themed = (
  style: string,
  method: string,
  styles: { [name: string]: string },
) =>
  styles[`LOG_${method.toUpperCase()}_${style.toUpperCase()}`] ||
  styles[`LOG_${style.toUpperCase()}`]

/**
 * console-feed
 */
export const Root = styled('div')({
  wordBreak: 'break-word',
  width: '100%',
})

/**
 * console-message
 */
export const Message = styled.div<Props>`
  position: relative;
  display: flex;
  color: ${(props) => Themed('color', props.method, props.theme.styles)};
  background-color: ${(props) =>
    Themed('background', props.method, props.theme.styles)};
  border-top: ${(props) =>
    `1px solid ${Themed('border', props.method, props.theme.styles)}`};
  border-bottom: ${(props) =>
    `1px solid ${Themed('border', props.method, props.theme.styles)}`};
  margin-top: -1;
  margin-bottom: +/ ^warn|error$/.test(props.method);
  padding: ${(props) => props.theme.styles.PADDING};
  box-sizing: border-box;
  & * {
    box-sizing: border-box;
    font-family: ${(props) => props.theme.styles.BASE_FONT_FAMILY};
    white-space: pre-wrap;
    font-size: ${(props) => props.theme.styles.BASE_FONT_SIZE};
  }
  & a {
    color: ${(props) => props.theme.styles.LOG_LINK_COLOR};
  }
`

/**
 * Icon container
 */
export const IconContainer = styled('div')(() => ({
  paddingLeft: 10,
}))

/**
 * message-icon
 */
export const Icon = styled.div<Props>`
  width: ${(props) => props.theme.styles.LOG_ICON_WIDTH};
  height: ${(props) => props.theme.styles.LOG_ICON_HEIGHT};
  background-image: ${(props) =>
    Themed('icon', props.method, props.theme.styles)};
  background-repeat: no-repeat;
  background-size: ${(props) => props.theme.styles.LOG_ICON_BACKGROUND_SIZE};
  background-position: center;
`
// export const Icon = styled('div')(({ theme: { styles, method } }) => ({
//   width: styles.LOG_ICON_WIDTH,
//   height: styles.LOG_ICON_HEIGHT,
//   backgroundImage: Themed('icon', method, styles),
//   backgroundRepeat: 'no-repeat',
//   backgroundSize: styles.LOG_ICON_BACKGROUND_SIZE,
//   backgroundPosition: 'center',
// }))

/**
 * message-amount
 */
export const AmountIcon = styled.div<Props>`
  min-width: ${(props) => props.theme.styles.LOG_AMOUNT_MIN_WIDTH};
  height: ${(props) => props.theme.styles.LOG_AMOUNT_HEIGHT};
  margin: ${(props) => props.theme.styles.LOG_AMOUNT_MARGIN};
  white-space: nowrap;
  font-size: ${(props) => props.theme.styles.LOG_AMOUNT_FONT_SIZE};
  padding: ${(props) => props.theme.styles.LOG_AMOUNT_PADDING};
  background: ${(props) =>
    Themed('amount_background', props.method, props.theme.styles)};
  color: ${(props) => Themed('amount_color', props.method, props.theme.styles)};
  border-radius: ${(props) => props.theme.styles.LOG_AMOUNT_BORDER_RADIUS};
  display: flex;
  align-items: center;
  justify-content: center;
`
// export const AmountIcon = styled('div')(({ theme: { styles, method } }) => ({
//   // make it a circle if the amount is one digit
//   minWidth: `${16 / 12}em`,
//   height: `${16 / 12}em`,
//   margin: '1px 0',
//   whiteSpace: 'nowrap',
//   fontSize: `${10 / 12}em!important`,
//   padding: '0px 3px',
//   background: Themed('amount_background', method, styles),
//   color: Themed('amount_color', method, styles),
//   borderRadius: '9999px',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }))

/**
 * timestamp
 */
export const Timestamp = styled.div<Props>`
  margin-left: 5;
  color: dimgray;
`
// export const Timestamp = styled('div')(({ theme: { styles, method } }) => ({
//   marginLeft: 5,
//   color: 'dimgray',
// }))

/**
 * console-content
 */
export const Content = styled.div<Props>`
  clear: right;
  position: relative;
  margin-left: 15;
  flex: 1;
`
// export const Content = styled('div')(({ theme: { styles } }) => ({
//   clear: 'right',
//   position: 'relative',
//   marginLeft: 15,
//   flex: 1,
// }))
