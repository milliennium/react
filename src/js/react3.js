console.log('react3');
import '../less/react3.less';
import React, {Component} from 'react';
import ReactDom from 'react-dom';

//数据

const data = [
    {
        "name" : "李俊卿",
        "slug" : "",
        "avatarUrl" : "01.jpg",
        "bio" : "准备做华仔的接班人",
        "id" : "1"
    },
    {
        "name" : "寒江雪",
        "slug" : "",
        "avatarUrl" : "02.jpg",
        "bio" : "对自己负责",
        "id" : "2"
    },
    {
        "name" : "王建坤",
        "slug" : "",
        "avatarUrl" : "03.jpg",
        "bio" : "一只放荡不羁的萌牙电动牙刷广告狗",
        "id" : "3"
    },
    {
        "name" : "金诚",
        "slug" : "",
        "avatarUrl" : "04.jpg",
        "bio" : "修辞立其诚",
        "id" : "4"
    },
    {
        "name" : "迦涂",
        "slug" : "",
        "avatarUrl" : "05.jpg",
        "bio" : "你要做一个不动声色的大人了",
        "id" : "5"
    }
]
//搜索组件
class SearchBar extends Component {
    onHandleChange () {
        this.props.onFilterText(this.refs.inp.value);
    }
    
    render () {
        let inviteList = this.props.inviteList;
        let row = inviteList.map((ele, index) => {
            return <strong style={{color:'#333'}} key={index + 100}>{ele.name + ','}</strong>;
        })
        return (
            <div className="search">
                <span>您已经邀请{row}等{row.length}人</span>
                <input ref='inp' type="text" placeholder='搜索你想邀请的人' onChange={this.onHandleChange.bind(this)}/>
            </div>
        )
    }
}

//邀请信息组件
class InviteList extends Component {
    componentWillMount() {
        this.onDealDate();
    }
    shouldComponentUpdate(nextProps, nextState) {
        this.props = nextProps;
        this.onDealDate();
        return true;
    }
    onDealDate () {
        let {data, filterText, onTouchHandle} = this.props;
        let row = [];
        data.forEach((ele, index) => {
            if(ele.name.indexOf(filterText) !== -1) {
                row.push(
                    <InviteItem onTouchHandle={onTouchHandle} key={index + 100} message={ele}></InviteItem>
                )
            }
        });
        this.row = row;
    }
    render () {
        return (
            <div className="List">
                <ul>
                    {
                        this.row
                    }
                </ul>
            </div>
        )
    }

}

//邀请信息组件-item
class InviteItem extends Component {
    onHandleClick () {
        this.props.onTouchHandle(this.props.message.id)
    }
    render () {
        return (
            <li className='item'>
                <img src={'./src/img/'+ this.props.message.avatarUrl} alt=""/>
                <div style={{fontSize:'14px',color:'#333'}} className="name">{this.props.message.name}</div>
                <div style={{marginTop:'5px',fontSize:'13px',color:'#444'}} className="bio">{this.props.message.bio}</div>
                <button style={this.props.message.canInvited ? {color:'#11a668',border:'1px solid #11a668'} : {color:'#8590a6', border:'1px solid #ccd8e1'}} onClick={this.onHandleClick.bind(this)}>{this.props.message.canInvited ? '邀请回答' : '取消邀请'}</button>
            </li>
        )
    }
}

//根目录组件
class App extends Component {
    constructor () {
        super();
        this.state = {
            filterText: '',
            list: [],
            inviteList: []
        }
    }
    componentWillMount () {
        let newList = [];
        this.props.data.forEach( (ele, index) => {
            ele.canInvited = true;
            newList.push(ele);
        })
        this.setState({
            list: newList
        })
    }
    onFilterText (text) {
        this.setState({
            filterText: text,
        })
    }
    onTouchHandle (id) {
        let list = this.state.list;
        let orderList = [...this.state.inviteList];
        for (let i = 0; i < list.length; i++) {
            if(list[i].id === id) {
                list[i].canInvited = !list[i].canInvited;
                if (!list[i].canInvited) {
                    orderList.unshift(list[i])
                }
                break;
            }
        };
        orderList = orderList.filter( (ele, index) => {
            return !ele.canInvited
        })
        this.setState({
            inviteList: orderList
        })
        // this.setState({
        //     inviteList: lidt.filter( (ele, index) => {
        //         return !ele.canInvited;
        //     })
        // })
    }
    render () {
        return (
            <div className="wrapper">
                <SearchBar inviteList={this.state.inviteList} onFilterText={this.onFilterText.bind(this)}></SearchBar>
                <InviteList filterText={this.state.filterText} data={this.state.list} onTouchHandle={this.onTouchHandle.bind(this)}></InviteList>
            </div>
        )
    }
}

ReactDom.render(
    <App data={data}></App>,
    document.getElementById('root')
)