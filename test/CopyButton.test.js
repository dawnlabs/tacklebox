import React from 'react'
import { render, fireEvent, wait } from 'react-testing-library'

import { CopyButton } from '../src'

describe('<CopyButton />', () => {
  beforeEach(() => {
    window.prompt = () => true
    const getSelection = () => ({
      rangeCount: 0,
      addRange: () => {},
      getRangeAt: () => {},
      removeAllRanges: () => {}
    })

    window.getSelection = getSelection
    document.getSelection = getSelection
  })
  afterEach(() => {
    window.prompt = undefined
    window.getSelection = undefined
    document.getSelection = undefined
  })

  test.each([undefined, 3000])('should render correctly with interval: %s', async interval => {
    jest.useFakeTimers()

    const { getByText } = render(
      <CopyButton interval={interval}>
        {({ copied }) => <button>{copied ? 'Copied!' : 'Click'}</button>}
      </CopyButton>
    )

    fireEvent.click(getByText('Click'))

    getByText('Copied!')

    jest.advanceTimersByTime(interval || 1000) // 1 second is the default
    await wait()

    getByText('Click')
  })
})
