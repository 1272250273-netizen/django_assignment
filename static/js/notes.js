const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const notesList = document.querySelector('#notes-list');
const emptyState = document.querySelector('#empty-state');
const noteCount = document.querySelector('#note-count');
const characterCount = document.querySelector('#character-count');
const filterButton = document.querySelector('#filter-button');
const today = document.querySelector('#today');

let notes = JSON.parse(localStorage.getItem('noteNestNotes')) || [];
let importantOnly = false;

const saveNotes = () => {
    localStorage.setItem('noteNestNotes', JSON.stringify(notes));
};

const updateCount = () => {
    noteCount.textContent = notes.length;
};

const makeButton = (label, className, clickHandler, title) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = className;
    button.textContent = label;
    button.title = title;
    button.addEventListener('click', clickHandler);
    return button;
};

const renderNotes = () => {
    notesList.textContent = '';
    const visibleNotes = importantOnly ? notes.filter((note) => note.important) : notes;

    visibleNotes.forEach((note) => {
        const article = document.createElement('article');
        article.className = `note-card${note.important ? ' is-important' : ''}`;
        article.dataset.noteId = note.id;

        const noteTop = document.createElement('div');
        noteTop.className = 'note-top';
        const date = document.createElement('span');
        date.className = 'note-date';
        date.textContent = note.date;
        const importantLabel = document.createElement('span');
        importantLabel.className = 'important-label';
        importantLabel.textContent = 'Important';
        importantLabel.hidden = !note.important;
        noteTop.appendChild(date);
        noteTop.appendChild(importantLabel);

        const noteText = document.createElement('p');
        noteText.className = 'note-text';
        noteText.textContent = note.text;

        const actions = document.createElement('div');
        actions.className = 'note-actions';
        const toggleButton = makeButton(note.important ? '★' : '☆', 'icon-button important-button', () => {
            note.important = !note.important;
            saveNotes();
            renderNotes();
        }, note.important ? 'Unmark as important' : 'Mark as important');
        toggleButton.setAttribute('aria-pressed', String(note.important));
        const editButton = makeButton('Edit', 'text-button', () => editNote(note, article), 'Edit this note');
        const deleteButton = makeButton('Delete', 'text-button delete-button', () => {
            notes = notes.filter((item) => item.id !== note.id);
            saveNotes();
            renderNotes();
        }, 'Delete this note');
        actions.appendChild(toggleButton);
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        article.appendChild(noteTop);
        article.appendChild(noteText);
        article.appendChild(actions);
        notesList.appendChild(article);
    });

    updateCount();
    emptyState.hidden = visibleNotes.length > 0;
    if (notes.length > 0 && visibleNotes.length === 0) {
        emptyState.querySelector('h3').textContent = 'No important notes';
        emptyState.querySelector('p').textContent = 'Mark a note with the star to see it here.';
    } else {
        emptyState.querySelector('h3').textContent = 'No notes yet';
        emptyState.querySelector('p').textContent = 'Start with the thought you do not want to lose.';
    }
};

const editNote = (note, article) => {
    const noteText = article.querySelector('.note-text');
    const editor = document.createElement('textarea');
    editor.className = 'edit-input';
    editor.maxLength = 240;
    editor.value = note.text;
    noteText.replaceWith(editor);
    editor.focus();

    const actions = article.querySelector('.note-actions');
    actions.textContent = '';
    const saveButton = makeButton('Save', 'text-button save-button', () => {
        const updatedText = editor.value.trim();
        if (!updatedText) return;
        note.text = updatedText;
        saveNotes();
        renderNotes();
    }, 'Save note changes');
    const cancelButton = makeButton('Cancel', 'text-button', renderNotes, 'Cancel editing');
    actions.appendChild(saveButton);
    actions.appendChild(cancelButton);
};

noteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = noteInput.value.trim();
    if (!text) return;

    notes.unshift({
        id: Date.now(),
        text,
        important: false,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    });
    saveNotes();
    noteForm.reset();
    characterCount.textContent = '0';
    renderNotes();
});

noteInput.addEventListener('input', () => {
    characterCount.textContent = noteInput.value.length;
});

noteInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
        noteForm.requestSubmit();
    }
});

filterButton.addEventListener('click', () => {
    importantOnly = !importantOnly;
    filterButton.setAttribute('aria-pressed', String(importantOnly));
    filterButton.textContent = importantOnly ? 'Show all notes' : 'Important only';
    renderNotes();
});

today.textContent = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
renderNotes();
