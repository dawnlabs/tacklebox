import React from 'react'

const toString = value => JSON.stringify(value)

class LocalStorage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.normalizeSetState = this.normalizeSetState.bind(this)
    this.update = this.update.bind(this)
    this.clear = this.clear.bind(this)
    this.clearState = this.clearState.bind(this)
    this.handleStorageChange = this.handleStorageChange.bind(this)
    this.handleStorageUpdate = this.handleStorageUpdate.bind(this)
  }

  componentDidMount() {
    this.storage = window.localStorage

    const component = this
    // https://hackernoon.com/how-to-take-advantage-of-local-storage-in-your-react-projects-a895f2b2d3f2
    Object.keys(this.state).forEach(key => {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          component.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          component.setState({ [key]: value });
        }
      }
    })

    window.addEventListener('storage', this.handleStorageChange)
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.handleStorageChange)
  }

  handleStorageChange(e) {
    const { isTrusted, key, newValue: value } = e

    if (isTrusted) {
      if (key) {
        this.normalizeSetState(key, value)
      } else {
        this.clearState()
      }
    }
  }

  normalizeSetState(key, value) {
    if (value == null) {
      this.setState({ [key]: undefined })
    } else {
      this.setState({ [key]: value })
    }
  }

  handleStorageUpdate(key, value) {
    if (this.storage) {
      if (value == null) {
        this.storage.removeItem(key)
      } else {
        this.storage.setItem(key, toString(value))
      }
    }
  }

  update(changes) {
    this.setState(changes, () => {
      Object.keys(changes).map(key =>
        this.handleStorageUpdate(key, changes[key]))
    })
  }

  clear() {
    this.storage && this.storage.clear()
    this.clearState()
  }

  clearState(){
    Object.keys(this.state).forEach(key =>
      this.normalizeSetState(key, undefined))
  }

  render() {
    return this.props.children({
      state: this.state,
      setState: this.update,
      clear: this.clear
    })
  }
}

export default LocalStorage;
