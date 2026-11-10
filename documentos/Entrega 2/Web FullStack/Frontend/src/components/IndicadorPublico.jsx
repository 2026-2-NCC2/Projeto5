import { formatarNumero, percentualPublico } from "../utilitarios/eventoUtil";

function IndicadorPublico({ rotulo, valor, maximo, classe }) {
    return (
        <div className="medidor-publico">
            <div>
                <span>{rotulo}</span>
                <strong>{formatarNumero(valor)}</strong>
            </div>
            <span className="medidor-trilho">
                <i
                    className={classe}
                    style={{ width: `${percentualPublico(valor, maximo)}%` }}
                />
            </span>
        </div>
    );
}

export default IndicadorPublico;