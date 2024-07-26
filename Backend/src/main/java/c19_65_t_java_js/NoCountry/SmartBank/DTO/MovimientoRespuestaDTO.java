package c19_65_t_java_js.NoCountry.SmartBank.DTO;


public record MovimientoRespuestaDTO(
        String fechaMovimiento,
        String descripcionMovimiento,
        String ctaOrigen,
        String ctaDestino,
        Integer monto,
        Integer saldo
) {
}
