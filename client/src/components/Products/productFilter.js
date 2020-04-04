import React from 'react'
import { connect } from 'react-redux'
import { startProductQuery } from '../../actions/productAction'

class ProductFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filters: ['discounted_products_list', 'discounted_products_count|avg_discount', 'expensive_list', 'competition_discount_diff_list'],
      websites: [{name: "netaporter", _id: "5da6d40110309200045874e6"}, {name: "farfetch", _id: "5d0cc7b68a66a100014acdb0"}, {name: "mytheresa", _id: "5da94e940ffeca000172b12a"}, {name: "matchesfashion", _id: "5da94ef80ffeca000172b12c"}, {name: "ssense", _id: "5da94f270ffeca000172b12e"}, {name: "selfridges", _id: "5da94f4e6d97010001f81d72",}],
      operand1: '',
      operand2: '',
      operator: '',
      operand3: '',
      operand4: '',
      operator1: '',
      operator1Id: ''
    }
  }

  handleFilterChange = (e) => {
    const filter = e.target.value
    this.setState({ filter, operand1: '', operand2: '', operator: '' })
  }

  handleOperand2Change = (e) => {
    const operand2 = e.target.value
    this.setState( { operand2 })
  }

  handleOperand1Change = (e) => {
    const operand1 = e.target.value
    this.setState({ operand1, operand2: '', operator: '' })
  }

  handleOperatorChange = (e) => {
    const operator = e.target.value
    this.setState({ operator, operand2: '' })
  }

  handleOperand3Change = (e) => {
    const operand3 = e.target.value
    this.setState({ operand3, operand4: '', operator1: '', operator1Id: '' })
  }

  handleOperand4Change = (e) => {
    const operand4 = e.target.value
    const operator1Id = this.state.websites.find(web => web.name == operand4)._id
    // console.log(operand4, operator1Id)
    this.setState({ operand4, operator1Id})
  }

  handleOperator1Change = (e) => {
    const operator1 = e.target.value
    this.setState({ operator1, operand4: '', operator1Id: '' })
  }
  
  handleSubmit = (e) => {
    // console.log('clicked', this.state)
    const obj = {}
    obj.query_type = this.state.filter
    const operand1 = this.state.operand1
    const operand2 = this.state.operand2 
    const operator = this.state.operator
    const operand3 = this.state.operand3
    const operand4 = this.state.operand3
    const operator1 = this.state.operator1
    if(operand1 && operand2 && operator && obj.query_type != 'competition_discount_diff_list'){
      // console.log('working')
      const filters = []
      filters.push({operand1, operand2, operator})
      obj.filters = filters
      // console.log(obj, this.props)
      this.props.dispatch(startProductQuery(obj))
    } else if(obj.query_type == 'expensive_list') {
      // console.log('without any filters')
      this.props.dispatch(startProductQuery(obj))
    } else if(obj.query_type == 'competition_discount_diff_list') {
      if(operand3 && operand4 && operator1){
        const filters = []
        filters.push({operand1, operand2, operator})
        filters.push({operand1: operand3, operand2: this.state.operator1Id, operator: operator1 })
        obj.filters = filters
        // console.log(obj)
      this.props.dispatch(startProductQuery(obj))
      } else {
        alert('fill all the values')
      }
    } else {
      alert('fill all the values')
    }
  }
    
    render() {
      return(
        <React.Fragment>
          <select onChange={this.handleFilterChange} style={{width: '100px'}}>
            <option>filter</option>
            {
              this.state.filters.map((filter, index) => {
                return (
                  <option key={index}>{filter}</option>
                )
              })
            }
          </select>
          {(this.state.filter == 'discounted_products_list' || this.state.filter == 'discounted_products_count|avg_discount' || this.state.filter == 'expensive_list' )&& 
          <React.Fragment>
          <select onChange={this.handleOperand1Change} value={this.state.operand1}>
            <option value="">operand1</option>
            <option value="brand.name">brand name</option>
            <option value="discount">discount</option>
          </select>
          {
              this.state.operand1 == "brand.name" ? 
                <select onChange={this.handleOperatorChange} value={this.state.operator}>
                  <option value="">operator</option>
                  <option value="==">equal to</option>
                </select> : 
                <select onChange={this.handleOperatorChange} value={this.state.operator}>
                  <option value="">operator</option>
                  <option value=">">greater than</option>
                  <option value="<">less than</option>
                  <option value="==">equal to</option>
                </select>
          }
          <input type="text" placeholder={this.state.operand1 == 'discount' ? 'operand2(in %)' : 'operand2'} onChange={this.handleOperand2Change} value={this.state.operand2}/>
          <button onClick={this.handleSubmit}>submit</button>
          {
            this.state.filter == 'expensive_list' && <p style={{marginTop: '-7px', marginBottom: '-5px'}}>*can be used without any filters</p>
          }
          </React.Fragment>
          }

          {
             this.state.filter == 'competition_discount_diff_list' && 
             <React.Fragment>
              <select onChange={this.handleOperand1Change} value={this.state.operand1}>
                <option value="">operand1</option>
                <option value="discount_diff">discount difference</option>
              </select>
              <select onChange={this.handleOperatorChange} value={this.state.operator}>
                <option value="">operator</option>
                <option value=">">greater than</option>
                <option value="<">less than</option>
                <option value="==">equal to</option>
              </select>
              <input type="text" placeholder="operand2(in %)" onChange={this.handleOperand2Change} value={this.state.operand2}/>

              <select onChange={this.handleOperand3Change} value={this.state.operand3}>
                <option value="">operand1</option>
                <option value="competition">competition</option>
              </select>
              <select onChange={this.handleOperator1Change} value={this.state.operator1}>
                <option value="">operator</option>
                <option value="==">equal to</option>
              </select>
              <select onChange={this.handleOperand4Change} value={this.state.operand4}>
                <option value="">site name</option>
                {
                  this.state.websites.map(website => {
                    return (
                      <option key={website._id}>{website.name}</option>
                    )
                  })
                }
              </select>
              <button onClick={this.handleSubmit}>submit</button>
              {
                this.state.filter == 'expensive_list' && <p style={{marginTop: '-7px', marginBottom: '-5px'}}>*can be used without any filters</p>
              }
              </React.Fragment>
          }
          
        </React.Fragment>
    )
    }
}

export default connect()(ProductFilter)