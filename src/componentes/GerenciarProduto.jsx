import { useEffect, useState } from "react";
import { controleBD } from "../controleSupabase";
import ProdutoView from "./ProdutoView";

function GerenciarProduto() {
    const [prod, setProd] = useState([]);
    const [mostraProd, setMostraProd] = useState(false);

    useEffect(() => {
        LerProdutos();
    }, []);

    function LerProdutos() {
        controleBD
            .from("produto")
            .select("*")
            .then(({ data }) => {
                setProd(data);
                console.log(data);
            });
    }

    async function RemoverProduto() {
        const { error } = await controleBD.from("produto").delete();

        if (error) {
            console.log(error);
        } else {
            LerProdutos();
        }
    }

    async function CadastrarProduto() {
        const nomeProd = document.getElementById("prodnome");
        const precoproduto = document.getElementById("prodpreco");
        const { error } = await controleBD.from("produto").insert({
            nome: nomeProd.value,
            precoproduto: precoproduto.value,
        });
    }

    return (
        <div className="p-4 bg-info-subtle rounded">
            <h4>Produtos: {prod.length}</h4>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Codigo</th>
                    </tr>
                </thead>
                {prod.some((_) => true) ? (
                    <tbody>
                        {prod.map((pr, i) => (
                            <ProdutoView
                                key={i}
                                d={pr}
                                remo={() => RemoverProduto(pr.nome, pr.precoproduto)}
                            />
                        ))}
                    </tbody>
                ) : (
                    ""
                )}
            </table>
            <div>
                <button
                    type="button"
                    onClick={() => setMostraProd(!mostraProd)}
                    className="btn btn-info"
                >
                    Cadastrar
                </button>
                {mostraProd ? 
                    <div className="mx-4 bg-light p-2">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" name="nome" id="nome" className="form-control" required/>
                        <label htmlFor="precoproduto">Preço</label>
                        <input type="number" name="precoproduto" id="precoproduto" className="form-control" required/>

                        <button type="button" className="btn btn-primary" onClick={() => CadastrarProduto()}>Confirmar</button>
                    </div> : ""}
            </div>
        </div>
    );
}

export default GerenciarProduto;