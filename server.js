const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()


let db, 
    dbConnectionStr = process.env.MONGODB_URI,    //this is the connection string that is set up in the env file
    dbName = 'todo'

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',async (request, response)=>{ //this grabs everything from the mongodb to be sent to the ejs file
    const todoItems = await db.collection('todos').find().toArray()
    const itemsLeft = await db.collection('todos').countDocuments({completed: false})
    response.render('index.ejs', { items: todoItems, left: itemsLeft })
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })   //here is the order to render the ejs
    //     })
    // })
    // .catch(error => console.error(error))
})


app.get('/', async (request, response) => {
    try {
        const todoItems = await db.collection('todos').find().toArray()
        
        // Calculate total cash available (sum of prices of non-completed tasks with valid price)
        const totalCash = todoItems
            .filter(item => !item.completed && item.price && !isNaN(item.price))  // Only include items with a valid price
            .reduce((sum, item) => sum + parseFloat(item.price), 0)  // Sum the prices, ensuring they're parsed as floats

        // Get the number of incomplete tasks
        const itemsLeft = await db.collection('todos').countDocuments({completed: false})
        
        response.render('index.ejs', { items: todoItems, left: itemsLeft, totalCash: totalCash })
    } catch (error) {
        console.error(error)
        response.status(500).send('Error fetching data')
    }
})
/*
app.post('/addTodo', (request, response) => {
    const { todoItem, price } = request.body
    const priceValue = parseFloat(price) || 0  // Ensure price is a valid number, default to 0 if not

    db.collection('todos').insertOne({ thing: todoItem, completed: false, price: priceValue }) // Adds new task with price
    .then(result => {
        console.log('Todo Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/markComplete', (request, response) => {
    db.collection('todos').updateOne(
        { thing: request.body.itemFromJS }, // Find task by name
        {
            $set: { completed: true }         // Mark task as completed
        }
    )
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')
    })
    .catch(error => console.error(error))
})

app.put('/markUnComplete', (request, response) => {
    db.collection('todos').updateOne(
        { thing: request.body.itemFromJS }, // Find task by name
        {
            $set: { completed: false }        // Mark task as incomplete
        }
    )
    .then(result => {
        console.log('Marked UnComplete')
        response.json('Marked UnComplete')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteItem', (request, response) => {
    db.collection('todos').deleteOne({ thing: request.body.itemFromJS }) // Delete task by name
    .then(result => {
        console.log('Todo Deleted')
        response.json('Todo Deleted')
    })
    .catch(error => console.error(error))
})

*/
app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

//cant login to github to upload problem today, will do two tomorrow!