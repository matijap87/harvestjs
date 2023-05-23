var express = require("express")
var app = express()
require('dotenv').config()

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var timeEntries = require('./timeEntries');
var messenger = require('./messenger');

var HTTP_PORT = 8009

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get("/api/cases", async (req, res) => {

    const cases = await timeEntries.getTimeEntries()

    const filtered = cases
    //filter out ones that are already created on harvest (this assumes that all new cases are tracked under Admin)
    .filter(oneCase => oneCase.task.name === 'Admin')
    //trim whitespaces etc
    .map(oneCase => oneCase.notes.trim())
    //filter out empty ones
    .filter(oneCase => oneCase !== '')

    const unique = [...new Set(filtered)];

    console.log('PRINTING CASES')
    unique.map(oneCase => console.log(oneCase))
    console.log('DONE PRINTING CASES')

    const response = await messenger.send(unique)

    res.json(response)
});