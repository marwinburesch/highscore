const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "intro";

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
async function initDb() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const inventoryCollection = db.collection("inventory");

  const cursor = inventoryCollection
    .find({}, { fields: { tags: false } })
    .limit(2);

  const inventories = await cursor.toArray();
  console.log(inventories);

  const inventory = await inventoryCollection.findOne({ item: "canvas" });

  console.log(inventory);
  client.close();
}

initDb();
