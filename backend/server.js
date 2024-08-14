const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tumor"
});

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO `login-signup` (`name`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
    ];

    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            res.json(data);
        }
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM `login-signup` WHERE email = ? AND password = ?";

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (data.length > 0) {
            return res.json("Login Successfully");
        } else {
            return res.json("Invalid email or password");
        }
    });
});

app.listen(4200, () => {
    console.log("Listening on port 4200");
});
