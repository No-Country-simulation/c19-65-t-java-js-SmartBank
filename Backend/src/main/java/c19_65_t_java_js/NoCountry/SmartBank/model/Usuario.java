package c19_65_t_java_js.NoCountry.SmartBank.model;
// SARA

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "usuario")
public class Usuario {
    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)


    private Long idUsuario;
}
