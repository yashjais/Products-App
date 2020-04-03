import React from 'react'
import { connect } from 'react-redux'
import ProductFilter from './productFilter'
import { Row, Col } from 'antd'

function ProductsPage(props) {
    // console.log(props)
    return (
        <div style={{ padding: '0 50px', height: '2850px' }}>
            <br />
            <br />
            <div className="site-layout-content" style={{height: '2700px'}}>
                {/* <Link>Add a Product</Link> */}
                <div style={{height: '32px'}}> 1-10 of {props.products.length} results of Products <span style={{float: 'right'}}><ProductFilter /></span></div>
                
                <hr />
                {
                    props.products.length == 0 ? <h1>NO Products found</h1> : props.products.length == 1 ? (props.products[0]._id ? 
                                <div>
                                    <Row>
                                    <Col span={4}><img src={props.products[0].media.thumbnail[0].url} alt="Avatar" style={{height: '230px', width: '180px', marginRight: '3px', marginTop: '8px', borderTopWidth: '5px', paddingTop: '5px', marginLeft: '5px'}} /></Col>
                                    <Col style={{top: '7px'}} span={20}> 
                                        <h2><b>{props.products[0].name}</b></h2>
                                        <h3>{props.products[0].description_text}</h3>
                                        <h3>Brand - {props.products[0].brand.name}</h3>
                                        <h3>Regular Price - {props.products[0].price.regular_price.value}</h3>
                                        <h3>Offer Price - {props.products[0].price.offer_price.value}</h3>
                                        <h3>Discount - {props.products[0].discount ? `${props.products[0].discount} %` : '0'}</h3>
                                        <h3>Discount Difference - {props.products[0].discount_difference ? `${props.products[0].discount_difference} %` : '0'}</h3>
                                    </Col>
                                    </Row>
                                </div> : <div>
                                    <p>Discounted Products - {props.products[0].discounted_products_count}</p>
                                    <p>Average Discount - {props.products[0].avg_discount}</p>
                                </div>) : props.products.map(product => {
                                    return  <div key={product._id} className="card">
                                            <Row>
                                            <Col span={4}><img src={product.media.thumbnail[0].url} alt="Avatar" style={{height: '230px', width: '180px', marginRight: '3px', marginTop: '8px', borderTopWidth: '5px', paddingTop: '5px', marginLeft: '5px'}} /></Col>
                                            <Col style={{top: '7px'}} span={20}> 
                                                <h2><b>{product.name}</b></h2>
                                                <h3>{product.description_text}</h3>
                                                <h3>Brand - {product.brand.name}</h3>
                                                <h3>Regular Price - {product.price.regular_price.value}</h3>
                                                <h3>Offer Price - {product.price.offer_price.value}</h3>
                                                <h3>Discount - {product.discount ? `${product.discount} %` : '0'}</h3>
                                                <h3>Discount Difference - {product.discount_difference ? `${product.discount_difference} %` : '0'}</h3>
                                            </Col>
                                            </Row>
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