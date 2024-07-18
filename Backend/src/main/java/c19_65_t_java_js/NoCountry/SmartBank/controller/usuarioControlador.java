
package c19_65_t_java_js.NoCountry.SmartBank.controller;

import c19_65_t_java_js.NoCountry.SmartBank.DTO.usuarioDTO;
import c19_65_t_java_js.NoCountry.SmartBank.service.usuarioServicio;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Sara
 */

@RestController


@RequestMapping("usuario")
public class usuarioControlador {
    
   private usuarioServicio usuarioServicio;
   
   public usuarioServicio getUsuarioServicio(){
   return usuarioServicio;
   }
    @PostMapping("/registar")
    public ResponseEntity<usuarioDTO> crearUsuario(@RequestBody usuarioDTO usrDTO) {
        usuarioDTO nuevoUsuario = usuarioServicio.guardarUsuario(usrDTO);
        return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED);
    }
   
     @PutMapping("/actualizar/{id}")
    public ResponseEntity<usuarioDTO> actualizarUsuario(@PathVariable Long id, @RequestBody usuarioDTO usrDTO) {
        usuarioDTO usuarioActualizado = usuarioServicio.actualizarUsuario(id, usrDTO);
        return ResponseEntity.ok(usuarioActualizado);
    }
    
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        usuarioServicio.eliminarUsuario(id);
        return ResponseEntity.noContent().build();
    }
     
        @GetMapping("/{id}")
    public ResponseEntity<usuarioDTO> obtenerUsuarioPorId(@PathVariable Long id) {
        usuarioDTO usr = usuarioServicio.buscarUsuarioPorId(id);
        return ResponseEntity.ok(usr);
    }
}
