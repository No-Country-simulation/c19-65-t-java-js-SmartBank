package c19_65_t_java_js.NoCountry.SmartBank.service;

import c19_65_t_java_js.NoCountry.SmartBank.DTO.MovimientoDTO;
import c19_65_t_java_js.NoCountry.SmartBank.DTO.MovimientoRespuestaDTO;
import c19_65_t_java_js.NoCountry.SmartBank.mapper.MovimientoMapper;
import c19_65_t_java_js.NoCountry.SmartBank.model.Movimiento;
import c19_65_t_java_js.NoCountry.SmartBank.repository.MovimientoRepositorio;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovimientoServicio   {


    @Autowired
    private MovimientoRepositorio movimientoRepositorio;

    public List<MovimientoRespuestaDTO> mostraraTodosMovimientos(Long usuario){
        List<Movimiento> movimientoDTOList = movimientoRepositorio.findByUsuario(usuario);
        return movimientoDTOList.stream()
                .map(MovimientoMapper::convertirEntidadDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public MovimientoRespuestaDTO guardarMovimiento(MovimientoDTO movimientoDTO) {
        Movimiento movimiento = new Movimiento();

        movimiento.setUsuario(movimientoDTO.usuario());
        movimiento.setMonto(movimientoDTO.monto());
        int saldoF = movimientoDTO.saldo() - movimientoDTO.monto();
        movimiento.setSaldo(saldoF);
        movimiento.setCtaOrigen(movimientoDTO.ctaOrigen());
        movimiento.setCtaDestino(movimientoDTO.ctaDestino());
        movimiento.setDescripcionMovimiento(movimientoDTO.descripcionMovimiento());
        movimiento.setFechaMovimiento(LocalDateTime.now());
        Movimiento nuevoMovimiento = movimientoRepositorio.save(movimiento);
        return MovimientoMapper.convertirEntidadDTO(movimiento);


    }


}
