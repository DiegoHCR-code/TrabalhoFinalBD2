import { useEffect, useState } from "react";
import { controleBD } from '../controleSupabase';
import { useNavigate } from 'react-router-dom';


function PainelFolha(u) {
  const navigate = useNavigate();

  return (
    <>
      <button className='btn btn-info' onClick={() => navigate('/Folhapagamento', { state: { gerente: true } })}>Gerenciar folhaPagamento</button>
    </>
  );
}

export default PainelFolha;
