package c19_65_t_java_js.NoCountry.SmartBank.DTO;

import c19_65_t_java_js.NoCountry.SmartBank.model.Cuenta;
import c19_65_t_java_js.NoCountry.SmartBank.enums.TipoUsuario;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


import java.time.LocalDateTime;
import java.util.List;

public record ClienteDTO(
        Long idCliente,
        @Email @NotBlank String email,
        @NotNull Integer dni,
        @NotNull LocalDateTime fechaNacimiento,
        @NotBlank String nombre,
        @NotBlank String apellido,
        @NotNull Integer telefono,
        @NotBlank String domicilio,
        @NotBlank String pais,
        TipoUsuario tipoUsuario,
        @NotBlank String contrasenia,
        @JsonManagedReference
        List<Cuenta> idsCuentas
) {
}
