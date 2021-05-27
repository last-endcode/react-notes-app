import React from 'react';
import { ImCross } from 'react-icons/im';
import { RiEdit2Fill } from 'react-icons/ri';

function NoteList({ notes, removeItem, editItem }) {
  return (
    <div className='notes-containter'>
      {notes.map((note) => {
        const { id, noteText } = note;
        return (
          <article className='notes-list' key={id}>
            <p className='noteText'>{noteText}</p>
            <div className='button-container'>
              <button className='edittext-btn' onClick={() => editItem(id)}>
                <RiEdit2Fill />
              </button>
              <button className='trash-btn' onClick={() => removeItem(id)}>
                <ImCross />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default NoteList;
