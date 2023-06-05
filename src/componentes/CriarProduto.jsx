import { controleBD } from "../controleSupabase";
import { useEffect, useState } from "react";
import { templateProduto } from "./templates";

//CREATE TABLE Produto (
//    codigo INT PRIMARY KEY,
//    nome VARCHAR,
//    precoProduto NUMERIC
//);

function CriarProduto() {
  const [infoProds, setInfoProds] = useState(templateProduto);

  function Processar(formProd) {
    const infor = new FormData(formProd);

    let infoLidaP = infoProds;
    console.log(infoLidaP, "teste");
    for (const info of infor) {
      infoLidaP[info[0].slice()] = info[1];
    }
    setInfoProds(infoLidaP);
    ExecutarCadastroProd();
    console.log("funfou");
  }

  async function ExecutarCadastroProd() {
        const { error} = await controleBD.from("produto").insert([
            {
                nome: infoProds.nome,
                precoproduto: infoProds.precoproduto.replace(/\D/g, ''),
            }]);
      console.log("cadastrou");
  }

  return (
    <div className='bg-primary-subtle my-2 rounded border border-2 border-dark d-flex align-items-center justify-content-center flex-column text-lg-center'>
      <p className="mt-5">Preencha para criar um novo Produto: </p>
      <form onSubmit={(e) => {{e.preventDefault(); Processar(e.target);}}}>
        <fieldset>
          <legend className="fw-bold mb-3">Informações do Produto</legend>

          <label htmlFor="nome" className="mb-5">Nome:</label>
          <input type="text" name="nome" id="nome" className="me-5" required />

          <label htmlFor="precoproduto" >Preço:</label>
          <input type="number" name="precoproduto" id="precoproduto" required />

        </fieldset>
        <button type="submit" className="me-5 mb-5">Cadastrar</button>
        <button type="reset">Limpar Campos</button>
      </form>
    </div>
  );
}

export default CriarProduto;
