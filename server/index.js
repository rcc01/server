 const express = require('express')
 const bodyParser = require('body-parser')
 const cors = require('cors')
 const app = express()
 const mysql = require('mysql')

 // instead of connecting to DB, we need it to connect to our API!

 const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "pollas",
  database: "CRUDDatabase"
 })



 app.use(cors());
 app.use(express.json())
 app.use(bodyParser.urlencoded({extended: true}))




 app.get("/api/get", (req, res)=> {
  const sqlSelect = "SELECT * FROM movie_reviews;"
  db.query(sqlSelect, (err, result)=> {
    // is this really an array or an object? to check it, change res.send to console.log and check server with node index.js
   console.log(result);
  })
 })


 app.post("/api/insert", (req, res)=> {
  const movieName = req.body.movieName
  const review  = req.body.review
  const sqlInsert = "INSERT INTO movie_reviews (movie_name, review) VALUES (?,?)";

  db.query(sqlInsert, [movieName, review], (err, result)=> {
    console.log(err);
  })
 })

//  will only show only on /, if we do /login, nothing will come up....
//  app.get("/", (req, res)=> {}) 
// get solution from stackoverflow (previous error)

// don't use the same port running the react app, in this case 3000
app.listen(3001, () => {
  console.log("running on port 3001")
})