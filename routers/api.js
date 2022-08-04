const path = require('path');
const fs = require('fs');

let uniqid = require('uniqid');

module.exports = (app) => {
    //get all notes
    app.get('/api/notes', (req, res) => {        
        res.sendFile(path.join(__dirname, '../db/db.json'));
    });

    //Get single note
    app.get('/api/notes/:id', (req, res) => {
      if (req.param.note_id) {
        const noteId = req.params.note_id;
        for(let i = 0; i < notes.length; i++) {
            const currentNote = notes[i];   
            if (currentNote.note_id === noteId) {
                res.json(currentNote);
                return;
            }
        }    
      }
    }
    );
    //Create new note    
    app.post('/api/notes', (req, res) => {
        console.log('setting up new note');
        let db = fs.readFileSync('db/db.json');
        db = JSON.parse(db);

        let newNote = {
            title: req.body.title,  
            text: req.body.text,
            note_id: uniqid()
        };
        //add new note to db
        db.push(newNote);
        fs.writeFileSync('db/db.json', JSON.stringify(db));
        res.send(db);
    });
    //Delete note
    app.delete('/api/notes/:id', (req, res) => {
        let db = JSON.parse(fs.readFileSync('db/db.json'));
        let deleteNotes = db.filter(item => item.id !== req.params.note_id);
        fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
        res.json(deleteNotes);      
    });
}

