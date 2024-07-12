package c19_65_t_java_js.NoCountry.SmartBank.model;

import lombok.Data;

import java.util.Date;
@Data

//CHRIS
public class Cliente {
   private Long idCliente;
  private String email;
  private int dni ;
  private Date fechaNacimiento ;
  private  String nombre ;
  private  String apellido;
  private int telefono ;
  private  String domicilio;
  private String pais;
  //idUsuario
}
