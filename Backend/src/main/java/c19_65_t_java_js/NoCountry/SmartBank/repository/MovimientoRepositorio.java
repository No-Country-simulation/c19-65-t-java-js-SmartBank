package c19_65_t_java_js.NoCountry.SmartBank.repository;

import c19_65_t_java_js.NoCountry.SmartBank.model.Movimiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovimientoRepositorio extends JpaRepository<Movimiento, Long> {
    List<Movimiento> findByUsuario(Long usuario);
}
