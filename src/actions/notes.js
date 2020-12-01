import { db } from "../firebase/firebaseConfig";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const {uid} = getState().auth; //Obtenemos el state

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

    dispatch(activeNote(doc.id, newNote));
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => {
  return {
    type: types.notesLoad,
    payload: notes,
  };
};

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    
    const { uid } = getState().auth; //Obtenemos el state

    if(!note.url){ //Si no hay url borrar ese campo para que firebase no nos de error
      delete note.url;
    }

    const noteToFirestore = {...note}; //Crea un clon de la note que recibimos por parámetro.
    delete noteToFirestore.id; //Borra el id del note que recibimos

    await db.doc(`${ uid }/journal/notes/${note.id}`).update( noteToFirestore ); //Actualiza la nota con el uid del usuario y el ID de la nota. La nueva nota es NoteToFirestore.

  };
}