import React, { useEffect, useState } from 'react';
import NoteList from './components/NoteList';
import Notification from './components/Notification';
import { BiNotepad } from 'react-icons/bi';

const getLocalStorage = () => {
  let note = localStorage.getItem('note');
  if (note) {
    return (note = JSON.parse(localStorage.getItem('note')));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState('');
  const [isEdit, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [note, setNote] = useState(getLocalStorage());
  const [notif, setNotif] = useState({
    type: '',
    msg: '',
    show: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // alert
      getNotif('warning', 'please add input!', true);
    } else if (name && isEdit) {
      // use map for edit
      setNote(
        note.map((item) => {
          // if same with editID
          if (item.id === editID) {
            // then update
            return { ...item, noteText: name };
          }
          // if not
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      getNotif('solved', 'thanks your edited text!', true);
    } else {
      getNotif('solved', 'thanks your added text!', true);
      const newItem = { id: new Date().getTime().toString(), noteText: name };
      // update
      setNote([...note, newItem]);
      setName('');
    }
  };

  // getNotif
  const getNotif = (type = '', msg = '', show = false) => {
    setNotif({ type, msg, show });
  };

  // clear Item
  const clearItem = () => {
    getNotif('warning', 'your remove all items', true);
    setNote([]);
  };

  // remember use filter not map !
  const removeItem = (id) => {
    getNotif('warning', 'remove items', true);
    setNote(note.filter((note_item) => note_item.id !== id));
  };

  const editItem = (id) => {
    const noteEdit = note.find((note_id) => note_id.id === id);
    setEditID(id);
    setIsEditing(true);
    setName(noteEdit.noteText);
  };

  useEffect(() => {
    localStorage.setItem('note', JSON.stringify(note));
  }, [note]);
  return (
    <>
      <main>
        <section className='section-center'>
          {notif.show && <Notification {...notif} removeNotif={getNotif} />}
          <div className='title'>
            <BiNotepad class='title-icon' />
            <h3>Note Apps</h3>
          </div>
          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <div className='form-control'>
              <input
                type='text'
                name='name'
                id='name'
                value={name}
                placeholder='contoh: minuman'
                onChange={(e) => setName(e.target.value)}
                className='inputNote'
              />
              <button
                className={`submit-btn ${isEdit === true && `edit-btn`}`}
                type='submit'
              >
                {isEdit ? 'edit' : 'submit'}
              </button>
            </div>
          </form>
          {/* NOTES  */}
          {note.length > 0 && (
            <div className='notes-container'>
              <NoteList
                notes={note}
                removeItem={removeItem}
                editItem={editItem}
              />
              <button className='clear-btn' onClick={clearItem}>
                remove all item
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
