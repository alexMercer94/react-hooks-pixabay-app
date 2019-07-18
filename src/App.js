import React from 'react';
import Browser from './components/Browser';

function App() {
    return (
        <div className="app conatiner">
            <div className="jumbotron bg-primary">
                <p className="lead text-center text-white">Buscador de Imágenes</p>
                <Browser />
            </div>
            <div className="row justify-contente-center" />
        </div>
    );
}

export default App;
