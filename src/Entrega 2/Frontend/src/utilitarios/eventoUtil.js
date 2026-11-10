export function formatarData(
    data,
    opcoes = { day: "2-digit", month: "long", year: "numeric" }
) {
    if (!data) return "Não informado";

    const dataIso = data instanceof Date
        ? `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}-${String(data.getDate()).padStart(2, "0")}`
        : String(data).slice(0, 10);
    const [ano, mes, dia] = dataIso.split("-").map(Number);

    if (!ano || !mes || !dia) return "Não informado";

    return new Intl.DateTimeFormat("pt-BR", opcoes).format(new Date(ano, mes - 1, dia));
}

export function formatarDataHora(data) {
    if (!data) return "Não informado";

    if (data instanceof Date) {
        return new Intl.DateTimeFormat("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
        }).format(data);
    }

    const [dataTexto, horario] = String(data).replace("T", " ").split(" ");
    const dataFormatada = formatarData(dataTexto, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    return horario ? `${dataFormatada} às ${horario.slice(0, 5)}` : dataFormatada;
}

export function formatarHora(horario) {
    return horario ? String(horario).slice(0, 5) : "Não informado";
}

export function formatarNumero(valor) {
    if (valor === null || valor === undefined) return "Não informado";
    return new Intl.NumberFormat("pt-BR").format(Number(valor));
}

export function formatarMoeda(valor) {
    if (valor === null || valor === undefined) return "Não informado";

    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    }).format(Number(valor));
}

export function statusLegivel(status) {
    const statusPorValor = {
        planejamento: "Em planejamento",
        confirmado: "Confirmado",
        cancelado: "Cancelado",
        realizado: "Realizado",
        pendente: "Pendente",
        aprovado: "Aprovado",
        aprovada: "Aprovada",
        recusada: "Recusada",
        expirada: "Expirada",
    };

    return statusPorValor[status] || status || "Não informado";
}

export function percentualPublico(valor, maximo) {
    if (valor === null || valor === undefined || !Number(maximo)) return 0;
    return Math.min((Number(valor) / Number(maximo)) * 100, 100);
}