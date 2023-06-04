import { useEffect, useState } from "react";
import { controleBD } from '../controleSupabase';
import FuncionarioViewSimples from "./FuncionarioViewSimples";
import { useNavigate, useLocation } from "react-router-dom";


function GerenciarFuncionarios() {
    const navigate = useNavigate();
    let { state } = useLocation();
    const [funcionarios, setFuncionarios] = useState([]);
    const [turnos, setTurnos] = useState([]);

    useEffect(() => {
        if (!state.gerente) {
            navigate('/');
        }

        controleBD.from("funcionario_completo").select("*").then(r => {
            if (!r.error) {
                PreencherEmails(r.data).then(f => {
                    setFuncionarios(f);
                });
            }
            else
                console.log(r.error);
        });
        
        controleBD.from("turnos").select("*").then(r => {
            if (!r.error) {
                setTurnos(r.data);
            }
            else
                console.log(r.error);
        });
    }, []);

    async function PreencherEmails(fc) {
        return Promise.all(fc.map(async d => ({ ...d, email: await GetEmail(d.id) })));
    }

    async function GetEmail(funcID) {
        if (!funcID)
            return "Não cadastrado.";

        const { data } = await controleBD.rpc('get_email', { id: funcID });
        return data;
    }

    return (
        <>
            <div className="w-75 m-auto">
                <h2>Funcionarios Registrados</h2>
                {funcionarios.map((f, i) => <FuncionarioViewSimples key={i} fc={f} turnos={turnos} />)}
            </div>
            <button className="btn btn-primary" onClick={() => navigate(-1)}>Voltar</button>
        </>
    );
}

export default GerenciarFuncionarios;
