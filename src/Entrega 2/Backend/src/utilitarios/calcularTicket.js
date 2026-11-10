export function calcularTicket(custoTotal, publico, margem) {
  if (
    !Number.isFinite(custoTotal)
    || !Number.isFinite(publico)
    || !Number.isFinite(margem)
    || custoTotal < 0
    || publico <= 0
    || margem < 0
    || margem >= 1
  ) {
    throw new RangeError(
      "Informe custoTotal >= 0, publico > 0 e margem entre 0 (inclusive) e 1 (exclusive)."
    );
  }

  return custoTotal / (publico * (1 - margem));
}
