# Tackle Box 🎣

> Collection of React user-experience hooks + containers for common interactions

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

## Getting Started

```bash
yarn add @dawnlabs/tacklebox
```

## Usage

### `useAsyncCallback`

> 🎣 `hook`

Takes any function and gives you a loading and error state. Good for handling
general asynchronous interactions.

```js
import { useAsyncCallback } from '@dawnlabs/tacklebox'

function MyAsyncButton(props) {
  const [onClick, { loading, error, data }] = useAsyncCallback(props.onClick)

  return (
    <>
      {error && <span>{error}!</span>}
      <button onClick={onClick}>{loading ? 'Saving...' : 'Save'}</button>
      {data && <span>Success! {data}</span>}
    </>
  )
}
```

### `useKeyboardListener`

> 🎣 `hook`

Pass it a keyboard key and a handler to automatically listen for keyboard clicks.

##### Example

```js
import { useKeyboardListener } from '@dawnlabs/tacklebox'

function Modal(props) {
  useKeyboardListener('Escape', props.onClose)

  return <div>Hello World</div>
}
```

### `useTempValue`

> `hook` 🎣

Hook that gives you a temporary state value that you can either commit with `submit` or revert with `reset`.

##### Example

```javascript
import { useTempValue } from '@dawnlabs/tacklebox'

function MyForm(props) {
  const initialName = props.name
  const { hasChanged, value, onInputChange, submit, reset } = useTempValue(initialName)

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input value={value || ''} onChange={onInputChange} />
      <button disabled={!hasChanged} onClick={submit}>
        Submit
      </button>
      <button disabled={!hasChanged} onClick={reset}>
        Cancel
      </button>
    </form>
  )
}
```

### `useCopyTextHandler`

> `hook` 🎣

Creates an `onClick` handler that copies the text you pass in, and updates the `copied` field accordingly.
**Note**: you must pass `onClick` to a `<button>` in order to copy the text.

##### Example

```javascript
import { useCopyTextHandler } from '@dawnlabs/tacklebox'

const interval = 2 * 1000 // 2 seconds

function MyCopyButton() {
  const { onClick, copied } = useCopyTextHandler('https://github.com/dawnlabs/tacklebox', {
    interval
  })

  return <button onClick={onClick}>{copied ? 'COPIED!' : 'Copy URL'}</button>
}
```

### `useOnline`

> `hook` 🎣

Subscribes to whether the network is online or off

##### Example

```javascript
import { useOnline } from '@dawnlabs/tacklebox'

function MyComponent() {
  const online = useOnline()
  return <span>You are {online ? 'online' : 'offline'}</span>
}
```

### Modal

> `wrapper HOC` component

Class controlled Modal component with click-away and ESC-key to close

##### Example

```javascript
import {Modal} from '@dawnlabs/tacklebox'

<Modal open={this.state.open} onClickAway={() => this.setState({ open: false})}>
  <form>
    <input placeholder="Enter name here . . ." />
  </form>
</>
```

### License

MIT
