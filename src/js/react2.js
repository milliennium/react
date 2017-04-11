require('../less/react2.less');
console.log('react2');
var React = require('react');
var ReactDom = require('react-dom');
//数据
var PRODUCTS = [
    {category:'Sporting Goods', price:'$49.9', stocked: true, name:'Football'},
    {category:'Sporting Goods', price:'$9.9', stocked: true, name:'Baseball'},
    {category:'Sporting Goods', price:'$29.9', stocked: false, name:'Basketball'},
    {category:'Eletronics', price:'$99.9', stocked: true, name:'iPad Touch'},
    {category:'Eletronics', price:'$399.9', stocked: false, name:'iWatch'},
    {category:'Eletronics', price:'$199.9', stocked: true, name:'iPad'}
]


//搜索组件
var SearchBar = React.createClass({
    onHandleChange:function () {
        this.props.changeFilterText(this.refs.inp.value);
    },
    render:function () {
        return (
            <div>
                <input type="text" ref='inp' onChange={this.onHandleChange} name="" id=""/>
                <br/>
                <input type="checkbox" onClick={this.props.changeOnlyStocked}/>
                <span>onlyShowStocked</span>
            </div>
        )
    }
})

//产品信息组件
var ProductTable = React.createClass({
    componentWillMount: function () {
        this.onHandleChange();
    },
    shouldComponentUpdate: function (nextProps,nextState) {
        this.props = nextProps;
        this.onHandleChange();
        return true;
        
    },
    onHandleChange:function () {
        var products = this.props.products;
        var lastCategory = '';
        var rows = [];
        var _self = this;
        products.forEach(function (ele, index) {
            if(lastCategory !== ele.category) {
                rows.push(
                    <ProductCategoryRow key={index} category={ele.category}></ProductCategoryRow>
                )
            }
            lastCategory = ele.category;
            if(!_self.props.onlyShowStocked || (_self.props.onlyShowStocked && ele.stocked)) {
                if(ele.name.indexOf(_self.props.filterText) !== -1) {
                    rows.push(
                        <ProductRow key={index+100} stocked={ele.stocked} name={ele.name} price={ele.price}></ProductRow>
                    )

                }
            };
        });
        this.rows = rows;
    },
    render:function () {
        return (
           <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.rows
                    }
                </tbody>
            </table>
          
        )
    }
})
//货物种类组件
var ProductCategoryRow = React.createClass({


    render:function () {
        return (
            <tr style={ {fontWeight:900, color:'#0ff'} }>
                <td>{this.props.category}</td>
            </tr>
        )
    }
})
//货物信息组件
var ProductRow = React.createClass({

    render: function () {
        return (
            <tr style={this.props.stocked ? {} : {color:'#f00'}}>
                <td>{this.props.name}</td>
                <td>{this.props.price}</td>
            </tr>
        )
    }
})

//根目录组件
var App = React.createClass({
    getInitialState:function () {
        return {
            onlyShowStocked :false,
            filterText:''
        }
    },
    changeOnlyStocked:function () {
        this.setState({
            onlyShowStocked:!this.state.onlyShowStocked
        })
    },
    changeFilterText: function (text) {
        this.setState({
            filterText:text
        })
    },
    render: function () {

        return (
            <div>
                <SearchBar changeFilterText={this.changeFilterText} changeOnlyStocked={this.changeOnlyStocked}></SearchBar>
                <ProductTable filterText={this.state.filterText} onlyShowStocked={this.state.onlyShowStocked} products={this.props.products}></ProductTable>
            </div>
        )
    }
})

//渲染页面
ReactDom.render(
    <App products={PRODUCTS}></App>,
    document.getElementById('root')
)