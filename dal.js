// const MongoClient = require('mongodb').MongoClient;
//const url         = 'mongodb://localhost:27017';
const querystring = require("querystring")
const { ServerApiVersion } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const password = 'manutd14';
const url = 'mongodb+srv://adminuser:' + querystring.escape(password) + '@cluster0.7nym24f.mongodb.net/?retryWrites=true&w=majority';
let db            = null;


// const uri = "mongodb+srv://sijju:manutd14@cluster0.7nym24f.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     console.log("ERR", err);
//   const collection = client.db("redbank").collection("users");
//   // perform actions on the collection object

//   client.close();
// });


//https://data.mongodb-api.com/app/data-jebxu/endpoint/data/v1
//Ae7o84q5SJcTlR8qaLIsrqpgHq6F06GzowEW1vCquHgm6qfslSMut6pqdphjwkb4
 
// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    // connect to myproject database
    // = client.db('redbank');
    if(client){
        db = client.db('redbank');
        console.log("Connected successfully to db server");
    }else{
        console.log(err);
    }
   
});

// const mclient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// mclient.connect(err => {
//   db = mclient.db("redbank")
//   const collection = db.collection('users');
//   console.log(collection);
//   // perform actions on the collection object
//   mclient.close();
// });

// create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db.collection('users').find({email: email}).toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// update - deposit/withdraw amount
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


module.exports = {create, findOne, find, update, all};