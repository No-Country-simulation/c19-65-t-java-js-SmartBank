/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package c19_65_t_java_js.NoCountry.SmartBank.controller;

import c19_65_t_java_js.NoCountry.SmartBank.DTO.tipoUsuarioDTO;
import c19_65_t_java_js.NoCountry.SmartBank.service.tipoUsuarioServicio;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Sara
 */
@RestController
public class tipoUsuarioControlador {  
    
    private tipoUsuarioServicio tipoUsuarioServicio;
   
   public tipoUsuarioServicio getUsuarioServicio(){
   return tipoUsuarioServicio;
   }
   
    @PostMapping("/registar")
    public ResponseEntity<tipoUsuarioDTO> crearTipoUsuario(@RequestBody tipoUsuarioDTO tipoUsrDTO) {
        tipoUsuarioDTO nuevoTipoUsuario = tipoUsuarioServicio.guardarTipoUsuario(tipoUsrDTO);
        return new ResponseEntity<>(nuevoTipoUsuario, HttpStatus.CREATED);
    }
   
      @PutMapping("/actualizar/{id}")
    public ResponseEntity<tipoUsuarioDTO> actualizarTipoUsuario(@PathVariable Long id, @RequestBody tipoUsuarioDTO tipoUsrDTO) {
        tipoUsuarioDTO tipoUsuarioActualizado = tipoUsuarioServicio.actualizarTipoUsuario(id, tipoUsrDTO);
        return ResponseEntity.ok(tipoUsuarioActualizado);
    }
   
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> eliminarTipoUsuario(@PathVariable Long id) {
        tipoUsuarioServicio.eliminarTipoUsuario(id);
        return ResponseEntity.noContent().build();
    }
    
        @GetMapping("/{id}")
    public ResponseEntity<tipoUsuarioDTO> obtenerTipoUsuarioPorId(@PathVariable Long id) {
        tipoUsuarioDTO usr = tipoUsuarioServicio.buscarTipoUsuarioPorId(id);
        return ResponseEntity.ok(usr);
    }
    
    
}
