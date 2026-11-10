function InformacaoEvento({ rotulo, valor, detalhe }) {
    return (
        <article className="informacao-item">
            <span>{rotulo}</span>
            <strong>{valor}</strong>
            {detalhe && <small>{detalhe}</small>}
        </article>
    );
}

export default InformacaoEvento;