import React from 'react'

const isEqual = (source, target) => {
  if (source === target) {
    return true
  }

  if (typeof source === 'object' && typeof target === 'object') {
    if (Array.isArray(source)) {
      return source.every((value, i) => isEqual(value, target[i]))
    }

    return Object.keys(source).every(key => isEqual(source[key], target[key]))
  }

  return false
}

function noop() {}
class TempValue extends React.Component {
  constructor(props) {
    super(props)

    this.base = {
      error: null,
      loading: false
      value: this.props.value
    }
    this.state = this.base

    this.handleChange = this.handleChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(value) {
    this.setState({ value })
  }

  handleInputChange(e) {
    this.handleChange(e.target.value)
  }

  handleCancel() {
    this.setState(this.base, this.props.onCancel)
  }

  async handleSubmit() {
    this.setState({ loading: true, error: null })
    try {
      await this.props.onSubmit(this.state.value)
      this.base = this.state
    } catch (error) {
      this.setState({ error })
    } finally {
      this.setState({ loading: false })
    }
  }

  render() {
    const hasChanged = !isEqual(this.base.value, this.state.value)

    return this.props.children({
      hasChanged,
      value: this.state.value,
      loading: this.state.loading,
      error: this.state.error,
      onChange: this.handleChange,
      onInputChange: this.handleInputChange,
      onCancel: this.handleCancel,
      onSubmit: this.handleSubmit
    })
  }
}

TempValue.defaultProps = {
  onCancel: noop,
  onSubmit: noop
}

export default TempValue;
