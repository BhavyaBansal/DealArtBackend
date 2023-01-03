const {Sequelize} = require('sequelize');
const createDB = new Sequelize('test-db','user','pass',{
    dialect:'sqlite',
    host:'./config/db.sqlite',
})
const connectDB = ()=>{
    createDB.sync().then(()=>{
        console.log("Connected to DB");
    })
    .catch((e)=>{
        console.log("DB Connection is failed",e);
    })
}
module.exports = {createDB,connectDB};