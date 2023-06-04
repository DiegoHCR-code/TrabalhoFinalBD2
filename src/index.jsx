import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Home from './componentes/Home';
import CriarConta from './componentes/CriarConta';
import CriarProduto from './componentes/CriarProduto';
import EditarConta from './componentes/EditarConta';
import EditarProduto from './componentes/EditarProduto'
import CriarFornecedor from './componentes/CriarFonecedor';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/criarconta",
    element: <CriarConta />
  },
  {
    path: "/editarconta",
    element: <EditarConta />
  },
  {
    path: "/criarproduto",
    element: <CriarProduto />
  },
  {
    path: "/editarproduto",
    element: <EditarProduto />
  },
  {
    path: "/criarfornecedor",
    element: <CriarFornecedor />
  },
   
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
