const express = require('express')

const PORT ='8080';
const HOST ='127.0.0.1';

const app = express();

app.get('/',(req,res)=>{
    res.send('안녕')
})


app.listen(PORT)
console.log('server start')