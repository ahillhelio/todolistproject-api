const MongoClient = require('mongodb').MongoClient;
//const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

const url = process.env.DB_URL;

const dbName = "fourthcrudproject";
const colName = "todolist";
const settings = { useUnifiedTopology: true }

const createEntry = (entry) => {
    const iou = new Promise ((resolve,reject) => {         
        MongoClient.connect(url, settings, async function (err,client){
            if(err){
                console.log("This is that 404 we were talking about");
                reject(err);      
            } else{
                console.log("Connected successfully to server to POST a new Entry");
                const db = client.db(dbName);
                const collection = db.collection(colName)
                collection.insertMany (entry, (err, result) => {
                    if(err){
                        reject(err);  
                    } else {
                        resolve(result.ops); 
                        client.close();
                    }
                })
            }
        })
    });
    return iou 
}

const getEntry = () => { 
    const iou = new Promise ((resolve,reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if(err){
                reject(err);
            } else {
                console.log("Connected successfully to GET Catalog Entry");
                const db = client.db(dbName); 
                const collection = db.collection(colName); 
                collection.find({}).toArray(function(err, docs) {
                        if (err) {
                            reject(err);
                        } else { 
                            console.log("Found the Following");
                            console.log(docs);
                            resolve(docs);
                            client.close();
                        }        
                });    
            }
        });
    });
    return iou;
}

module.exports = {
    createEntry,
    getEntry
}