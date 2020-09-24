var express = require('express');
var body_parser = require('body-parser');
var EmployeeApi = require('./Api/Employee');
var cors = require('cors')

var app = express();

app.use(cors());
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept,Authorization"
//     );
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
//     next();
// });

app.use(body_parser.json());

app.use('/Api',EmployeeApi);

app.listen(5000,()=>{
    console.log("Server Running..........")
})




// 6Cu1jR9pzPDsHHPI => password