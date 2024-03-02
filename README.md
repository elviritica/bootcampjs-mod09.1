# Bootcamp JS 2 - Laboratorio Módulo 9.1 

Pasos:

- Clonate el proyecto.
- Instala las dependencias con `npm install`.
- Ejecuta el sandbox con `npm run dev`.
- Abre el navegador en `http://localhost:5173/` (si ese puerto no te funciona, mira en la consola donde has hecho el build, puede que este ocupado y se haya abierto en otro puerto).

----------
# Laboratorio - Ticket de Compra

En este proyecto, desarrollaremos un programa para calcular el precio de un ticket de compra. El ticket contendrá varias líneas, cada una con un producto y su respectiva cantidad.

## Tipos de IVA

Existen diferentes tipos de IVA que afectan al precio de los productos. Aquí se detallan los tipos de IVA disponibles:

- **General**: 21%
- **Reducido**: 10%
- **Superreducido A**: 5%
- **Superreducido B**: 4%
- **Superreducido C**: 0%
- **Sin IVA**: 0%

## Estructura del Producto

Cada producto se define con las siguientes características:

- Nombre
- Precio
- Tipo de IVA

## Estructura de la Línea del Ticket

Cada línea del ticket está compuesta por un producto y una cantidad.

## Función para Calcular el Ticket

Se implementa una función para calcular el ticket a partir de las líneas proporcionadas.

## Información del Resultado de la Línea del Ticket

Por cada producto en el ticket, obtenemos información detallada que incluye el nombre, la cantidad, el precio sin IVA, el tipo de IVA y el precio con IVA.

## Información de Totales

Se proporciona información adicional sobre los totales del ticket, incluyendo el total sin IVA, el total con IVA, el total del IVA y un desglose del total por tipo de IVA.

