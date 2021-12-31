const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
    return "Your Notes . . .";
};

// see all note titles
const listNotes = () => {
    console.log(chalk.inverse.green("\nYour Notes: "));
    loadNotes().forEach((note, index) => {
        console.log(index, " : ",note.title);
    });
};

// read a note by providing a title
const readNote = (title)=> {
    const notes = loadNotes();
    const note = notes.find((note)=> note.title===title);

    if(!note){
        console.log(chalk.inverse.red("\nNo note for the given title found !"));
        return;
    }

    console.log("\n",chalk.inverse.cyan(note.title)," : ", note.body);
}

// add a note
const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!title.trim().length) {
        console.log(chalk.inverse.red("\nTitle must not be empty !"));
        return;
    }
    if (duplicateNote) {
        console.log(chalk.inverse.red("\nNote title already in list !"));
        return;
    }
    notes.push({
        title: title,
        body: body,
    });

    saveNotes(notes);
    console.log(chalk.inverse.green("N\new note added !\n"), notes);
};

// update a note
const updateNote = (title, body) => {
    let notes = loadNotes();
    let noteFound = false;
    // const noteToBeUpdated = notes.find((note) => note.title === title);

    if (!title.trim().length) {
        console.log(chalk.inverse.red("\nTitle must not be empty !"));
        return;
    }

    notes = notes.map((note)=> {
        if(note.title==title){
            note.body = body;
            noteFound = true;
            return note;
        } else {
            return note;
        }
    })

    if (!noteFound) {
        console.log(chalk.inverse.red("\nNote title does not match any note !"));
        return;
    }

    saveNotes(notes);
    console.log(chalk.inverse.green("\nNote updated !\n"), notes);
};

// remove a note by title
const removeNote = (title) => {
    let notes = loadNotes();
    let tobeDeleted = null;
    notes = notes.filter((note) => {
        if (note.title != title) return note;
        else tobeDeleted = note;
    });

    if (tobeDeleted == null) {
        console.log(chalk.inverse.red("\nNo such note found !"));
        return;
    }

    saveNotes(notes);
    console.log(tobeDeleted, chalk.inverse.green(" was delete"));
};

// save new note to JSON file
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes, null, 4);
    fs.writeFileSync("./notes.json", dataJSON);
};

// extracts notes JSON to array
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("./notes.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
};

module.exports = { getNotes, addNote, removeNote, listNotes, readNote, updateNote };
