import React, { Component } from 'react';
import {CreateRecords} from "../utlis/recordsAPI";

class RecordForm extends Component {
    constructor(){
        super();
        //同上个组件
        this.state={
            date:"",
            Title:"",
            Amount:""
        }
    }
    // 定义一个检测是否为可点击的函数
    valid(){
        return this.state.date&&this.state.Title&&this.state.Amount
    }
    //由于input的value 与state关联了。所以在我们输入时，我们会发现不管输入什么都不只会显示默认 的state值，
    //这是因为我们的state 没有改变。所以我们需要一个坚听inout的change事件去改变state
    //定义一个在value change时执行的函数
    handleChange(e){
            // e.target是一个对象
        // 从事件对象里面取到对应元素的name 和value
        //我们在设置的适合，每个对应元素的name 和state 是相互对应的
        //所以我们可以直接使用name 改变state
        const {name, value} = e.target;
        this.setState({[name]: value});
    }
    handleSubmit(e){
        //阻止默认的事件行为
        e.preventDefault();
        // 定义新添加数据时的参数，这个参数从state 中提取
        let data={
            "date":this.state.date,
            "Title":this.state.Title,
            //数据格式转化
            "Amount":Number.parseInt(this.state.Amount,0)
        };
        // 发送请求后，清空组件，恢复到默认状态
        this.setState({
            date:"",
            Title:"",
            Amount:""
        });
        //请求添加数据的接口
        CreateRecords(data).then(
            res=>{
                // 接口请求成功后，子组件向父组件传递数据
                this.props.handleNewRecords(res.data);
            }
        ).catch(
            err=>console.log(err)
        );
    }
    render() {
        return (
            <form className="form-inline mb-1" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group mr-1">
                    <input type="text" onChange={this.handleChange.bind(this)} className="form-control" name="date" placeholder="date" value={this.state.date}/>
                </div>
                <div className="form-group mr-1">
                    <input type="text" onChange={this.handleChange.bind(this)} className="form-control" name="Title" placeholder="Title" value={this.state.Title}/>
                </div>
                <div className="form-group mr-1">
                    <input type="text" onChange={this.handleChange.bind(this)} className="form-control" name="Amount" placeholder="Amount" value={this.state.Amount}/>
                </div>
                <div className="form-group mr-1">
                   <button type="submit" className="btn btn-primary" disabled={!this.valid()}> Create</button>
                </div>
            </form>
        );
    }
}
export default RecordForm;

