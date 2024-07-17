package c19_65_t_java_js.NoCountry.SmartBank.repository;

import c19_65_t_java_js.NoCountry.SmartBank.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface ClienteRepositorio extends JpaRepository<Cliente, Long> {
    List<Cliente> findByNombreContainingIgnoreCase(String nombre);
}
