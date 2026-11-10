import { useNavigate } from "react-router-dom";

function BotaoVoltar({ className = "", children = "← Voltar" }) {
    const navigate = useNavigate();

    return (
        <button
            className={className}
            type="button"
            onClick={() => navigate(-1)}
        >
            {children}
        </button>
    );
}

export default BotaoVoltar;
