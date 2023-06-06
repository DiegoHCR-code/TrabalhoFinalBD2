import { useEffect, useState } from "react";
import { controleBD } from '../controleSupabase';
import { useNavigate } from 'react-router-dom';


function PainelCusto(u) {
  const navigate = useNavigate();

  return (
    <>
      <button className='btn btn-info' onClick={() => navigate('/CustoMensal', { state: { gerente: true } })}>Gerenciar Custo Mensal</button>
    </>
  );
}

export default PainelCusto;
