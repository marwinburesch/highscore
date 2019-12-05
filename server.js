const dotenv = require("dotenv");
const express = require("express");

dotenv.config();

const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = process.env.MONGO_URL;

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

const app = express();
const port = 8081;

app.get("/", (_request, response) => {
  response.send("Konitschiwa bitches");
});

app.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}`);
});
