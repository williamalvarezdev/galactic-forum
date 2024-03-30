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
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
