import { useEffect, useState } from "react";
import { controleBD } from '../controleSupabase';
import { useLocation, useNavigate } from "react-router-dom";
import { templateFuncionario } from "./templates";
import moment from "moment";

function EditarConta() {

    let navigate = useNavigate();
    let { state } = useLocation();
    const [infoUsuario, setInfoUsuario] = useState(templateFuncionario);

    useEffect(() => {
        PopularFormulario();
    },[]);

    async function PopularFormulario() {
        const { data, status, error } = await controleBD.from("funcionario_completo").select("*").eq("id", state.user.id);
        console.log(data);
        if (!error)
        {
            let info = infoUsuario;
            for (const dado in data[0]) {
                for (const i in info) {
                    if (dado.includes(i))
                        info[i] = data[0][dado];
                }
            }
            setInfoUsuario(info);
        } else 
            console.log(error);
    }

    function ProcessarInfo() {
        // const dados = new FormData(form);
        AtualizarBanco();
    }

    async function AtualizarBanco() {
        // if (data) {
        //     const { error } = await controleBD
        //         .from('curriculo')
        //         .insert([
        //             {
        //                 nome: infoUsuario.nome,
        //                 rg: infoUsuario.rg.replace(/\D/g, ''),
        //                 telefone: infoUsuario.tel.replace(/\D/g, ''),
        //                 numcarteira: infoUsuario.carteira.replace(/\D/g, '')
        //             }]);
        //     if (!error) {
        //         const { error } = await controleBD
        //             .from('funcionario')
        //             .insert([
        //                 {
        //                     id: userID,
        //                     numcarteirat: infoUsuario.carteira.replace(/\D/g, ''),
        //                     telefone: infoUsuario.tel.replace(/\D/g, ''),
        //                     endereco: infoUsuario.end,
        //                     datanasc: infoUsuario.datanasc,
        //                     rg: infoUsuario.rg.replace(/\D/g, '')
        //                 }]);
        //         if (!error)
        //             navigate("/");
        //         else console.log(error);
        //     }
        //     else console.log(error);
        // }
    }

    return (
        <div>
            <p>Edite suas informações: </p>
            <form onSubmit={(e) => { e.preventDefault(); ProcessarInfo(); }}>
                <fieldset>
                    <legend>Informações basicas</legend>

                    <label htmlFor="inscr-nome">Nome</label>
                    <input required type="text" name="inscr-nome" id="inscr-nome" 
                        value={infoUsuario.nome} onChange={(e) => setInfoUsuario(u => ({ ...u, nome: e.target.value}) )}/>

                    <label htmlFor="inscr-nasc">Data de nascimento</label>
                    <input required type="date" name="inscr-nasc" id="inscr-nasc" 
                        value={infoUsuario.nasc} onChange={(e) => setInfoUsuario(u => ({ ...u, nasc: e.target.value}) )}/>

                    <label htmlFor="inscr-rg">RG</label>
                    <input required type="text" name="inscr-rg" id="inscr-rg" 
                        value={infoUsuario.rg} onChange={(e) => setInfoUsuario(u => ({ ...u, rg: e.target.value}) )}/>

                    <label htmlFor="inscr-carteira">Carteira de Trabalho</label>
                    <input required type="text" name="inscr-carteira" id="inscr-carteira" 
                        value={infoUsuario.carteira} onChange={(e) => setInfoUsuario(u => ({ ...u, carteira: e.target.value}) )}/>

                </fieldset>

                <fieldset>
                    <legend>Contato</legend>

                    <label htmlFor="inscr-tel">Telefone</label>
                    <input required minLength={8} type="text" name="inscr-tel" id="inscr-tel" 
                        value={infoUsuario.tel} onChange={(e) => setInfoUsuario(u => ({ ...u, tel: e.target.value}) )}/>

                    <label htmlFor="inscr-end">Endereço</label>
                    <input required type="text" name="inscr-end" id="inscr-end" 
                        value={infoUsuario.endereco} onChange={(e) => setInfoUsuario(u => ({ ...u, endereco: e.target.value}) )}/>

                </fieldset>

                <button type='submit'>Criar</button>
            </form>
        </div>
    );
}

export default EditarConta;
