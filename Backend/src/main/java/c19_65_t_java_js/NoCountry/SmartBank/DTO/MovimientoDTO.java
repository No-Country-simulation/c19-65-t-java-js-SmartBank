package c19_65_t_java_js.NoCountry.SmartBank.DTO;

public record MovimientoDTO(

        String usuario,
        Integer monto,
        Integer saldo,
        String ctaOrigen,
        String ctaDestino,
        String descripcionMovimiento
) {
}
