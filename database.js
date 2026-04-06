const { MongoClient } = require('mongodb');
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// Change DNS


// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url ="mongodb+srv://namasteDev:gauravsirari@namastedev.lfsu0rp.mongodb.net/";
const client = new MongoClient(url);

// Database Name
const dbName = 'helloWorld';


async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('User');

  const data =     {
    firstname : "Soni",
    lastname : "Bagadwal",
    city : "Almora",
    phoneNumber : "7983965308",
      }
  
      const insertResult = await collection.insertMany([data]);
console.log('Inserted documents =>', insertResult);

  
  const findResult = await collection.find({}).toArray();
console.log('Found documents =>', findResult);


  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());