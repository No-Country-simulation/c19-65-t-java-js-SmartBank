/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package c19_65_t_java_js.NoCountry.SmartBank.service;

import c19_65_t_java_js.NoCountry.SmartBank.DTO.usuarioDTO;
import c19_65_t_java_js.NoCountry.SmartBank.exception.ExceptionRequest;
import c19_65_t_java_js.NoCountry.SmartBank.mapper.usuarioMapper;
import c19_65_t_java_js.NoCountry.SmartBank.model.usuario;
import c19_65_t_java_js.NoCountry.SmartBank.repository.usuarioRepositorio;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
@Service
/**
 *
 * @author Sara
 */
public class usuarioServicio {
       private usuarioRepositorio usrRepositorio;
    @Transactional 
    public usuarioDTO guardarUsuario(usuarioDTO usrDTO){
        usuario usr = new usuario();
       
        //copiar campos
         usr.setUsuario(usrDTO.usuario());
         usr.setContrasenia(usrDTO.contrasenia());
         
         //Relacion con tipoUsuario
         usr.setIdTipoUsuario(usrDTO.idTipoUsuario());
         
         usuario usrGuardado = usrRepositorio.save(usr);
         
         return usuarioMapper.convertirEntidadDTO(usrGuardado);

    }
   
    @Transactional 
    public usuarioDTO actualizarUsuario(Long id, usuarioDTO usrDTO){
       usuario usr = usrRepositorio.findById(id).orElseThrow(() -> new ExceptionRequest("Usuario no encontrado"));
      
       //actualizar campos
         usr.setUsuario(usrDTO.usuario());
         usr.setContrasenia(usrDTO.contrasenia());
         //actualizar relacion con TipodeUsuario
         usr.setIdTipoUsuario(usrDTO.idTipoUsuario());
         
        usuario usrActualizado = usrRepositorio.save(usr);
        return usuarioMapper.convertirEntidadDTO(usrActualizado);
  
    }
    
      public usuarioDTO buscarUsuarioPorId(Long id) {
            usuario usr = usrRepositorio.findById(id).orElseThrow(() -> new ExceptionRequest("Usuario no encontrado"));
        return usuarioMapper.convertirEntidadDTO(usr);
    }
      
      
      @Transactional
    public void eliminarUsuario(Long id) {
        if (!usrRepositorio.existsById(id)) {
            throw new ExceptionRequest("Usuario no encontrado");
        }
       usrRepositorio.deleteById(id);
    }   
}
