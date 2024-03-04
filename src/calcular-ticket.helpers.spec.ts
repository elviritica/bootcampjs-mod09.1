import {
  LineaTicket,
  Producto,
  calculaLineaTicket,
  precioConIva,
  precioConIvaProducto,
} from "./calcular-ticket.helpers";

describe("precioConIvaProducto", () => {
  it(`Debería devolver 121`, () => {
    // Arrange
    const producto: Producto = {
      nombre: "Lasaña",
      precio: 100,
      tipoIva: "general",
    };
    // Act
    const result = precioConIvaProducto(producto);
    // Assert
    expect(result).toEqual(121);
  });
  it(`Debería devolver { nombre: "Lasaña", precio: 110, tipoIva: "reducido" }`, () => {
    // Arrange
    const producto: Producto = {
      nombre: "Lasaña",
      precio: 100,
      tipoIva: "reducido",
    };
    // Act
    const result = precioConIvaProducto(producto);
    // Assert
    expect(result).toEqual(110);
  });
  it(`Debería devolver { nombre: "Lasaña", precio: 105, tipoIva: "superreducidoA" }`, () => {
    // Arrange
    const producto: Producto = {
      nombre: "Lasaña",
      precio: 100,
      tipoIva: "superreducidoA",
    };
    // Act
    const result = precioConIvaProducto(producto);
    // Assert
    expect(result).toEqual(105);
  });
  it(`Debería devolver { nombre: "Lasaña", precio: 104, tipoIva: "superreducidoB" }`, () => {
    // Arrange
    const producto: Producto = {
      nombre: "Lasaña",
      precio: 100,
      tipoIva: "superreducidoB",
    };
    // Act
    const result = precioConIvaProducto(producto);
    // Assert
    expect(result).toEqual(104);
  });
  it(`Debería devolver { nombre: "Lasaña", precio: 100, tipoIva: "superreducidoC" }`, () => {
    // Arrange
    const producto: Producto = {
      nombre: "Lasaña",
      precio: 100,
      tipoIva: "superreducidoC",
    };
    // Act
    const result = precioConIvaProducto(producto);
    // Assert
    expect(result).toEqual(100);
  });
  it(`Debería devolver { nombre: "Lasaña", precio: 100, tipoIva: "sinIva" }`, () => {
    // Arrange
    const producto: Producto = {
      nombre: "Lasaña",
      precio: 100,
      tipoIva: "sinIva",
    };
    // Act
    const result = precioConIvaProducto(producto);
    // Assert
    expect(result).toEqual(100);
  });
  it(`Debería devolver 24.2`, () => {
    // Arrange
    const producto: Producto = {
      nombre: "Perfume",
      precio: 20,
      tipoIva: "general",
    };
    // Act
    const result = precioConIvaProducto(producto);
    // Assert
    expect(result).toEqual(24.2);
  });
});

describe("precioConIva", () => {
  it("Debería devolver 121", () => {
    // Arrange
    const precio = 100;
    const iva = 21;
    // Act
    const result = precioConIva(precio, iva);
    // Assert
    expect(result).toBe(121);
  });
  it("Debería devolver 605", () => {
    // Arrange
    const precio = 500;
    const iva = 21;
    // Act
    const result = precioConIva(precio, iva);
    // Assert
    expect(result).toBe(605);
  });
});

describe("calculaLineaTicket", () => {
  it(`Debería devolver 
  { nombre: "Lasaña", cantidad: 4, precionSinIva: 400, tipoIva: "reducido", precioConIva: 440 }, 
  { nombre: "Chocolate", cantidad: 2, precionSinIva: 200, tipoIva: "general", precioConIva: 242 }`, () => {
    // Arrange
    const producto: LineaTicket[] = [
      {
        producto: {
          nombre: "Lasaña",
          precio: 100,
          tipoIva: "reducido",
        },
        cantidad: 4,
      },
      {
        producto: {
          nombre: "Chocolate",
          precio: 100,
          tipoIva: "general",
        },
        cantidad: 2,
      },
    ];
    // Act
    const result = calculaLineaTicket(producto);
    // Assert
    expect(result).toEqual([
      {
        nombre: "Lasaña",
        cantidad: 4,
        precionSinIva: 400,
        tipoIva: "reducido",
        precioConIva: 440,
      },
      {
        nombre: "Chocolate",
        cantidad: 2,
        precionSinIva: 200,
        tipoIva: "general",
        precioConIva: 242,
      },
    ]);
  });
  it(`Debería devolver
  {nombre: 'Legumbres', cantidad: 2, precionSinIva: 4, tipoIva: 'general', precioConIva: 4.84},
  {nombre: 'Perfume', cantidad: 3, precionSinIva: 60, tipoIva: 'general', precioConIva: 72.60},
  {nombre: 'Leche', cantidad: 6, precionSinIva: 6, tipoIva: 'superreducidoC', precioConIva: 6},
  {nombre: 'Lasaña', cantidad: 1, precionSinIva: 5, tipoIva: 'superreducidoA', precioConIva: 5.25}
  `, () => {
    // Arrange
    const producto: LineaTicket[] = [
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
    // Act
    const result = calculaLineaTicket(producto);
    // Assert
    expect(result).toEqual([
      {
        nombre: "Legumbres",
        cantidad: 2,
        precionSinIva: 4,
        tipoIva: "general",
        precioConIva: 4.84,
      },
      {
        nombre: "Perfume",
        cantidad: 3,
        precionSinIva: 60,
        tipoIva: "general",
        precioConIva: 72.6,
      },
      {
        nombre: "Leche",
        cantidad: 6,
        precionSinIva: 6,
        tipoIva: "superreducidoC",
        precioConIva: 6,
      },
      {
        nombre: "Lasaña",
        cantidad: 1,
        precionSinIva: 5,
        tipoIva: "superreducidoA",
        precioConIva: 5.25,
      },
    ]);
  });
});
