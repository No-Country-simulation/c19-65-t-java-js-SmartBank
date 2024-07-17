package c19_65_t_java_js.NoCountry.SmartBank.DTO;

import c19_65_t_java_js.NoCountry.SmartBank.model.TipoCuenta;

import java.util.List;

public record CuentaDTO(
        Long idCuenta,
        int nroCuenta,
        List<TipoCuenta> idsTipoCuenta,
        double saldo
) {
}