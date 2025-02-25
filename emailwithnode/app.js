let nodemailer = require('nodemailer');
let dotenv = require('dotenv');
dotenv.config();

let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'deekshabhargav529@gmail.com',
        pass:process.env.KEY
    }
})

let mailOption = {
    from:'deekshabhargav529@gmail.com',
    to:'deekshabc84@gmail.com',
    subject:'Sending email using nodejs',
    text:'This is node Feb Batch'
}

transporter.sendMail(mailOption,(err,info) => {
    if(err) console.log(err);
    else{
        console.log(`Email send :${info.response}`)
    }
})