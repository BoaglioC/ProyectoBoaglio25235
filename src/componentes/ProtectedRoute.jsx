// Basado en el documento de la Clase 9

import React from 'react';
import { Navigate } from 'react-router-dom';
 import { useAuthContext } from '../context/AuthContext';
function ProtectedRoute({ children, soloAdmin = false, soloUser = false }) {

// Ojo que el permiso esta dado por una "base de datos" simulada 
// por medio de una lista declarada en "Ingresa.jsx" localizada en la carpeta "paginas"
  const { estaLogueado, permiso} = useAuthContext();

// Si intenta ingresar sin estar logueado lo envia a la pagina para loguearse
  if (!estaLogueado) {
    return <Navigate to="/ingresa" />;
  }
// Si paso el primer filtro significa que esta logueado
// Si trata de ingresar a una pagina de administracion y no tiene permiso "admin" (es un "user")
// Lo envio a la pagina de "produtos"
  if(soloAdmin && permiso !== "admin")
    {
    return <Navigate to="/productos" />;
  }
// Si trata de ingresar a una pagina de compras y no tiene permiso "user" (es un "admin")
// Lo envio a la pagina de "produtos"
  if(soloUser && permiso !== "user")
    {
    return <Navigate to="/productos" />;
  }
// 
  return children;
}

export default ProtectedRoute;