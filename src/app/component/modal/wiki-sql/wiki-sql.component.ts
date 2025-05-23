import { Component } from '@angular/core';

@Component({
  selector: 'app-wiki-sql',
  templateUrl: './wiki-sql.component.html',
  styleUrl: './wiki-sql.component.css',
})
export class WikiSqlComponent {
  wikiSQL = [
    {
      titulo: "SELECT",
      contenido: `
  SELECT * FROM empleados;
  SELECT nombre, salario FROM empleados;
  SELECT DISTINCT departamento FROM empleados;
  SELECT * FROM empleados WHERE salario > 3000;
  SELECT * FROM empleados WHERE nombre LIKE 'A%';
  SELECT * FROM empleados WHERE departamento IN ('Ventas', 'Marketing');
  SELECT * FROM empleados ORDER BY salario DESC;
  SELECT COUNT(*) FROM empleados;
  SELECT AVG(salario) FROM empleados;
  SELECT departamento, COUNT(*) FROM empleados GROUP BY departamento;
  SELECT CONCAT(apellido, ' ', nombre) AS Nombres FROM usuario;`
    },
    {
      titulo: "INSERT",
      contenido: `
  INSERT INTO empleados (nombre, salario) VALUES ('Carlos', 4000);
  INSERT INTO empleados (nombre, salario, departamento) VALUES ('Ana', 5000, 'Ventas');
  INSERT INTO productos (nombre, precio) VALUES ('Laptop', 800);
  INSERT INTO clientes (nombre, email) VALUES ('Juan Perez', 'juan@mail.com');
  INSERT INTO pedidos (cliente_id, total) VALUES (1, 150.00);
  INSERT INTO empleados (nombre, salario) VALUES ('Maria', 4500), ('Luis', 3700);
  INSERT INTO categorias (nombre) VALUES ('Electrónica');
  INSERT INTO proveedores (nombre, telefono) VALUES ('ABC S.A.', '555-1234');
  INSERT INTO facturas (cliente_id, fecha, total) VALUES (2, '2025-05-01', 200.50);
  INSERT INTO sucursales (ciudad, direccion) VALUES ('Guatemala', 'Zona 1');`
    },
    {
      titulo: "UPDATE",
      contenido: `
  UPDATE empleados SET salario = 4200 WHERE id = 1;
  UPDATE empleados SET departamento = 'Marketing' WHERE id = 2;
  UPDATE productos SET precio = precio * 1.10;
  UPDATE clientes SET email = 'nuevo@mail.com' WHERE id = 5;
  UPDATE pedidos SET total = total + 50 WHERE id = 3;
  UPDATE facturas SET fecha = '2025-05-02' WHERE id = 7;
  UPDATE categorias SET nombre = 'Informática' WHERE id = 4;
  UPDATE sucursales SET ciudad = 'Mixco' WHERE id = 2;
  UPDATE proveedores SET telefono = '555-9999' WHERE id = 6;
  UPDATE empleados SET salario = salario + 500 WHERE departamento = 'Ventas';`
    },
    {
      titulo: "DELETE",
      contenido: `
  DELETE FROM empleados WHERE id = 3;
  DELETE FROM productos WHERE precio < 10;
  DELETE FROM clientes WHERE nombre LIKE 'Juan%';
  DELETE FROM pedidos WHERE total = 0;
  DELETE FROM categorias WHERE id = 8;
  DELETE FROM proveedores WHERE telefono IS NULL;
  DELETE FROM sucursales WHERE ciudad = 'Antigua';
  DELETE FROM facturas WHERE fecha < '2024-01-01';
  DELETE FROM empleados WHERE salario > 10000;
  DELETE FROM pedidos WHERE cliente_id = 5;`
    },
    {
      titulo: "CREATE TABLE",
      contenido: `
  CREATE TABLE empleados (id INT PRIMARY KEY AUTO_INCREMENT, nombre VARCHAR(100), salario DECIMAL(10,2));
  CREATE TABLE departamentos (id INT PRIMARY KEY AUTO_INCREMENT, nombre VARCHAR(100));
  CREATE TABLE productos (id INT PRIMARY KEY AUTO_INCREMENT, nombre VARCHAR(100), precio DECIMAL(10,2));
  CREATE TABLE clientes (id INT PRIMARY KEY AUTO_INCREMENT, nombre VARCHAR(100), email VARCHAR(100));
  CREATE TABLE pedidos (id INT PRIMARY KEY AUTO_INCREMENT, cliente_id INT, total DECIMAL(10,2));
  CREATE TABLE categorias (id INT PRIMARY KEY AUTO_INCREMENT, nombre VARCHAR(100));
  CREATE TABLE proveedores (id INT PRIMARY KEY AUTO_INCREMENT, nombre VARCHAR(100), telefono VARCHAR(20));
  CREATE TABLE facturas (id INT PRIMARY KEY AUTO_INCREMENT, cliente_id INT, fecha DATE, total DECIMAL(10,2));
  CREATE TABLE sucursales (id INT PRIMARY KEY AUTO_INCREMENT, ciudad VARCHAR(100), direccion VARCHAR(200));
  CREATE TABLE usuarios (id INT PRIMARY KEY AUTO_INCREMENT, username VARCHAR(50), password VARCHAR(100));`
    },
    {
      titulo: "ALTER TABLE",
      contenido: `
  ALTER TABLE empleados ADD edad INT;
  ALTER TABLE empleados CHANGE nombre nombre_completo VARCHAR(150);
  ALTER TABLE empleados DROP COLUMN edad;
  ALTER TABLE productos MODIFY precio DECIMAL(12,2);
  ALTER TABLE pedidos ADD fecha DATE;
  ALTER TABLE clientes ADD telefono VARCHAR(20);
  ALTER TABLE categorias ADD descripcion TEXT;
  ALTER TABLE proveedores CHANGE nombre razon_social VARCHAR(150);
  ALTER TABLE facturas ADD estado VARCHAR(20) DEFAULT 'pendiente';
  ALTER TABLE sucursales DROP COLUMN direccion;`
    },
    {
      titulo: "INNER JOIN",
      contenido: `
  SELECT empleados.nombre, departamentos.nombre FROM empleados INNER JOIN departamentos ON empleados.departamento_id = departamentos.id;
  SELECT pedidos.id, clientes.nombre FROM pedidos INNER JOIN clientes ON pedidos.cliente_id = clientes.id;
  SELECT productos.nombre, categorias.nombre FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id;
  SELECT facturas.id, clientes.nombre FROM facturas INNER JOIN clientes ON facturas.cliente_id = clientes.id;
  SELECT pedidos.id, productos.nombre FROM pedidos INNER JOIN productos ON pedidos.producto_id = productos.id;
  SELECT empleados.nombre, sucursales.ciudad FROM empleados INNER JOIN sucursales ON empleados.sucursal_id = sucursales.id;
  SELECT usuarios.username, roles.nombre FROM usuarios INNER JOIN roles ON usuarios.rol_id = roles.id;
  SELECT facturas.id, sucursales.ciudad FROM facturas INNER JOIN sucursales ON facturas.sucursal_id = sucursales.id;
  SELECT empleados.nombre, jefes.nombre AS jefe FROM empleados INNER JOIN empleados AS jefes ON empleados.jefe_id = jefes.id;
  SELECT proveedores.nombre, productos.nombre FROM proveedores INNER JOIN productos ON productos.proveedor_id = proveedores.id;`
    }
  ];

}
