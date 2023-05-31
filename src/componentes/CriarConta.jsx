import { useEffect, useState } from "react";
import { controleBD } from '../controleSupabase';

// CREATE TABLE Funcionario (
//     NumCarteiraT NUMERIC PRIMARY KEY,
//     id uuid,
//     Telefone NUMERIC,
//     datanasc DATE,
//     fk_Turno_s__Turno_s__PK INT,
//     Salario NUMERIC,
//     Endereco VARCHAR,
//     RG NUMERIC,
//     HorasExtras INT,
//     Aumento INT,
//     Faltas_mes INT,
//     ValeTransporte NUMERIC,
//     Foto VARCHAR,
//     NumDependente INT
// );

function CriarConta() {
  const [userInfo, setUserInfo] = useState(
    { 
//         id: "",
// numerocarteira: "",
// telefone: "",
// datanasc: undefined,
// fk_Turno_s__Turno_s__PK
// salario: 0.00,
// Endereco: "",
// RG: "",
// HorasExtras
// Aumento
// Faltas_mes
// ValeTransporte
// Foto
// NumDependente

    });

  async function CriarConta() {
    const { data, error } = await controleBD.auth.signUp({
      email: 'carloshrmoraes@gmail.com',
      password: '0123',
    });
  }

  return (
    <div>
      <p>Preencha o formulario com suas informações: </p>
      <form onSubmit={(e) => { e.preventDefault(); CriarConta(); }}>

        <label htmlFor="login-email">Email</label>
        <input required type="email" name="login-email" id="login-email"
          value={userInfo.email}
          onChange={e => setUserInfo(anterior => ({ ...anterior, email: e.target.value }))} />
        

        <label htmlFor="login-senha">Senha</label>
        <input required minLength={6} type="password" name="login-senha" id="login-senha"
          value={userInfo.senha}
          onChange={e => setUserInfo(anterior => ({ ...anterior, senha: e.target.value }))} />

        <button type='submit'>Criar</button>
      </form>
    </div>
  );
}

export default CriarConta;
