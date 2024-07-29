package c19_65_t_java_js.NoCountry.SmartBank.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record MovimientoDTO(

        @NotBlank String usuario,
        @Positive(message = "El monto debe ser positivo") @NotNull Double monto,
        @Positive(message = "El monto debe ser positivo") @NotNull Double saldo,
        @NotBlank String ctaOrigen,
        @NotBlank String ctaDestino,
        @Size(min = 3, max = 50, message = "La descripción debe tener entre 3 y 50 caracteres")@NotBlank String descripcionMovimiento,
         LocalDateTime fechaMovimiento

) {
}
