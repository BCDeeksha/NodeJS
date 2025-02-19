let express = require('express');
let productRouter = express.Router()
let {getData} = require('./dbcontroller')


function router(menu) {

    productRouter.route('/')
    .get(async(req,res) => {
        // res.send("This is the Product route")
        let query = {};
        let data = await getData('products',query)
        res.render('Product',{title:'Product Page',products:data,menu})
})

productRouter.route('/list/:id')
    .get(async(req,res) => {
        // let id = req.params.id
        // let name = req.params.name
        // destructuring 
        // let {id,name} = req.params
        let {id} = req.params
        // console.log(id);
        // console.log(name);
        let query = {"category_id":Number(id)}
        let data = await getData('products',query)
        res.render('Product',{title:'Product Page',products:data,menu})
        res.send('Details of Products')
})

return productRouter

}

module.exports = router