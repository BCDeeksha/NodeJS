import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//mongoDB connection

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

  // Order Schema
const orderSchema = new mongoose.Schema({
    name: String,
    address: String,
    email: String,
    items: [{ name: String, price: Number, quantity: Number }],
    createdAt: { type: Date, default: Date.now },
  });

  orderSchema.virtual("status").get(function () {
    const today = new Date();
    const orderDate = new Date(this.createdAt);
    const daysDiff = Math.floor((today - orderDate) / (1000 * 60 * 60 * 24));
  
    if (daysDiff === 0) return "In Progress";
    if (daysDiff === 1) return "Dispatched";
    if (daysDiff >= 2) return "Delivered";
    return "Pending";
  });
  
  const Order = mongoose.model("Order", orderSchema);

  app.get('/',(req,res)=>{
    res.render("index");
  })

  // POST Route to Save Order
  app.post('/submit',async(req,res)=>{
    try{
        const {name, address, email, itemName, itemPrice, itemQuantity} = req.body;

        // Convert items to an array of objects
        const items = itemName.map((name,index) => ({
            name,
            price : parseFloat(itemPrice[index]),
            quantity : parseInt(itemQuantity[index]),    
        }));

        const newOrder = new Order({ name, address, email, items });
        await newOrder.save();

        res.render("success", { name });
    } catch (error){
        res.status(500).send("Error saving order");
    }
  });

  //get order status as admin
  app.get("/admin", async (req, res) => {
    try {
      const orders = await Order.find();
      res.render("admin", { orders });
    } catch (error) {
      res.status(500).send("Error fetching orders");
    }
  });

  //send order status email to the user
  app.post("/send-email", async (req, res) => {
    const { email, status } = req.body;
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Order Status Update",
      text: `Hello,\n\nYour order status is currently: ${status}.\n\nThank you for shopping with us!`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error sending email");
      }
      res.send("Email sent successfully!");
    });
  });

app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`)
);