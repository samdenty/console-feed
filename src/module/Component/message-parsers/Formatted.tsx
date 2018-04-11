import * as React from 'react'
import Format from '../devtools-parser'

interface Props {
  data: any[]
}

class Formatted extends React.PureComponent<Props, any> {
  render() {
    return (
      <span
        data-type="formatted"
        dangerouslySetInnerHTML={{
          __html: Format(this.props.data || [])
        }}
      />
    )
  }
}

export default Formatted
