package c19_65_t_java_js.NoCountry.SmartBank.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

//ANTONIO
@Data
@Entity
@Table(name = "tipoCuenta ")
public class TipoCuenta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long idTipoUsuario;
}
