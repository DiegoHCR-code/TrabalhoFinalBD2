import { useEffect, useState } from "react";
import { controleBD } from '../controleSupabase';
import { useNavigate } from 'react-router-dom';


function PainelGerente() {
  const navigate = useNavigate();

  return (
    <>
      <h4>Painel do gerente</h4>
      <button className='btn m-2 btn-info' onClick={() => navigate('/gerfunc', { state: { gerente: true } })}>Gerenciar Funcionarios</button>
    </>
  );
}

export default PainelGerente;
