const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

//Get Route for home page
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, './public/index.html')));

//Get Route for notes
app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});


//POST to add notes to the db
app.post('/api/notes', (req, res) => {
    //Log that a POST reqeust was recieved
    console.info(`${req.method} request received to add a note`);

    //Destructure the req.body object
    const { title, text } = req.body;

    //Variable for the object to be added to the db
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
        //Convert the data to an JSON object    
        const parsedNote = JSON.parse(data);

        // Add a new new note
        parsedNotes.push(newNote);


        fs.writeFile(
            './db/db.json',
            JSON.stringify(parsedNotes),
            (writeErr) => 
                writeErr 
                ? console.log(writeErr) 
                : console.log('Note added')
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
