import React, { useState, useEffect } from 'react';
import Browser from './components/Browser';
import ImagesList from './components/ImagesList';

function App() {
    const [busqueda, saveBusqueda] = useState('');
    const [images, saveImages] = useState([]);
    const [actualPage, saveActualPage] = useState(1);
    const [totalPages, saveTotalPages] = useState(1);

    useEffect(() => {
        const fetchAPI = async () => {
            if (busqueda === '') {
                return;
            }

            const imagesPerPage = 30;
            const key = '13076624-46c069a8a586e1cae88403bac';

            const URL = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagesPerPage}&page=${actualPage}`;

            const response = await fetch(URL);
            const result = await response.json();

            saveImages(result.hits);

            // Calcular el total de paginas
            const calTotalPages = Math.ceil(result.totalHits / imagesPerPage);
            saveTotalPages(calTotalPages);

            // Mover la pantalla hacia la parte superior
            const jumbotron = document.querySelector('.jumbotron');
            jumbotron.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };

        fetchAPI();
    }, [busqueda, actualPage]);

    const paginaAnterior = () => {
        let newActualPage = actualPage - 1;

        // Colocarlo en el state
        saveActualPage(newActualPage);
    };

    const paginaSiguiente = () => {
        let newActualPage = actualPage + 1;

        // Colocarlo en el state
        saveActualPage(newActualPage);
    };

    return (
        <div className="app conatiner">
            <div className="jumbotron bg-primary">
                <p className="lead text-center text-white">Buscador de Imágenes</p>
                <Browser saveBusqueda={saveBusqueda} />
            </div>
            <div className="row justify-content-center mb-5">
                <ImagesList images={images} />

                {actualPage === 1 ? null : (
                    <button onClick={paginaAnterior} type="button" className="btn btn-info mr-1">
                        Anterior &laquo;
                    </button>
                )}

                {actualPage === totalPages ? null : (
                    <button onClick={paginaSiguiente} type="button" className="btn btn-info">
                        Siguiente &raquo;
                    </button>
                )}
            </div>
        </div>
    );
}

export default App;
