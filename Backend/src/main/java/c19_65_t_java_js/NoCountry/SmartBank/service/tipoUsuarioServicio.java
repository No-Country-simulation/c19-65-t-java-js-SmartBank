/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package c19_65_t_java_js.NoCountry.SmartBank.service;

import c19_65_t_java_js.NoCountry.SmartBank.DTO.tipoUsuarioDTO;
import c19_65_t_java_js.NoCountry.SmartBank.exception.ExceptionRequest;
import c19_65_t_java_js.NoCountry.SmartBank.mapper.tipoUsuarioMapper;
import c19_65_t_java_js.NoCountry.SmartBank.model.tipoUsuario;
import c19_65_t_java_js.NoCountry.SmartBank.repository.tipoUsuarioRepositorio;
import jakarta.transaction.Transactional;

/**
 *
 * @author Sara
 */
public class tipoUsuarioServicio {
      private tipoUsuarioRepositorio tipoUsrRepositorio;
       
      
      
      
    @Transactional 
    public tipoUsuarioDTO guardarTipoUsuario(tipoUsuarioDTO tipoUsrDTO){
        tipoUsuario tipoUsr = new tipoUsuario();
       
        //copiar campos
         tipoUsr.setIdTipoUsuario(tipoUsrDTO.idTipoUsuario());
         tipoUsr.setTipoUsuario(tipoUsrDTO.tipoUsuario());
         
         tipoUsuario tipoUsrGuardado = tipoUsrRepositorio.save(tipoUsr);
         
         return tipoUsuarioMapper.convertirEntidadDTO(tipoUsrGuardado);

    }
    
     @Transactional 
    public tipoUsuarioDTO actualizarTipoUsuario(Long id, tipoUsuarioDTO tipoUsrDTO){
       tipoUsuario tipoUsr = tipoUsrRepositorio.findById(id).orElseThrow(() -> new ExceptionRequest("Tipo Usuario no encontrado"));
      
       //actualizar campos
         tipoUsr.setTipoUsuario(tipoUsrDTO.tipoUsuario());
         
         
         tipoUsuario tipoUsrActualizado = tipoUsrRepositorio.save(tipoUsr);
        return tipoUsuarioMapper.convertirEntidadDTO(tipoUsrActualizado);
  
    }
    
       public tipoUsuarioDTO buscarTipoUsuarioPorId(Long id) {
            tipoUsuario tipoUsr = tipoUsrRepositorio.findById(id).orElseThrow(() -> new ExceptionRequest("Tipo Usuario no encontrado"));
        return tipoUsuarioMapper.convertirEntidadDTO(tipoUsr);
    }
   @Transactional
    public void eliminarTipoUsuario(Long id) {
        if (!tipoUsrRepositorio.existsById(id)) {
            throw new ExceptionRequest("Tipo Usuario no encontrado");
        }
       tipoUsrRepositorio.deleteById(id);
    }   
}