package c19_65_t_java_js.NoCountry.SmartBank.controller;


import c19_65_t_java_js.NoCountry.SmartBank.DTO.IniciarSesionDTO;
import c19_65_t_java_js.NoCountry.SmartBank.model.Cliente;
import c19_65_t_java_js.NoCountry.SmartBank.repository.ClienteRepositorio;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;


@RestController
public class IniciarSesionControlador {

    @Autowired
    private ClienteRepositorio clienteRepositorio;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    @GetMapping("/iniciarsesion")
    public ResponseEntity<String> login(@RequestBody IniciarSesionDTO iniciarSesionDTO) {
        Optional<Cliente> clienteOptional = clienteRepositorio.findByEmail(iniciarSesionDTO.email());

        if (clienteOptional.isPresent()) {
            Cliente cliente = clienteOptional.get();
            if (bCryptPasswordEncoder.matches(iniciarSesionDTO.contrasenia(), cliente.getContrasenia())) {

                // Autenticación exitosa; generar y devolver un token o mensaje de éxito
                return ResponseEntity.ok("Inicio de sesión exitoso");
            } else {
                // Contraseña incorrecta
                return ResponseEntity.status(401).body("Contraseña incorrecta");
            }
        } else {
            // Usuario no encontrado
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }
    }
    @PostMapping("/cerrarsesion")
    public ResponseEntity<String> cerrarSesion(HttpServletRequest request, HttpServletResponse response) {
        try {
            request.logout();
            return ResponseEntity.ok("sesion cerrada con exito");
        } catch (ServletException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Logout Failed");
        }
    }
}










