var mysql = require('mysql');
var express = require('express');
var bodyParser = require("body-parser")
var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}))

const Knex = require("knex")
const connection = require("../project/knexfile")
const knex = Knex(connection["development"])
    // var con = mysql.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     password: "Nav@gur1",
    //     database: "tifin"
    // });
    // con.connect(function() {
    //     console.log("Connected!");
    // });
const cookieParser = require("cookie-parser")
app.use(cookieParser())
const jwt = require("jsonwebtoken");

// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/home', (req, res) => {

    res.render("/home/supriya/Desktop/project/index.ejs");
    // res.render("/home/supriya/Desktop/project/form.ejs");
    // console.log("hi")
});

app.post('/home', async(req, res) => {
    try {
        if (req.body.email && req.body.password) {
            console.log("hello")
        } else {
            console.log("hi")

        }
        console.log(req.body)
        insertData = await knex("user").insert(req.body)
        res.send("thenks for signup")
    } catch (error) {
        res.send(error)
    }
});
app.get('/home', async(req, res) => {
    console.log("hi")
    try {
        getData = await knex("user")
            .select("*")
            .where({
                email: req.body.email
            } && {
                password: req.body.password
            })
        if (getData.length != 0) {
            res.send(getData)

        } else {
            res.send("you have to login first")
        }
    } catch (error) {
        res.send(error)

    }
});

app.listen(3000, () => {
    console.log("listinig")
})