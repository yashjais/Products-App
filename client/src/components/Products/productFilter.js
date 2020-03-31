import React from 'react'
import { connect } from 'react-redux'
import { Menu, Dropdown, Button } from 'antd';

const menu = (
  <Menu>
    <Menu.Item>
      <a>discounted_products_list</a>
    </Menu.Item>
    <Menu.Item>
      <a>discounted_products_count|avg_discount</a>
    </Menu.Item>
    <Menu.Item>
      <a>expensive_list</a>
    </Menu.Item><Menu.Item>
      <a>competition_discount_diff_list</a>
    </Menu.Item>
  </Menu>
)

function ProductFilter(props) {
  const handleSubmit = (e) => {
    console.log('clicked')
    // props.dispatch()
  }
    return(
        <React.Fragment>
              <Dropdown overlay={menu} placement="topRight">
                <Button>Query</Button>
              </Dropdown>
              <Dropdown overlay={menu} placement="topRight">
                <Button>Filter</Button>
              </Dropdown>
              {/* <Dropdown overlay={menu} placement="topRight">
                <Button>bottomLeft</Button>
              </Dropdown> */}
              <Button onChange={handleSubmit}>Submit</Button>
        </React.Fragment>
    )
}

export default connect()(ProductFilter)