import { useNavigate } from "react-router-dom";

function Erro() {
    const nav = useNavigate();

    return (
        <div className="d-flex bg-light align-items-center  border border-light border-2 rounded">
            <h2>Ocorreu um erro inesperado, clique <button className="btn btn-primary" onClick={() => nav("/")}>Aqui</button> para voltar a pagina inicial.</h2>
        </div>
    );
}

export default Erro;