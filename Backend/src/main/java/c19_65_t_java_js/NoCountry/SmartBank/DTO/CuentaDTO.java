package c19_65_t_java_js.NoCountry.SmartBank.DTO;

import c19_65_t_java_js.NoCountry.SmartBank.model.TipoCuenta;
import c19_65_t_java_js.NoCountry.SmartBank.model.Cliente;

import java.util.List;

public record CuentaDTO(
        Long idCuenta,
        Cliente idCliente,
        int nroCuenta,
        List<TipoCuenta> idsTipoCuenta,
        double saldo
) {
}