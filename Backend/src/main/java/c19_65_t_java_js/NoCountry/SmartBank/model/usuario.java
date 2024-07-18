/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package c19_65_t_java_js.NoCountry.SmartBank.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "usuario")

/**
 *
 * @author Sara
 */
public class usuario {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    private long idUsuario;
    private String usuario;
    private String contrasenia;
    @OneToOne
    @JoinColumn(name = "idTipoUsuario")
    private tipoUsuario idTipoUsuario;
}
