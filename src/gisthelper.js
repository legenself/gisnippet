var fs = require('fs');
// const axios = require("axios");
// const co =require('co');

// let http = require("http"); // 引入http模块
// const { resolve } = require('path');


// /**
//  * http模块发送请求
//  * @param host
//  * @param port
//  * @param route
//  * @param headers
//  * @param encoding 可选值： utf8 binary
//  */
// function sendHttpRequest(url) {
//     let options = {
//         hostname: url,  
//         method: 'GET', 
//     };
    
//     let data = '';
//     return new Promise(function (resolve, reject) {
//         let req = http.request(options, function(res) {
//             res.setEncoding(encoding);
//             res.on('data', function(chunk) {
//                 data += chunk;
//             });
 
//             res.on('end', function() {
//                 resolve({result: true, data: data});
//             });
//         });
 
//         req.on('error', (e) => {
//             resolve({result: false, errmsg: e.message});
//         });
//         req.end();
//     });
// }
 

// async function getContent(url) {
//   var data=co(function* () {
//     let req_res = yield sendHttpRequest(url);
//     // console.log(req_res);
//   }); 
  
//   // console.log('a',data)
//   return axios.get(url) 
// }
// console.log(getContent('https://gist.githubusercontent.com/legenself/fead30ca04b635d06a52024910605763/raw/29be909933c8a324eab96587a41b43b9c2c5c5fe/ee.js')
// )
module.exports.save = function(name,content,dir) {
  return new Promise((resolve)=> fs.writeFile(dir+'\\'+name,JSON.stringify( content),resolve))
}
module.exports.convert = function(files) {
    var snippets = {};
    var tasks=[]
    Object.keys(files).forEach(filename => {
      if(files[filename].content){
        snippets[filename] = {
          "prefix": filename,
          "body": files[filename].content.split('\n'),
          "description": filename
        }
      }
        // tasks.push(new Promise((resolve,reject)=> {
          
        //   axios.get(files[filename].raw_url).then(res=>{
        //   resolve( snippets[filename] = {
        //     "prefix": filename,
        //     "body":res.data.split('\n'),
        //     "description": filename
        //   })
        // }).catch(res=>reject(res))})
        
        // )
      else{
        console.log(files[filename])
      }

    })
    // Promise.all(tasks).then(res=>{
    //   console.log(res)
    // })
    return snippets

}