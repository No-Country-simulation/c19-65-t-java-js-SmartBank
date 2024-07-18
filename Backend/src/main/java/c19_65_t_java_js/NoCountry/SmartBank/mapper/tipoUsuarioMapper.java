/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package c19_65_t_java_js.NoCountry.SmartBank.mapper;

import c19_65_t_java_js.NoCountry.SmartBank.DTO.tipoUsuarioDTO;
import c19_65_t_java_js.NoCountry.SmartBank.model.tipoUsuario;



/**
 *
 * @author Sara
 */
public class tipoUsuarioMapper {
    public static c19_65_t_java_js.NoCountry.SmartBank.model.tipoUsuario convertirDTOaEntidad(tipoUsuarioDTO tipoUsrDTO){
    c19_65_t_java_js.NoCountry.SmartBank.model.tipoUsuario tipoUsr = new c19_65_t_java_js.NoCountry.SmartBank.model.tipoUsuario();
    tipoUsr.setIdTipoUsuario(tipoUsrDTO.idTipoUsuario());
    tipoUsr.setTipoUsuario(tipoUsrDTO.tipoUsuario());
   
    return tipoUsr;
 }   
 
 
public static tipoUsuarioDTO convertirEntidadDTO(c19_65_t_java_js.NoCountry.SmartBank.model.tipoUsuario tipoUsr) {
        return new tipoUsuarioDTO( tipoUsr.getIdTipoUsuario(), tipoUsr.getTipoUsuario());
}
}