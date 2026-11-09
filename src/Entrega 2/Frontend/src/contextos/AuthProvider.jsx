import { useState } from "react";
import AuthContext from "./AuthContext";
import { autenticarUsuario } from "../servicos/authServico";

const PERFIS_VALIDOS = ["admin", "organizador", "fornecedor"];

function lerSessao() {
    const token = sessionStorage.getItem("token");
    const usuarioSalvo = sessionStorage.getItem("usuario");

    if (token && usuarioSalvo) {
        try {
            const usuario = JSON.parse(usuarioSalvo);
            if (PERFIS_VALIDOS.includes(usuario.perfil)) {
                return { token, usuario };
            }
        } catch {
            // Uma sessão inválida deve ser descartada abaixo.
        }
    }

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("perfil");
    return null;
}

export function AuthProvider({ children }) {
    const [sessao, setSessao] = useState(lerSessao);

    async function login(credenciais) {
        const resultado = await autenticarUsuario(credenciais);

        if (resultado.status === "pendente") {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("usuario");
            sessionStorage.removeItem("perfil");
            setSessao(null);
            return resultado;
        }

        if (
            resultado.status !== "ativo"
            || typeof resultado.token !== "string"
            || !resultado.usuario
            || !PERFIS_VALIDOS.includes(resultado.usuario.perfil)
        ) {
            throw new Error("O servidor retornou dados de autenticação inválidos.");
        }

        const novaSessao = {
            token: resultado.token,
            usuario: resultado.usuario,
        };

        sessionStorage.setItem("token", novaSessao.token);
        sessionStorage.setItem("usuario", JSON.stringify(novaSessao.usuario));
        sessionStorage.removeItem("perfil");
        setSessao(novaSessao);

        return resultado;
    }

    function logout() {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("usuario");
        sessionStorage.removeItem("perfil");
        setSessao(null);
    }

    return (
        <AuthContext.Provider
            value={{
                token: sessao?.token ?? null,
                usuario: sessao?.usuario ?? null,
                perfil: sessao?.usuario.perfil ?? null,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
