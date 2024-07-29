package c19_65_t_java_js.NoCountry.SmartBank.mapper;


import c19_65_t_java_js.NoCountry.SmartBank.DTO.MovimientoDTO;

import c19_65_t_java_js.NoCountry.SmartBank.model.Movimiento;

import java.time.LocalDateTime;

public class MovimientoMapper {

    public  static MovimientoDTO convertirEntidadDTO(Movimiento movimiento){
        return new MovimientoDTO(
                movimiento.getUsuario(),
                movimiento.getMonto(),
                movimiento.getSaldo(),
                movimiento.getCtaOrigen(),
                movimiento.getCtaDestino(),
                movimiento.getDescripcionMovimiento(),
                movimiento.getFechaMovimiento()

        );
    }

    public static Movimiento converitirDtoEntidad(MovimientoDTO movimientoDTO){
        Movimiento movimiento = new Movimiento();

        //Pendiente modificar usuario por Idcuenta
        movimiento.setUsuario(movimiento.getUsuario());
        movimiento.setMonto(movimiento.getMonto());
        movimiento.setMonto(movimiento.getSaldo());
        movimiento.setCtaOrigen(movimiento.getCtaOrigen());
        //pendiente obtener saldo final
        movimiento.setCtaDestino(movimiento.getCtaDestino());
        movimiento.setDescripcionMovimiento(movimiento.getDescripcionMovimiento());
        movimiento.setFechaMovimiento(LocalDateTime.now());

        return movimiento;

    }
}
