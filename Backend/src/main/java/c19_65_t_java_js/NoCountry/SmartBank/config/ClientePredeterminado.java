package c19_65_t_java_js.NoCountry.SmartBank.config;

import c19_65_t_java_js.NoCountry.SmartBank.enums.TipoUsuario;
import c19_65_t_java_js.NoCountry.SmartBank.model.Cliente;
import c19_65_t_java_js.NoCountry.SmartBank.repository.ClienteRepositorio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Optional;
@Component
public class ClientePredeterminado implements ApplicationRunner {
    @Autowired
    private ClienteRepositorio clienteRepositorio;
    private void clientePredeterminado() {
        String adminEmail = "user@smartbank.com";
        String adminPassword = "123456789";

        Optional<Cliente> optionalUser = clienteRepositorio.findByEmail(adminEmail);

        if (optionalUser.isPresent() ) {
            Cliente cliente = optionalUser.get();
            if (cliente.getTipoUsuario().equals(TipoUsuario.CLIENTE)) {
                cliente.setTipoUsuario(TipoUsuario.ADMIN);
                clienteRepositorio.save(cliente);
            }
        }else {
            Cliente newCliente = new Cliente();
            newCliente.setEmail(adminEmail);
            newCliente.setContrasenia(new BCryptPasswordEncoder().encode(adminPassword));
            newCliente.setTipoUsuario(TipoUsuario.CLIENTE);
            newCliente.setNombre("User");
            newCliente.setApellido("User");
            newCliente.setDni(12345678);
            newCliente.setFechaNacimiento(LocalDateTime.now());
            newCliente.setTelefono(123456789);
            newCliente.setDomicilio("123 Main St");
            newCliente.setPais("Argentina");

            clienteRepositorio.save(newCliente);
        }
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        clientePredeterminado();

    }
}
