import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { List, Avatar } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import ProductFilter from './productFilter'



const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

function ProductsPage(props) {
    const listData = [];
    for (let i = 0; i < 10; i++) {
    listData.push({
        href: props.products[i].url,
        title: props.products[i].name,
        avatar: props.products[i].media.thumbnail[0].url,
        description: props.products[i].description_text,
        content: props.products[i].description_text,
    });
    }
    console.log(props)
    return (
        <div style={{ padding: '0 50px', height: '2250px' }}>
            <br />
            <br />
            <div className="site-layout-content" style={{height: '2035px'}}>
            {/* <div className="site-layout-content" style={{height: '800px'}}>
                <Link className="col-8" to="#">Add A product</Link> 
                <ProductFilter />
                {
                    props.products.map(product => {
                        return <li key={product._id}>{product.name} - {product.price.regular_price.value} - {product.brand.name}</li>
                    })
                }
            </div> */}

            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 10,
                }}
                dataSource={listData}
                footer={
                <div>
                    <b>ant design</b> footer part
                </div>
                }
                renderItem={item => (
                <List.Item
                    key={item.title}
                    actions={[
                    <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                    ]}
                    extra={
                    <img
                        width={272}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                    }
                >
                    <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                    />
                    {item.content}
                </List.Item>
                )}
            />,
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