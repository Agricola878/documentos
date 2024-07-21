import { useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [fileUrl, setFileUrl] = useState(""); // Estado para la URL del archivo cargado
  const [error, setError] = useState(""); // Estado para manejar errores

  const changeUploadFile = async (e) => {
    const file = e.target.files[0];
    const data = new FormData(); 

    data.append("file", file);
    data.append("upload_preset", "Presents_react");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/df1umiwd8/raw/upload", // Usamos 'raw' para archivos que no son imágenes
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log(response.data);
      setFileUrl(response.data.secure_url);
      setError(""); // Reiniciar el error si hubo uno previamente
    } catch (error) {
      console.error('Error uploading file: ', error);
      setError("Error al subir el archivo. Por favor, intenta nuevamente."); // Manejar error de carga del archivo
    }
  };

  const deleteFile = () => {
    setFileUrl("");
  };

  return (
    <>
      <h1>SELECCIONA UN ARCHIVO</h1>  
      <div>
        <input type="file" accept="image/*, application/pdf, .doc, .docx, .xls, .xlsx" onChange={changeUploadFile}/> 

        {fileUrl && (
          <div>
            {fileUrl.includes('pdf') ? ( // Verifica si la URL es de un PDF para mostrarlo correctamente
              <embed src={fileUrl} type="application/pdf" width="500" height="600"/>
            ) : (
              <a href={fileUrl} target="_blank" rel="noopener noreferrer">Ver archivo</a>
            )}
            <button onClick={deleteFile}>Eliminar Archivo</button>
          </div>
        )}

        {error && <p>{error}</p>}
      </div>
    </>
  );
}

export default App;
