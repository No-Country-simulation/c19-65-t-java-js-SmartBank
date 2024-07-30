package c19_65_t_java_js.NoCountry.SmartBank.controller;

import c19_65_t_java_js.NoCountry.SmartBank.DTO.ClienteDTO;
import c19_65_t_java_js.NoCountry.SmartBank.service.ClienteServicio;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("clientes")
public class ClienteControlador {
    @Autowired
    private ClienteServicio clienteServicio;

    @GetMapping("/enlistar")
    public ResponseEntity<List<ClienteDTO>> listarClientes() {
        List<ClienteDTO> clientes = clienteServicio.listarClientes();
        return ResponseEntity.ok(clientes);
    }
    @PostMapping("/registrar")
    public ResponseEntity<ClienteDTO> crearCliente(@RequestBody @Valid ClienteDTO clienteDTO) {
        ClienteDTO nuevoCliente = clienteServicio.guardarCliente(clienteDTO);
        return new ResponseEntity<>(nuevoCliente, HttpStatus.CREATED);
    }
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<ClienteDTO> actualizarCliente(@PathVariable @Valid Long id, @RequestBody ClienteDTO clienteDTO) {
        ClienteDTO clienteActualizado = clienteServicio.actualizarCliente(id, clienteDTO);
        return ResponseEntity.ok(clienteActualizado);
    }

    @GetMapping("/eliminar/{id}")
    public ResponseEntity<Void> eliminarCliente(@PathVariable Long id) {
        clienteServicio.eliminarCliente(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/buscar")
    public ResponseEntity<List<ClienteDTO>> buscarClientes(@RequestParam String termino) {
        List<ClienteDTO> clientes = clienteServicio.buscarClientesPorNombre(termino);
        return ResponseEntity.ok(clientes);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ClienteDTO> obtenerClientePorId(@PathVariable Long id) {
        ClienteDTO cliente = clienteServicio.buscarClientePorId(id);
        return ResponseEntity.ok(cliente);
    }


}
