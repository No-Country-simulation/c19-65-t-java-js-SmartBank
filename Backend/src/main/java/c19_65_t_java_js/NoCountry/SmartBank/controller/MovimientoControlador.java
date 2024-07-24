package c19_65_t_java_js.NoCountry.SmartBank.controller;


import c19_65_t_java_js.NoCountry.SmartBank.DTO.MovimientoDTO;
import c19_65_t_java_js.NoCountry.SmartBank.service.MovimientoServicio;
import jakarta.transaction.Transactional;
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

    @GetMapping("/enlistar")
    public ResponseEntity<List<MovimientoDTO>> listarMovimientos(){
        List<MovimientoDTO> movimientoDTOList = movimientoServicio.mostraraTodosMovimientos();
        return ResponseEntity.ok(movimientoDTOList);
    }

    @PostMapping("/registrar")
    public ResponseEntity<MovimientoDTO>  crearMovimiento(
            @RequestBody MovimientoDTO movimientoDTO
    ){
        MovimientoDTO nuevoMovimiento = movimientoServicio.guardarMovimiento(movimientoDTO);
        return new ResponseEntity<>(nuevoMovimiento, HttpStatus.CREATED);
    }





}
