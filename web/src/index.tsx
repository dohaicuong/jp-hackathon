import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from 'serviceWorker'

import Root from 'Root'

const root = document.getElementById('root') as HTMLElement
ReactDOM.unstable_createRoot(root).render(<Root />)

serviceWorker.unregister()