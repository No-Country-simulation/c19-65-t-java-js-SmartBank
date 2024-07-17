package c19_65_t_java_js.NoCountry.SmartBank.mapper;

import c19_65_t_java_js.NoCountry.SmartBank.DTO.ClienteDTO;
import c19_65_t_java_js.NoCountry.SmartBank.model.Cliente;

public class ClienteMapper {

    public static Cliente convertirDTOaEntidad(ClienteDTO clienteDTO) {
        Cliente cliente = new Cliente();
        cliente.setIdCliente(clienteDTO.idCliente());
        cliente.setNombre(clienteDTO.nombre());
        cliente.setApellido(clienteDTO.apellido());
        cliente.setEmail(clienteDTO.email());
        cliente.setDni(clienteDTO.dni());
        cliente.setFechaNacimiento(clienteDTO.fechaNacimiento());
        cliente.setTelefono(clienteDTO.telefono());
        cliente.setDomicilio(clienteDTO.domicilio());
        cliente.setPais(clienteDTO.pais());
        cliente.setIdUsuario(clienteDTO.idUsuario());

        return cliente;

    }

    public static ClienteDTO convertirEntidadDTO(Cliente cliente) {
        return new ClienteDTO(
                cliente.getIdCliente(),
                cliente.getEmail(),
                cliente.getDni(),
                cliente.getFechaNacimiento(),
                cliente.getNombre(),
                cliente.getApellido(),
                cliente.getTelefono(),
                cliente.getDomicilio(),
                cliente.getPais(),
                cliente.getIdUsuario(),
                cliente.getIdCuenta()

        );
    }
}
