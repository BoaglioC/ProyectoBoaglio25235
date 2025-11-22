import './App.css';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import Ingresa from './paginas/Ingresa';
import  Inicio from './paginas/Inicio';
import  Productos from './paginas/Productos';
import ProductoDetalle from './paginas/ProductoDetalle';
import Administracion from './paginas/Administracion.jsx';
import  Carrito from './paginas/Carrito';
import NotFound from './paginas/NotFound.jsx';
import { StrictMode} from 'react';
import { AuthProvider} from './context/AuthContext';
import ProtectedRoute from './componentes/ProtectedRoute.jsx'
import { CarritoProvider } from './context/CarritoContext';
import {BrowserRouter, Routes, Route } from 'react-router-dom'
// Importo los estilos de React Boostrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Contiene el encabezado, el pie de página y el enrutamiento
function App()  {
  return (
    <>
        <StrictMode>
          <AuthProvider>
            {/* Englobo con el context provider de "Autenticar" toda mi aplicacion  para que 
          todos mis componentes tengan acceso a la información de la autenticación de usuarios */}

          <CarritoProvider> 
          {/* Englobo con el context provider de "Carrito" toda mi aplicacion  para que 
          todos mis componentes tengan acceso a la información del carrito */}
            <BrowserRouter > 
                  {/* El encabezado es comun a todas las páginas */}
                  <Header/>
                  {/* Defino las rutas */}
                  <div>
                    <Routes>
                      <Route  path="/" element={ <Inicio/>}/>
                      <Route  path="/productos" element={ <Productos/>}/>
                      {/* Rutas dinamicas por id de producto */}
                      <Route path="/productos/:id" element={<ProductoDetalle />} /> 
                      <Route  path="/ingresa" element= { <Ingresa/> } />
                      
                      {/* Rutas protegidas */}
                  
                      {/* Solo ingresan al carrito si estan con permiso de usuario */}
                      <Route  path="/carrito" element={ <ProtectedRoute soloUser={true}>  <Carrito/>  </ProtectedRoute>  }/>
                      {/* Solo ingresan al CRUD de productos si estan con permiso de admin */}
                      <Route  path="/administracion" element={<ProtectedRoute soloAdmin={true}>  <Administracion/> </ProtectedRoute>}/>

                      {/* En caso de que la ruta no exista */}
                      <Route path="/*" element={<NotFound />} /> 

                    </Routes>
                  </div>
                  {/* El pie de página es comun a todas las páginas */}
                  <Footer/>
              </BrowserRouter>
          </CarritoProvider>
          </AuthProvider>
        </StrictMode>

    </>
  )
}

export default App