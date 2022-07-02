const express = require("express");
const app = express();
const { json } = require("express");
const DatabaseConnection = require('./config/database');

(async (app, json, DatabaseConnection) => {
    /* Database connection */
    DatabaseConnection(app);

    /* app middlewares */
    app.use(json());

    /* Import todo route */
    const TodoRouter = require("./routes/todo");

    /* todo enpoint routes */
    app.use("/", TodoRouter);

    /* home routes */
    app.use("/", async (req, res) => {
        res.status(200).send("Zuri todo api");
    });
  
})(app, json, DatabaseConnection);