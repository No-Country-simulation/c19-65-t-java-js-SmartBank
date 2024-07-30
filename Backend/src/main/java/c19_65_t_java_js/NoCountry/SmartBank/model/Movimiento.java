package c19_65_t_java_js.NoCountry.SmartBank.model;
// CRISTIAN ANTONIO


import c19_65_t_java_js.NoCountry.SmartBank.DTO.MovimientoDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
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
    private String usuario;
    private double monto;
    private double saldo;
    private String ctaOrigen;
    private String ctaDestino;
    private String descripcionMovimiento;
    private LocalDateTime fechaMovimiento;


}
