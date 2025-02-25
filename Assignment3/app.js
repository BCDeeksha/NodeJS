import express from "express";
import fs from "fs";
import fetch from "node-fetch";
let PORT = 3000;
let app = express();

const employees = JSON.parse(fs.readFileSync("employees.json"));
const projects = JSON.parse(fs.readFileSync("projects.json"));

// API to get employee details by ID
app.get('/employee/:id',(req,res)=>{
    const employee = employees.find(emp => emp.id === parseInt(req.params.id));
    if(employee){
        res.json(employee);
    } else{
        res.status(404).json({error: "Employee Not found"});
    }
    })

    // API to get project details by ID
app.get('/project/:id',(req,res)=>{
    const project = projects.find(proj => proj.projectID === parseInt(req.params.id));
    if(project){
        res.json(project);
    } else {
        res.status(404).json({error: "Project Not found"});
    }
})

// API to get complete employee details including project info

app.get('/getemployeedetails/:id', async(req,res)=>{
    try{
        const response = await fetch(`http://localhost:${PORT}/employee/${req.params.id}`)
        if(!response.ok) throw new Error("Employee Not found")
            const employee = await response.json();

        const ProjectResponse = await fetch(`http://localhost:${PORT}/project/${employee.projectID}`)
        if(!ProjectResponse.ok) throw new Error("Project Not found")
            const project = await ProjectResponse.json();

        res.json({
            employee,
            project
        });
    } catch(error){
        res.status(404).json({error: error.message})
    }
});

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
})