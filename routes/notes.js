const notes = require('express').Router();
const util = require('util');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const readFile = util.promisify(fs.readFile);


// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    readFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
  });

// POST Route for a new note
notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      fs.readFile('./db/notes.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsedData = JSON.parse(data);
          parsedData.push(newNote);
          fs.writeFile('./db/notes.json', JSON.stringify(parsedData, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${'./db/notes.json'}`)
  );
        }
      })
    } else {
      res.err('Error in adding note');
    }
  });

// DELETE Route for notes
notes.delete('/:id', (req, res) => {
  // Save id of clicked note
  const selecId = req.params.id;
  // Get data from notes db file
  fs.readFile('./db/notes.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Save notes db data as array
      const noteList = JSON.parse(data);
      // Loop through notes db array
      for(i = 0; i < noteList.length; i++) {
        // Check if array item is the one that was clicked by comparing ids
        if(noteList[i].id === selecId) {
          // Splice array item
          noteList.splice(i, 1);
          // Rewrite notes db file with new array
          fs.writeFile('./db/notes.json', JSON.stringify(noteList, null, 4), (err) =>
          err ? console.error(err) : console.info(`\nNote deleted from ${'./db/notes.json'}`)
        );
        }
      }
    }
  });
});

module.exports = notes;