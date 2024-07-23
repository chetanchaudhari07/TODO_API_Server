const fs = require("fs")
const logger = (req,res,next)=>{
    let log = (req.method);
    fs.appendFileSync("./res.txt",log+"\n","utf-8")
   next();
}


module.exports = logger