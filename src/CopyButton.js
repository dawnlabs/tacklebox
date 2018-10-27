import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

export class CopyButton extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      copied: false
    }
    this.onCopy = this.onCopy.bind(this)
  }

  onCopy() {
    this.setState({ copied: true })
    const component = this
    setTimeout(
      () => component.setState({ copied: false }),
      this.props.interval == null ? 1000 : this.props.interval
    )
  }

  render() {
    return (
      <CopyToClipboard text={this.props.text} onCopy={this.onCopy}>
        {this.props.children({
          copied: this.state.copied
        })}
      </CopyToClipboard>
    )
  }
}
