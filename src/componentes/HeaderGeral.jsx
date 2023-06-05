import { useLoaderData, useNavigate } from "react-router-dom";
import { controleBD } from "../controleSupabase";

function HeaderGeral() {
    const { user, session } = useLoaderData();
    const navigate = useNavigate();

    return (
        <header className='bg-body-secondary p-2 d-flex align-items-center'>
            <p className='my-2 mx-4'>Usuario logado: {user.email}</p>
            <button className='btn btn-info mx-2' onClick={() => navigate('/editfunc', { state: { user: { ...user, propria: true } } })}>Minha conta</button>
            <button className='btn btn-warning mx-2' onClick={async () => await controleBD.auth.signOut()}>Sair</button>
        </header>
    );
}

export default HeaderGeral;