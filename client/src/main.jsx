import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CarritoProvider } from './CarritoContext.jsx';
import './index.css';
import './carrito.css';

const contenedorHtml = document.getElementById('root');

const raiz = ReactDOM.createRoot(contenedorHtml);

raiz.render(
    <React.StrictMode>
        <CarritoProvider>
            <App />
        </CarritoProvider>
    </React.StrictMode>
);