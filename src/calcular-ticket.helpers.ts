type TipoIva =
  | "general"
  | "reducido"
  | "superreducidoA"
  | "superreducidoB"
  | "superreducidoC"
  | "sinIva";

const __GENERAL = 21;
const __REDUCIDO = 10;
const __SUPERREDUCIDOA = 5;
const __SUPERREDUCIDOB = 4;
const __SUPERREDUCIDOC = 0;
const __SINIVA = 0;

export interface Producto {
  nombre: string;
  precio: number;
  tipoIva: TipoIva;
}

export interface LineaTicket {
    producto: Producto;
    cantidad: number;
}

export interface ResultadoLineaTicket {
    nombre: string;
    cantidad: number;
    precionSinIva: number;
    tipoIva: TipoIva;
    precioConIva: number;
}

export interface ResultadoTotalTicket {
    totalSinIva: number;
    totalConIva: number;
    totalIva: number;
}
  
export interface TotalPorTipoIva {
    tipoIva: TipoIva;
    cuantia : number;
}
  
export interface TicketFinal {
    lineas: ResultadoLineaTicket[];
    total: ResultadoTotalTicket;
    desgloseIva: TotalPorTipoIva[];
}

export const productos: LineaTicket[] = [
    {
        producto: {
        nombre: "Legumbres",
        precio: 2,
        tipoIva: "general",
        },
        cantidad: 2,
    },
    {
        producto: {
        nombre: "Perfume",
        precio: 20,
        tipoIva: "general",
        },
        cantidad: 3,
    },
    {
        producto: {
        nombre: "Leche",
        precio: 1,
        tipoIva: "superreducidoC",
        },
        cantidad: 6,
    },
    {
        producto: {
        nombre: "Lasaña",
        precio: 5,
        tipoIva: "superreducidoA",
        },
        cantidad: 1,
    },
];

export const precioConIva = (precio: number, iva: number) : number =>{
    const impuesto = precio * (iva / 100);
    const precioTotal = precio + impuesto;

    return precioTotal;
};

export const  precioConIvaProducto = (producto : Producto) : number => {
    switch (producto.tipoIva) {
        case "general":
            producto.precio = precioConIva(producto.precio, __GENERAL);
            break;
        case "reducido":
            producto.precio = precioConIva(producto.precio, __REDUCIDO);
            break;
        case "superreducidoA":
            producto.precio = precioConIva(producto.precio, __SUPERREDUCIDOA);
            break;
        case "superreducidoB":
            producto.precio = precioConIva(producto.precio, __SUPERREDUCIDOB);
            break;
        case "superreducidoC":
            producto.precio = precioConIva(producto.precio, __SUPERREDUCIDOC);
            break;
        case "sinIva":
            producto.precio = precioConIva(producto.precio, __SINIVA);
            break;
    }

    return producto.precio;
};

export const precioTotal = (precio : number, cantidad : number) : number => {
    return precio * cantidad;
};

export const calculaLineaTicket = (linea: LineaTicket[]) : ResultadoLineaTicket[] => {
    const resultado: ResultadoLineaTicket[] = [];

    linea.forEach((linea) => {
        resultado.push({
            nombre: linea.producto.nombre,
            cantidad: linea.cantidad,
            precionSinIva: precioTotal(linea.producto.precio , linea.cantidad),
            tipoIva: linea.producto.tipoIva,
            precioConIva: precioTotal(precioConIvaProducto(linea.producto), linea.cantidad)
        });

    });

    return resultado;
};

export const calculaTotalconIvayTotalsinIva = (lineasTicket: ResultadoLineaTicket[]) : ResultadoTotalTicket => {
    let resultado : ResultadoTotalTicket = {
        totalSinIva: 0,
        totalConIva: 0,
        totalIva: 0
    };

    lineasTicket.forEach((linea) => {
        resultado.totalConIva += linea.precioConIva;
        resultado.totalSinIva += linea.precionSinIva;
        resultado.totalIva = resultado.totalConIva - resultado.totalSinIva;
    });

    return resultado;
};

export const calculaDesgloseIva = (lineasTicket: ResultadoLineaTicket[]) : TotalPorTipoIva[] => {
    let resultado: TotalPorTipoIva[] = [];

    let general = 0;
    let reducido = 0;
    let superreducidoA = 0;
    let superreducidoB = 0;
    let superreducidoC = 0;
    let sinIva = 0;

    lineasTicket.forEach((linea) => {
        switch (linea.tipoIva) {
            case "general":
                general += linea.precioConIva;
                break;
            case "reducido":
                reducido += linea.precioConIva;
                break;
            case "superreducidoA":
                superreducidoA += linea.precioConIva;
                break;
            case "superreducidoB":
                superreducidoB += linea.precioConIva;
                break;
            case "superreducidoC":
                superreducidoC += linea.precioConIva;
                break;
            case "sinIva":
                sinIva += linea.precioConIva;
                break;
        }
    });

    resultado.push({
        tipoIva: "general",
        cuantia: general
    });
    resultado.push({
        tipoIva: "reducido",
        cuantia: reducido
    });
    resultado.push({
        tipoIva: "superreducidoA",
        cuantia: superreducidoA
    });
    resultado.push({
        tipoIva: "superreducidoB",
        cuantia: superreducidoB
    });
    resultado.push({
        tipoIva: "superreducidoC",
        cuantia: superreducidoC
    });
    resultado.push({
        tipoIva: "sinIva",
        cuantia: sinIva
    });

    return resultado;
}


export const calculaTicket = (lineasTicket: LineaTicket[]) : TicketFinal => {
    let resultado: TicketFinal = {
        lineas: [],
        total: {
            totalSinIva: 0,
            totalConIva: 0,
            totalIva: 0
        },
        desgloseIva: []
    };

  
    resultado.lineas = calculaLineaTicket(lineasTicket);
    

    resultado.total = calculaTotalconIvayTotalsinIva(resultado.lineas);
    resultado.desgloseIva = calculaDesgloseIva(resultado.lineas);


    return resultado;
};

