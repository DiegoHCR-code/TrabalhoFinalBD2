import { useEffect, useState } from "react";
import { controleBD } from '../controleSupabase';
import { useLocation, useNavigate } from "react-router-dom";
import { templateFuncionario } from "./templates";
import moment from "moment";

function EditarConta() {

    let navigate = useNavigate();
    let { state } = useLocation();
    const [infoUsuario, setInfoUsuario] = useState(templateFuncionario);
    const [infoExtra, setInfoExtra] = useState({});

    useEffect(() => {
        PopularFormulario();
    }, []);

    async function PopularFormulario() {
        const { data, status, error } = await controleBD.from("funcionario_completo").select("*").eq("id", state.user.id);
        console.log(data);
        if (!error) {
            let info = infoUsuario;
            let extra = {};
            for (const dado in data[0]) {
                let add = false;
                for (const i in info) {
                    if (dado.includes(i)) {
                        info[dado] = data[0][dado];
                        add = true;
                        break;
                    }
                }
                if (!add)
                    extra[dado] = data[0][dado];
            }
            setInfoUsuario({ ...info, ...state.user });
            console.log(infoUsuario);
            setInfoExtra(extra);
            console.log(extra);
        } else
            console.log(error);
    }

    function ProcessarInfo() {

    }

    async function AtualizarBanco() {

    }

    return (
        <div>
            <p>Edite as informacoes: </p>
            <form id="form-editar" className="d-flex flex-column align-items-start w-75 p-2 mx-auto bg-light rounded border border-4" onSubmit={(e) => { e.preventDefault(); ProcessarInfo(); }}>

                <label htmlFor="edt-nome" className="form-label">Nome</label>
                <input required type="text" name="edt-nome" id="edt-nome" className="form-control"
                    value={infoUsuario.nome} onChange={(e) => setInfoUsuario(u => ({ ...u, nome: e.target.value }))} />

                <label htmlFor="edt-email" className="form-label">Email</label>
                <input required type="email" name="edt-email" id="edt-email" className="form-control"
                    value={infoUsuario.email} onChange={(e) => setInfoUsuario(u => ({ ...u, email: e.target.value }))} />

                <label htmlFor="edt-nasc" className="form-label">Data de nascimento</label>
                <input required type="date" name="edt-nasc" id="edt-nasc" className="form-control"
                    value={infoUsuario.datanasc} onChange={(e) => setInfoUsuario(u => ({ ...u, datanasc: e.target.value }))} />

                <label htmlFor="edt-rg" className="form-label">RG</label>
                <input required type="text" name="edt-rg" id="edt-rg" className="form-control"
                    value={infoUsuario.rg} onChange={(e) => setInfoUsuario(u => ({ ...u, rg: e.target.value }))} />

                <label htmlFor="edt-carteira" className="form-label">Carteira de Trabalho</label>
                <input required type="text" name="edt-carteira" id="edt-carteira" className="form-control"
                    value={infoUsuario.numcarteirat} onChange={(e) => setInfoUsuario(u => ({ ...u, numcarteirat: e.target.value }))} />

                <label htmlFor="edt-tel" className="form-label">Telefone</label>
                <input required minLength={8} type="text" name="edt-tel" id="edt-tel" className="form-control"
                    value={infoUsuario.telefone} onChange={(e) => setInfoUsuario(u => ({ ...u, telefone: e.target.value }))} />

                <label htmlFor="edt-end" className="form-label">Endereço</label>
                <input required type="text" name="edt-end" id="edt-end" className="form-control"
                    value={infoUsuario.endereco} onChange={(e) => setInfoUsuario(u => ({ ...u, endereco: e.target.value }))} />

                <label htmlFor="edt-aumento">Aumento</label>
                <input disabled={!infoExtra.eGerente} required type="number" name="edt-aumento" id="edt-aumento" className="form-control"
                    value={infoExtra.aumento ?? 0} onChange={(e) => infoExtra.eGerente && !isNaN(e.target.value) ? setInfoExtra(i => ({ ...i, aumento: e.target.value })) : ""} />

                <div>
                    <label htmlFor="edt-sal">Salario</label>
                    <input disabled={!infoExtra.eGerente} required type="number" step="any" pattern="^[0-9]*[.,]?[0-9]*$" name="edt-sal" id="edt-sal" className="form-control"
                        value={infoExtra.salario ?? 0} onChange={(e) => infoExtra.eGerente && !isNaN(e.target.value) ? setInfoExtra(i => ({ ...i, salario: e.target.value })) : ""} />
                </div>

                <label htmlFor="edt-data-contr" className="form-label">Data de contratação</label>
                <input required type="date" name="edt-data-contr" id="edt-data-contr" className="form-control"
                    value={infoExtra.datacontratamento} />

                <div className="bg-light border border-2 p-2 my-4 d-flex align-items-center">
                    <label htmlFor="edt-faltas" className="form-label">Faltas no mes</label>
                    <input required type="number" name="edt-faltas" id="edt-faltas" className="form-control"
                        value={infoExtra.faltas_mes} />
                    {infoExtra.eGerente ? <button className="btn btn-warning" onClick={() => setInfoExtra(i => ({ ...i, faltas_mes: infoExtra.faltas_mes + 1 }))}>Somar +1 falta</button> : ""}
                </div>

                <fieldset className="container w-25 border border-primary border-2 m-2 d-flex">
                    <legend className="float-none w-auto p-2">Turno</legend>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="turno" id="manha" checked={infoExtra.fk_turno_s__turno_s__pk === 1} />
                        <label class="form-check-label" for="manhã">Manha</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="turno" id="tarde" checked={infoExtra.fk_turno_s__turno_s__pk === 2} />
                        <label class="form-check-label" for="tarde">Tarde</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="turno" id="noite" checked={infoExtra.fk_turno_s__turno_s__pk === 3} />
                        <label class="form-check-label" for="noite">Noite</label>
                    </div>
                </fieldset>

                <div>
                    <label htmlFor="edt-hrextra" className="form-label">Horas-extra</label>
                    <input required type="number" name="edt-hrextra" id="edt-hrextra" className="form-control"
                        value={infoExtra.horasextras} onChange={(e) => infoExtra.eGerente && !isNaN(e.target.value) ? setInfoExtra(i => ({ ...i, horasextras: e.target.value })) : ""} />
                </div>
                <p>vale</p>
                <div>
                    <p>Dependentes:</p>

                </div>

                <p>data contrata, faltas mes, turno, horaextra, dependentes, salario, vale transp</p>
                <button type='submit'>Criar</button>
            </form>
        </div>
    );
}

export default EditarConta;
