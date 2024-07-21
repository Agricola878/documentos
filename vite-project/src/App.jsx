import React from 'react';
import './App.css'; // Importa estilos si es necesario

// Importa el archivo JSON
import data from '../public/listado/LISTA.json'; // Ajusta la ruta según la ubicación real

const App = () => {
  // Extrae la lista de manuales del archivo JSON
  const manuales = data.Manual;

  const handleClick = (link) => {
    // Aquí redirigimos a la URL especificada en el enlace del documento
    window.location.href = link;
  };

  return (
    <div className="App">
      <h1>Lista de Manuales</h1>
      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>Proceso</th>
            <th>Tipo</th>
            <th>Código</th>
            <th>Nombre del documento</th>
            <th>Acciones</th> {/* Nueva columna para el botón */}
          </tr>
        </thead>
        <tbody>
          {manuales.map((manual, index) => (
            <tr key={index}>
              <td>{manual["N°"]}</td>
              <td>{manual["Proceso"]}</td>
              <td>{manual["Tipo"]}</td>
              <td>{manual["Código"]}</td>
              <td>{manual["Nombre del docuemento"]}</td>
              <td>
                <button onClick={() => handleClick(manual["LINK"])}>
                  Upload
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
