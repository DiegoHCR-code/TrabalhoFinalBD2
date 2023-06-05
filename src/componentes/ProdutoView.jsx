function ProdutoView({p, remo}) {
    return(
        <tr>
            <td>{p.codigo}</td>
            <td>{p.nome}</td>
            <td>{p.precoProduto}</td>
            <td>
                <button type="button" onClick={() => remo()} className="btn btn-danger btn-sm">Remover</button>
            </td>
        </tr>
    )
}