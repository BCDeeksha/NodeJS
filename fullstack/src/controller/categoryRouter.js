let express = require('express');
let categoryRouter = express.Router()

let data = [
    {
        "_id": "6187738a62a1816f8858634d",
        "id": 1,
        "category": "Clothes",
        "thumb":"test"
        },
        {
        "_id": "6187738a62a1816f8858634f",
        "id": 2,
        "category": "Phones",
        "thumb":"test1"
        },
        {
        "_id": "6187738a62a1816f88586350",
        "id": 3,
        "category": "Kitchen Items",
        "thumb":"test2"
        },
        {
            "_id": "6187738a62a1816f88586350",
            "id": 3,
            "category": "Footwear",
            "thumb":"test2"
            }
]
function router(){
    
    categoryRouter.route('/')
    .get((req,res) => {
        // res.send("This is the Category route")
        res.render('Category',{title:'Category Page',category:data})
})

categoryRouter.route('/details')
    .get((req,res) => {
        res.send('Details of category')
})


categoryRouter.route('/abc')
    .get((req,res) => {
        res.send('Details of category')
})
return categoryRouter;
}

module.exports = router
