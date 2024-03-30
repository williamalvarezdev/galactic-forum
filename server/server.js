const express = require('express');
const app = express();


app.get("/api", (req, res) => {
    res.json({"users":["userOne", "userTwo", "userThree"]})
})

app.listen(5000, () => {
    console.log("Server listening on port 5000");
})

const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = "mongodb+srv://williamalvarezdev:Qrfv8QSmmfQrreHx@cluster0.iufiwin.mongodb.net/";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('forumchain');
    const username = database.collection('username');
    // Query for a movie that has the title 'Back to the Future'
    const query = { user: 'test0' };
    const username = await username.findOne(query);
    console.log(username);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
