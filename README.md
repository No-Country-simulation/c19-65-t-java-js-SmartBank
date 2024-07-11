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

### usuario
| Columna        | Tipo         | Descripción                          |
|----------------|--------------|--------------------------------------|
| idUsuario       |   int        |                                      |
| idtipoUsuario | int          | FK(Tipo de Usuario > IDtipo_usuario) |
| usuario        | varchar(8)   |                                      |
| contraseña     | varchar(8)   |                                      |
### cliente
| Columna           | Tipo         | Descripción                   |
|-------------------|--------------|-------------------------------|
| idCliente         |  int         |                               |
| email             |  varchar(25) |                               |
| dni               |  int         |                               |
| fechaNacimiento   |  date        |                               |
| nombre            |  varchar(25) |                               |
| apellido          |  varchar(25) |                               |
| telefono          |  int         |                               |
| domicilio         |  varchar(25) |                               |
| pais              |  varchar(25) |                               |
| idUsuario         |   int        |                               |
### Tipo de Usuario
| Columna       | Tipo         | Descripción                   |
|---------------|--------------|-------------------------------|
| idTipoUsuario|  int         |      Auto Incremental         |
| tipoUsuario  |Varchar(8)    |                               |
### Cuenta
| Columna       | Tipo         | Descripción                        |
|---------------|--------------|------------------------------------|
| idCuenta      | int          |                                    |
| nroCuenta     | varchar(25)  |                                    |
| idTipoCuenta  | int          | FK(Tipos de Cuenta > IDTipoCuenta) |
| saldo         | int          |                                    |
| idCliente     | int          | FK(Clientes > IDCliente)           |
### Movimiento
| Columna                | Tipo         | Descripción                   |
|------------------------|--------------|-------------------------------|
| idMovimiento           |  int         |                               |
| idCuenta               |  int         | FK(Cuentas > IDCuenta)        |
| monto                  |  int         | (Monto transacción +/-)       |
| saldo                  |  int         |                               |
| CtaOrigen              | varchar(25)  |                               |
| CtaDestino             | varchar(25)  |                               |
| Descripción Movimiento | varchar(25)  |                               |
| Fecha Movimiento       |   date       |                               |
### TipoCuenta
| Columna      | Tipo         | Descripción                 |
|--------------|--------------|-----------------------------|
| IDTipoCuenta |              |                             |
| Moneda       | varchar(8)   |                             |
| Descripción  | varchar(25)  | (CtaAhorros / CtaCorriente) |

----
- **Características de administrador**:
  - Reiniciar contraseña
  - Bloquear cuenta
  - Rastrear transferencia
        
- **Características de empresa**:
  - Nombre de la empresa
  - Identificador
  - Titular de la cuenta
    
