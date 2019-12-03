# Venta de seguros con comportamiento particular.

API de venta de seguros con simulador para comportamiento de estos a diario.
La API maneja una serie de reglas y efectos a aplicar en los seguros, las cuales deben ser asignadas al seguro cuando se registra en la API.

# Ejecución de aplicación

En la carpeta raíz del proyecto se debe aplicar el comando:

```
$ docker-compose up -d
```

No se instalo un gestor de bases de datos debido a que para efectos de este ejercicio, sería suficiente con mantener el servidor funcionando para mantener el arreglo de seguros y es demostrable que se realizan los cambios. Sin embargo, agregar una capa de persistencia permitiría almacenar un historial de las simulaciones de los productos.

# Descripción de solución

## Reglas

```js
{
  field: Fields; //sellIn o price
  operation: string; // i.e lessThan
  target: number; // 1
  effect: Effect;
}
```

### Detalle:

- **field** se refiere a que campo se le va a aplicar la condición.
- **operation** es la condición a aplicar
- **target** El valor a comparar

## Efectos (Effect)

```js
{
  field: Fields; //sellIn o price
  operation: string; //+
  operator: number; //0
}
```

### Detalle:

- **field** se refiere a que campo se le va a aplicar el efecto.
- **operation** operator matematico a aplicar (+,-,/,\*) o definir un valor (=)
- **target** Valor a operar o definir

# Funciones

Estos dos objetos son utilizados por dos objetos, COMPARATORS y operations, respectivamente.

## COMPARATORS

```js
{
    daily: (origin: number, target: number) => true,
    lessThan: (origin: number, target: number) => origin < target,
    lessThanOrEqual: (origin: number, target: number) => origin <= target,
    equal: (origin: number, target: number) => origin === target,
    greaterThan: (origin: number, target: number) => origin > target,
    greaterThanOrEqual: (origin: number, target: number) => origin >= target
}
```

Se definierion todos estos casos posibles en base a que las comparaciones siempre serán con datos de tipo número. Haber dejado la posibilidad de usar alguna función custom al usuario podría haber abierto alguna brecha de seguridad. **Todos** reciben el valor original del seguro y el valor a comparar.

## OPERATIONS

```js
{
    "+": (origin: number, target: number) => origin + target,
    "-": (origin: number, target: number) => origin - target,
    "*": (origin: number, target: number) => origin * target,
    "/": (origin: number, target: number) => origin / target,
    "=": (origin: number, target: number) => (origin = target)
}
```

Al igual que con los comparadores, se definierion todos estos casos posibles en base a que las operaciones serán siempre a numeros. Haber dejado la posibilidad de usar alguna función custom al usuario podría haber abierto alguna brecha de seguridad.
**Todos** retornan un nuevo valor. Reciben el valor original del seguro y el valor a operar.

y, por último, esta la función que toma el objeto COMPARATORS y la regla, para ver si la regla es aplicable al seguro. Devuelve True o False según sea aplicable.

```js
const executeRule = (rule: Rule, origin: number, target: number) =>
  COMPARATORS[rule.operation](origin, target);
```

# Objetos de pruebas para probar la aplicación

```js
[
  {
    name: "Seguro de transporte",
    price: 10,
    sellIn: 10,
    rule: [
      {
        field: "sellIn",
        operation: "daily",
        target: 0,
        effect: { field: "price", operation: "-", operator: 1 }
      },
      {
        field: "sellIn",
        operation: "daily",
        target: 0,
        effect: { field: "sellIn", operation: "-", operator: 1 }
      }
    ]
  },
  {
    name: "Seguro de vida",
    price: 100,
    sellIn: 7,
    rule: [
      {
        field: "greaterThan",
        operation: "daily",
        target: 5,
        effect: {
          field: "price",
          operation: "-",
          operator: 1
        }
      },
      {
        field: "sellIn",
        operation: "daily",
        target: 10,
        effect: {
          field: "sellIn",
          operation: "-",
          operator: 1
        }
      },
      {
        field: "sellIn",
        operation: "lessThanOrEqual",
        target: 5,
        effect: {
          field: "price",
          operation: "-",
          operator: 2
        }
      }
    ]
  }
];
```

# Venta de seguros con comportamiento particular.

API de venta de seguros con simulador para comportamiento de estos a diario.
La API maneja una serie de reglas y efectos a aplicar en los seguros, las cuales deben ser asignadas al seguro cuando se registra en la API.

# Ejecución de aplicación

En la carpeta raíz del proyecto se debe aplicar el comando:

```
$ docker-compose up -d
```

No se instalo un gestor de bases de datos debido a que para efectos de este ejercicio, sería suficiente con mantener el servidor funcionando para mantener el arreglo de seguros y es demostrable que se realizan los cambios. Sin embargo, agregar una capa de persistencia permitiría almacenar un historial de las simulaciones de los productos.

# Descripción de solución

## Reglas

```js
{
  field: Fields; //sellIn o price
  operation: string; // i.e lessThan
  target: number; // 1
  effect: Effect;
}
```

### Detalle:

- **field** se refiere a que campo se le va a aplicar la condición.
- **operation** es la condición a aplicar
- **target** El valor a comparar

## Efectos (Effect)

```js
{
  field: Fields; //sellIn o price
  operation: string; //+
  operator: number; //0
}
```

### Detalle:

- **field** se refiere a que campo se le va a aplicar el efecto.
- **operation** operator matematico a aplicar (+,-,/,\*) o definir un valor (=)
- **target** Valor a operar o definir

# Funciones

Estos dos objetos son utilizados por dos objetos, COMPARATORS y operations, respectivamente.

## COMPARATORS

```js
{
    daily: (origin: number, target: number) => true,
    lessThan: (origin: number, target: number) => origin < target,
    lessThanOrEqual: (origin: number, target: number) => origin <= target,
    equal: (origin: number, target: number) => origin === target,
    greaterThan: (origin: number, target: number) => origin > target,
    greaterThanOrEqual: (origin: number, target: number) => origin >= target
}
```

Se definierion todos estos casos posibles en base a que las comparaciones siempre serán con datos de tipo número. Haber dejado la posibilidad de usar alguna función custom al usuario podría haber abierto alguna brecha de seguridad. **Todos** reciben el valor original del seguro y el valor a comparar.

## OPERATIONS

```js
{
    "+": (origin: number, target: number) => origin + target,
    "-": (origin: number, target: number) => origin - target,
    "*": (origin: number, target: number) => origin * target,
    "/": (origin: number, target: number) => origin / target,
    "=": (origin: number, target: number) => (origin = target)
}
```

Al igual que con los comparadores, se definierion todos estos casos posibles en base a que las operaciones serán siempre a numeros. Haber dejado la posibilidad de usar alguna función custom al usuario podría haber abierto alguna brecha de seguridad.
**Todos** retornan un nuevo valor. Reciben el valor original del seguro y el valor a operar.

y, por último, esta la función que toma el objeto COMPARATORS y la regla, para ver si la regla es aplicable al seguro. Devuelve True o False según sea aplicable.

```js
const executeRule = (rule: Rule, origin: number, target: number) =>
  COMPARATORS[rule.operation](origin, target);
```

# Objetos de pruebas para probar la aplicación

```js
[
  {
    name: "Seguro de transporte",
    price: 10,
    sellIn: 10,
    rule: [
      {
        field: "sellIn",
        operation: "daily",
        target: 0,
        effect: { field: "price", operation: "-", operator: 1 }
      },
      {
        field: "sellIn",
        operation: "daily",
        target: 0,
        effect: { field: "sellIn", operation: "-", operator: 1 }
      }
    ]
  },
  {
    name: "Seguro de vida",
    price: 100,
    sellIn: 7,
    rule: [
      {
        field: "greaterThan",
        operation: "daily",
        target: 5,
        effect: {
          field: "price",
          operation: "-",
          operator: 1
        }
      },
      {
        field: "sellIn",
        operation: "daily",
        target: 10,
        effect: {
          field: "sellIn",
          operation: "-",
          operator: 1
        }
      },
      {
        field: "sellIn",
        operation: "lessThanOrEqual",
        target: 5,
        effect: {
          field: "price",
          operation: "-",
          operator: 2
        }
      }
    ]
  }
];
```

# Documentación de la API

[Postman](https://documenter.getpostman.com/view/4048913/SWE28zmr?version=latest)
