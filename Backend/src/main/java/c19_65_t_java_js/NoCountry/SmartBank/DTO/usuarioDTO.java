package c19_65_t_java_js.NoCountry.SmartBank.DTO;
import c19_65_t_java_js.NoCountry.SmartBank.model.tipoUsuario;

/**
 *
 * @author Sara
 */

public record usuarioDTO(
        long idUsuario,
        String usuario,
        String contrasenia,
        tipoUsuario idTipoUsuario) {
}
