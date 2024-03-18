const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const PORT = 8080;

// Middleware -- Plugin
app.use(express.urlencoded({extended :false}));

// app.use((req, res, next) =>{
//     fs.appendFile('log.txt', `\n${Date.now()}: ${req.ip} ${req.method}: ${req.path}`, (err, data) =>{
//             next();
//     });

//     console.log("Hello From middleware 1");
//     req.myUsername = "satish.dev";
//     next();
// });

// app.use((req, res, next) =>{
//     console.log("Hello From middleware 2", req.myUsername);
//     // db query
//     // credit card info
//     req.creditCardno = '1234';
//     next()
   
// });

// Routes Configure 
//for Web 
app.get('/users', (req, res) => {
    const html = `
    <ul>
      ${users.map((user) => `<li> ${user.first_name}
      ${user.last_name}</li>` ).join("")}
    </ul>
      `;
    res.send(html);
});

// Routes for Post Method==
app.post("/api/users", (req,res) => {
    // TODO : Create New User
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({msg : "All Feilds are Manatory."})
    }
    users.push({ ...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.status(201).json(
            {
            status: "Success",
            id: users.length
        });
    });

})

// Routes for APP / Alexa
app.get('/api/users', (req,res) => {
    // console.log("I am in get route", req.myUsername);
    // console.log(req.headers);
    return res.json(users);
})

// Routes for ALL Common Routes Method
app
.route("/api/users/:id")
.get((req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    if(user == undefined){
        return res.status(404).json({msg: "No User Found"});
    }
    return res.status(200).json({data: user});
    
})
.patch((req, res) =>{
     //TODO  : Edit the User Info
     const userId = parseInt(req.params.id);
     const updatedUserData = req.body;

     const userIndex = users.findIndex(user => user.id === userId);
     if (userIndex !== -1) {
         users[userIndex] = { ...users[userIndex], ...updatedUserData };
         fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
             if (err) {
                 console.error(err);
                 return res.status(500).json({ error: "Internal server error" });
             }
             return res.json(users[userIndex]);
         });
     } else {
         return res.status(404).json({ error: "User not found" });
     }
})
.delete((req, res) => {
    //TODO  : Delete the User Info
    const userId = parseInt(req.params.id);

    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.json({ message: "User deleted successfully" });
        });
    } else {
        return res.status(404).json({ error: "User not found" });
    }
})




app.listen(PORT, () => console.log(`Our Server Started on ${PORT}`));

