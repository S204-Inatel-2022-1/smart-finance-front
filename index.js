const express = require('express')
const app = express()
const path = require('path');
//const router = express.Router();

const port = process.env.PORT || 5000

app.use(express.json())

app.listen(port)

app.use(express.static(__dirname+'/HomePage/'));

app.get('/',function(req,res){
  res.sendFile('index.html', { root: 'HomePage' });
});