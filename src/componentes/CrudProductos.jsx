import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';

// Se guarda en una cadena la dirección URL de nuestro archivo generado por MockAPi
const API_URL = 'https://68dbf3d8445fdb39dc27324c.mockapi.io/prueba/TiendaOnLine';

const CrudProductos = () => {
// El estado de productos
  const [productos, setProductos] = useState([]);
// El estado para que se muestre o no el modal
  const [show, setShow] = useState(false);
// El estado del formulario dentro del Modal
  const [form, setForm] = useState({ name: '', descripcion: '', price: '', stock:'', imagen: '', id: '' });
// El estado para saber si se edita un producto existente o se crea uno nuevo. Se identifica el
// item por el id
  const [editId, setEditId] = useState(null);

// Se obtienen los datos de MockApi y se lo pasa a formato JSON
  const getProductos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setProductos(data);
  };

// Se limpia el formulario del Modal
  const handleClose = () => {
    setShow(false);
    setForm({ name: '', descripcion: '', price: '',stock:'', imagen: '', id: ''});
    setEditId(null);
  };

// Cuando se presione el boton de editar o agregar un nuevo producto
// se ejecuta esta función que permite mostrar el modal (formulario)
  const handleShow = (producto) => {
    // Primero muestra el modal pasando el estado de SHOW de falso a verdadero
    setShow(true);
    // Si se paso un producto como argumento, significa que se desea editar
    // Se depliega el producto y los argumentos numericos se los pasa de numero.
    if (producto) {
      setForm({
        ...producto,
        price: Number(producto.price)
        //, stock: Number(producto.stock)
      });
    // Si no hay producto para editar. Se incrementa el id debido a que se 
    // desea agregar un nuevo producto.
      setEditId(producto.id);
    }
  };
//
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Se depliega el producto y los argumentos numericos se los pasa de numero.
    const productData = {
      ...form,
      price: Number(form.price)
      //, stock: Number(form.stock)
    };

    // Si el editId is verdadero (se desea editar) el metodo a aplicar con Fetch es PUT
    // caso contrario (de desea agregar) el metodo es POST
    const method = editId ? 'PUT' : 'POST';
    // Si el editId is verdadero (se desea editar) pasa la URL+ID (ya que el metodo es PUT)
    // caso contrario (de desea agregar) ys solo se le paso la URL (ya que el metodo es POST)
    const url = editId ? `${API_URL}/${editId}` : API_URL;
    //Se envia a MaockApi la actualización
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    // Se limpia el formulario del Modal
    handleClose();
    // Se vuelve a leer los productos desde MockApi para que refresque 
    // la tabla de items
    getProductos();
  };

//Borra el item identificado por el id 
  const eliminarProducto = async (id) => {
    if (window.confirm('¿Seguro que quieres eliminar este producto?')) {
      // Si confirma que desea eliminar se le pasa a fetch
      // la direccion URL + id y se le dice que use el metodo
      // DELETE
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      // Se vuelve a leer los productos desde MockApi para que refresque 
      // la tabla de items
      getProductos();
    }
  };


// Se obtienen los productos en MockApi

  useEffect(() => {
    getProductos();
  }, []);


  // Renderizado del componente. Se presenta una tabla de cada item
  // que existe en MockApi y en cada fila tiene un boton de edicion y otro
  // de borrado del item. Para agregar un item se puso un boton para tal
  // fin. Cuando se presiona el boton de edicion o de agregar item
  // se despliega un Modal.

  return (
    <div className="container mt-4">
      <h2 className='text-center'>CRUD de Productos</h2>
      {/* Boton para agregar un producto a MockApi */}
      <Button className="mb-4 mt-3" onClick={() => handleShow()}>Agregar Producto</Button>
      {/* Tabla para mostrar los productos de MockApi */}
      <Table striped bordered hover responsive="md" >
        {/* Encabezado de la tabla */}
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        {/* Cuerpo de la tabla. Se recorre el archivo con map y se genera cada fila */}
        <tbody>
          {productos.map(prod => (
            <tr key={prod.id}>
              <td>{prod.name}</td>              
              <td>{prod.descripcion}</td>
              <td>{prod.stock}</td>
              <td>${Number(prod.price).toFixed(2)}</td>
              <td>
                <img src={prod.imagen} alt={prod.id} width={50} />
              </td>
              <td>
                {/* Boton para editar un producto*/}
                <Button size="sm" className='m-2' onClick={() => handleShow(prod)}>Editar</Button>{' '}
                {/* Boton para eliminar un producto */}
                <Button size="sm" className='m-2' variant="danger" onClick={() => eliminarProducto(prod.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* El modal contiene el formulario para editar o agregar un nuevo producto */}
      {/* Si el estado show toma el valor verdadero se muestra el modal con el formulario */}
      {/* Al momento de cerrar el Modal se actualiza el MockApi de acuerdo a handleClose */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? 'Editar' : 'Agregar'} Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                value={form.descripcion}
                onChange={e => setForm({ ...form, descripcion: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={form.price}
                onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                required
              />
            </Form.Group>
           {/*  <Form.Group className="mb-2">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={form.stock}
                onChange={e => setForm({ ...form, stock: Number(e.target.value) })}
                required
              />
            </Form.Group> */}
            <Form.Group className="mb-2">
              <Form.Label>Imagen (URL)</Form.Label>
              <Form.Control
                value={form.imagen}
                onChange={e => setForm({ ...form, imagen: e.target.value })}
                required
              />
            </Form.Group>
            <Button type="submit" className="mt-2">Guardar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CrudProductos;