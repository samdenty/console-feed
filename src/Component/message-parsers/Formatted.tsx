import * as React from 'react'
import Format from '../devtools-parser'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'message-section': any
    }
  }
}

interface Props {
  data: any[]
}

class Formatted extends React.PureComponent<Props, any> {
  render() {
    return (
      <message-section
        data-type="formatted"
        dangerouslySetInnerHTML={{
          __html: Format(this.props.data || [])
        }}
      />
    )
  }
}

export default Formatted
