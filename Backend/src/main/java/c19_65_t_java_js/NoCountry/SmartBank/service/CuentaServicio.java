package c19_65_t_java_js.NoCountry.SmartBank.service;


import c19_65_t_java_js.NoCountry.SmartBank.DTO.CuentaDTO;

import c19_65_t_java_js.NoCountry.SmartBank.exception.ExceptionRequest;
import c19_65_t_java_js.NoCountry.SmartBank.mapper.CuentaMapper;

import c19_65_t_java_js.NoCountry.SmartBank.model.Cliente;
import c19_65_t_java_js.NoCountry.SmartBank.model.Cuenta;
import c19_65_t_java_js.NoCountry.SmartBank.repository.ClienteRepositorio;
import c19_65_t_java_js.NoCountry.SmartBank.repository.CuentaRepositorio;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class CuentaServicio {
    
    @Autowired
    private CuentaRepositorio cuentaRepositorio;
    @Autowired

    private ClienteRepositorio clienteRepositorio;


  
    
     public List<CuentaDTO> listarCuentas() {
        List<Cuenta> cuentas = cuentaRepositorio.findAll();
        return cuentas.stream()
                .map(CuentaMapper::convertirEntidadDTO)
                .collect(Collectors.toList());
    }
    
     @Transactional
    public CuentaDTO guardarCuenta(CuentaDTO cuentaDTO) {




         Cuenta cuenta = new Cuenta();

        // Copiar campos simples
        cuenta.setNroCuenta(cuentaDTO.nroCuenta());
        cuenta.setTipoCuenta(cuentaDTO.tipoCuenta());
        cuenta.setDivisas(cuentaDTO.divisas());
        cuenta.setSaldo(cuentaDTO.saldo());

        // Manejar la relación con ID Cliente
        //cuenta.setIdCliente(cuentaDTO.idCliente());
         if (cuentaDTO.idCliente() != null) {
             Cliente cliente = clienteRepositorio.findById(cuentaDTO.idCliente())
                     .orElseThrow(() -> new EntityNotFoundException("Cliente no encontrado con id: " + cuentaDTO.idCliente()));
             cuenta.setIdCliente(cliente);  // Aquí establecemos el Cliente, no el Long
         } else {
             throw new IllegalArgumentException("El ID del cliente no puede ser nulo");
         }


         Cuenta cuentaGuardado = cuentaRepositorio.save(cuenta);
        return CuentaMapper.convertirEntidadDTO(cuentaGuardado);
    }

    @Transactional
    public CuentaDTO actualizarCuenta(Long id, CuentaDTO cuentaDTO) {
        Cuenta cuenta = cuentaRepositorio.findById(id)
                .orElseThrow(() -> new ExceptionRequest("Cuenta no encontrada"));

        // Actualizar campos simples
        cuenta.setNroCuenta(cuentaDTO.nroCuenta());
        cuenta.setSaldo(cuentaDTO.saldo());

        // Actualizar relación con Cliente
              //  cuenta.setIdCliente(cuentaDTO.idCliente());

        // Actualizar relación con tipos Cuentas
         cuenta.setTipoCuenta(cuentaDTO.tipoCuenta());
       

        Cuenta cuentaActualizada = cuentaRepositorio.save(cuenta);
        return CuentaMapper.convertirEntidadDTO(cuentaActualizada);
    }
    
     public CuentaDTO buscarCuentaPorId(Long id) {
        Cuenta cuenta = cuentaRepositorio.findById(id)
                .orElseThrow(() -> new ExceptionRequest("Cuenta no encontrado"));
        return CuentaMapper.convertirEntidadDTO(cuenta);
    }
    
       @Transactional
    public void eliminarCuenta(Long id) {
        if (!cuentaRepositorio.existsById(id)) {
            throw new ExceptionRequest("Cuenta no encontrada");
        }
        cuentaRepositorio.deleteById(id);
    } 
     
  

}
