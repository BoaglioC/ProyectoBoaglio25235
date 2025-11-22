
// Basado en el documento de la clase 9
// La diferencia es que agrego un estado de permiso.
// De acuerdo al valor de permiso (admin o user) me permite restringir o no los accesos a ciertas partes
// de la aplicación.

import React, { createContext, useState, useContext } from 'react';
// Crear el contexto de autenticación
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [permiso, setPermiso] = useState(null);


  const login = (username,permiso) => {
    //Simulando la creación de un token 
    const token = `fake-token-${username}`;
    localStorage.setItem('authToken', token); 
    setUser(username);
    setPermiso(permiso);
  };
  
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const valor =  { 
    user, 
    login, 
    logout,
    estaLogueado : !!user,
    permiso};


  return (
    <AuthContext.Provider value={valor}>
      {children}
    </AuthContext.Provider> );
}

export const useAuthContext = () => useContext(AuthContext);