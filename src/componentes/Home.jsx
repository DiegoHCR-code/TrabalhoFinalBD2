import './Home.css';

import Auth from './Auth';
import PainelGerente from './PainelGerente';
import { useLoaderData } from "react-router-dom";
import PainelFuncionario from './PainelFuncionario';

function App() {
  const { user, session } = useLoaderData();

  return (
    <main className='container-xl rounded mx-auto my-4 bg-light p-4'>
      <h1>Restaurante</h1>
      {(session && user) ?
        <div className='m-4 p-4 bg-light'>
          {user.eGerente ? <PainelGerente /> : ""}
          <PainelFuncionario />
        </div >
        :
        <Auth />
      }
    </main>
  );
}

export default App;
