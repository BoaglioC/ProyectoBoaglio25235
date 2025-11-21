
// Basado en el documento de la clase 9

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { Container, Form, Button } from 'react-bootstrap';
 
 
 function Ingresa() {
 const [usuario, setUsuario] = useState('');
 const [password, setPassword] = useState('');
 const { login, estaLogueado } = useAuthContext();
 const navigate = useNavigate();

 // Creo una lista de usuarios y su tipo de permiso (user o admin)
 // Con esto simulo una consulta a la base de datos de usarios y permisos

 const basedatos =[{nombre: "juan", clave:"1234",permiso:"user"},  {nombre:"vero",clave:"abcd",permiso:"user"}, {nombre:"cris",clave:"hola",permiso:"admin"} ];

 

 const handleSubmit = (e) => {
                e.preventDefault();
                // Consulto si el usuario que me pasan esta en la "base de datos de usuarios"
                // Si la encuentra me devolvera toda la informacion del mismo 
                const usuarioSinVerificar = basedatos.find(user => user.nombre === usuario);
                // Simulación de autenticación
                // El metodo find devuelve "undefined" en caso de que no se encuentre el usuario
                // Por dicho motivo verifico primero si encontro el usuario y luego
                // sus permisos de ingreso
                if (typeof usuarioSinVerificar !== "undefined") {
                            if ((usuario === usuarioSinVerificar.nombre) && (password === usuarioSinVerificar.clave)  && (usuarioSinVerificar.permiso=== "user")) {
                            //Le paso el nombre y su permiso
                            login(usuario,"user");
                            navigate('/productos');}
                            else if ((usuario === usuarioSinVerificar.nombre) && (password === usuarioSinVerificar.clave)  && (usuarioSinVerificar.permiso=== "admin")) {
                             //Le paso el nombre y su permiso
                            login(usuario,"admin");
                            navigate('/administracion');       
                            }
                } else {
                alert('Credenciales incorrectas');
                }
            };
 return (

        <div style={{margin:'1rem'}} >
        
            {/* Formulario para habilitar los usuarios o ingresar como administrador y hacer CRUD de los productos */}
            <Container style={{maxWidth:"20rem"}}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control  type="input"  value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Clave</Form.Label>
                        <Form.Control  type="password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>

                    <Form.Text id="passwordHelpBlock" muted>
                        Su clave debe ser segura
                    </Form.Text>
                    <br />
                    <Button type="submit"> Ingresar</Button>
                </Form>
            </Container>
        
            
        </div>
    )

}

 export default Ingresa;

