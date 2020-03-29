import React from 'react'
import {connect} from 'react-redux'
import {startProductQuery} from './actions/productAction'

function App(props) {
    console.log(props)
    startProductQuery()
    return (
        <div>
            <h2>Products App</h2>
        </div>
    )
}

export default connect()(App)