import { useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [Url_Imagen, setUrl_Imagen] = useState("");

  const chageUploadImage = async (e) => {
    const file = e.target.files[0];
    const data = new FormData(); 

    data.append("file", file);
    data.append("upload_preset", "Presents_react");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/df1umiwd8/image/upload", data);
      console.log(response.data);
      setUrl_Imagen(response.data.secure_url);
    } catch (error) {
      console.error('Error uploading image: ', error);
      // Aquí podrías manejar el error de carga de la imagen, por ejemplo, mostrar un mensaje al usuario.
    }
  };


  const FuncionDeleteImage = ( ) => {

    setUrl_Imagen (" ")
  }

  return (
    <>
      <h1>SELECCIONA LA IMAGEN</h1>  
      <div>
        <input type="file"  onChange={chageUploadImage}/> 

        {Url_Imagen && ( 
          <div>
            <img src={Url_Imagen} alt="Imagen subida"/>
            <button onClick={()=> FuncionDeleteImage()}>Eliminar Imagen</button>
          </div>
        )} 
      </div>
    </>
  );
}

export default App;
