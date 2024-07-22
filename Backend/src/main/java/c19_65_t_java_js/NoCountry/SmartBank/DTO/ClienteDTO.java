package c19_65_t_java_js.NoCountry.SmartBank.DTO;

import c19_65_t_java_js.NoCountry.SmartBank.model.Cuenta;
import c19_65_t_java_js.NoCountry.SmartBank.model.TipoUsuario;


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
        TipoUsuario tipoUsuario,
        String contrasenia,
        List<Cuenta> idsCuentas
) {
}