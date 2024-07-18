/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package c19_65_t_java_js.NoCountry.SmartBank.mapper;

import c19_65_t_java_js.NoCountry.SmartBank.DTO.usuarioDTO;
import c19_65_t_java_js.NoCountry.SmartBank.model.usuario;

/**
 *
 * @author Sara
 */
public class usuarioMapper {
 public static usuario convertirDTOaEntidad(usuarioDTO usrDTO){
    usuario usr = new usuario();
    usr.setIdUsuario(usrDTO.idUsuario());
    usr.setUsuario(usrDTO.usuario());
    usr.setContrasenia(usrDTO.contrasenia());
    usr.setIdTipoUsuario(usrDTO.idTipoUsuario());
    
    return usr;
 }   
 
 
public static usuarioDTO convertirEntidadDTO(usuario usr) {
        return new usuarioDTO( usr.getIdUsuario(),
                usr.getUsuario(),
                usr.getContrasenia(),
                usr.getIdTipoUsuario());
}
}