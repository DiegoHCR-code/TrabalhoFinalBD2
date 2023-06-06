import './Home.css';

import Auth from './Auth';
import PainelGerente from './PainelGerente';
import { useLoaderData } from "react-router-dom";
import FolhaPagamento from './PainelFolha';

function App() {
  const { user, session } = useLoaderData();

  return (
    <main className='container-lg bg-light rounded m-auto p-4'>
      <h1>Restaurante</h1>
      {(session && user) ?
        <div className='m-4 p-4 bg-light'>
          {user.eGerente ? <PainelGerente /> : "mostrar controle do funcionario"}
          {user.eGerente ? <FolhaPagamento /> : "mostrar folha pagamento"}
        </div >
        :
        <Auth />
      }
    </main>
  );
}

export default App;
