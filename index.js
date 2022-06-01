const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = 5000;

//app ar por middleware
app.use(cors());
app.use(express.json());


// user=  mydbuser1
// password = jeIm7EF8EzdwArHM


const uri = "mongodb+srv://mydbuser1:jeIm7EF8EzdwArHM@cluster0.jn8rg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
      await client.connect();
      const database = client.db("foodMaster");
      const usersCollection = database.collection("users");
      // create a document to insert

      //GET API
      app.get('/users',async(req,res)=>{
        const cursor = usersCollection.find({});
        const users  = await cursor.toArray();
        res.send(users);
      })

      app.get('/users/:id',async(req,res)=>{
       const id  =  req.params.id;
       const query = {_id: ObjectId(id)};
       const user = await usersCollection.findOne(query);
       console.log('loge user with id : ',id);
       res.send(user);

      })
       

      //POST API
      app.post('/users', async(req,res)=>{
        const newUser =  req.body;
        const result = await  usersCollection.insertOne(newUser);
        console.log('Got new users ',req.body);
        console.log('added user ',result);
        res.json(result);
      })

      // DELETE API
     app.delete('/users/:id', async(req,res)=>{
       const id = req.params.id;
       const query = {_id: ObjectId(id)};
       const result = await  usersCollection.deleteOne(query);
       
       console.log('Deleting users with id ', result);
       res.json(result);     
     })

     
    

    } finally {
    //  await client.close();
    }
  }
  run().catch(console.dir);





app.get('/',(req,res)=>{
    res.send('now  Runing my CRUD server');
})

app.listen(port,()=>{
   console.log('Runingt server on port ',port )
})