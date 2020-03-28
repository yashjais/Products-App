import axios from 'axios'

export default StartproductQuery = (query) => {
    //axios.post
    axios.get('http://localhost:3010/products')
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
}

export default productQuery = (products) => {
    // update the product in the redux store
}