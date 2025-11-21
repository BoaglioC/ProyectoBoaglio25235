import {Card, Button} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';

// Aqui agrego el Context debido a que tengo el boton para agregar productos
// al carrito
import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
// El contexto de autenticacion. Para verificar si esta logueado o no
import { useAuthContext } from '../context/AuthContext';

function Tarjeta(producto){
// Recordar que el producto tendra la siguiente estructura
// name= producto.name
// imagen = producto.imagen
// descripcion = producto.descripcion
// id = producto.id
// price = producto.price

// Voy a usar el context del carrito
// Pero solo quiero la posibilidad de agregar cosas al carrito y ver si hay algun item igual previamente agregado
// para tener en cuenta las cantidades
const {carrito, agregarCarrito}=useContext( CarritoContext);

// Voy a usar el context de autentificacion 
// Pero solo quiero la posibilidad de agregar cosas al carrito
const {estaLogueado,permiso}=useAuthContext();
/* Funcion para ingresar productos verificando si esta logueado o no */
const navigate = useNavigate();
const habilitarCarrito= ()=>{
      if (estaLogueado && permiso=="user") {
          agregarCarrito({name: producto.name, price: producto.price, id: producto.id, cantidad:1} );
        }
      else if (estaLogueado && permiso=="admin"){
        alert("Esta logueado como admin. Debe desloguearse e ingresar con sus credenciales de usuario");
      }
      else {
        alert("Debe estar logueado como usuario");
        navigate('/ingresa');
      }

    }




    return (
    // Fijo el tamaño de la tarjeta
    <Card style={{ width: '18rem', margin:'1rem' }}>
        {/* Cargo la imagen. La alternativa es poner el id */}
        <div style={{ width: '15rem', height: '12rem', margin:'1rem', textAlign:"center" }}>
        <Card.Img variant="top" src={producto.imagen} alt={producto.id} style={{ width: '80%',height:'80%' , objectFit:'contain' }}/>
        </div>
        <Card.Body>
          <Card.Title className='text-center fs-6 fw-bold'>{producto.name}</Card.Title>
          {/* Comente esta linea debido a que la voy a mostrar como el detalle
          <Card.Text className='text-center fs-6'> {producto.descripcion} </Card.Text> */}
          <Card.Text className='text-center fs-6 fw-bold'> Precio: ${producto.price} </Card.Text>
        {/* Centro del boton a la tarjeta y que ocupe el ancho de la misma */}
          <div className="d-grid gap-3">
            {/* Ojo con el to. Va entre ``, de otra manera no lo reconoce*/}
            <Link to={`/productos/${producto.id}`} state={{producto}} className="d-grid">  <Button variant="primary" >  + Detalles  </Button> </Link>
            
            
            {/* Cada vez que hago Click agrego a la lista del carrito un diccionario
            con el name, id y precio del producto y asi armo una lista de diccionarios (JSON)
            Por defecto la cantidad siempre la agrego con valor uno (1). Pero dentro de agregarCarrito se
                fija si hay o no ingresos previos*/}
            <Button variant="primary" onClick={habilitarCarrito}>


              Agregar
              
              </Button>
            
          
          </div>
        </Card.Body>
    </Card>
    )

} 


export default Tarjeta;