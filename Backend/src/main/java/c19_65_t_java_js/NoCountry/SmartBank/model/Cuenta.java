package c19_65_t_java_js.NoCountry.SmartBank.model;

import c19_65_t_java_js.NoCountry.SmartBank.enums.Divisas;
import c19_65_t_java_js.NoCountry.SmartBank.enums.TipoCuenta;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Data
//Sara
@Entity
@Table(name = "cuenta")
public class Cuenta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long idCuenta;
    private int nroCuenta;
    @Enumerated(EnumType.STRING)
    private TipoCuenta tipoCuenta;
    @Enumerated(EnumType.STRING)
    private Divisas divisas;
    private  double saldo;
    @ManyToOne
    @JoinColumn(name = "idCliente", nullable = false)
    @JsonIgnoreProperties("idCliente")
    @JsonBackReference
    private Cliente  idCliente;
}
