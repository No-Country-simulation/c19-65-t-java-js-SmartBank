package c19_65_t_java_js.NoCountry.SmartBank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface Cliente extends JpaRepository<Cliente, Long> {
}
