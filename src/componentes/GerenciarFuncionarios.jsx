import { useEffect, useState } from "react";
import { controleBD } from '../controleSupabase';
import FuncionarioViewSimples from "./FuncionarioViewSimples";
import { useNavigate, useLocation } from "react-router-dom";


function GerenciarFuncionarios() {
    const navigate = useNavigate();
    let { state } = useLocation();
    const [funcionarios, setFuncionarios] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [busca, setBusca] = useState("");
    const [buscaExecutada, setBuscaExecutada] = useState(false);

    useEffect(() => {
        if (!state.gerente) {
            navigate('/');
        }



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

    function GetTodosFuncionarios() {
        controleBD.from("funcionario_completo").select("*").then(r => {
            if (!r.error) {
                console.log(r.data);
                PreencherEmails(r.data).then(f => {
                    setFuncionarios(f);
                });
            }
            else
                console.log(r.error);
        });
    }

    function ExecutarConsulta() {
        const tipo = document.getElementById("buscaTipo");
        const col = tipo === 't' ? "fk_turno_s__turno_s__pk" : "nome";
        controleBD.from("funcionario_completo")
            .select("*")
            .ilike(col, `%${busca}%`)
            .then(r => {
                if (!r.error) {
                    PreencherEmails(r.data).then(f => {
                        setFuncionarios(f);
                    });
                }
                else
                    console.log(r.error);
            });
        setBuscaExecutada(true);
    }

    return (
        <>
            <div className="w-75 m-auto">
                <h2>Gerenciar funcionarios:</h2>
                <div className="container-sm m-2 p-2 bg-info-subtle rounded">
                    <h4>Consulta:</h4>
                    <div>
                        <label className="form-label mx-2" htmlFor="inBusca">Procurar funcionarios por: </label>
                        <select name="buscaTipo" id="buscaTipo" onChange={(e) => console.log(e.target.value)}>
                            <option value="n">Nome</option>
                            <option value="t">Turno</option>
                        </select>
                        <input className="form-control" type="text" name="inBusca" id="inBusca"
                            value={busca || ""} onChange={(e) => setBusca(e.target.value)}
                            onKeyUp={(e) => { if (e.key === "Enter") ExecutarConsulta(); }} />
                    </div>
                    <button className="btn btn-info btn-sm m-2" onClick={() => ExecutarConsulta()}>Procurar</button>
                    <button className="btn btn-info btn-sm m-2" onClick={() => GetTodosFuncionarios()}>Ver Todos</button>
                </div>
                <div>
                    {buscaExecutada ?
                        (funcionarios.some(_ => true)
                            ? <h4>Resultado: {funcionarios.length} encontrados</h4>
                            : <h4 className="p-2 m-auto w-50 rounded bg-warning text-center">Nenhum funcionario encontrado</h4>) : ""}

                    {funcionarios.map((f, i) => {
                        return <FuncionarioViewSimples key={i} fc={f} turnos={turnos} />;
                    })}
                </div>
                <button className="btn btn-primary btn-lg" onClick={() => navigate(-1)}>Voltar</button>
            </div>
        </>
    );
}

export default GerenciarFuncionarios;