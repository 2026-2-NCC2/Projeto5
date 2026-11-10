const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");

export async function listarPropostas(token, itemCusto = null) {
    const parametros = new URLSearchParams();
    if (itemCusto !== null && itemCusto !== undefined) {
        parametros.set("itemCusto", itemCusto);
    }
    const query = parametros.size ? `?${parametros.toString()}` : "";
    let resposta;

    try {
        resposta = await fetch(`${API_URL}/propostas${query}`, {
            headers: { Authorization: `Bearer ${token}` },
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
        throw new Error(resultado?.erro || "Não foi possível carregar as propostas.");
    }

    if (!resultado || !Array.isArray(resultado.propostas)) {
        throw new Error("O servidor retornou uma lista de propostas inválida.");
    }

    return resultado.propostas;
}

export async function buscarPropostaPorId(codItem, idFornecedor, token) {
    let resposta;

    try {
        resposta = await fetch(
            `${API_URL}/propostas/${encodeURIComponent(codItem)}/${encodeURIComponent(idFornecedor)}`,
            { headers: { Authorization: `Bearer ${token}` } },
        );
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
        throw new Error(resultado?.erro || "Não foi possível carregar os detalhes da proposta.");
    }

    if (!resultado?.proposta || typeof resultado.proposta !== "object") {
        throw new Error("O servidor retornou detalhes de proposta inválidos.");
    }

    return resultado.proposta;
}
