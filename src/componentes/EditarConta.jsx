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
    let infoOriginal = {};

    useEffect(() => {
        PopularFormulario();
        
    }, []);

    async function PopularFormulario() {
        const { data, status, error } = await controleBD.from("funcionario_completo").select("*").eq("id", state.user.id);
        infoOriginal = { ...data[0] };
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
            console.log(infoOriginal);
        } else
            console.log(error);
    }

    async function AtualizarBanco() {
        const { error: updFuncionario } = await controleBD
            .from('funcionario')
            .update([
                {
                    numcarteirat: infoUsuario.numcarteirat,
                    telefone: infoUsuario.telefone,
                    datanasc: moment(infoUsuario.datanasc).format("YYYY-MM-DD"),
                    fk_turno_s__turno_s__pk: infoExtra.fk_turno_s__turno_s__pk,
                    salario: infoExtra.salario,
                    endereco: infoUsuario.endereco,
                    rg: infoUsuario.rg,
                    horasextras: infoExtra.horasextras,
                    aumento: infoExtra.aumento,
                    faltas_mes: infoExtra.faltas_mes,
                    valetransporte: infoExtra.valetransporte,
                }])
            .eq('id', infoUsuario.id);

        if (!updFuncionario) {
            console.log(updFuncionario);
            return;
        }

        const { error: updCurriculo } = await controleBD
            .from('curriculo')
            .update([
                {
                    nome: infoUsuario.nome,
                    rg: infoUsuario.rg,
                    telefone: infoUsuario.telefone,
                    numcarteira: infoUsuario.numcarteirat
                }])
            .eq('rg', infoOriginal.rg);

        if (!updCurriculo) {
            console.log(updCurriculo);
            return;
        }

        const { error: updContrata } = await controleBD
            .from('contrata')
            .update([
                {
                    datacontratamento: moment().format("YYYY-MM-DD"),
                    rgpessoa: infoUsuario.rg,
                    numcarteira: infoUsuario.numcarteirat
                }])
            .eq('rgpessoa', infoOriginal.rg);

        if (!updContrata) {
            console.log(updContrata);
            return;
        }

    }

    return (
        <div>
            <h2>Edite as informações do seu cadastro: </h2>
            <form id="form-editar" className="d-flex flex-column align-items-start w-75 p-2 mx-auto bg-light rounded border border-4" onSubmit={(e) => { e.preventDefault(); AtualizarBanco(); }}>

                <div className="row m-4">
                    <h4>Informações basicas</h4>

                    <div className="col-auto">
                        <label htmlFor="edt-nome" className="form-label">Nome completo</label>
                        <input required type="text" name="edt-nome" id="edt-nome" className="form-control"
                            value={infoUsuario.nome} onChange={(e) => setInfoUsuario(u => ({ ...u, nome: e.target.value }))} />
                    </div>

                    <div className="col-auto">
                        <label htmlFor="edt-nasc" className="form-label">Data de nascimento</label>
                        <input required type="date" name="edt-nasc" id="edt-nasc" className="form-control"
                            value={infoUsuario.datanasc} onChange={(e) => setInfoUsuario(u => ({ ...u, datanasc: e.target.value }))} />
                    </div>

                    <div className="col-auto">
                        <label htmlFor="edt-rg" className="form-label">RG</label>
                        <input required type="text" name="edt-rg" id="edt-rg" className="form-control"
                            value={infoUsuario.rg} onChange={(e) => setInfoUsuario(u => ({ ...u, rg: e.target.value.replace(/\D/g, '') }))} />
                    </div>

                    <div className="col-auto">
                        <label htmlFor="edt-carteira" className="form-label">Carteira de Trabalho</label>
                        <input required type="text" name="edt-carteira" id="edt-carteira" className="form-control"
                            value={infoUsuario.numcarteirat} onChange={(e) => setInfoUsuario(u => ({ ...u, numcarteirat: e.target.value.replace(/\D/g, '') }))} />
                    </div>

                </div>


                <div className="row m-4">
                    <h4>Contato</h4>

                    <div className="col-auto">
                        <label htmlFor="edt-email" className="form-label">Email</label>
                        <input required type="email" name="edt-email" id="edt-email" className="form-control"
                            value={infoUsuario.email} onChange={(e) => setInfoUsuario(u => ({ ...u, email: e.target.value }))} />
                    </div>

                    <div className="col-auto">
                        <label htmlFor="edt-tel" className="form-label">Telefone</label>
                        <input required minLength={8} type="text" name="edt-tel" id="edt-tel" className="form-control"
                            value={infoUsuario.telefone} onChange={(e) => setInfoUsuario(u => ({ ...u, telefone: e.target.value.replace(/\D/g, '') }))} />
                    </div>

                    <div className="col-auto">
                        <label htmlFor="edt-end" className="form-label">Endereço</label>
                        <input required type="text" name="edt-end" id="edt-end" className="form-control"
                            value={infoUsuario.endereco} onChange={(e) => setInfoUsuario(u => ({ ...u, endereco: e.target.value }))} />
                    </div>

                </div>

                <div className="row m-4 bg-warning-subtle rounded p-4 border border-warning">
                    <h4>Informações restritas</h4>
                    {infoExtra.eGerente ? "" : <h6 className="text-danger">Você não tem autorização para alterar estas informações.</h6>}
                    <div className="row m-4">
                        <div className="col-auto">
                            <label htmlFor="edt-sal">Salario</label>
                            <div className="d-flex align-items-center">
                                <span>R$</span>
                                <input disabled={!infoExtra.eGerente} required type="text" name="edt-sal" id="edt-sal" className="form-control"
                                    value={infoExtra.salario} onChange={(e) => infoExtra.eGerente ? setInfoExtra(i => ({ ...i, salario: e.target.value.replace(/\D/g, '') })) : ""} />
                            </div>
                        </div>

                        <div className="col-auto">
                            <label htmlFor="edt-aumento">Aumento</label>
                            <div className="d-flex align-items-center">
                                <span>R$</span>
                                <input disabled={!infoExtra.eGerente} required type="text" name="edt-aumento" id="edt-aumento" className="form-control"
                                    value={infoExtra.aumento ?? 0} onChange={(e) => infoExtra.eGerente ? setInfoExtra(i => ({ ...i, aumento: e.target.value.replace(/\D/g, '') })) : ""} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-auto">
                            <label htmlFor="edt-data-contr" className="form-label">Data de contratação</label>
                            <input disabled type="date" name="edt-data-contr" id="edt-data-contr" className="form-control"
                                value={infoExtra.datacontratamento} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-auto bg-light border border-2 p-2 my-4 d-flex align-items-center">
                            <label htmlFor="edt-faltas" className="form-label">Faltas no mes</label>
                            <input disabled type="number" name="edt-faltas" id="edt-faltas" className="form-control"
                                value={infoExtra.faltas_mes} />
                            {infoExtra.eGerente ? <button className="btn btn-warning" type="button" onClick={() => setInfoExtra(i => ({ ...i, faltas_mes: i.faltas_mes + 1 }))}>Somar +1 falta</button> : ""}
                        </div>
                    </div>
                    <div className="row p-2 border border-secondary">
                        <h4>Turno</h4>
                        <div className="d-flex">
                            <div class="form-check m-2">
                                <input class="form-check-input" type="radio" name="turno" id="manha"
                                    disabled={!infoExtra.eGerente} checked={infoExtra.fk_turno_s__turno_s__pk === 1}
                                    onClick={(_) => setInfoExtra(i => ({ ...i, fk_turno_s__turno_s__pk: 1 }))} />
                                <label class="form-check-label" for="manhã">Manha</label>
                            </div>
                            <div class="form-check m-2">
                                <input class="form-check-input" type="radio" name="turno" id="tarde"
                                    disabled={!infoExtra.eGerente} checked={infoExtra.fk_turno_s__turno_s__pk === 2}
                                    onClick={(_) => setInfoExtra(i => ({ ...i, fk_turno_s__turno_s__pk: 2 }))} />
                                <label class="form-check-label" for="tarde">Tarde</label>
                            </div>
                            <div class="form-check m-2">
                                <input class="form-check-input" type="radio" name="turno" id="noite"
                                    disabled={!infoExtra.eGerente} checked={infoExtra.fk_turno_s__turno_s__pk === 3}
                                    onClick={(_) => setInfoExtra(i => ({ ...i, fk_turno_s__turno_s__pk: 3 }))} />
                                <label class="form-check-label" for="noite">Noite</label>
                            </div>
                        </div>
                    </div>
                    <div className="row my-4">
                        <div className="col-auto">
                            <label htmlFor="edt-hrextra" className="form-label">Horas-extra</label>
                            <input required type="number" name="edt-hrextra" id="edt-hrextra" className="form-control"
                                value={infoExtra.horasextras} onChange={(e) => infoExtra.eGerente && !isNaN(e.target.value) ? setInfoExtra(i => ({ ...i, horasextras: e.target.value })) : ""} />
                        </div>
                    </div>
                    <div className="row my-4">
                        <div className="col-auto">
                            <label htmlFor="edt-vale" className="form-label">Vale-transporte</label>
                            <input required type="number" name="edt-vale" id="edt-vale" className="form-control"
                                value={infoExtra.valetransporte} onChange={(e) => infoExtra.eGerente && !isNaN(e.target.value) ? setInfoExtra(i => ({ ...i, valetransporte: e.target.value })) : ""} />
                        </div>
                    </div>
                </div>

                <div>
                    <p>Dependentes: TODO- gerenciar</p>
                </div>

                <button className="btn btn-primary" type='submit'>Salvar</button>
            </form>
        </div>
    );
}

export default EditarConta;
