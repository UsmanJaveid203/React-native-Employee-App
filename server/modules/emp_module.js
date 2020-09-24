const mongoose = require('mongoose');
require('dotenv').config();
var dburl=process.env.MONGO_DB_URL;
mongoose.connect(dburl, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var EmpSchema =new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    picture:String,
    salary:String,
    position:String,
});

    
var empModel = mongoose.model('Emp_data', EmpSchema);
module.exports=empModel;