import { controleBD } from "../controleSupabase";
import { useEffect, useState } from "react";

//CREATE TABLE Produto (
//    codigo INT PRIMARY KEY,
//    nome VARCHAR,
//    precoProduto NUMERIC
//);

const templateProduto = {
  codigo: "",
  nome: "",
  precoproduto: "",
};

function CriarProduto() {
  const [infoProds, setInfoProds] = useState(templateProduto);

  function Processar(formProd) {
    const infor = new FormData(formProd);

    let infoLidaP = infoProds;
    for (const info of infor) {
      infoLidaP[info[0].slice(6)] = info[1];
      console.log("funfou2");
    }
    setInfoProds(infoLidaP);
    ExecutarCadastroProd();
    console.log("funfou");
  }

  async function ExecutarCadastroProd() {
        controleBD.from("produto").insert([
            {
                nome: infoProds.nome,
                codigo: infoProds.codigo,
                precoproduto: infoProds.precoproduto,
            },
          ]);
      console.log("cadastrou");
  }

  return (
    <div>
      <p>Preencha para criar um novo Produto: </p>
      <form onSubmit={(e) => {{e.preventDefault(); Processar(e.target);}}}>
        <fieldset>
          <legend>Informações do Produto</legend>

          <label htmlFor="inscr-nomeP">Nome:</label>
          <input type="text" name="inscr-nomeP" id="inscr-nomeP" required />

          <label htmlFor="inscr-precoP">Preço:</label>
          <input type="number" name="inscr-precoP" id="inscr-precoP" required />

          <label htmlFor="inscr-codigoP">Código:</label>
          <input
            type="number"
            name="inscr-codigoP"
            id="inscr-codigoP"
            required
          />
        </fieldset>
        <button type="submit">Cadastrar</button>
        <button type="reset">Limpar Campos</button>
      </form>
    </div>
  );
}

export default CriarProduto;
