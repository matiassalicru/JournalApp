import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    return (
      <div className="notes__main-content">
        <NotesAppBar />

        <div className="notes__content">
            <input
              type="text"
              placeholder="Today was a good day"
              className="notes__title-input"
            />

            <textarea
              placeholder="What happened today"
              className="notes__text-area"
            ></textarea>

            <div className="notes__image">
              <img
                src="https://www.befunky.com/images/wp/wp-2016-03-blur-background-2.jpg?auto=webp&format=jpg&width=800"
                alt="pic"
              />
            </div>
        </div>
      </div>
    );
}
