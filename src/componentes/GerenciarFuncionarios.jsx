import { useEffect, useState } from "react";
import { controleBD } from '../controleSupabase';
import FuncionarioViewSimples from "./FuncionarioViewSimples";
import { useNavigate } from "react-router-dom";


function GerenciarFuncionarios() {
    const navigate = useNavigate();
    const [funcionarios, setFuncionarios] = useState([]);
    const [turnos, setTurnos] = useState([]);

    useEffect(() => {
        //get
        controleBD.from("funcionario_completo").select("*").then(r => {
            if (!r.error)
                setFuncionarios(r.data);
            else
                console.log(r.error);
        });
        controleBD.from("turnos").select("*").then(r => {
            if (!r.error)
            {                
                setTurnos(r.data);
            }
            else
                console.log(r.error);
        });
    },[]);

    return (
        <>
            <div className="w-75 m-auto">
               <h2>Funcionarios Registrados</h2>
                {funcionarios.map((f,i) => <FuncionarioViewSimples key={i} fc={f} turnos={turnos} /> )}
            </div>
            <button className="btn btn-primary" onClick={() => navigate(-1)}>Voltar</button>
        </>
    );
}

export default GerenciarFuncionarios;
