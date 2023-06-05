import './Home.css';

import Auth from './Auth';
import PainelGerente from './PainelGerente';
import { useLoaderData } from "react-router-dom";

function App() {
  const { user, session } = useLoaderData();

  return (
    <>
      <h1>Restaurante</h1>
      {(session && user) ?
        <div className='m-4 p-4 bg-light'>
          {user.eGerente ? <PainelGerente /> : "mostrar controle do funcionario"}
        </div >
        :
        <Auth />
      }
    </>
  );
}

export default App;
