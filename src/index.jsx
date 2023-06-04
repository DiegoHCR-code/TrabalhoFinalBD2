import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Home from './componentes/Home';
import CriarConta from './componentes/CriarConta';
import CriarProduto from './componentes/CriarProduto';
import FuncionarioForm from './componentes/FuncionarioForm';
import GerenciarFuncionarios from './componentes/GerenciarFuncionarios';
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
    path: "/editfunc",
    element: <FuncionarioForm />
  },
  {
    path: "/gerfunc",
    element: <GerenciarFuncionarios />
  },
  {
    path: "/criarproduto",
    element: <CriarProduto />
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
