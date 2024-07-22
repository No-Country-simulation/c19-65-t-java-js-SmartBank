create table movimiento(

    id bigint not null auto_increment,
    idCuenta bigint not null,
    monto int(11) not null,
    saldo int(11) not null,
    ctaOrigen varchar(25) not null,
    ctaDestino varchar(25) not null,
    descripcionMovimiento varchar(25) not null,
    fechaMovimeitno  date not null,

    primary key(id)

);