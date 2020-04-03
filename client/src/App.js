import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter, Link, Route} from 'react-router-dom'
import { Layout, Menu } from 'antd';
import './App.css'

import Home from './components/home'
import ProductsPage from './components/Products/productsPage'
import { startGetProducts } from './actions/productAction'

const { Header } = Layout;

function App(props) {
    props.dispatch(startGetProducts())
    return (
        <div>
            <BrowserRouter>
                <Layout className="layout">
                    <Header>
                    <div className="logo" />
                    
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <React.Fragment><span style={{fontWeight: '600'}}>Products App</span></React.Fragment>
                        <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/products">Products</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="#">User</Link></Menu.Item>
                    </Menu>
                    </Header>
                    
                    <Route path="/" component={Home} exact={true} />
                    <Route path="/products" component={ProductsPage} exact={true} /> 
                    
                </Layout>
            </BrowserRouter>
        </div>
    )
}

export default connect()(App)