import TarjetaPresentacion from "./TarjetaPresentacion";

function Descripcion(){
    return(
        <div>
            <main className='my-viewport-height p-5 '> 
                <h4 className='text-center mb-3 '>Sobre nosotros</h4> 
                <p className="fs-6 text-start"> Electricidad Sur es una empresa con más de 30 años de experiencia. Dedicaba a la venta de insumos de electricidad para el hogar y la industria desde  el Partido de Avellaneda en Buenos Aires llegando a toda la República Argentina. </p>
                <p className="fs-6 text-start"> Trabajamos con las mejores marcas que el mercado ofrece y a precios muy competitivos.</p>
                <p className="fs-6 text-start"> La permanente capacitación de nuestro personal nos permite brindar un adecuado asesoramiento priorizando la satifacción de nuestros clientes.</p>
            </main>
            <h4 className='text-center mb-3'>Te ofrecemos</h4> 
            {/* Implemente las tarjetas de precentación. Como son pocas prefiero repetirlas,
                si fueran mas tendría que automatizar la carga de datos de las mismas (sería el caso de los productos) */}
            <div   style={{ display:'flex',flexWrap: 'wrap', marginBottom:'2rem', paddingLeft:'2rem', justifyContent:"center" }}>
                <TarjetaPresentacion titulo= {"Comprar desde cualquier lugar"} descripcion = {"Suma los productos que precises al carrito. Te los llevamos hasta dónde estés en Argentina."}/>
                <TarjetaPresentacion titulo= {"Elegir tu medio de pago"} descripcion = {"Aceptamos pagos con tarjeta de débito, crédito o transferencia"}/>
                <TarjetaPresentacion titulo= {"Recibir tus productos en menos de 48 hs"} descripcion = {"Tus pedidos llegarán seguros. Trabajamos con transportistas con años de servicio a lo largo de nuestro país."}/>
            </div>
         </div>
    )
}

export default Descripcion;
