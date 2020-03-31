import React from 'react'
import { connect } from 'react-redux'
import ProductFilter from './productFilter'

function ProductsPage(props) {
    console.log(props)
    return (
        <div style={{ padding: '0 50px', height: '2450px' }}>
            <br />
            <br />
            <div className="site-layout-content" style={{height: '2300px'}}>
                {/* <Link>Add a Product</Link> */}
                <div style={{height: '32px'}}> 1-10 of {props.products.length} results of Products <span style={{float: 'right'}}><ProductFilter /></span></div>
                
                <hr />
                {
                    props.products.map(product => {
                        return  <div key={product._id} className="card">
                                <div className="container">
                                    <h4><b>{product.name}</b></h4>
                                    <p>{product.price.regular_price.value}</p>
                                    <p>{product.brand.name}</p>
                                    <img src={product.media.thumbnail[0].url} alt="Avatar" style={{marginRight: '3px'}} />
                                </div>
                                </div>
                    })
                }
            </div>
           
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(ProductsPage)