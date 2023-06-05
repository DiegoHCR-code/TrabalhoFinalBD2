
function DependenteView({ d, rem }) {

    return (
        <tr>
            <td>{d.nome}</td>
            <td>{d.telefone}</td>
            <td>{d.parentesco}</td>
            <td>
                <button type="button" onClick={() => rem()} className="btn btn-danger btn-sm">Remover</button>
            </td>
        </tr>
    );
}

export default DependenteView;