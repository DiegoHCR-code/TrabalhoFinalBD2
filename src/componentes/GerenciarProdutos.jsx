import { useEffect, useState } from "react";
import { controleBD } from "../controleSupabase";
import ProdutoView from "./ProdutoView";

function GerenciarProdutos() {

    const [listaProdutos, setListaProdutos] = useState([]);
    const [edit, setEdit] = useState(-1);

    useEffect(() => {
        LerProdutos();
    }, []);

    async function LerProdutos() {
        if (listaProdutos !== [])
            setListaProdutos([]);
        controleBD.from("produto").select("*").then(({ data: lista }) => {
            setListaProdutos(lista);
        });
    }

    async function RemoverProduto(cod) {
        const { error } = await controleBD
            .from('produto')
            .delete()
            .eq('codigo', cod);
        if (error)
            console.log(error);
        else {
            setListaProdutos(listaProdutos.filter(p => p.codigo !== cod));
        }
    }

    async function ConfirmarEdicao(cod) {
        const nome = document.getElementById("editn" + cod).value;
        const preco = document.getElementById("editp" + cod).value;

        const { error } = await controleBD
            .from('produto')
            .update([
                {
                    nome: nome,
                    precoproduto: preco,
                }])
            .eq('codigo', cod);

        if (error) {
            console.log(error);
        }
        LerProdutos();
        setEdit(-1);
    }

    return (
        <div className="container-xl p-4 bg-light rounded">
            <h4>Produtos: {listaProdutos.length}</h4>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Preco</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaProdutos ?
                            listaProdutos.map((p, i) => {
                                return (
                                    <tr className="produto">
                                        <td>{p.codigo}</td>
                                        <td>{edit === p.codigo ?
                                            <div>
                                                <input type="text" className="form-control" name={"editn" + p.codigo} id={"editn" + p.codigo} defaultValue={p.nome} />
                                            </div>
                                            :
                                            (p.nome)}
                                        </td>
                                        <td>{edit === p.codigo ?
                                            <div>
                                                <input type="number" min={0} step="0.01" className="form-control" name={"editp" + p.codigo} id={"editp" + p.codigo} defaultValue={p.precoproduto} />
                                            </div>
                                            :
                                            (p.precoproduto)}
                                        </td>
                                        <td>
                                            <div>
                                                {edit === p.codigo ? <button type="button" className="btn btn-success btn-sm mx-2" onClick={() => ConfirmarEdicao(p.codigo)}>OK!</button>
                                                    : <button type="button" onClick={() => setEdit(p.codigo)} className="btn btn-warning btn-sm mx-2">Editar</button>}

                                                <button type="button" onClick={() => RemoverProduto(p.codigo)} className="btn btn-danger btn-sm">Remover</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            }) : ""}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default GerenciarProdutos;
