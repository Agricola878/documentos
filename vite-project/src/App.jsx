import React, { useState } from 'react';
import './App.css'; // Importa estilos si es necesario

// Importa el archivo JSON
import data from '/LISTA.json'; // Ajusta la ruta según la ubicación real

const App = () => {
  // Extrae la lista de manuales del archivo JSON
  const manuales = data.Manual;

  // Estado para el término de búsqueda por código
  const [searchTerm, setSearchTerm] = useState('');

  // Función para manejar cambios en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Función para manejar el clic en el botón de descarga
  const handleClick = (link) => {
    // Verificar si el enlace termina en '.pdf'
    if (link.endsWith('.pdf')) {
      // Cambiar la extensión a '.png'
      link = link.slice(0, -4) + '.png';
    }
    window.location.href = link;
  };

  // Filtrar manuales según el término de búsqueda por código y tipo 'Formato'
  const filteredManuales = manuales
    .filter((manual) =>
      manual["Tipo"] === 'Formato' && manual["Código"].toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="App">
      <h1>Lista de Documentos Agricola San Andres  <span> <img src="https://res.cloudinary.com/df1umiwd8/image/upload/v1721780382/ASA_pry8vq.jpg" className='imagenlogo'/> </span> </h1>

      {/* Barra de búsqueda por código */}
      <input
        type="text"
        className='barradebusqueda'
        placeholder="Buscar por código..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {/* Tabla de manuales */}
      <table className='tabla'>
        <thead>
          <tr>
            <th>N°</th>
            <th>Proceso</th>
            <th>Tipo</th>
            <th>Código</th>
            <th>Nombre del documento</th>
            <th>Vigente Desde</th>
            <th>Vigente Hasta</th>
            <th>Rev Vigente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredManuales.map((manual, index) => (
            <tr key={index}>
              <td>{manual["N°"]}</td>
              <td>{manual["Proceso"]}</td>
              <td>{manual["Tipo"]}</td>
              <td>{manual["Código"]}</td>
              <td>{manual["Nombre del docuemento"]}</td>
              <td className='vigente'>{manual["Vigente desde"]}</td> 
              <td>{manual["Vigente hasta"]}</td>  
              <td>{manual["Rev\nVigente"]}</td>
              <td>
                <button onClick={() => handleClick(manual["LINK"])}>
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
