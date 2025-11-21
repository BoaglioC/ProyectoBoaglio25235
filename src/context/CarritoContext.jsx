// Basado en el documento de la clase 8

import React, { createContext, useState } from 'react'; 

// Crear el contexto pars que podamos guradar la información
// para que luego nuestros componentes puedan accder a la misma
export const CarritoContext = createContext(); 
// Proveedor del contexto que sera el que englobe los componentes
// que deseamos que compartan o accedan a la información
export function CarritoProvider({ children }) 

{ 
    // Se crea el carrito e inicialmente es un array vacio
    const [carrito, setCarrito] = useState([]); 
    // Defino las funciones que deseo para mi carrito. Serian: 
    // agregar productos al carrito
    // decrementar cantidad de un dado producto en el carrito
    // eliminar un dado producto del carrito
    // vaciar el carrito
    const agregarCarrito = (producto) => { 
        // Me fijo si el item fue cargado en el carrito
        const encontroItem = carrito.find((item)=> item.id === producto.id); 
        if(!encontroItem){
             setCarrito([...carrito, producto])    ;
              }
        else{
            setCarrito(carrito.map((item)=> (item.id ===producto.id ?   { ...producto, cantidad: encontroItem.cantidad + 1}    :    item  )))    ;
        }
        }; 

    // Decremento la cantidad de un determinado producto
      const decrementarCarrito = (producto) => { 
        // Me fijo si el item fue cargado en el carrito
        const encontroItem = carrito.find((item)=> item.id === producto.id); 
        // Descremento si no llego la cantidad a uno(1)
        if(encontroItem.cantidad !== 1){
            setCarrito(carrito.map((item)=> (item.id ===producto.id ?   { ...producto, cantidad: encontroItem.cantidad -  1}    :    item  )))    ;
        }
        }; 

    // Borro un determinado item del carrito
      const borrarItemCarrito= (producto) => { 
        // Me fijo si el item fue cargado en el carrito
        const encontroItem = carrito.find((item)=> item.id === producto.id); 
        // Si encontro el item, procedo a borrarlo del carrito
        if(encontroItem !== 1){
            // Armo un nuevo carrito pero sin el producto que deseo eliminar
            const nuevoCarrito = carrito.filter((item) => item !== encontroItem)
            setCarrito(nuevoCarrito)  ;
        }
        }; 

    // Borra la lista de productos asignando el array vacio
    const vaciarCarrito = () => { setCarrito([]); };
    
    // Sumo el Total del Carrito
    const totalCompra = carrito.reduce((acumulador,elemento) => acumulador+ parseFloat(elemento.price)*parseInt(elemento.cantidad), 0);
    // Total de productos agregados al Carrito
    const totalItems = carrito.reduce((acumulador,elemento) => acumulador+ parseInt(elemento.cantidad), 0);

    // Defino un objeto valor para englobar todos los elementos del context

    const valor={ carrito, agregarCarrito, decrementarCarrito,  borrarItemCarrito, vaciarCarrito, totalCompra, totalItems };
    
    return ( 
        // Que comparto con los hijos: el carrito, agregar y vaciar el carrito
            <CarritoContext.Provider value={valor}>
                {/* Esto significa que lo que este dentro de este context tendra acceso a la
                informacion de mi context*/}
                {children} 
            </CarritoContext.Provider> 
        ); 

}