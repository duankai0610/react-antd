const Mock = require("mockjs");
const url = require("url");
let data = Mock.mock({
    "data|100": [{
        "id|+1":0,
        "username":"@cname"
    }]
})



// Mock.mock(/\/bk1912\/student/, "get",(options)=>{
//     console.log(options);
//     let {page,limit} = url.parse(options.url,true).query;

//     let arr = [];

//     for(var i=(page-1)*limit;i<(limit*page);i++){
//         arr.push(data.data[i]);
//     }


//     return arr;
// })



Mock.mock(/\/bk1912\/student/, "post",(options)=>{
        // console.log(options);
        // let {page,limit} = url.parse(options.url,true).query;
        console.log(options)

        
        let {page,limit} = JSON.parse(options.body);
        let arr = [];
    
        for(var i=(page-1)*limit;i<(limit*page);i++){
            arr.push(data.data[i]);
        }
    
    
        return arr;
})
    
