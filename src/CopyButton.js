import { memo } from 'react'
import copy from 'copy-to-clipboard'

import { useAsyncCallback } from './AsyncButton'

const wait = t => new Promise(res => setTimeout(res, t))

export function useCopyTextHandler(textToCopy, { interval } = {}) {
  const [onClick, { loading: copied }] = useAsyncCallback(async () => {
    copy(textToCopy)
    if (interval !== 0) {
      await wait(interval == null ? 1000 : interval)
    }
  }, [textToCopy, interval])

  return {
    onClick,
    copied
  }
}

export const CopyButton = memo(function CopyButton(props) {
  return props.children(useCopyTextHandler(props.text, { interval: props.interval }))
})
