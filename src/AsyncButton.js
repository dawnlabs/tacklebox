import React from 'react'

class AsyncButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: this.props.initiallyLoading || false
    }

    this.onClick = this.onClick.bind(this)
  }

  async onClick(e) {
    this.setState({ loading: true })
    try {
      await this.props.onClick(e)
    } finally {
      this.setState({ loading: false })
    }
  }

  render() {
    return this.props.children({
      loading: this.state.loading,
      onClick: this.onClick
    })
  }
}

export default AsyncButton
