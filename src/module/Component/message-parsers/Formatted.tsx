import * as React from 'react'
import Format from '../devtools-parser'

interface Props {
  data: any[]
}

class Formatted extends React.PureComponent<Props, any> {
  render() {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: Format(this.props.data || [])
        }}
      />
    )
  }
}

export default Formatted
