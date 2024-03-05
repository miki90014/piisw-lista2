class Note {
    constructor(title, content) {
        this.id = uuidv4().toString();
        this.title = title;
        this.content = content;
    }
}

class Notepad {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
    }

    addNote(title, content) {
        const newNote = new Note(title, content);
        this.notes.push(newNote);
        this.saveNotes();
    }

    updateNote(id, title, content) {
        const noteIndex = this.notes.findIndex(note => note.id === id);
        this.notes[noteIndex].title = title;
        this.notes[noteIndex].content = content;
        this.saveNotes();
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
        this.displayNotes();
    }

    displayNotes() {
        const notesList = document.getElementById('notesList');
        notesList.innerHTML = '';
        this.notes.forEach(note => {
            const listItem = document.createElement('li');
            listItem.textContent = note.title;
            listItem.setAttribute('data-id', note.id);
            listItem.addEventListener('click', () => this.displayNoteContent(note.id));
            notesList.appendChild(listItem);
        });
    }

    displayNoteContent(id) {
        document.getElementById('titleEditNote').textContent = 'Edit Note';
        const note = this.notes.find(note => note.id === id);
        document.getElementById('noteTitle').value = note.title;
        document.getElementById('noteContent').value = note.content;
        document.getElementById('noteId').value = note.id;
    }
}

const notepad = new Notepad();

function saveNote() {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    const noteId = document.getElementById('noteId').value;
    if (title.trim() !== '') {
        console.log(noteId)
        if (noteId !== '-1') {
            notepad.updateNote(noteId, title, content);
        } else {
            notepad.addNote(title, content);
        }
        clearForm();
    } else {
        alert('Please enter a title for the note.');
    }
}

function clearForm() {
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
    document.getElementById('titleEditNote').textContent = 'Add Note';
    document.getElementById('noteId').value = '-1';
}

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

notepad.displayNotes();
