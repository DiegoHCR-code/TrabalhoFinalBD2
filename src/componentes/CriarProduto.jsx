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
                codigo: infoProds.codigo.replace(/\D/g, ''),
                precoproduto: infoProds.precoproduto.replace(/\D/g, ''),
            }]);
      console.log("cadastrou");
  }

  return (
    <div>
      <p>Preencha para criar um novo Produto: </p>
      <form onSubmit={(e) => {{e.preventDefault(); Processar(e.target);}}}>
        <fieldset>
          <legend>Informações do Produto</legend>

          <label htmlFor="nome">Nome:</label>
          <input type="text" name="nome" id="nome" required />

          <label htmlFor="precoproduto">Preço:</label>
          <input type="number" name="precoproduto" id="precoproduto" required />

          <label htmlFor= "codigo">Código:</label>
          <input type="number" name="codigo" id="codigo" required/>
        </fieldset>
        <button type="submit">Cadastrarrrrrrrrrr</button>
        <button type="reset">Limpar Campos</button>
      </form>
    </div>
  );
}

export default CriarProduto;
