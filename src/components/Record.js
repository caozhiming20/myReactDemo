import React, { Component } from 'react';
// 数据props传递时进行检测的库
import PropTypes from 'prop-types';
//从引入更新records的请求api方法
import {UpdateRecords,DeleteRecords} from "../utlis/recordsAPI";
//定义record 组件
class Record extends Component {
    constructor(){
        super();
        //定义初始的是否可编辑状态
        this.state={
         edit:false
        }
    }
    //定义，recordRow和recordForm 2 个函数。对应着分别显示是是否可编辑状态所显示的组件
    recordRow(){
      return(  <tr>
          {/*
          defaultValue 代表的是默认的input的值
          this.props.record 获取的是从父组件传过来的record 数据
          ref 是用来获取对应的元素的this.refs.名字 获取的 是对应ref=名字 元素
          给对应的元素加上事件是用的onClick={this.函数名.bind(this)}
          代表的是点击的时候执行这个组件里面的函数，绑定道这个函数上
          */}


          <td><input type="text" className="form-control" defaultValue={this.props.record.date} ref="date"/></td>
          <td><input type="text" className="form-control" defaultValue={this.props.record.Title} ref="Title"/></td>
          <td><input type="text" className="form-control" defaultValue={this.props.record.Amount} ref="Amount"/></td>
          <td>
              <button className="btn btn-info mr-1" onClick={this.handleUpdate.bind(this)}>update</button>
              <button className="btn btn-danger mr-1" onClick={this.handleToggleEdit.bind(this)}>cancel</button>
          </td>
      </tr>)
    }
    recordForm(){
        return  (<tr>
            {/* 同上*/}
            <td>{this.props.record.date}</td>
            <td>{this.props.record.Title}</td>
            <td>{this.props.record.Amount}</td>
            <td>
                <button className="btn btn-info mr-1" onClick={this.handleToggleEdit.bind(this)}>Edit</button>
                <button className="btn btn-danger mr-1" onClick={this.handleDeleteRecords.bind(this)}>Delete</button>
            </td>
        </tr>)
    }
    // 定义一个点击更新数据的函数
    handleUpdate(e){
        //阻止默认的点击行为
        e.preventDefault();
        //将input里面的value 利用this.refs.对应的名字.value 获取到，
        //组装成请求参数
        let params={
            date:this.refs.date.value,
            Title:this.refs.Title.value,
            //将获取道的value值的数据类型精心处理，处理成number
            Amount:Number.parseInt(this.refs.Amount.value,0)
        };
        //执行数据更新接口，数据更新一般需要2个请求的数据。
        //1.需要更新的数据对应的索引，2新的数据
        UpdateRecords(this.props.record.id,params).then(
            //成功后的回调
            //这里是向父组件传递数据
            //ps ： 向父组件传递数据 首先 在父组件里向自组建传递一个回调函数，这个函数的定义是在父组件中定义的；
            // 然后子组件用this.props.传递过来的数据名称（data）获取道传递果来的函数向父组件传递数据
            //然后在父组件定义的那个回调函数中对子组件传递过来的数据进行处理
            res=>{this.props.handleEditRecord(this.props.record,res.data)},
            //将编辑状态改为不可编辑
            this.setState({edit:false})
        ).catch(
            // 打印错误的信息
            err=>console.log(err)
        )
    }
    //定义切换编辑状态的函数
    handleToggleEdit(){
        //设置state 使用的是this.setState({状态名称：新的状态值})
        this.setState({
            edit:!this.state.edit
        })
    }
    handleDeleteRecords(e){
        e.preventDefault();
        DeleteRecords(this.props.record.id).then(
            //将删除的数据返回道父组件
            //将本条数据传递过去
            res=>{this.props.handleDeleteRecord(this.props.record)}
        ).catch(
            err=>console.log(err)
        )
    }
    render() {
        //根据编辑状态执行不同的函数，返回不同的需要渲染的dom结构
        return this.state.edit? this.recordRow() : this.recordForm();
    }
}
export default Record;
//规范propsTypes 数据传递时的数据类型
Record.propTypes = {
    id:PropTypes.string,
    Title:PropTypes.string,
    date:PropTypes.string,
    Amount:PropTypes.number
};
