import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider, } from "react-router-dom";

import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Home from './componentes/Home';
import CriarConta from './componentes/CriarConta';
import CriarProduto from './componentes/CriarProduto';
import FotoUsuario from './componentes/FotoUsuario';
import FuncionarioForm from './componentes/FuncionarioForm';
import GerenciarFuncionarios from './componentes/GerenciarFuncionarios';
import CriarFornecedor from './componentes/CriarFonecedor';
import HeaderGeral from './componentes/HeaderGeral';
import AuthLoader from './componentes/AuthLoader';

import Gerarfolha from './componentes/proceduregerarfolha';
import Gerarcusto from './componentes/procedurecustomensal';
import Folhapagamento from './componentes/Folhapagamento';
import CustoMensal from './componentes/CustoMensal';

import GerenciarPratos from './componentes/GerenciarPratos';


const root = ReactDOM.createRoot(document.getElementById('root'));

const Layout = () => (
  <>
    <HeaderGeral />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    loader: AuthLoader,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: AuthLoader
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
        path: "/fotousuario",
        element: <FotoUsuario />
      },
      {
        path: "/criarfornecedor",
        element: <CriarFornecedor />
      },
      {

        path: "/proceduregerarfolha",
        element: <Gerarfolha />
      },
      {
        path: "/procedurecustomensal",
        element: <Gerarcusto/>
      },
      {
        path: "/Folhapagamento",
        element: <Folhapagamento />
      },{
        path: "/gerprato",
        element: <GerenciarPratos />
      },{
        path: "/CustoMensal",
        element: <CustoMensal />
      }
   

    ]
  }
]);

root.render(
  <RouterProvider router={router} />
);