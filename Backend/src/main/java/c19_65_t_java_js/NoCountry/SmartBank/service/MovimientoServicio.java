package c19_65_t_java_js.NoCountry.SmartBank.service;

import c19_65_t_java_js.NoCountry.SmartBank.DTO.MovimientoDTO;
import c19_65_t_java_js.NoCountry.SmartBank.mapper.MovimientoMapper;
import c19_65_t_java_js.NoCountry.SmartBank.model.Movimiento;
import c19_65_t_java_js.NoCountry.SmartBank.repository.MovimientoRepositorio;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovimientoServicio   {


    @Autowired
    private MovimientoRepositorio movimientoRepositorio;

    public List<MovimientoDTO> mostraraTodosMovimientos(){
        List<Movimiento> movimientoDTOList = movimientoRepositorio.findAll();
        return movimientoDTOList.stream()
                .map(MovimientoMapper::convertirEntidadDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public MovimientoDTO guardarMovimiento(MovimientoDTO movimientoDTO) {
        Movimiento movimiento = new Movimiento();

        movimiento.setUsuario(movimientoDTO.usuario());
        movimiento.setMonto(movimientoDTO.monto());
        movimiento.setSaldo(movimientoDTO.saldo());
        movimiento.setCtaOrigen(movimientoDTO.ctaOrigen());
        movimiento.setCtaDestino(movimientoDTO.ctaDestino());
        movimiento.setDescripcionMovimiento(movimientoDTO.descripcionMovimiento());
        movimiento.setFechaMovimiento(LocalDateTime.now());
        Movimiento nuevoMovimiento = movimientoRepositorio.save(movimiento);
        return MovimientoMapper.convertirEntidadDTO(nuevoMovimiento);


    }


}
