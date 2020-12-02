import Swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth; //Obtenemos el state

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

    dispatch(activeNote(doc.id, newNote));
    dispatch( addNewNote(doc.id, newNote));
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const addNewNote = (id, note) => {
  return {
    type: types.notesAddNew,
    payload: {
      id,
      ...note,
    },
  };
};

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

//Función extremadamente importante ya que es la que uso para guardar en mi base de datos las notas..
export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    //1er argumento es para hacer dispatch, 2do es para obtener algo del state (como un useSelector de thunk)

    const { uid } = getState().auth; //Obtenemos del state el uid del usuario.

    if (!note.url) {
      //Si no hay url borrar ese campo de url para que firebase no nos de error
      delete note.url;
    }

    const noteToFirestore = { ...note }; //Crea un clon de la note que recibimos por parámetro para así modificar este clon y no la nota en sí.
    delete noteToFirestore.id; //Borra el id del note que recibimos en el clon, es importante no borrarlo del note que luego lo usamos.

    //Actualiza la nota con el uid del usuario y el ID de la nota. La nueva nota es NoteToFirestore.
    //Busca donde guardar la nota, en la BD en el path dado por el uid del usuario / journal / notes / id de la nota por lo que no lo borramos anteriormente.
    //Luego ejecuta el update con el clon de la nota original sin id, y sin url en caso de que esté vacío.
    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

    //Dispatch que ejecuta un refresh para actualizar el panel lateral.
    dispatch(refreshNote(note.id, noteToFirestore));

    //Alerta de que se guardó correctamente la nota
    Swal.fire("Saved", note.title, "success");
  };
};

export const refreshNote = (id, note) => {
  return {
    type: types.notesUpdated,
    payload: {
      id,
      note: {
        id,
        ...note,
      },
    },
  };
};

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;

    Swal.fire({
      title: "Uploading...",
      text: "Please wait...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const fileUrl = await fileUpload(file); //Aqui es donde se almacena el retron

    activeNote.url = fileUrl;

    dispatch(startSaveNote(activeNote));

    Swal.close();
  };
};

export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    await db.doc(`${uid}/journal/notes/${id}`).delete();

    dispatch(deleteNote(id));
    // Swal('Note Deleted', id, 'Success')
  };
};

export const deleteNote = (id) => {
  return {
    type: types.notesDelete,
    payload: id,
  };
};

export const notesLogout = () => {
  return {
    type: types.notesLogoutCleaning,
    payload: {
      active: null,
      notes: [],
    },
  };
};
