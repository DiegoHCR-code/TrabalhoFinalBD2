import { useEffect, useState } from "react";
import { controleBD } from '../controleSupabase';

function Auth() {

  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  const [loginInfo, setLoginInfo] = useState({ email: "", senha: "" });

  useEffect(() => {
    controleBD.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session)
        controleBD.auth.getUser().then((u) => setUser(u));
    });
  }, []);

  async function Login() {
    const { data, error } = await controleBD.auth.signInWithPassword({
      email: loginInfo.email,
      password: loginInfo.senha,
    });
  }

  return (
    <div>
      <p>Entre com seu Email e senha: </p>
      <form onSubmit={(e) => { e.preventDefault(); Login(); }}>

        <label htmlFor="login-email">Email</label>
        <input required type="email" name="login-email" id="login-email"
          value={loginInfo.email}
          onChange={e => setLoginInfo(anterior => ({ ...anterior, email: e.target.value }))} />

        <label htmlFor="login-senha">Senha</label>
        <input required minLength={6} type="password" name="login-senha" id="login-senha"
          value={loginInfo.senha}
          onChange={e => setLoginInfo(anterior => ({ ...anterior, senha: e.target.value }))} />

        <button type='submit'>Login</button>
      </form>
      <p>ou <a href='/criarconta'>cadastre uma conta.</a></p>
    </div>
  );
}

export default Auth;
