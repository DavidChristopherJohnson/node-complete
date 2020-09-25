const yargs = require('yargs');
const notesUtils = require('./notes');

yargs.version("1.1.0");

yargs.command({
    command: "add",
    describe: "Add a note",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Note content",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notesUtils.addNote(argv.title, argv.body);
    }
});

yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notesUtils.removeNote(argv.title);
    }
});

yargs.command({
    command: "list",
    describe: "List all notes",
    handler() {
        notesUtils.listNotes();
    }
});

yargs.command({
    command: "read",
    describe: "Display a note",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notesUtils.readNote(argv.title);
    }
});

yargs.parse();