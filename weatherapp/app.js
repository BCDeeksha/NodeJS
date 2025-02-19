// let express = require("express");
// let request = require("request");
// let dotenv = require("dotenv")

import express from 'express';
import request from 'request';
import dotenv from 'dotenv';

dotenv.config()
let port = process.env.PORT || 7660;
let app = express();

app.get('/weather',(req,res)=>{
    let city = req.query.city?req.query.city:'Delhi';
    // console.log(city);
    // console.log(req.query);
    let url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=${process.env.KEY}`
    //api calling
    request(url,(err,response)=>{
        if(err) throw err;
        const output = JSON.parse(response.body)
        res.send(output)
    })
})

app.listen(port,(err)=>{
    if(err) throw err;
        console.log(`Server is running on port ${port}`)
})