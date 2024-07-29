package c19_65_t_java_js.NoCountry.SmartBank.model;

import c19_65_t_java_js.NoCountry.SmartBank.enums.TipoUsuario;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;


import java.time.LocalDateTime;


import java.util.List;

@Data

//CHRIS
@Entity
@Table(name = "cliente")
public class Cliente  {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)


  private Long idCliente;
  @NotBlank
  @Email
  @Column(unique = true)
  private String email;
  private int dni ;
  private LocalDateTime fechaNacimiento ;
  private  String nombre ;
  private  String apellido;
  private int telefono ;
  private  String domicilio;
  private String pais;
 /* @OneToOne
  @JoinColumn(name = "idUsuario")
  private  Usuario idUsuario; */
  @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "idCliente")
  @JsonIgnoreProperties("idCliente")
  @JsonBackReference
  private List<Cuenta> idCuenta;

  @Enumerated(EnumType.STRING)
  private TipoUsuario tipoUsuario;

  @NotBlank
  @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
  private String contrasenia;



}
