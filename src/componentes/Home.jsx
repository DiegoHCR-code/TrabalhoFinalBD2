import './Home.css';

import { useEffect, useState } from "react";
import { controleBD } from '../controleSupabase';
import Auth from './Auth';

function App() {

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
        const { data: resultado, status } = await controleBD.from("funcionario").select("*").eq("id", usuario.user.id);
        setUser({ info: user, gerente: (status === 200 && resultado[0].eGerente) });
      }
    })();
  }, [session]);

  return (
    <>
      <h1>Restaurante</h1>

      {(session && user) ?
        <div>
          <p>{user.gerente ? "mostrar controle do gerente" : "mostrar controle do funcionario"}</p>
          <button onClick={async () => await controleBD.auth.signOut()}>Sair</button>
        </div>
        :
        <Auth />
      }
    </>
  );
}

export default App;
