
import { Row,Col, Container} from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";


function Footer(){
    return(
        <div>
           <footer className='bg-myBackground text-center fs-6 pt-3 pb-3'> 
            <Container>
                <Row>
                    <Col>Página con fines educativos</Col>
                    <Col>Versión 22/11/2025</Col>
                    <Col >
                    {/* Iconos de Bootstrap Icons */}
                    <a href="#"> <i className="bi bi-facebook" style={{fontSize:"1.5rem", color:"black", margin:"0.5rem"}}> </i> </a>
                    <a href="#"> <i className="bi bi-twitter-x" style={{fontSize:"1.5rem", color:"black", margin:"0.5rem"}}> </i></a>
                    <a href="#"> <i className="bi bi-tiktok " style={{fontSize:"1.5rem", color:"black", margin:"0.5rem"}}> </i></a>
                    </Col>
                </Row>

            </Container>
            </footer>
        </div>
    )
}

export default Footer;
