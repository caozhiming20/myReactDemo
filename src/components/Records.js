import React, { Component } from 'react';
//引入子组件record
import Record from './Record'
//引入record列表数据请求的接口
import {getRecords} from '../utlis/recordsAPI'
//引入 子RecordsForm
import RecordsForm from './recordsform'
//定义组件Records
import Amount from './AmountBox'
class Records extends Component {
    constructor(){
        super();
        //给这个组件初始化一些状态数据
        this.state={
            //空的表格数据列表
            records:[],
            //是否加载道数据
            isLoaded:false,
            // 错误信息
            err:null
    }
    }
    //这个事react生命周期的钩子，当这个组件挂载之后就执行
    componentDidMount(){
        //执行数据请求的接口
        getRecords().then(
            // 成功后的处理回调
            //更新这个组件的数据
            res=>this.setState({
                records:res.data,
                isLoaded:true
            })
        ).catch(
            // 对错误进行处理
            err=>this.setState({
            err,
            isLoaded:true
        })
        )

    }
    // 定义一个添加数据的函数
    addNewRecord(record){
        this.setState({
            isLoaded:true,
            err:null,
            //混合 结果是给records添加一天新的record数据
            records:[...this.state.records,record]
        })
    };
    // 定义一个更新recods数据列表的函数
    //PS：在我们给后台发送更改数据后，后台一般会返回给前段更改好的数据，
    //为了减轻服务器请求压力，一般是我们拿着这条后台返回的数据进行手动更新
    //更新一条数据需要2个参数,1，数据未更新前的数据，更新后，后台返回给我们的更新的数据
    //虽然后台的返回给我们的那条数据，和我们发送更改请求的那条数据一样，但是，我们一般使用后台返回的数据，以后台为准
    UpdateRecord(record,data){
        //获取旧数据在数据标的index
       const recordIndex=this.state.records.indexOf(record);
        const newRecords=this.state.records.map((item,index)=>{
            // 便利，执行map函数，更新数据
                if(index!==recordIndex){
                    return item;
                }
                //这种写法参见es6的解构赋值
                return {
                    ...item,
                    ...data
                }
        });
        //更新组件的statedata1,data2
       this.setState({
           records:newRecords
       })
    }
    DeleteRecord(data){
        const DeleteIndex=this.state.records.indexOf(data);
        const newRecords=this.state.records.filter((item,index)=>index!==DeleteIndex);
        this.setState({
            records:newRecords
        })
    }
    Credits(){
        //利用filter过滤不满足条件的数据，参数是一个函数
        let Credits=this.state.records.filter((record)=>{
            //返回需要的数据
            return record.Amount>=0;
        });
        // 将上面过滤后的数据用reduce方法进行累加运算
        //reduce 方法有个参数，1是一个函数，2是初始值
        // 参数函数也有2个参数，一个是当前的值，一个是之前的值
        return Credits.reduce((pre,curr)=>{
            return pre+Number.parseInt(curr.Amount,0)
        },0)
    }
    //解释同上
    Debits(){
        let Debits=this.state.records.filter((record)=>{
            return record.Amount<0;
        });
        return Debits.reduce((pre,curr)=>{
            return pre+Number.parseInt(curr.Amount,0)
        },0)
    }
    //将收入和支出相加得到balances
    Balances(){
        return this.Credits()+this.Debits();
    }
    render() {
        //根据不同的state进行渲染
        const {records,err,isLoaded}=this.state;
        let recordsComponent;
        if(err){
          recordsComponent=<div>Err:{err.message}</div>
        }else if(!isLoaded){
          recordsComponent= <div>isloading...</div>
        }else{
          recordsComponent= <div className="App">

                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>date</th>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*执行map,生成多个record子组件dom，handleEditRecord 向子组件传递一个回调函数，利用这个函数可以让子组件向父组建传递数据*/}
                        {records.map((record) =>
                            <Record
                                key={record.id}
                                record={record}
                                handleEditRecord={this.UpdateRecord.bind(this)}
                                handleDeleteRecord={this.DeleteRecord.bind(this)}
                            />
                        )}
                        </tbody>
                    </table>

                </div>
        };
        return (
            <div>
                <h1>Records</h1>
                <div className="row mb-3">
                    {/*//使用无状态组件 每次state改变时，都会重新运行render方法，此时我们这里的组件会被再次执行渲染*/}
                    <Amount text="Credits" type="success" amount={this.Credits()}/>
                    <Amount text="Debits" type="danger" amount={this.Debits()}/>
                    <Amount text="Balances" type="info" amount={this.Balances()}/>
                </div>
                <RecordsForm handleNewRecords={this.addNewRecord.bind(this)}/>
                {recordsComponent}
            </div>
        )
  }
}

export default Records;
