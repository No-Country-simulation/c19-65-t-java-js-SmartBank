package c19_65_t_java_js.NoCountry.SmartBank.model;
// CRISTIAN ANTONIO


import c19_65_t_java_js.NoCountry.SmartBank.DTO.MovimientoDTO;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@Data
@Entity(name = "Movimiento")
@Table(name = "movimiento")
public class Movimiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @ManyToOne
//    @JoinColumn(name = "idCuenta")
    private Long usuario;

    private Integer monto;

    private Integer saldo;

    private String ctaOrigen;

    private String ctaDestino;

    private String descripcionMovimiento;

    private LocalDateTime fechaMovimiento;


}
