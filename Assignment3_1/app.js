import express from 'express';
import fetch from "node-fetch";
import dotenv from 'dotenv';

dotenv.config()
let port = process.env.PORT || 7660;
let app = express();
const API_URL = "http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees";

app.get('/employees',async(req,res)=>{
    try{
        const response = await fetch(API_URL);
        const data = await response.json();

        const employees = data.map(emp => ({
            id: emp.id,
            name: emp.name,
            createdAt: emp.createdAt 
        }));
        res.json(employees);
    } catch (error){
        res.status(500).json({ error: "Error fetching data" });
    }
})

app.listen(port,(err)=>{
    if(err) throw err;
        console.log(`Server is running on port ${port}`)
})