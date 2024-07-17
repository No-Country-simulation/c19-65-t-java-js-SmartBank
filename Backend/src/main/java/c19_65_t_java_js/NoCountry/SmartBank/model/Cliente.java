package c19_65_t_java_js.NoCountry.SmartBank.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

import java.util.List;

@Data

//CHRIS
@Entity
@Table(name = "cliente")
public class Cliente {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)


   private Long idCliente;
  private String email;
  private int dni ;
  private LocalDateTime fechaNacimiento ;
  private  String nombre ;
  private  String apellido;
  private int telefono ;
  private  String domicilio;
  private String pais;
  @OneToOne
  @JoinColumn(name = "idUsuario")
  private  Usuario idUsuario;
  @OneToMany
  private List<Cuenta> idCuenta;
}
