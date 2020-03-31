import axios from '../config/axios'

export const startProductQuery = (body) => {
    axios.post('http://localhost:3010/products')
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err))
}

export const productQuery = (products) => {
    // update the product in the redux store
}

export const startGetProducts = () => {
    return (dispatch) => {
        axios.get('http://localhost:3010/products')
            .then(res => {
                const products = res.data
                dispatch(setProducts(products))
            })
            .catch(err => console.log(err))
    }
}

export const setProducts = (products) => {
    return {
        type: 'SET_PRODUCTS', payload: products
    }
}