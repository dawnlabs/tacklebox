import React, { memo } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { useAsyncCallback } from './AsyncButton'

const wait = t => () => new Promise(res => setTimeout(res, t))

export const CopyButton = memo(function CopyButton(props) {
  const [onCopy, { loading: copied }] = useAsyncCallback(
    wait(props.interval == null ? 1000 : props.interval)
  )

  return (
    <CopyToClipboard text={props.text} onCopy={onCopy}>
      {props.children({ copied })}
    </CopyToClipboard>
  )
})
