import React from 'react'

const stringify = value => (typeof value === 'string' ? value : JSON.stringify(value))
const parse = o => {
  try {
    return JSON.parse(o)
  } catch (error) {
    return o
  }
}

export function useLocalStorage(key) {
  const [state, setState] = React.useState(null)

  React.useEffect(() => {
    if (localStorage.hasOwnProperty(key)) {
      // get the key's value from localStorage
      let value = localStorage.getItem(key)

      // parse the localStorage string and setState
      setState(parse(value))
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
      localStorage.setItem(key, stringify(state))
    }
  }, [key, state])

  return [state, setState]
}
