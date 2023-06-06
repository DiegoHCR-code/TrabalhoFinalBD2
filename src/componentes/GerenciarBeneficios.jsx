import { useEffect, useState } from "react";
import { controleBD } from "../controleSupabase";
import ViewBeneficio from "./ViewBeneficio";

function GerenciarBeneficios({ usuario }) {

    const [listaBeneficios, setListaBeneficios] = useState(null);
    const [benAtual, setBenAtual] = useState(null)

    useEffect(() => {
        controleBD.from("cltbeneficios").select("*").then(({data: lista}) => {
            setListaBeneficios(lista);
            
            controleBD.from("possui").select("*").eq("fk_funcionario_numcarteirat", usuario.numcarteirat).then(({ data, error }) => {
                if (data && data[0])
                    setBenAtual(lista.find(b => b.categoria === data[0].fk_cltbeneficios_categoria));
            });
        });
    }, []);

    async function AlterarBeneficio() {

    }

    return (
        <>
            {benAtual ?
                <div className="container-xl px-4 py-2 my-4 bg-info-subtle rounded">
                    <h4>Beneficio</h4>
                    <ViewBeneficio beneficio={benAtual} />

                </div> : ""}
        </>
    );
}


export default GerenciarBeneficios;
