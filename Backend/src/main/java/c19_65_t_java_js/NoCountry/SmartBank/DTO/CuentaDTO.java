package c19_65_t_java_js.NoCountry.SmartBank.DTO;

import c19_65_t_java_js.NoCountry.SmartBank.enums.Divisas;
import c19_65_t_java_js.NoCountry.SmartBank.enums.TipoCuenta;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.List;

public record CuentaDTO(
        Long idCuenta,
        @NotNull Long idCliente,
        @NotNull Integer nroCuenta,
        @NotNull TipoCuenta tipoCuenta,
        Divisas divisas,
        @Positive(message = "El saldo debe ser positivo") @NotNull double saldo
) {
}