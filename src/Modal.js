import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';

const ESCAPE_KEY = 27;

const ClickAway = enhanceWithClickOutside(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.escFunction = this.escFunction.bind(this);
    }
    handleClickOutside(e) {
      this.props.onClickAway(e);
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

const Modal = props => (
    <ClickAway onClickAway={props.onClickAway}>
      {props.open ? props.children : null}
    </ClickAway>
  );

export default Modal;
