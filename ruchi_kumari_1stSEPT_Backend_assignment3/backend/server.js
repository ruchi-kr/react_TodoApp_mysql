const express= require('express');               //importing express,node framework
const mysql = require('mysql');
const cors= require('cors');                     //importing cors (for connecting frontend to backend)


const app = express();                           //creating express application
app.use(cors());                                 //using cors
app.use(express.json());                         //using express json

const con = mysql.createConnection({             //creating connection with mysql
    host: "localhost",
    user: "root",                                 //default username and password
    password: "",
    database: "todoapp"                           //database name - todoapp
});

con.connect(function (err) {
    if (err) {                                   //if error occurs then throw error
        throw err;
    }
    console.log("Connected !");                  //if not then log connected
});

app.post("/todoapp", (req, res) => {          //creating post request for adding task
    const id = req.body.id;                //getting id,task and description
    const task= req.body.task;              
    const descr= req.body.descr;

    con.query('INSERT INTO todoapp VALUES (?, ?,?);', [id,task, descr], (err, result) => { //inserting data into table todoapp
        if (err) {
            console.log(err);      //if error occurs then log it
        }
        else{
            res.send("Task Added Successfully");  //if not then send task added successfully
        }
    })
})

app.get('/todoapp', (req, res) => {            //creating get request for fetching data from table
    con.query('SELECT * FROM todoapp;', (err, result) => {              //fetching data from table todoapp
        if (err) {
            console.log(err);          //if error occurs then log it
        }
        else{
            res.send(result);               //if not then send result
        }
    })
})

app.delete('/todoapp/:id', (req, res) => {                   //creating delete request for deleting data from table
    const sql= `DELETE FROM todoapp WHERE id = ? `;            //deleting data from table todoapp
    const id = req.params.id;               //getting id
    con.query(sql,[id], (err, result) => {                    //calling mysql query
        if (err) return res.json("Error");                     //if error occurs then log it
        return res.json(result);                                //if not then send result
         
    })
})


app.listen(5000, () => {                                 //listening on port 5000
    console.log("server started on port 5000");
});