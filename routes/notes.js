const notes = require('express').Router();
const util = require('util');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const readFile = util.promisify(fs.readFile);

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    readFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });


module.exports = notes;