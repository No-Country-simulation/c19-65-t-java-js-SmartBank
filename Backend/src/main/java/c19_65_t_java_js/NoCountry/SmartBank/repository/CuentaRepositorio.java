package c19_65_t_java_js.NoCountry.SmartBank.repository;

import c19_65_t_java_js.NoCountry.SmartBank.model.Cliente;
import c19_65_t_java_js.NoCountry.SmartBank.model.Cuenta;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface CuentaRepositorio extends JpaRepository<Cuenta, Long> {
    List<Cliente> findByNombreContainingIgnoreCase(String nombre);
}

