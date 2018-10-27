import React, { memo } from 'react'
import enhanceWithClickOutside from 'react-click-outside'

const ESCAPE_KEY = 27

const ClickAway = enhanceWithClickOutside(
  class WrappedComponent extends React.Component {
    constructor(props) {
      super(props)
      this.escFunction = this.escFunction.bind(this)
    }
    handleClickOutside(e) {
      this.props.onClickAway(e)
    }
    escFunction(event) {
      if (event.keyCode === ESCAPE_KEY) {
        this.props.onClickAway(event)
      }
    }
    componentDidMount() {
      document.addEventListener('keydown', this.escFunction, false)
    }
    componentWillUnmount() {
      document.removeEventListener('keydown', this.escFunction, false)
    }

    render() {
      return this.props.children
    }
  }
)

export const Modal = memo(props => (
  <ClickAway onClickAway={props.onClickAway}>{props.open ? props.children : null}</ClickAway>
))

Modal.displayName = 'Modal'
