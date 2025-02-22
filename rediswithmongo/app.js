import {createClient} from "redis";
import express from "express";
import {MongoClient} from "mongodb";
const app = express();
const port = process.env.PORT || 8709;
const murl = "mongodb://localhost:27017";
const mClient = new MongoClient(murl);


//ejs file path
app.set('views','./src/views')
// view engine
app.set('view engine','ejs')

const redisHost = "redis-16673.crce182.ap-south-1-1.ec2.redns.redis-cloud.com";  
const redisPort = 16673;  
const redisPassword = process.env.password;  

let client = createClient({
    url: `redis://${redisHost}:${redisPort}`,
    password: redisPassword,
})

client.on('error',err=> console.log('Redis client error',err))

async function main(){
    await client.connect();
    await mClient.connect();
}

const collection = mClient.db('febnode').collection('category')

app.get('/', (req, res) => {
    res.render('index');  // Renders the EJS view for input
  });

app.get('/data', async(req,res) =>{
    const key = req.query.key;  // Assuming the key is passed as a query parameter
    if (!key) {
        return res.send('No key provided');
    }
        const redisResult = await client.get(key);
        const mongoResult = await collection.findOne({ category: key });

        // Check Redis first
        if (redisResult) {
            return res.send(`Key found in Redis: ${redisResult}`);
        }else if (mongoResult) { // If not found in Redis, check MongoDB
            return res.send(`Key found in MongoDB: ${mongoResult.message}`);
        } else {
            return res.send('Key not found in Redis or MongoDB');
        }
})

app.listen(port,() =>{
    main();
    console.log(`Running on port ${port}`)
})