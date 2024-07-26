package c19_65_t_java_js.NoCountry.SmartBank.controller;


import c19_65_t_java_js.NoCountry.SmartBank.DTO.MovimientoDTO;
import c19_65_t_java_js.NoCountry.SmartBank.DTO.MovimientoRespuestaDTO;
import c19_65_t_java_js.NoCountry.SmartBank.service.MovimientoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("movimientos")
public class MovimientoControlador {

    @Autowired
    private MovimientoServicio movimientoServicio;

    @GetMapping("/{usuario}")
    public ResponseEntity<List<MovimientoRespuestaDTO>> listarMovimientos(@PathVariable Long usuario){
        List<MovimientoRespuestaDTO> movimientoDTOList = movimientoServicio.mostraraTodosMovimientos(usuario);
        return ResponseEntity.ok(movimientoDTOList);
    }

    @PostMapping("/registrar")
    public ResponseEntity<MovimientoRespuestaDTO>  crearMovimiento(
            @RequestBody MovimientoDTO movimientoDTO
    ){
        MovimientoRespuestaDTO nuevoMovimiento = movimientoServicio.guardarMovimiento(movimientoDTO);
        return new ResponseEntity<>(nuevoMovimiento, HttpStatus.CREATED);
    }





}
