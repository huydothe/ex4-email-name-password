const fs= require('fs');
const qs=require('qs');
const http = require('http');

const server = http.createServer((req,res)=>{
    if(req.method === "GET"){
        fs.readFile('./src/demo.html','utf-8', (err, data)=>{
            res.writeHead(200, {"Content-Type" : "text/html"});
            res.write(data);
            return res.end();
        });
    }else {
        let data='';
        req.on('data',(chunk)=>{
            data+=chunk;
        })
        req.on('end',()=>{
            const userInfo = qs.parse(data);
            fs.readFile('./src/info.html',"utf-8",(err,datahtml)=>{
                if(err){
                    console.log(err);
                }else {
                    datahtml=datahtml.replace("{name}",userInfo.name);
                    datahtml=datahtml.replace("{email}",userInfo.email);
                    datahtml=datahtml.replace("{password}",userInfo.password);
                    res.writeHead(200, {"Content-Type" : "text/html"});
                    res.write(datahtml);
                    return res.end();
                }
            })
        })
        req.on("error",()=> console.log("error"))
    }
})

server.listen(8080,()=>{
    console.log("Server running at localhost: 8080")
})