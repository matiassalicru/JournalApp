export const fileUpload = async (file) => {
  const cloudUrl = "https://api.cloudinary.com/v1_1/matiassalicru/upload"; //Url de la nube a la que se suben los archivos.

  const formData = new FormData();  //Data con la que se tiene que subir el archivo a cloudinary.

  formData.append("upload_preset", "react-journal");     //Preset necesario para subida de archivos.
  formData.append("file", file);    //El archivo como tal para subir, el mismo viene del input del NotesAppBar.

  try {
      //Se intenta obtener una respuesta del metodo POST de la imagen a subir.
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    if (resp.ok) {  //Si el archivo se logró subir, se guarda los datos de la respuesta y se retorna el secure_url de la imagen subida.
      const cloudResp = await resp.json();
      return cloudResp.secure_url;
    } else {
      throw await resp.json(); //En caso de error muestra el mensaje.
    }
  } catch (err) {
    throw err;
  }

  //return url de la Imagen.
};
