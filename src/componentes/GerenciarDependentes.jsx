import { useEffect, useState } from "react";
import { controleBD } from "../controleSupabase";
import DependenteView from "./DependenteView";

function GerenciarDependentes({ c }) {
    const [dep, setDep] = useState([]);

    useEffect(() => {
        if (c)
            controleBD.from("dependente").select("*").eq("fk_funcionario_numcarteirat", c).then(({ data }) => {
                setDep(data);
                console.log(data);
            });
    }, []);

    async function RemoverDependente(fk, dt) {
        console.log(fk);
        // const { error } = await controleBD
        //     .from('dependente')
        //     .delete()
        //     .eq('fk_funcionario_numcarteirat', fk)
        //     .eq('dtnascimento', dt);

        // if (error)
        //     console.log(error);
        // else {
        //     console.log();
        // }
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
                <button className="btn btn-info">Cadastrar</button>
            </div>
        </div>
    );
}

export default GerenciarDependentes;
