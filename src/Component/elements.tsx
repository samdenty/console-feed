import styled from 'react-emotion'

/* console-message */
export const Message = styled('div')`
  position: relative;
  display: flex;
  margin-top: -1;
  padding-left: 10;
  box-sizing: border-box;
  & * {
    vertical-align: top;
    box-sizing: border-box;
    white-space: pre-wrap;
  }
  & a: {
    color: rgb(177, 177, 177);
  }
`

/* message-icon */
export const Icon = styled('div')`
  background-color: red;
`

/* console-content */
export const Content = styled('div')`
  background-color: red;
`
