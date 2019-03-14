import React from 'react'

function useWindowListener(key, fn) {
  const callbackRef = React.useRef(fn)

  React.useEffect(() => {
    const cb = callbackRef.current
    window.addEventListener(key, cb)
    return () => window.removeEventListener(key, cb)
  }, [key])
}

export function useOnline() {
  const [online, setOnline] = React.useState(true)

  React.useEffect(() => {
    setOnline(
      typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
        ? navigator.onLine
        : true
    )
  }, [])

  useWindowListener('offline', () => setOnline(false))
  useWindowListener('online', () => setOnline(true))

  return online
}
