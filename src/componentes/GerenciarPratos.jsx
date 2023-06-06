import { useEffect, useState } from "react";
import { controleBD } from "../controleSupabase";
import DependenteView from "./DependenteView";
import DependentesForm from "./DependentesForm";
import PratoView from "./PratoView";

function GerenciarPratos() {
    const [produtos, setProdutos] = useState([]);
    const [pratos, setPratos] = useState([]);
    const [criarPrato, setCriaPrato] = useState([]);
    const [mostraCadastro, setMostraCadastro] = useState(false);
    const [erro, setErro] = useState(undefined);

    useEffect(() => {
        LerPratos();
    }, []);

    async function LerPratos() {
        if (pratos !== [])
            setPratos([]);

        const { data: pratosInfo } = await controleBD.from("prato").select("*");
        const { data: produtosInfo } = await controleBD.from("produto").select("*");
        const { data: criaInfo } = await controleBD.from("criarprato").select("*");

        if (pratosInfo && produtosInfo && criaInfo) {
            setProdutos(produtosInfo);
            setCriaPrato(criaInfo);
            const resultado = pratosInfo.map(pr => {
                return {
                    ...pr, produtos: produtosInfo.filter(pdt => {
                        return criaInfo.some(pt => pt.fk_produto_codigo === pdt.codigo && pt.fk_prato_numero === pr.numero);
                    })
                };
            });
            setPratos(resultado);
        }
    }

    async function RemoverPrato(num) {
        const { error: criaErr } = await controleBD
            .from('criarprato')
            .delete()
            .eq('numero', num);
        if (criaErr) {
            console.log(criaErr);
            return;
        }

        const { error: pratoErr } = await controleBD
            .from('prato')
            .delete()
            .eq('numero', num);

        if (pratoErr) {
            console.log(pratoErr);
            return;
        }
        else {
            LerPratos();
        }
    }

    async function CadastrarPrato() {
        // const nomeEl = document.getElementById("depnome");
        // const parEl = document.getElementById("deppar");
        // const nascEl = document.getElementById("depnasc");
        // const telEl = document.getElementById("deptel");
        // const telLimpo = telEl.value.replace(/\D/g, '');

        // const { error } = await controleBD
        //     .from('criaprato')
        //     .insert(
        //         {
        //             dtnascimento: nascEl.value,
        //             fk_funcionario_numcarteirat: fkFuncionario,
        //             nome: nomeEl.value,
        //             parentesco: parEl.value,
        //             telefone: telLimpo,
        //         });
        // if (!error) {
        //     setMostraCadastro(false);
        //     LerDependentes();
        // }
        // else
        //     setErro("Ocorreu um erro no cadastro, verifique as informações e tente novamente.");
    }

    return (
        <div className="px-4 py-2 bg-dark-subtle rounded">
            <h4>Pratos: {pratos.length}</h4>
            <div className="table-responsive">
                <table className="table table-light">
                    <thead>
                        <tr>
                            <th>Numero</th>
                            <th>Nome</th>
                            <th>Preco</th>
                            <th></th>
                        </tr>
                    </thead>
                    {pratos.some(_ => true)
                        ?
                        <tbody>
                            {pratos.map((p, i) =>
                                <PratoView key={i} prato={p} produtos={produtos} atualizarLista={LerPratos} removerCallback={() => RemoverPrato(p.numero)} />)}
                        </tbody>
                        : ""}
                </table>
            </div>
            <div>
                <button type="button" onClick={() => setMostraCadastro(!mostraCadastro)} className="btn btn-info">Adicionar Prato</button>
                {mostraCadastro ?
                    <DependentesForm>
                        {erro ? erro : ""}
                        <button type="button" className="btn btn-primary m-2" onClick={() => CadastrarPrato()}>Cadastrar</button>
                    </DependentesForm> : ""}
            </div>
        </div>
    );
}

export default GerenciarPratos;
