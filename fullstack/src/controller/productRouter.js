let express = require('express');
let productRouter = express.Router()

let data = [
    {
        "_id": "6187738a62a1",
        "id": 1,
        "name": "Jeans",
        "products":"Jeans",
        "image":"test1"
        },
        {
        "_id": "6187738a62a1",
        "id": 2,
        "name": "Apple",
        "products":"Apple",
        "image":"test2"
        },
        {
        "_id": "6187738a62a1",
        "id": 3,
        "name": "Cooker",
        "products":"Cooker",
        "image":"test3"
        }
]

function router() {

    productRouter.route('/')
    .get((req,res) => {
        // res.send("This is the Product route")
        res.render('Product',{title:'Product Page',product:data})
})

productRouter.route('/details')
    .get((req,res) => {
        res.send('Details of Products')
})

return productRouter

}

module.exports = router