package c19_65_t_java_js.NoCountry.SmartBank.service;

import c19_65_t_java_js.NoCountry.SmartBank.DTO.ClienteDTO;
import c19_65_t_java_js.NoCountry.SmartBank.exception.ExceptionRequest;
import c19_65_t_java_js.NoCountry.SmartBank.mapper.ClienteMapper;
import c19_65_t_java_js.NoCountry.SmartBank.model.Cliente;


import c19_65_t_java_js.NoCountry.SmartBank.repository.ClienteRepositorio;
import c19_65_t_java_js.NoCountry.SmartBank.repository.UsuarioRepositorio;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClienteServicio {

    @Autowired
    private ClienteRepositorio clienteRepositorio;
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public List<ClienteDTO> listarClientes() {
        List<Cliente> clientes = clienteRepositorio.findAll();
        return clientes.stream()
                .map(ClienteMapper::convertirEntidadDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ClienteDTO guardarCliente(ClienteDTO clienteDTO) {
        Cliente cliente = new Cliente();

        // Copiar campos simples
        cliente.setEmail(clienteDTO.email());
        cliente.setDni(clienteDTO.dni());
        cliente.setFechaNacimiento(clienteDTO.fechaNacimiento());
        cliente.setNombre(clienteDTO.nombre());
        cliente.setApellido(clienteDTO.apellido());
        cliente.setTelefono(clienteDTO.telefono());
        cliente.setDomicilio(clienteDTO.domicilio());
        cliente.setPais(clienteDTO.pais());

        // Manejar la relación con Usuario
        cliente.setIdUsuario(clienteDTO.idUsuario());

        // Manejar la relación con Cuentas
        cliente.setIdCuenta(clienteDTO.idsCuentas());

        Cliente clienteGuardado = clienteRepositorio.save(cliente);
        return ClienteMapper.convertirEntidadDTO(clienteGuardado);
    }
    @Transactional
    public ClienteDTO actualizarCliente(Long id, ClienteDTO clienteDTO) {
        Cliente cliente = clienteRepositorio.findById(id)
                .orElseThrow(() -> new ExceptionRequest("Cliente no encontrado"));

        // Actualizar campos simples
        cliente.setEmail(clienteDTO.email());
        cliente.setDni(clienteDTO.dni());
        cliente.setFechaNacimiento(clienteDTO.fechaNacimiento());
        cliente.setNombre(clienteDTO.nombre());
        cliente.setApellido(clienteDTO.apellido());
        cliente.setTelefono(clienteDTO.telefono());
        cliente.setDomicilio(clienteDTO.domicilio());
        cliente.setPais(clienteDTO.pais());

        // Actualizar relación con Usuario
        cliente.setIdUsuario(clienteDTO.idUsuario());

        // Actualizar relación con Cuentas
        cliente.setIdCuenta(clienteDTO.idsCuentas());

        Cliente clienteActualizado = clienteRepositorio.save(cliente);
        return ClienteMapper.convertirEntidadDTO(clienteActualizado);
    }
    public ClienteDTO buscarClientePorId(Long id) {
        Cliente cliente = clienteRepositorio.findById(id)
                .orElseThrow(() -> new ExceptionRequest("Cliente no encontrado"));
        return ClienteMapper.convertirEntidadDTO(cliente);
    }

    @Transactional
    public void eliminarCliente(Long id) {
        if (!clienteRepositorio.existsById(id)) {
            throw new ExceptionRequest("Cliente no encontrado");
        }
        clienteRepositorio.deleteById(id);
    }
    public List<ClienteDTO> buscarClientesPorNombre(String nombre) {
        List<Cliente> clientes = clienteRepositorio.findByNombreContainingIgnoreCase(nombre);
        return clientes.stream()
                .map(ClienteMapper::convertirEntidadDTO)
                .collect(Collectors.toList());
    }

}
