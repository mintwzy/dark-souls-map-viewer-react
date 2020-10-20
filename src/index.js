import ReactDOM from 'react-dom'
import { Main } from './components/Main'

/*
ReactDOM.render(element, container[, callback])

Render a React element into the DOM in the supplied container and return a reference to the component (or returns null for stateless components).

If the React element was previously rendered into container, this will perform an update on it and only mutate the DOM as necessary to reflect the latest React element.

If the optional callback is provided, it will be executed after the component is rendered or updated.
 */
ReactDOM.render(
    Main(),
    document.getElementById('root')
)

/*
The Document method getElementById() returns an Element object representing the element whose id property matches the
specified string. Since element IDs are required to be unique if specified, they're a useful way to get access to a specific element quickly.
 */
