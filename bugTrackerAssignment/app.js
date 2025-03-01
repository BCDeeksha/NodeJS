const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const moment = require("moment");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Enable JSON parsing for API requests
app.use(express.urlencoded({ extended: true })); // Enable form submissions

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));  // Views directory

mongoose.connect("mongodb://localhost:27017/bugtracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const bugSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: String, default: moment().format("HH:mm:ss") },
  date: { type: String, default: moment().format("YYYY-MM-DD") },
  assignee: String,
  createdAt: { type: Date, default: Date.now },
  assignedAt: { type: Date, default: Date.now },
  status: { type: String, default: "Open" },
});

const Bug = mongoose.model("Bug", bugSchema);

// Route to render EJS view
app.get("/", async (req, res) => {
    try {
        const bugs = await Bug.find();  // Fetch bugs from MongoDB
        res.render("index", { bugs });  // Pass bugs data to index.ejs
    } catch (error) {
        res.status(500).send("Error fetching bugs.");
    }
});

// Route to handle adding a bug (POST request)
app.post("/addBug", async (req, res) => {
    try {
        const { title, description, assignee } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: "Title and description are required." });
        }

        const newBug = new Bug({
            title,
            description,
            assignee,
            time: moment().format("HH:mm:ss"),
            date: moment().format("YYYY-MM-DD"),
            createdAt: new Date(),
            assignedAt: new Date(),
            status: "Open",
        });

        await newBug.save();
        res.redirect("/");  // Redirect back to the main page after adding bug
    } catch (error) {
        console.error("Error saving bug:", error);
        res.status(500).send("Internal server error.");
    }
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));