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

module.exports = notes;