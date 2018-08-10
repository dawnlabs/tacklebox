import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';

const ESCAPE_KEY = 27;

const ClickAway = enhanceWithClickOutside(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.escFunction = this.escFunction.bind(this);
    }
    handleClickOutside() {
      this.props.onClickAway();
    }
    escFunction(event) {
      if (event.keyCode === ESCAPE_KEY) {
        this.props.onClickAway();
      }
    }
    componentDidMount() {
      document.addEventListener('keydown', this.escFunction, false);
    }
    componentWillUnmount() {
      document.removeEventListener('keydown', this.escFunction, false);
    }

    render() {
      return this.props.children;
    }
  }
);

const Modal = props =>
  props.open ? (
    <ClickAway onClickAway={props.onClickAway}>
      {props.children}
    </ClickAway>
  ) : null;

export default Modal;
