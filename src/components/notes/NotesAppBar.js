import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploading } from "../../actions/notes";
import moment from 'moment';

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const {active} = useSelector((state) => state.notes);

  const noteDate = moment(active.date);

  const handleSave = () => {
    dispatch(startSaveNote(active));
  };

  const handlePictureUpload = () => {
    document.querySelector('#fileSelector').click()
  };

  const handleFileChange = (e) => {
      //el archivo se guarda aquí
    const file = e.target.files[0]

    //Si el archivo existe entonces hace el dispatch para empezar a subir la imagen a cloudinary
    if( file ){
        dispatch(startUploading(file));
    } else {
        console.log('Archivo no existe');
    }
  };

  return (
    <div className="notes__appbar">
      <span>{noteDate.format('LLL')}</span>

{/* Input de tipo archivo que no se ve en el front.*/}
      <input
        id="fileSelector"
        type="file"
        name="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div>
        <button className="btn" onClick={handlePictureUpload}>
          Picture
        </button>

        <button className="btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
