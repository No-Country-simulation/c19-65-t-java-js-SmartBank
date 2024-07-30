package c19_65_t_java_js.NoCountry.SmartBank.service;

import c19_65_t_java_js.NoCountry.SmartBank.DTO.ClienteDTO;
import c19_65_t_java_js.NoCountry.SmartBank.enums.TipoUsuario;
import c19_65_t_java_js.NoCountry.SmartBank.exception.ExceptionRequest;
import c19_65_t_java_js.NoCountry.SmartBank.mapper.ClienteMapper;
import c19_65_t_java_js.NoCountry.SmartBank.model.Cliente;


import c19_65_t_java_js.NoCountry.SmartBank.repository.ClienteRepositorio;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClienteServicio implements UserDetailsService {

    @Autowired
    private ClienteRepositorio clienteRepositorio;


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
        cliente.setContrasenia(new BCryptPasswordEncoder().encode( clienteDTO.contrasenia()));

        // Manejar la relación con Tipo Usuario
     
        cliente.setTipoUsuario(TipoUsuario.CLIENTE);

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
        cliente.setContrasenia(clienteDTO.contrasenia());

        // Actualizar relación con Usuario
        cliente.setTipoUsuario(TipoUsuario.CLIENTE);

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


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Cliente> optional = clienteRepositorio.findByEmail(email);
        if (optional.isPresent()){
            Cliente cliente = optional.get();
            List<GrantedAuthority> permisos = new ArrayList<>();
            // Asegúrate de que `getRol()` devuelve el rol correcto
            GrantedAuthority grantedAuthority = new SimpleGrantedAuthority("ROLE_" + cliente.getTipoUsuario().name());
            permisos.add(grantedAuthority);
            System.out.println("Tipo de usuario: " + cliente.getTipoUsuario().name());
            System.out.println("Rol asignado: " + grantedAuthority.getAuthority());
            // Devolvemos un objeto User de Spring Security
            return new org.springframework.security.core.userdetails.User(optional.get().getEmail(), optional.get().getContrasenia(), permisos);


        } else {
            throw new UsernameNotFoundException("Usuario con el correo " + email + " no encontrado.");

        }
    }


    public Optional<Cliente> findByUserName(String mail) {
        return clienteRepositorio.findByEmail(mail);
    }
}


