//无状态组件，不需要引入｛Component｝
import React from 'react';
//定义一个AmountBOX，利用函数返回组件，里面传的参数是从引用那里传过来的数据
const AmountBox=({text,type,amount})=>{
    return(
        <div className="col">
            <div className="card">
                {/*模板字符串使用反引号 (` `) */}
                {/*来代替普通字符串中的用双引号和单引号。*/}
                {/*模板字符串可以包含特定语法(${expression})的占位符。*/}
                {/*占位符中的表达式和周围的文本会一起传递给一个默认函数，*/}
                {/*该函数负责将所有的部分连接起来，如果一个模板字符串由表达式开头，*/}
                {/*则该字符串被称为带标签的模板字符串*/}
                <div className={`card-header bg-${type} text-white`}>
                    {text}
                </div>
                <div className="card-body">
                    {amount}
                </div>
            </div>
        </div>
    )
}
export default AmountBox;