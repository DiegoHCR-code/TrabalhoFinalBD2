import { useEffect, useState } from "react";
import { controleBD } from "../controleSupabase";
import DependenteView from "./DependenteView";

function GerenciarDependentes({ fkFuncionario }) {
    const [dep, setDep] = useState([]);
    const [mostraCadastro, setMostraCadastro] = useState(false);

    useEffect(() => {
        if (fkFuncionario)
            LerDependentes();
    }, []);

    function LerDependentes() {
        controleBD.from("dependente").select("*").eq("fk_funcionario_numcarteirat", fkFuncionario).then(({ data }) => {
            setDep(data);
            console.log(data);
        });
    }

    async function RemoverDependente(fk, dt) {
        const { error } = await controleBD
            .from('dependente')
            .delete()
            .eq('fk_funcionario_numcarteirat', fk)
            .eq('dtnascimento', dt);

        if (error)
            console.log(error);
        else {
            LerDependentes();
        }
    }

    async function CadastrarDependente() {
        const nomeEl = document.getElementById("depnome");
        const parEl = document.getElementById("deppar");
        const nascEl = document.getElementById("depnasc");
        const telEl = document.getElementById("deptel");
        const telLimpo = telEl.value.replace(/\D/g, '');
        const { error } = await controleBD
            .from('dependente')
            .insert(
                {
                    dtnascimento: nascEl.value,
                    fk_funcionario_numcarteirat: fkFuncionario,
                    nome: nomeEl.value,
                    parentesco: parEl.value,
                    telefone: telLimpo,
                });
    }

    return (
        <div className="p-4 bg-info-subtle rounded">
            <h4>Dependentes: {dep.length}</h4>
            <table className="table table-light">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Parentesco</th>
                        <th></th>
                    </tr>
                </thead>
                {dep.some(_ => true)
                    ? (<tbody>
                        {dep.map((dp, i) => <DependenteView key={i} d={dp} rem={() => RemoverDependente(dp.fk_funcionario_numcarteirat, dp.dtnascimento)} />)}
                    </tbody>)
                    : ""}
            </table>
            <div>
                <button type="button" onClick={() => setMostraCadastro(!mostraCadastro)} className="btn btn-info">Cadastrar</button>
                {mostraCadastro ?
                    <div className="mx-4 bg-light p-2">
                        <label htmlFor="depnome" className="form-label">Nome</label>
                        <input required type="text" name="depnome" id="depnome" className="form-control" />

                        <label htmlFor="depnasc" className="form-label">Data de nascimento: </label>
                        <input required type="date" name="depnasc" id="depnasc" className="form-control" />

                        <label htmlFor="deptel" className="form-label">Telefone</label>
                        <input required type="text" name="deptel" id="deptel" className="form-control" />

                        <label htmlFor="deppar" className="form-label">Parentesco</label>
                        <input required type="text" name="deppar" id="deppar" className="form-control" />

                        <button type="button" className="btn btn-primary" onClick={() => CadastrarDependente()}>Confirmar</button>

                    </div> : ""}
            </div>
        </div>
    );
}

export default GerenciarDependentes;
