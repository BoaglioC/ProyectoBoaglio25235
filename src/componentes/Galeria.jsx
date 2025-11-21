// Esta sera la galeria con todos mis productos

import React from 'react';
import Tarjeta from '../componentes/Tarjeta';
import Container from 'react-bootstrap/Container';

import { useState, useEffect } from 'react';



function Galeria(){

//Creo una variable donde quiero cargar todo el JSON con los datos de los productos
    const [productos, setProductos] = useState([]);

    const [cargando, setCargando] = useState(true); 
    const [error, setError] = useState(null); 


    // Cargo los productos usando useEffect como lo relaiza en la teoria de la "Clase 5"
    // La API esta en MockApi pero en no puse componentes aleatorio (salvo el precio)
    // opte por editarla debido a que la generación aleatoria no coincidia entre el nombre y la descripción
    // Ademas, pude agregar la imagen acorde al producto
    useEffect(()=>{
        fetch("https://68dbf3d8445fdb39dc27324c.mockapi.io/prueba/TiendaOnLine")
        .then((response)=>response.json())
        .then((data)=>{
                        setProductos(data);
                        setCargando(false);
        })

         .catch((error) => { 
              setError('Hubo un problema al cargar los productos.'); 
              setCargando(false); 
          }); 

    },[])

    if (cargando) return <p>Cargando productos...</p>; 
    if (error) return <p>{error}</p>; 

            return(
                <>
                    <h4 className='text-center mt-5'>Nuestros productos</h4> 
                    <Container style={{ display:'flex',flexWrap: 'wrap', marginBottom:'2rem' }}>
                        {
                            productos.map(producto => 
                            <div key = {producto.id}>
                                <Tarjeta name= {producto.name} imagen = {producto.imagen} descripcion = {producto.descripcion} id = {producto.id} price ={producto.price }/>
                            </div>) 
                        }
                    </Container>
                </>
            ) 


}

export default Galeria;
