import { useEffect, useState } from "react";
import { controleBD } from "../controleSupabase";


function GerenciarDependentes({c}) {
    const [dep, setDep] = useState([]);

    useEffect(() => {
        if (c)
            controleBD.from("dependente").select("*").eq("fk_funcionario_numcarteirat", c).then(({data}) =>{
                console.log(data);
            });
    }, []);
    
    return (
        <div>
            <p>Dependentes: {dep.length}</p>
        </div>
    );
}

export default GerenciarDependentes;