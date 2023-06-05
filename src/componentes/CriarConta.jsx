import { useState } from "react";
import { controleBD } from '../controleSupabase';
import { useNavigate } from "react-router-dom";
import { templateFuncionario } from "./templates";
import moment from 'moment';

function CriarConta() {
    let navigate = useNavigate();
    const [infoUsuario, setInfoUsuario] = useState(templateFuncionario);

    function ProcessarInfo(form) {
        const dados = new FormData(form);

        let infoLida = infoUsuario;
        for (const info of dados) {
            infoLida[info[0].slice(6)] = info[1];
        }
        setInfoUsuario(infoLida);
        ExecutarCadastro();
    }

    async function ExecutarCadastro() {
        const { data, error } = await controleBD.auth.signUp({
            email: infoUsuario.email,
            password: infoUsuario.senha,
        });
        const userID = data.user.id;
        if (data) {

            const { error } = await controleBD
                .from('curriculo')
                .insert([
                    {
                        nome: infoUsuario.nome,
                        rg: infoUsuario.rg.replace(/\D/g, ''),
                        telefone: infoUsuario.tel.replace(/\D/g, ''),
                        numcarteira: infoUsuario.carteira.replace(/\D/g, '')
                    }]);
                    
            if (!error) {

                const { error } = await controleBD
                    .from('funcionario')
                    .insert([
                        {
                            id: userID,
                            numcarteirat: infoUsuario.carteira.replace(/\D/g, ''),
                            telefone: infoUsuario.tel.replace(/\D/g, ''),
                            endereco: infoUsuario.end,
                            datanasc: moment(infoUsuario.datanasc).format("YYYY-MM-DD"),
                            rg: infoUsuario.rg.replace(/\D/g, '')
                        }]);
                if (!error) {

                    const { error } = await controleBD
                        .from('contrata')
                        .insert([
                            {
                                datacontratamento: moment().format("YYYY-MM-DD"),
                                rgpessoa: infoUsuario.rg.replace(/\D/g, ''),
                                numcarteira: infoUsuario.carteira.replace(/\D/g, '')
                            }]);

                    if (!error)
                        navigate("/");
                }
                else console.log(error);
            }
            else console.log(error);
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

                    <label htmlFor="inscr-datanasc">Data de nascimento</label>
                    <input required type="date" name="inscr-datanasc" id="inscr-datanasc" />

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

                <label htmlFor="inscr-senha">Senha</label>
                <input required minLength={6} type="password" name="inscr-senha" id="inscr-senha" />

                <button type='submit'>Criar</button>
            </form>
        </div>
    );
}

export default CriarConta;
