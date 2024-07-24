package c19_65_t_java_js.NoCountry.SmartBank.mapper;

import c19_65_t_java_js.NoCountry.SmartBank.DTO.CuentaDTO;
import c19_65_t_java_js.NoCountry.SmartBank.model.Cuenta;

public class CuentaMapper {

    public static CuentaDTO convertirEntidadDTO(Cuenta cuenta) {
        return new CuentaDTO(
                cuenta.getIdCuenta(),
                cuenta.getIdCliente().getIdCliente(),
                cuenta.getNroCuenta(),
                cuenta.getTipoCuenta(),
                cuenta.getDivisas(),
                cuenta.getSaldo()

        );

    }

    public static Cuenta convertirDTOaEntidad(CuentaDTO cuentaDTO) {
        Cuenta cuenta = new Cuenta();
        cuenta.setIdCuenta(cuentaDTO.idCuenta());
       // cuenta.setIdCliente(cuentaDTO.idCliente());
        cuenta.setNroCuenta(cuentaDTO.nroCuenta());
        cuenta.setTipoCuenta(cuentaDTO.tipoCuenta());
        cuenta.setDivisas(cuentaDTO.divisas());
        cuenta.setSaldo(cuenta.getSaldo());
        return cuenta;

    }
}
