import fetch from "node-fetch";
//var express = require('express');
import express from "express";
import cors from 'cors'

var app = express();
app.listen(5501, () => console.log('Conectado'))

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use(express.static('public'));

const options = {
method: 'GET',
json: true,
headers: {
    'User-Agent': 'request'
}
};

app.get('/api/:label', async (request, response) => {
  console.log(request.params);
  const label = request.params.label;
  console.log(label); 
    
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${label}&apikey=0ZWXW9IYMFL3DR7W`;
  const fetch_response = await fetch(url, options);
  const dat = await fetch_response.json();
  response.json(dat);
});
 