import {combineReducers, createStore, applyMiddleware} from 'redux'
import productsReducer from '../reducers/productReducer'
import thunk from 'redux-thunk'

const configureStore = () => {
    const store = createStore(combineReducers({
        products: productsReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore