package c19_65_t_java_js.NoCountry.SmartBank.DTO;

import c19_65_t_java_js.NoCountry.SmartBank.model.Descripcion;
import c19_65_t_java_js.NoCountry.SmartBank.model.Moneda;

public record TipoCuentaDTO(
        Moneda moneda,
        Descripcion descripcion
) {
}
