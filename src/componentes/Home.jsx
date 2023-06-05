import './Home.css';

import { useEffect, useState } from "react";
import { controleBD } from '../controleSupabase';
import Auth from './Auth';
import PainelGerente from './PainelGerente';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

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
        if (!error) {
          const { data: resultado, status } = await controleBD.from("funcionario").select("eGerente").eq("id", usuario.user.id);
          setUser(u => { return { ...usuario.user, eGerente: (status === 200 && resultado[0].eGerente) }; });
        } else
          console.log(error);
      }
    })();
  }, [session]);

  return (
    <>
      <h1>Restaurante</h1>
      {(session && user) ?
        <main>
          <header className='bg-body-secondary p-2 d-flex align-items-center'>
            <p className='my-2 mx-4'>Usuario logado: {user.email}</p>
            <button className='btn btn-info mx-2' onClick={() => navigate('/editfunc', { state: { user: { ...user, propria: true } } })}>minha conta</button>
            <button className='btn btn-warning mx-2' onClick={async () => await controleBD.auth.signOut()}>Sair</button>
          </header>
          <div className='m-4 p-4 bg-light'>
            {user.eGerente ? <PainelGerente /> : "mostrar controle do funcionario"}
          </div >
        </main>
        :
        <Auth />
      }
  
    </>
  );
}

export default App;
