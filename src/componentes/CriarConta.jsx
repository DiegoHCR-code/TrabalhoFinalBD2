import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
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

const templateUsuario = {
    id: "",
    nome: "",
    carteira: "",
    tel: "",
    nasc: undefined,
    endereco: "",
    rg: "",
    foto: null,
    email: "",
    senha: ""
};

function CriarConta() {
    const [infoUsuario, setInfoUsuario] = useState(templateUsuario);

    function ProcessarInfo(form) {
        const dados = new FormData(form);

        let infoLida = infoUsuario;
        for (const info of dados) {
            infoLida[info[0].slice(6)] = info[1];
        }
        setInfoUsuario(infoLida);
        console.log();
        console.log();
        // ExecutarCadastro();
    }

    async function ExecutarCadastro() {
        const { data, error } = await controleBD.auth.signUp({
            email: infoUsuario.email,
            password: infoUsuario.senha,
        });
        const userID = data.user.id;
        if (data) {
            console.log(userID);
            const { data, error } = await controleBD
                .from('funcionario')
                .insert([
                    {
                        id: userID,
                        numcarteirat: infoUsuario.carteira.replace(/\D/g,''),
                        telefone: infoUsuario.tel,
                        endereco: infoUsuario.end,
                        datanasc: infoUsuario.datanasc,
                        rg: infoUsuario.rg.replace(/\D/g,'')
                    }]);
            if (data) {
                const { data, error } = await controleBD
                    .from('curriculo')
                    .insert([
                        {
                            nome: infoUsuario.nome,
                            rg: infoUsuario.rg.replace(/\D/g,''),
                            telefone: infoUsuario.tel,
                        }]);
                if (data)
                    redirect("/");
            }

        }
    }

    return (
        <div>
            <p>Preencha o formulario com suas informações: </p>
            <form onSubmit={(e) => { e.preventDefault(); ProcessarInfo(e.target); }}>
                <fieldset>
                    <legend>Informações basicas</legend>

                    <label htmlFor="inscr-nome">Nome</label>
                    <input required type="text" name="inscr-nome" id="inscr-nome" />

                    <label htmlFor="inscr-nasc">Data de nascimento</label>
                    <input required type="date" name="inscr-nasc" id="inscr-nasc" />

                    <label htmlFor="inscr-rg">RG</label>
                    <input required type="text" name="inscr-rg" id="inscr-rg" />

                    <label htmlFor="inscr-carteira">Carteira de Trabalho</label>
                    <input required type="text" name="inscr-carteira" id="inscr-carteira" />

                </fieldset>

                <fieldset>
                    <legend>Contato</legend>

                    <label htmlFor="inscr-email">Email</label>
                    <input required type="email" name="inscr-email" id="inscr-email" />

                    <label htmlFor="inscr-tel">Telefone</label>
                    <input required minLength={8} type="text" name="inscr-tel" id="inscr-tel" />

                    <label htmlFor="inscr-end">Endereço</label>
                    <input required type="text" name="inscr-end" id="inscr-end" />

                </fieldset>

                <div>
                    {/* <label htmlFor="inscr-foto">Enviar uma foto: </label>
                    <input type="file" accept=".png,.jpg,.jpeg" name="inscr-foto" id="inscr-foto" onChange={() => EnviarFoto()} />
                    <img src="" alt="foto do usuario" id="inscr-foto-vis" /> */}
                </div>

                <label htmlFor="inscr-senha">Senha</label>
                <input required minLength={6} type="password" name="inscr-senha" id="inscr-senha" />

                <button type='submit'>Criar</button>
            </form>
        </div>
    );
}

export default CriarConta;
