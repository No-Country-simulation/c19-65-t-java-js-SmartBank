package c19_65_t_java_js.NoCountry.SmartBank.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
//Sara
@Entity
@Table(name = "cuenta")
public class Cuenta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCuenta;
    private int nroCuenta;
    @OneToMany
    private List <TipoCuenta> idTipoCuenta;
    private  double saldo;
    @OneToOne
    private Cliente  idCliente;
}
