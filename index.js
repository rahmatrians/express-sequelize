const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
    res.json({ Hi: "yoo, Welcome to Rest API using Express x Sequelize ORM with MySQL" });
});

// routes
require("./app/routes/restapi.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 1111;
app.listen(PORT, () => {
    console.log(`Hi, yuk masuk lewat sini: http://localhost:${PORT}`);
});

// =======================================================

const db = require("./app/models");

// db.sequelize.sync({ force: true }) //kalau mau drop table setiap kali restart app
db.sequelize.sync()
    .then(() => {
        console.log("Berhasil Sync ke Database.");
    })
    .catch((err) => {
        console.log("Gagal Sync  ke Database: " + err.message);
    });