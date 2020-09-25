const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => "Your notes.....";

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.inverse("Your Notes"));
    notes.forEach((note) => console.log(note.title));
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((item) => item.title !== title);

    saveNotes(notesToKeep);

    if (notes.length > notesToKeep.length)
        console.log(chalk.green.inverse("Note removed"));
    else
        console.log(chalk.red.inverse("Note not removed"));
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const note = getNote(notes, title);

    if (!note) {
        console.log(chalk.red.inverse("Duplicate note found"));
    }
    else {

        notes.push({
            title: title,
            body: body
        });

        saveNotes(notes);

        console.log(chalk.green.inverse("New Note Added"));
    }

    console.log(chalk.inverse("Current Notes"));
    console.log(notes);

}

const readNote = (title) => {
    const notes = loadNotes();
    const note = getNote(notes, title);

    if (!note) {
        console.log(chalk.red.inverse("Note not found!"));
    }
    else {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    }
}

const getNote = (notes, title) => notes.find((item) => item.title === title);

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = dataBuffer.toString();

        return JSON.parse(dataJSON);
    }
    catch (e) {
        return [];
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};