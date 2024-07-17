package c19_65_t_java_js.NoCountry.SmartBank.mapper;

import c19_65_t_java_js.NoCountry.SmartBank.DTO.CuentaDTO;
import c19_65_t_java_js.NoCountry.SmartBank.model.Cuenta;

public class CuentaMapper {

    public static CuentaDTO convertirEntidadDTO(Cuenta cuenta) {
        return new CuentaDTO(
                cuenta.getIdCuenta(),
                cuenta.getNroCuenta(),
                cuenta.getIdTipoCuenta(),
                cuenta.getSaldo()

        );

    }

    public static Cuenta convertirDTOaEntidad(CuentaDTO cuentaDTO) {
        Cuenta cuenta = new Cuenta();
        cuenta.setIdCuenta(cuentaDTO.idCuenta());
        cuenta.setNroCuenta(cuentaDTO.nroCuenta());
        cuenta.setIdTipoCuenta(cuentaDTO.idsTipoCuenta());
        cuenta.setSaldo(cuenta.getSaldo());
        return cuenta;

    }
}
