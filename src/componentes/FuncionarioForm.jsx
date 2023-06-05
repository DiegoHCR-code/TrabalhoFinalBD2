import { useEffect, useState } from "react";
import { controleBD } from '../controleSupabase';
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';

const CDNURL = process.env.REACT_APP_SUPABASE_SERVER + "/storage/v1/object/public/imagens/";

function FuncionarioForm() {

    const navigate = useNavigate();
    let { state } = useLocation();

    const [infoUsuario, setInfoUsuario] = useState({});
    const [confDel, setConfDel] = useState(false);
    const [infoOriginal, setOriginal] = useState({});


    /*-------FOTO----------*/
    const user = useUser();
    const supabase = useSupabaseClient();
    //imagens
    const [images, setImages] = useState([]);

    async function getImages() {
        const { data, error } = await controleBD
            .storage
            .from('imagens')
            .list(state.user?.id + "/", {
                limit: 100,
                offset: 0,
                sortBy: { column: "name", order: "asc" }
            });
        if (data !== null) {
            setImages(data);
        } else {
            alert('Erro ao carregar imagens');
            console.log(error);
        }

    }
    useEffect(() => {
        if (state.user.id) {
            getImages();
        }
    }, [state.user.id]);
    //Imagens apenas do usuario
    async function uploadImage(e) {
        let file = e.target.files[0];

        const { data, error } = await controleBD
            .storage.from('imagens')
            .upload(state.user.id + "/" + uuidv4(), file)//id do usuario / id aleatorio
        if (data) {
            getImages();
        } else {
            console.log(error);
        }
    }

    async function deleteImage(imagename) {
        const { error } = await controleBD
            .storage.from('imagens')
            .remove([state.user.id + "/" + imagename])
        if (error) {
            alert(error);
        } else {
            getImages();
        }
    }

    /*-------FOTO----------*/
    const [msg, setMsg] = useState(undefined);

    useEffect(() => {
        PopularFormulario();
    }, []);

    async function PopularFormulario() {
        if (state.user.id) {
            const { data, error } = await controleBD.from("funcionario_completo").select("*").eq("id", state.user.id);
            if (!error) {
                setOriginal(data[0]);
                setInfoUsuario(data[0]);
            } else
                console.log(error);
        } else {
            setOriginal(state.user);
            setInfoUsuario(state.user);
        }
    }

    async function AtualizarBanco() {
        const { error: updFuncionario } = await controleBD
            .from('funcionario')
            .update([
                {
                    numcarteirat: infoUsuario.numcarteirat,
                    telefone: infoUsuario.telefone,
                    datanasc: moment(infoUsuario.datanasc).format("YYYY-MM-DD"),
                    fk_turno_s__turno_s__pk: infoUsuario.fk_turno_s__turno_s__pk,
                    salario: infoUsuario.salario,
                    endereco: infoUsuario.endereco,
                    rg: infoUsuario.rg,
                    horasextras: infoUsuario.horasextras,
                    aumento: infoUsuario.aumento,
                    faltas_mes: infoUsuario.faltas_mes,
                    valetransporte: infoUsuario.valetransporte,
                }])
            .eq('rg', infoOriginal.rg);

        if (updFuncionario) {
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

        if (updCurriculo) {
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

        if (updContrata) {
            console.log(updContrata);
            return;
        }
        setMsg("Alterações realizadas com sucesso! Redirecionando...");
        setTimeout(() => navigate(state.user.propria ? '/' : -1), 2000);
    }

    async function DeleteUsuario() {
        const { error } = await controleBD
            .from('funcionario')
            .delete()
            .eq('rg', infoUsuario.rg);
        if (error)
            console.log(error);
        else {
            setMsg("Funcionário excluido com sucesso. Redirecionando...")
            setTimeout(() => navigate(state.user.propria ? '/' : -1), 2000);
        }
    }

    return (
        <div>
            <h2>Editando as informações do {state.user.propria ? "seu cadastro" : `cadastro de ${infoUsuario.nome}`}: </h2>
            <form id="form-editar" className="d-flex flex-column align-items-start w-75 p-2 mx-auto bg-light rounded border border-4" onSubmit={(e) => { e.preventDefault(); AtualizarBanco(); }}>

                <div className="row m-4">
                    <h4>Informações basicas</h4>
                    <Container align="center" className="container-sm mt-4">
                        { }
                        {state.user.id === null ?
                            <>
                                <h1>É preciso fazer login</h1>
                                <div><a href="Auth">Pagina cadasto</a></div>
                            </>
                            :
                            <>
                                
                                {images.length == 0 ?
                                    <>
                                        <h3>Insira sua foto abaixo</h3>
                                        <Form.Group className="mb-3" style={{ maxWidth: "500px" }}>
                                            <Form.Control type="file" accept="image/png, images/jpeg, images/jpg" onChange={(e) => uploadImage(e)}></Form.Control>
                                        </Form.Group>
                                    </>
                                    :
                                    <>
                                        { }
                                        <h3>Para cadastrar outra foto é preciso deletar a atual</h3>
                                        <Row justifyContent="center">
                                            {
                                                images.map((image) => {
                                                    return (
                                                        <Col  xs={1} md={3} key={CDNURL + state.user.id + "/" + image.name}>
                                                            <Card >
                                                                <Card.Img variant="top" src={CDNURL + state.user.id + "/" + image.name} />
                                                                <Card.Body>
                                                                    <Button variant="danger" onClick={() => deleteImage(image.name)}>Delete Image</Button>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                    )
                                                }
                                                )
                                            }
                                        </Row>
                                    </>

                                }
                            </>}
                    </Container>


                    <div className="col-auto">
                        <label htmlFor="edt-nome" className="form-label">Nome completo</label>
                        <input required type="text" name="edt-nome" id="edt-nome" className="form-control"
                            value={infoUsuario.nome || ""} onChange={(e) => setInfoUsuario(u => ({ ...u, nome: e.target.value }))} />
                    </div>

                    <div className="col-auto">
                        <label htmlFor="edt-nasc" className="form-label">Data de nascimento</label>
                        <input required type="date" name="edt-nasc" id="edt-nasc" className="form-control"
                            value={infoUsuario.datanasc || new Date()} onChange={(e) => setInfoUsuario(u => ({ ...u, datanasc: e.target.value }))} />
                    </div>

                    <div className="col-auto">
                        <label htmlFor="edt-rg" className="form-label">RG</label>
                        <input disabled type="text" name="edt-rg" id="edt-rg" className="form-control"
                            value={infoUsuario.rg || ""} onChange={(e) => setInfoUsuario(u => ({ ...u, rg: e.target.value.replace(/\D/g, '') }))} />
                    </div>

                    <div className="col-auto">
                        <label htmlFor="edt-carteira" className="form-label">Carteira de Trabalho</label>
                        <input disabled type="text" name="edt-carteira" id="edt-carteira" className="form-control"
                            value={infoUsuario.numcarteirat || ""} onChange={(e) => setInfoUsuario(u => ({ ...u, numcarteirat: e.target.value.replace(/\D/g, '') }))} />
                    </div>

                </div>


                <div className="row m-4">
                    <h4>Contato</h4>

                    <div className="col-auto">
                        <label htmlFor="edt-tel" className="form-label">Telefone</label>
                        <input required minLength={8} type="text" name="edt-tel" id="edt-tel" className="form-control"
                            value={infoUsuario.telefone || ""} onChange={(e) => setInfoUsuario(u => ({ ...u, telefone: e.target.value.replace(/\D/g, '') }))} />
                    </div>

                    <div className="col-auto">
                        <label htmlFor="edt-end" className="form-label">Endereço</label>
                        <input required type="text" name="edt-end" id="edt-end" className="form-control"
                            value={infoUsuario.endereco || ""} onChange={(e) => setInfoUsuario(u => ({ ...u, endereco: e.target.value }))} />
                    </div>

                    <div className="col-auto">
                        <label htmlFor="edt-email" className="form-label">Email</label>
                        <input type="email" name="edt-email" id="edt-email" className="form-control"
                            defaultValue={state.user.email || ""} disabled />
                    </div>

                </div>

                <div className="row m-4 bg-warning-subtle rounded p-4 border border-warning">
                    <h4>Informações restritas</h4>
                    {infoUsuario.eGerente ? "" : <h6 className="text-danger">Você não tem autorização para alterar estas informações.</h6>}
                    <div className="row m-4">
                        <div className="col-auto">
                            <label htmlFor="edt-sal">Salario</label>
                            <div className="d-flex align-items-center">
                                <span>R$</span>
                                <input disabled={!infoUsuario.eGerente} required type="text" name="edt-sal" id="edt-sal" className="form-control"
                                    value={infoUsuario.salario || 0} onChange={(e) => infoUsuario.eGerente ? setInfoUsuario(i => ({ ...i, salario: e.target.value.replace(/\D/g, '') })) : ""} />
                            </div>
                        </div>

                        <div className="col-auto">
                            <label htmlFor="edt-aumento">Aumento</label>
                            <div className="d-flex align-items-center">
                                <span>R$</span>
                                <input disabled={!infoUsuario.eGerente} required type="text" name="edt-aumento" id="edt-aumento" className="form-control"
                                    value={infoUsuario.aumento || 0} onChange={(e) => infoUsuario.eGerente ? setInfoUsuario(i => ({ ...i, aumento: e.target.value.replace(/\D/g, '') })) : ""} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-auto">
                            <label htmlFor="edt-data-contr" className="form-label">Data de contratação</label>
                            <input disabled type="date" name="edt-data-contr" id="edt-data-contr" className="form-control"
                                defaultValue={infoUsuario.datacontratamento ?? new Date()} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-auto bg-light border border-2 p-2 my-4 d-flex align-items-center">
                            <label htmlFor="edt-faltas" className="form-label">Faltas no mes</label>
                            <input disabled type="number" name="edt-faltas" id="edt-faltas" className="form-control"
                                value={infoUsuario.faltas_mes || 0} />
                            {infoUsuario.eGerente ? <button className="btn btn-warning" type="button" onClick={() => setInfoUsuario(i => ({ ...i, faltas_mes: i.faltas_mes + 1 }))}>Somar +1 falta</button> : ""}
                        </div>
                    </div>
                    <div className="row p-2 border border-secondary">
                        <h4>Turno</h4>
                        <div className="d-flex">
                            <div className="form-check m-2">
                                <input className="form-check-input" type="radio" name="turno" id="manha"
                                    disabled={!infoUsuario.eGerente} checked={infoUsuario.fk_turno_s__turno_s__pk === 1}
                                    onClick={(_) => setInfoUsuario(i => ({ ...i, fk_turno_s__turno_s__pk: 1 }))} />
                                <label className="form-check-label" htmlFor="manhã">Manha</label>
                            </div>
                            <div className="form-check m-2">
                                <input className="form-check-input" type="radio" name="turno" id="tarde"
                                    disabled={!infoUsuario.eGerente} checked={infoUsuario.fk_turno_s__turno_s__pk === 2}
                                    onClick={(_) => setInfoUsuario(i => ({ ...i, fk_turno_s__turno_s__pk: 2 }))} />
                                <label className="form-check-label" htmlFor="tarde">Tarde</label>
                            </div>
                            <div className="form-check m-2">
                                <input className="form-check-input" type="radio" name="turno" id="noite"
                                    disabled={!infoUsuario.eGerente} checked={infoUsuario.fk_turno_s__turno_s__pk === 3}
                                    onClick={(_) => setInfoUsuario(i => ({ ...i, fk_turno_s__turno_s__pk: 3 }))} />
                                <label className="form-check-label" htmlFor="noite">Noite</label>
                            </div>
                        </div>
                    </div>
                    <div className="row my-4">
                        <div className="col-auto">
                            <label htmlFor="edt-hrextra" className="form-label">Horas-extra</label>
                            <input required type="number" name="edt-hrextra" id="edt-hrextra" className="form-control"
                                value={infoUsuario.horasextras || 0} onChange={(e) => infoUsuario.eGerente && !isNaN(e.target.value) ? setInfoUsuario(i => ({ ...i, horasextras: e.target.value })) : ""} />
                        </div>
                    </div>
                    <div className="row my-4">
                        <div className="col-auto">
                            <label htmlFor="edt-vale" className="form-label">Vale-transporte</label>
                            <input required type="number" name="edt-vale" id="edt-vale" className="form-control"
                                value={infoUsuario.valetransporte || 0} onChange={(e) => infoUsuario.eGerente && !isNaN(e.target.value) ? setInfoUsuario(i => ({ ...i, valetransporte: e.target.value })) : ""} />
                        </div>
                    </div>
                </div>

                <div>
                    <p>Dependentes: TODO- gerenciar</p>
                </div>

                <div className="m-auto">
                    <button className="btn btn-primary mx-2" type='submit'>Salvar</button>
                    <button className="btn btn-dark mx-2" onClick={() => navigate(-1)}>Cancelar</button>
                    <button type="button" className="btn btn-warning mx-5" onClick={() => setConfDel(!confDel)}>Excluir</button>
                </div>

                {confDel ?
                    <div className='bg-danger text-white p-2 d-flex'>
                        <p>Tem certeza que deseja excluir este funcionário e apagar todas as suas informações do banco?</p>
                        <button type="button" className='btn btn-warning mx-2 btn-sm' onClick={() => DeleteUsuario()}>Excluir</button>
                        <button type="button" className='btn btn-light mx-2 btn-sm' onClick={() => setConfDel(false)}>Cancelar</button>
                    </div> : ""}
            </form>
            {msg !== undefined ?
                <div className="position-absolute top-50 start-50 bg-success shadow border border-2 p-4">
                    <h4 className="text-white">{msg}</h4>
                </div> : ""
            }
        </div>
    );
}

export default FuncionarioForm;