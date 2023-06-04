import './FuncionarioViewSimples.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { controleBD } from '../controleSupabase';

function FuncionarioViewSimples({ fc, turnos }) {
    const navigate = useNavigate();


    return (
        <div className='bg-primary-subtle my-2 rounded border border-2 border-dark'>
            <div className="d-flex align-items-center justify-content-between p-2">
                <p>Nome: {fc.nome}</p>
                <div>
                    <p>Telefone: {fc.telefone}</p>
                    <p>Email: {fc.email}</p>
                </div>
                <div className="d-flex">
                    <p>Turno: </p>
                    {turnos
                        .filter(ts => ts.turno_s__pk === fc.fk_turno_s__turno_s__pk)
                        .map((t, i) => <p key={i} className="mx-1">{t.turnos}</p>)}
                </div>
                <div>
                    <button className="btn btn-secondary btn-sm mx-2"
                        onClick={() => navigate('/editfunc', { state: { user: { ...fc, propria: false, eGerente: true } } })}>Editar</button>
                </div>
            </div>

        </div>

    );
}

export default FuncionarioViewSimples;
