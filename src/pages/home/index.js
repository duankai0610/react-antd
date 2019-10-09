import React,{Component} from "react"
import axios from "axios";
export default class Home extends Component{
    render(){
        return (
            <div>Home</div>
        )
    }
    componentDidMount(){
        axios({
            method:"post",
            url:"/bk1912/student",
            data:{
                page:3,
                limit:10
            }
        }).then(data=>{
            console.log(data);
        })
        
    }
}