const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://userNameOP:17102006om@cluster0.05uptec.mongodb.net/";
const client = new MongoClient(uri);

let collection;

async function connectDB() {
  await client.connect();
  const db = client.db("sample_mflix");
  collection = db.collection("cards");
  console.log("Mongo Connected ✅");
}

async function getUsers() {
  return await collection.find().toArray();
}

module.exports = { connectDB, getUsers };