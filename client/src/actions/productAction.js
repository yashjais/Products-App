import axios from '../config/axios'

export const startProductQuery = (body) => {
    return (dispatch) => {
        axios.post('/products/query', body) // test it
            .then(res => {
                const products = res.data
                // console.log(products, products.hasOwnProperty('errors'))
                if(products.hasOwnProperty('errors')) {
                    alert(products.errors)
                } else {
                    dispatch(productQuery(products))
                }
            })
            .catch(err => alert(err))
    }
}

export const productQuery = (products) => {
    return {
        type: 'SET_PRODUCTS', payload: products
    }
}

export const startGetProducts = () => {
    return (dispatch) => {
        axios.get('/products')
            .then(res => {
                const products = res.data
                dispatch(setProducts(products))
            })
            .catch(err => alert(err))
    }
}

export const setProducts = (products) => {
    return {
        type: 'SET_PRODUCTS', payload: products
    }
}