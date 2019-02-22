import React from 'react'

const toString = value => JSON.stringify(value)

export function useLocalStorage(key) {
  const [state, setState] = React.useState(null)

  React.useEffect(() => {
    if (localStorage.hasOwnProperty(key)) {
      // get the key's value from localStorage
      let value = localStorage.getItem(key)

      // parse the localStorage string and setState
      try {
        value = JSON.parse(value)
      } finally {
        setState(value)
      }
    }
  }, [key])

  React.useEffect(() => {
    function handleStorageChange(e) {
      const { isTrusted, newValue: value } = e

      if (isTrusted) {
        setState(value)
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  React.useEffect(() => {
    if (state == undefined) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, toString(state))
    }
  }, [key, state])

  return [state, setState]
}
