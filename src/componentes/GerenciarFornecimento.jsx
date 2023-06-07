import { useEffect, useState } from "react";
import { controleBD } from '../controleSupabase';
import { useNavigate, useLocation } from "react-router-dom";

function GerenciarFornecimento(){
    const navigate = useNavigate();
    let { state } = useLocation();
    const [forne, setForne] = useState([]);
    const [error, setError] = useState(null);
    const [buscaExecutada, setBuscaExecutada] = useState(false);


    useEffect(() => {
        const fetchTodos = async () => {
            try{
                setBuscaExecutada(true);

                const { data, error } = await controleBD.from('viewfornecedoresprodutos').select('*');

                if (error){
                    throw error;
                }

                setForne(data);
                setBuscaExecutada(false);
            }catch(error){
                setError(error.message);
                setBuscaExecutada(false);
            }
        };

        fetchTodos();
    },[]);

    return (
        <>{
            <div className="w-75 m-auto">
                <h2>Lista Fornecedores produtos</h2>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <thead>
                        {forne.map(f => {
                            <tr key={f.nome_fornecedor}>
                            <th>{f.nome_fornecedor}</th>
                            <th>{f.telefone}</th>
                            <th>{f.nome_produto}</th>
                            <th>{f.precoproduto}</th>
                            </tr>
                        })}
                    </thead>
                </table>
                <button className="btn btn-primary btn-lg" onClick={() => navigate(-1)}>Voltar</button>
            </div>
        }</>
    );
}

export default GerenciarFornecimento;