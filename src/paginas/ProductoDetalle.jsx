import React from 'react'; 
import {Link, useParams, useLocation, useNavigate} from 'react-router-dom'; 
import {Card, Button} from 'react-bootstrap';

// Aqui agrego el Context debido a que tengo el boton para agregar productos
// al carrito
import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
// El contexto de autenticacion. Para verificar si esta logueado o no
import { useAuthContext } from '../context/AuthContext';


function ProductoDetalle() { 
// Voy a usar el context del carrito
// Pero solo quiero la posibilidad de agregar cosas al carrito
const {agregarCarrito}=useContext( CarritoContext);
// Voy a usar el context de autentificacion 
// Pero solo quiero la posibilidad de ver si esta logueado y su permiso
const {estaLogueado,permiso}=useAuthContext();

/*Voy a traer el id de la ruta que le pase al Link "to={'/Productos/${producto.id}'}"*/
const { id } = useParams(); 
/* Voy a traer la informacion guardada en el state={{producto}} */
/* Pero debo verificarla */
const location =useLocation();
const producto =location.state?.producto; 

/* Funcion para ingresar productos verificando si esta logueado o no */
const navigate = useNavigate();
const habilitarCarrito= ()=>{
       if (estaLogueado && permiso == "user") {
          agregarCarrito({name: producto.name, price: producto.price, id: producto.id, cantidad:1} );
        }
        else {
          alert("Debe estar logueado como usuario");
          navigate('/ingresa');
        }

    }

/* Verifica si hay informacion en la constante productos */
/* Si no la hay muestra una leyenda y con el boton vuelve a la pagina productos*/
if (!producto){
    return(
        <div>
            <p>No se pudo cargar el producto</p>
            <Link to='/productos'>  <Button variant="primary" >Volver a Productos</Button>  </Link>
        </div>
    );
}
/* Si hay informacion en productos, la muestra en la página*/

return ( 


// Centro todo el contenido para que sea visualmente mas agradable
<div  style={{ display: "flex",  justifyContent: "center"}}> 
    <Card style={{ width: '18rem', margin:'1rem' }}>
            {/* Cargo la imagen. La alternativa es poner el id */}
            <div style={{ width: '15rem', height: '12rem', margin:'1rem', textAlign:"center" }}>
            <Card.Img variant="top" src={producto.imagen} alt={producto.id} style={{ width: '80%',height:'80%' , objectFit:'contain' }}/>
            </div>
            <Card.Body>
              <Card.Title className='text-center fs-6 fw-bold'>{producto.name}</Card.Title>
              <Card.Text className='text-center fs-6'> {producto.descripcion} </Card.Text>
              <Card.Text className='text-center fs-6 fw-bold'> Precio: ${producto.price} </Card.Text>
              {/* Centro del boton a la tarjeta y que ocupe el ancho de la misma */}
              <div className="d-grid gap-3">

                {/* Ojo con el to. Va entre ``, de otra manera no lo reconoce*/}

                <Link to={`/productos`} className="d-grid">  <Button variant="primary" >Volver a Productos</Button>  </Link>
            
                {/* Cada vez que hago Click agrego a la lista del carrito un diccionario
                con el name, id y precio del producto y asi armo una lista de diccionarios (JSON)
                Por defecto la cantidad siempre la agrego con valor uno (1). Pero dentro de agregarCarrito se
                fija si hay o no ingresos previos */}
                <Button variant="primary" onClick={habilitarCarrito}>Agregar</Button>

              </div>
            </Card.Body>
    </Card>

 


</div> 
); 

} 
export default ProductoDetalle; 