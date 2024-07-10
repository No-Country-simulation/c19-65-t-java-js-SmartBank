<h1 align="center"">SmartBank</h1>
<h2 align="center"">c19-65-t-java-js</h2>

## <span>Descripción</span>
**SmartBank** es una plataforma de banca digital diseñada para brindar a los usuarios acceso seguro y eficiente a sus cuentas bancarias desde cualquier dispositivo. Con SmartBank, los usuarios pueden realizar diversas operaciones bancarias en línea, tales como transferencias de dinero, visualización de saldo y movimientos, y recibir notificaciones de actividades sospechosas en sus cuentas.

## <span>Vistas de la Aplicación</span>

### Página Inicial
- **Elementos**:
  - Botones de Login y Registro
  - Información general sobre la plataforma

### Autenticación
- **Login**:
  - Campos:
    - Correo o cédula
    - Contraseña
- **Registrarse**:
  - Campos:
    - Nombre
    - Apellidos
    - Correo Electrónico
    - Cédula
    - Fecha de nacimiento
    - Contraseña
    - Repetir contraseña

### Página Principal (Recibir Notificaciones)
- **Elementos**:
  - Información de la cuenta y saldos
  - Botones:
    - Crear Cuenta
    - Movimientos
    - Transferir
    - Pagos de servicios (próximamente)
    - Préstamos (próximamente)

### Crear Cuenta
- Descripción: Permite a los usuarios crear nuevas cuentas bancarias.

### Movimientos
- Descripción: Muestra el historial de transacciones de la cuenta.

### Transferir (Recibir Notificación)
- Descripción: Permite a los usuarios transferir dinero entre cuentas y recibir notificaciones sobre la transacción.
  

## <span style="color: #2E86C1;">Tablas de la Base de Datos</span>

### Usuarios
| Columna        | Tipo         | Descripción                          |
|----------------|--------------|--------------------------------------|
| UUID           |              |                                      |
| IDtipo_usuario |              | FK(Tipo de Usuario > IDtipo_usuario) |
| Usuario        |              |                                      |
| contraseña     |              |                                      |

### Clientes
| Columna           | Tipo         | Descripción                   |
|-------------------|--------------|-------------------------------|
| IDCliente         |              |                               |
| email             |              |                               |
| DNI               |              |                               |
| Fecha Nacimiento  |              |                               |
| Nombre            |              |                               |
| Apellido          |              |                               |
| Telefono          |              |                               |
| Domicilio         |              |                               |
| País              |              |                               |

### Tipo de Usuario
| Columna       | Tipo         | Descripción                   |
|---------------|--------------|-------------------------------|
| IDtipo_usuario|              |                               |
| tipo_usuario  |              |                               |

### Cuentas
| Columna       | Tipo         | Descripción                        |
|---------------|--------------|------------------------------------|
| IDCuenta      |              |                                    |
| #Cuenta       |              |                                    |
| IDTipoCuenta  |              | FK(Tipos de Cuenta > IDTipoCuenta) |
| Saldo         |              |                                    |
| IDCliente     |              | FK(Clientes > IDCliente)           |

### Clientes
| Columna                | Tipo         | Descripción                   |
|------------------------|--------------|-------------------------------|
| IDMovimiento           |              |                               |
| IDCuenta               |              | FK(Cuentas > IDCuenta)        |
| Monto                  |              | (Monto transacción +/-)       |
| Saldo                  |              |                               |
| CtaOrigen              |              |                               |
| CtaDestino             |              |                               |
| Descripción Movimiento |              |                               |
| Fecha Movimiento       |              |                               |

### Clientes
| Columna      | Tipo         | Descripción                 |
|--------------|--------------|-----------------------------|
| IDTipoCuenta |              |                             |
| Moneda       |              |                             |
| Descripción  |              | (CtaAhorros / CtaCorriente) |

----
Características de administrador
    Reiniciar contraseña
    Bloquear cuenta
    Rastrear transferencia
    
Características de empresa
    Nombre de la empresa
    Identificador
    Titular de la cuenta
    
