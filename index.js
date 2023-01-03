const express = require('express');
const app = express();

//middlewares
app.use(express.json());
app.use(express.static('content'));
app.use()

const PORT = 1338;
app.listen(PORT,()=>{
    console.log("Server is running");
})