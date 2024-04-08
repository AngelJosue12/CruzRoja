// AuthContext.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [verificacionCorreo, setVerificacionCorreo] = useState(null);
  const [sig, setSig] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [metodo, setMetodo]=useState(null);
  const [contraActualizar, setContraActualizar] = useState(null);
  const [contraActualizar2, setContraActualizar2] = useState(null);
  const [correo, setCorreo] = useState(null);
  const [numero, setNumero] = useState(null);
  const [isMethodSelected, setIsMethodSelected] = useState(false);
  const [contraCo, setContraCo]=useState(false);
  const [contraCo2, setContraCo2]=useState(false);
  const [correoGuardar, setCorreoGuardar] = useState(null);


  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, token, setToken, metodo, setMetodo, sig, setSig, isMethodSelected, setIsMethodSelected,
    contraActualizar, setContraActualizar, contraActualizar2, setContraActualizar2, correo, setCorreo,  numero, setNumero,
    contraCo, setContraCo, contraCo2, setContraCo2 , correoGuardar, setCorreoGuardar
    }}>
      {children}
    </AuthContext.Provider>
  );
};
