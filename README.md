# Action Sack 🎒
> Collection of React user-experience containers for common interactions

### Modal
> `wrapper` component

Class controlled Modal component with click-away and ESC-key to close

##### Example
```javascript
import {Modal} from 'actionsack'

<Modal open={this.state.open} onClickAway={() => this.setState({ open: false})}>
  <form>
    <input placeholder="Enter name here . . ." />
  </form>
</>
```

### CopyButton
> `render-prop` container

Button that copies to clipboard and handles interval to display copy text

##### Example
```javascript
import {CopyButton} from 'actionsack'
const interval = 2 * 1000 // 2 seconds

<CopyButton text="https://github.com/dawnlabs/actionsack" interval={interval}>
  {({ copied }) => (
    <button>{copied ? 'COPIED!' : 'Copy URL'}</button>
  )}
</CopyButton>
```

### AsyncButton
> `render-prop` container

Button that automatically sets loading for asynchronous button actions

##### Example
```javascript
import {AsyncButton} from 'actionsack'
const submit = () => new Promise((resolve) => {
  setTimeout(resolve, 10000, true);
})

<AsyncButton onClick={submit}>
  {({ loading, onClick }) => (
    <button onClick={onClick}>
      {loading ? 'Loading...' : 'Submit'}
    </button>
  )}
</AsyncButton>
```
