import './Home.css';

import { useEffect, useState } from "react";
import { controleBD } from '../controleSupabase';
import Auth from './Auth';
import PainelGerente from './PainelGerente';
import { useNavigate } from 'react-router-dom';

function App() {
  let navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    controleBD.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    controleBD.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    (async () => {
      if (session) {
        const { data: usuario, error } = await controleBD.auth.getUser();
        if (!error)
        {
          const { data: resultado, status } = await controleBD.from("funcionario").select("eGerente").eq("id", usuario.user.id);
          setUser(u => { return { ...usuario.user, gerente: (status === 200 && resultado[0].eGerente) }});
        } else console.log(error);        
      }
    })();
  }, [session]);

  return (
    <>
      <header>
        <button onClick={() => navigate('/editarconta', {state: {user}})}>minha conta</button>
        <button onClick={async () => await controleBD.auth.signOut()}>Sair</button>
      </header>
      <h1>Restaurante</h1>
      {(session && user) ?
        <div className='m-4 p-4 bg-light'>
          {user.gerente ? <PainelGerente /> : "mostrar controle do funcionario"}
        </div>
        :
        <Auth />
      }
    </>
  );
}

export default App;
