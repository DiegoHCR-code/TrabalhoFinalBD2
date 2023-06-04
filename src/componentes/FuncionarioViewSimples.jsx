import './FuncionarioViewSimples.css';
import { useNavigate } from "react-router-dom";

function FuncionarioViewSimples({ fc, turnos }) {
    const navigate = useNavigate();

    return (
        <div className="d-flex align-items-center justify-content-between p-2 rounded bg-primary-subtle my-2">
            <p>Nome: {fc.nome}</p>
            <p>Telefone: {fc.telefone}</p>
            <div className="d-flex">
                <p>Turno: </p>
                {turnos
                    .filter(ts => ts.turno_s__pk === fc.fk_turno_s__turno_s__pk)
                    .map((t,i) => <p key={i} className="mx-1">{t.turnos}</p>)}
            </div>
            <div>
                <button className="btn btn-secondary btn-sm mx-2"
                    onClick={() => navigate('/editfunc', { state: { user: { ...fc, propria: false }}})}>Editar</button>
                <button className="btn btn-secondary btn-sm mx-2">Demitir</button>
            </div>
        </div>
    );
}

export default FuncionarioViewSimples;
