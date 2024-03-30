const express = require('express');
const cors = require('cors');
const app = express();
const Port = 5000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
    res.json({message:"Hello world"})
})

/*CREATING NEW USERS */
/*NOTE I WILL CHANGE THIS SO IT WORKS WITH DATABASE */
// Array containt all existing users
const user = [];

const generatedId = () => Math.random().toString(36).substring(2,10);

/*SAVE AND RETURN RESPONSE TO FRONTEND */
app.post('/api/register', async (req, res) => {
    const { email, password, username } = req.body;
    const id = generatedId();

    //No duplicates, validation
    const result = users.filter(
        (user) => user.email === email && user.password === password
    );

    //returns result of 0 if true
    if(result.length === 0) {
        const newUser = { id, email, password, username };
        // add the new user to database
        users.push(newUser);
        //returns a success message
        return res.json({
            message: "Account created successfully",
        });
    }

    //If there is an exiting user
    res.json({
        error_message: "User already exists",
    })
});



app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    //checks if user exist
    let result = users.filter(
        user => user.email === email && user.password === password
    );
    // if user does not exist
    if(result.length === 1){
        return res.json({
            error_message: "Incorrect credentials",
        })
    }
    res.json({
        message: "login successfully",
        id: result[0].id,
    });
});



// const handleSubmit = (e) => {
//     e.preventDefault();
//     //Below tridggers functions
//     signup();
//     setEmail("");
//     setUsername("");
//     setPassword("");
// }














app.listen(Port, () => {
    console.log(`Server listening on port ${Port}`);
});

