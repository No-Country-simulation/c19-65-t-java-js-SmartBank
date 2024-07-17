package c19_65_t_java_js.NoCountry.SmartBank.repository;

import c19_65_t_java_js.NoCountry.SmartBank.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {
}
