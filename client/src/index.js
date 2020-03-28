import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import configureStore from './store/configureStore'
import {Provider} from 'react-redux'

const store = configureStore()

const ele = (
    <Provider store={store}>
        <App />
    </Provider>
)

const rootHandle = document.getElementById('root')
ReactDOM.render(ele, rootHandle)