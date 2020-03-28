import React from 'react'
import {connect} from 'react-redux'

function App(props) {
    console.log(props)
    return (
        <div>
            <h2>React App</h2>
        </div>
    )
}

export default connect()(App)