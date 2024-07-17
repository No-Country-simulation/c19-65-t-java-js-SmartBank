package c19_65_t_java_js.NoCountry.SmartBank.DTO;

import c19_65_t_java_js.NoCountry.SmartBank.model.Cuenta;
import c19_65_t_java_js.NoCountry.SmartBank.model.Usuario;

import java.time.LocalDateTime;
import java.util.List;

public record ClienteDTO(
        Long idCliente,
        String email,
        int dni,
        LocalDateTime fechaNacimiento,
        String nombre,
        String apellido,
        int telefono,
        String domicilio,
        String pais,
        Usuario idUsuario,
        List<Cuenta> idsCuentas
) {
}
