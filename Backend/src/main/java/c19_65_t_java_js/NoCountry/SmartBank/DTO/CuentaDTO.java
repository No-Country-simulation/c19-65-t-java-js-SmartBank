package c19_65_t_java_js.NoCountry.SmartBank.DTO;

import c19_65_t_java_js.NoCountry.SmartBank.enums.Divisas;
import c19_65_t_java_js.NoCountry.SmartBank.enums.TipoCuenta;

import java.util.List;

public record CuentaDTO(
        Long idCuenta,
        Long idCliente,
        int nroCuenta,
        TipoCuenta tipoCuenta,
        Divisas divisas,
        double saldo
) {
}