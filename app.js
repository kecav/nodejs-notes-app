const notes = require("./notes");
const yargs = require("yargs");

yargs.command({
    command: "add",
    describe: "\t\tAdd a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string",
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    },
});

yargs.command({
    command: "update",
    describe: "\t\tUpdate a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string",
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        notes.updateNote(argv.title, argv.body);
    },
});

yargs.command({
    command: "remove",
    describe: "\t\tRemove a note",
    builder: {
        title: {
            describe: "Title of note to be deleted",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        notes.removeNote(argv.title);
    },
});

yargs.command({
    command: "list",
    describe: "\t\tlist notes",
    handler: () => notes.listNotes(),
});

yargs.command({
    command: "read",
    describe: "\t\tread a note",
    builder: {
        title: {
            describe: "Title of note",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        notes.readNote(argv.title);
    },
});

// parsing the commands
yargs.parse();

// guide
if (process.argv.length == 2) {
    notes.getNotes();
    console.log("\nWelcome to notes app !");
    console.log("Enter 'node app.js --help' from command line to get all valid commands.\n");
}
