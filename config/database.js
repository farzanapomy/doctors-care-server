// const { MongoClient } = require('mongodb');
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fjoai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



// console.log(uri);


// async function run() {
//     try {
//         await client.connect()
//         const database = client.db('doctors-care')
//         const doctorsCollection = database.collection('doctors')
//         const usersCollection = database.collection('users')
//         console.log('hello');


//         app.get('/blogs/:id', async (req, res) => {
//             const id = req.params.id
//             const query = { '_id': ObjectId(id) }
//             const result = await blogCollection.findOne(query)
//             res.json(result)
//         })

//         app.post('/doctors', async (req, res) => {
//             const data = req.body;
//             const result = await doctorsCollection.insertOne(data)
//             res.json(result)
//         })

//         app.delete('/blogs/:id', async (req, res) => {
//             const id = req.params.id
//             const query = { '_id': ObjectId(id) }
//             const result = await blogCollection.deleteOne(query)
//             res.json(result)
//         })
//         app.put('/blogs/:id', async (req, res) => {
//             const id = req.params.id
//             const data = req.body
//             const filter = { '_id': ObjectId(id) }
//             const options = { upsert: true };
//             const updateDoc = {
//                 $set: data
//             }
//             const result = await blogCollection.updateOne(filter, updateDoc, options)
//             res.json(result)
//         })

//         app.get('/blogs', async (req, res) => {
//             const email = req.query.email
//             const status = req.query.status
//             const query = { email: email }
//             const query2 = { status: status }
//             let cursor;
//             if (email) {
//                 cursor = blogCollection.find(query)
//             } else if (status) {
//                 cursor = blogCollection.find(query2)
//             }
//             else {
//                 cursor = blogCollection.find({})
//             }
//             const result = await cursor.toArray()
//             res.send(result)
//         })

//         //status update
//         app.put('/blogs/:id', async (req, res) => {
//             const id = req.params.id
//             const status = req.body.status
//             const filter = { '_id': ObjectId(id) }
//             const options = { upsert: true };
//             const updateDoc = {
//                 $set: {
//                     status: status
//                 }
//             }
//             const result = await blogCollection.updateOne(filter, updateDoc, options)
//             res.json(result)
//         })

//         //add user api
//         app.post('/users', async (req, res) => {
//             const data = req.body
//             const result = await usersCollection.insertOne(data)
//             res.json(result)
//         })


//         //get admin api
//         app.get('/users/:email', async (req, res) => {
//             const email = req.params.email
//             const query = { email: email }
//             const user = await usersCollection.findOne(query)
//             let isAdmin = false;
//             if (user?.role === 'admin') {
//                 isAdmin = true
//             }
//             res.json({ admin: isAdmin })
//         })
//     }
//     finally {
//         // await client.close()
//     }
// }

// run().catch(console.dir)
