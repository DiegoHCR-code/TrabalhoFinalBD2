import { useNavigate } from 'react-router-dom';

function PainelFuncionario() {
    const navigate = useNavigate();

    return (
        <>
            <h4>Painel do Funcionario</h4>
            <div className='d-flex align-items-center justify-content-between'>
                <button className='btn m-2 btn-info' onClick={() => navigate('/')}>Gerenciar Fornecedores</button>
                <button className='btn m-2 btn-info' onClick={() => navigate('/')}>Gerenciar Caixa</button>
                <button className='btn m-2 btn-info' onClick={() => navigate('/')}>Gerenciar Produtos</button>
                <button className='btn m-2 btn-info' onClick={() => navigate('/gerprato')}>Gerenciar Pratos</button>
            </div>
        </>
    );
}

export default PainelFuncionario;
