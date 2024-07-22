package c19_65_t_java_js.NoCountry.SmartBank.DTO;

public record MovimientoDTO(

        String Usuario,
        Integer monto,
        String ctaOrigen,
        String ctaDestino,
        String descripcionMovimiento
) {
}
