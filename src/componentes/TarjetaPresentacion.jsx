import {Card, Button} from 'react-bootstrap';

function TarjetaPresentacion({titulo, descripcion}){
    return (
    // Fijo el tamaño de la tarjeta
    <Card style={{ width: '25rem', margin:'1rem' }}>
        <Card.Body>
          <Card.Title className='text-center fs-6 fw-bold'>{titulo}</Card.Title>
          <Card.Text className='text-justify  fs-6 pt-2'> {descripcion} </Card.Text>
        </Card.Body>
    </Card>
    )

}

export default TarjetaPresentacion;