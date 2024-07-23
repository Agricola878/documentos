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

  // Filtrar manuales según el término de búsqueda por código
  const filteredManuales = manuales.filter((manual) =>
    manual["Código"].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Lista de Manuales</h1>

      {/* Barra de búsqueda por código */}
      <input
        type="text"
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
              <td>{manual["Nombre del documento"]}</td>
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
