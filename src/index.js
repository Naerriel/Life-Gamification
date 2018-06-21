import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './Components/App/index.js'
import { store } from 'redux/store'
import { Provider } from "react-redux"

import "./styles/generalStyle.css"
import 'font-awesome/css/font-awesome.min.css'

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
);
