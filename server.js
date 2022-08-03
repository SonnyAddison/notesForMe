const express = require('express');
const path = require('path');
const fs = require('fs');
const noteData = require('./db/db.json');
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

//Get Routes 
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/api/notes', (req, res) => {
    res.json(`${req.method} resquest to get notes made`);
    console.log(`${req.method} request to get notes`);
});

//POST Routes
app.post('/api/notes', (req, res) => {
    res.json(`${req.method} request received to add a note`);
    console.info(`${req.method} request received to add a note`);
});

//POST to add notes to the db
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };
fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        const notes = JSTON.parse(data);

        parsedNotes.push(newNote);

        fs.writeFile(
            './db/db.json',
            JSON.stringify(parsedNotes),
            (writeErr) => 
                writeErr ? console.log(writeErr) : console.log('Note added')
        )
    }
});

    const response = {
        status: 'success',
        body: newNote,
    };

    console.log(response);
    res.status(200).json(response);
    } else {res.status(500).json('Error in posting note')};   
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
