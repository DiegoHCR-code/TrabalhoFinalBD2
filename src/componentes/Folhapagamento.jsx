import { useEffect, useState } from "react";
import { controleBD } from '../controleSupabase';
import { useNavigate, useLocation } from "react-router-dom";
import PainelFolha from "./proceduregerarfolha";

function FolhaPagamento() {
    
    const navigate = useNavigate();
    let { state } = useLocation();
    const [folha, setFolha] = useState([]);
    const [error, setError] = useState(null);
    const [buscaExecutada, setBuscaExecutada] = useState(false);

    useEffect(() => {
        if (!state.gerente) {
            navigate('/');
        }
    }, []);
    
    useEffect(() => {
        const fetchTodos = async () => {
          try {
            setBuscaExecutada(true);
    
            // Faz a consulta para buscar todos os dados da tabela
            const { data, error } = await controleBD.from('folhapagamento').select('*');
    
            if (error) {
              throw error;
            }
    
            setFolha(data);
            setBuscaExecutada(false);
          } catch (error) {
            setError(error.message);
            setBuscaExecutada(false);
          }
        };
    
        fetchTodos();
      }, []);
    


    return (
        <>{
            <div className="w-75 m-auto">
                <h2>Gerar folha pagamento:</h2>
                <div className="container-sm m-2 p-2 bg-info-subtle rounded">
                <PainelFolha fkFuncionario={state.user} />
                </div>
                <table className="table table-light m-2">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Data</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                     
                    <thead>
                        

                    {folha.map(f => (
                        <tr key={f.cod}><th>{f.cod}</th><th>{f.mes_ano}</th><th>R${f.total_mensal}.00</th></tr>
                    ))}
                    
                    </thead>
                </table>
                <button className="btn btn-primary btn-lg" onClick={() => navigate(-1)}>Voltar</button>
            </div>}
        </>
    );
}

export default FolhaPagamento;
