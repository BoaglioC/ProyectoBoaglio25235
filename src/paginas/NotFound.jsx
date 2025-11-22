    import React from 'react';

    // Esta página es solo en caso de que no se encuentre una página 
    // dentro de nuestra aplicación.
    const NotFound = () => {
      return (
        <div style={{textAlign:"center"}}>
          <h1>404 - Page Not Found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
        </div>
      );
    };

    export default NotFound;