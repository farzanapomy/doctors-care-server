
const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8ezqf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const ObjectId = require("mongodb").ObjectId;


console.log(uri);


async function run() {
    try {
        await client.connect()
        const database = client.db('doctors-care')
        const serviceCollection = database.collection('services')
        const doctorsCollection = database.collection('doctors')
        const usersCollection = database.collection('users')
        const appointmentsCollection = database.collection('appointments');
        const reviewCollection = database.collection('reviews')
        console.log('hello');


        app.get('/services/:id', async (req, res) => {
            const id = req.params.id
            const query = { '_id': ObjectId(id) }
            const result = await serviceCollection.findOne(query)
            res.json(result)
        })



        // doctors section 
        app.post('/doctors', async (req, res) => {
            const data = req.body;
            const result = await doctorsCollection.insertOne(data)
            console.log(result);
            res.json(result)
        })

        app.get('/doctors', async (req, res) => {
            const cursor = doctorsCollection.find({});
            const doctors = await cursor.toArray();
            res.send(doctors);
        })




        // appointments 
        app.post('/appointments', async (req, res) => {
            const appointment = req.body;
            const result = await appointmentsCollection.insertOne(appointment);
            console.log(result);
            res.json(result)
        });

        app.get('/appointments', async (req, res) => {
            const cursor = appointmentsCollection.find({});
            const appointment = await cursor.toArray();
            res.json(appointment)
        })

        app.delete('/appointments/:id', async (req, res) => {
            const id = req.params.id
            const query = { '_id': ObjectId(id) }
            const result = await appointmentsCollection.deleteOne(query)
            res.json(result)
        })


        app.put('/appointments/:id', async (req, res) => {
            const id = req.params.id
            const status = req.body.status
            const filter = { '_id': ObjectId(id) }
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    status: status
                }
            }
            const result = await appointmentsCollection.updateOne(filter, updateDoc, options)
            res.json(result)
        })




        // add services 
        app.post('/services', async (req, res) => {
            const data = req.body;
            const result = await serviceCollection.insertOne(data)
            console.log(result);
            res.json(result)
        })

        app.get('/services', async (req, res) => {
            const cursor = serviceCollection.find({});
            const result = await cursor.toArray();
            res.json(result)
        })

        app.delete('/services/:id', async (req, res) => {
            const id = req.params.id
            const query = { '_id': ObjectId(id) }
            const result = await serviceCollection.deleteOne(query)
            res.json(result)
        })

        app.put('/services/:id', async (req, res) => {
            const id = req.params.id
            const data = req.body
            const filter = { '_id': ObjectId(id) }
            const options = { upsert: true };
            const updateDoc = {
                $set: data
            }
            const result = await serviceCollection.updateOne(filter, updateDoc, options)
            res.json(result)
        })


        // review section 
        app.post('/reviews', async (req, res) => {
            const data = req.body;
            const result = await reviewCollection.insertOne(data)
            console.log(result);
            res.json(result)
        })

        app.get('/reviews', async (req, res) => {
            const email = req.query.email
            const status = req.query.status
            const query = { email: email }
            const statusApprove = { status: status }
            let cursor;
            if (email) {
                cursor = reviewCollection.find(query)
            } else if (status) {
                cursor = reviewCollection.find(statusApprove)
            }
            else {
                cursor = reviewCollection.find({})
            }
            const result = await cursor.toArray()
            res.send(result)
        })



        //status update
        app.put('/reviews/:id', async (req, res) => {
            const id = req.params.id
            const status = req.body.status
            const filter = { '_id': ObjectId(id) }
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    status: status
                }
            }
            const result = await reviewCollection.updateOne(filter, updateDoc, options)
            res.json(result)
        })



        //add user 
        app.post('/users', async (req, res) => {
            const data = req.body
            const result = await usersCollection.insertOne(data)
            console.log(result);
            res.json(result)
        })


        //make admin 
        app.put('/users/admin', async (req, res) => {
            const email = req.body.email
            const filter = { email: email }
            const updateDoc = {
                $set: {
                    role: "admin"
                }
            }
            const result = await usersCollection.updateOne(filter, updateDoc)
            res.json(result)
        })


        //get admin 
        app.get('/users/:email', async (req, res) => {
            const email = req.params.email
            const query = { email: email }
            const user = await usersCollection.findOne(query)
            let isAdmin = false;
            if (user?.role === 'admin') {
                isAdmin = true
            }
            res.json({ admin: isAdmin })
        })
    }
    finally {
        // await client.close()
    }
}

run().catch(console.dir)
