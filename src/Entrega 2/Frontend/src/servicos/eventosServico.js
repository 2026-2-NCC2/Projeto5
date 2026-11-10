const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");

export async function listarEventos(token) {
    let resposta;

    try {
        resposta = await fetch(`${API_URL}/eventos`, {
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
        throw new Error(resultado?.erro || "Não foi possível carregar os eventos.");
    }

    if (!resultado || !Array.isArray(resultado.eventos)) {
        throw new Error("O servidor retornou uma lista de eventos inválida.");
    }

    return resultado.eventos;
}

export async function buscarEventoPorId(idEvento, token) {
    let resposta;

    try {
        resposta = await fetch(`${API_URL}/eventos/${encodeURIComponent(idEvento)}`, {
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
        throw new Error(resultado?.erro || "Não foi possível carregar os detalhes do evento.");
    }

    if (!resultado || !resultado.evento || typeof resultado.evento !== "object") {
        throw new Error("O servidor retornou detalhes de evento inválidos.");
    }

    return resultado.evento;
}
