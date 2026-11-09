const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");

async function requisitarAuth(caminho, dados, mensagemPadrao) {
    let resposta;

    try {
        resposta = await fetch(`${API_URL}/auth/${caminho}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });
    } catch {
        throw new Error("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
    }

    let resultado;
    try {
        resultado = await resposta.json();
    } catch {
        throw new Error("O servidor retornou uma resposta inválida.");
    }

    if (!resposta.ok) {
        throw new Error(resultado?.erro || mensagemPadrao);
    }

    if (!resultado || typeof resultado !== "object" || Array.isArray(resultado)) {
        throw new Error("O servidor retornou uma resposta inválida.");
    }

    return resultado;
}

export function autenticarUsuario(credenciais) {
    return requisitarAuth("login", credenciais, "Não foi possível entrar. Verifique suas credenciais.");
}

export function cadastrarUsuario(dadosCadastro) {
    return requisitarAuth("cadastro", dadosCadastro, "Não foi possível concluir o cadastro.");
}
