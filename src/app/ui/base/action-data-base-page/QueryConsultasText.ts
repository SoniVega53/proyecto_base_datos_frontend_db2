
export class QueryConsultasText {

  getListQuery(nameTable:any,username:any,nameDB:any){
    return  [
      { name: `SELECT`, code: `SELECT * FROM ${nameTable};` },
      { name: `INNER JOIN`, code: `SELECT a.*, b.*
        FROM ${nameTable} AS a
          INNER JOIN otra_tabla AS b ON a.id = b.id;` },
      { name: `INSERT`, code: `INSERT INTO ${nameTable} (nombre, apellido, edad) VALUES ("soni", "vega",22);` },
      { name: `UPDATE`, code: `UPDATE ${nameTable} SET nombre = "javier" WHERE id = 1;` },
      { name: `DELETE`, code: `DELETE FROM ${nameTable} WHERE id = 1;` },
      { name: `CREATE TABLE`, code: `CREATE TABLE ? (
  id INT PRIMARY KEY AUTO_INCREMENT,
  columna1 VARCHAR(255),
  columna2 INT
);` },
      { name: `CREATE TABLE FK`, code: `CREATE TABLE IF NOT EXISTS ? (
  id INT PRIMARY KEY AUTO_INCREMENT,
  otra_id INT NOT NULL,
  columna1 VARCHAR(255) NOT NULL,
  columna2 DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (otra_id) REFERENCES table_name(id)
  ON DELETE CASCADE ON UPDATE CASCADE
);`},
      { name: `DROP TABLE`, code: `DROP TABLE ${nameTable};` },
      { name: `ALTER TABLE`, code: `ALTER TABLE ${nameTable} ADD nueva_columna INT;` },
      { name: `ALTER TABLE CH`, code: `ALTER TABLE ${nameTable} CHANGE COLUMN old_colum new_colum VARCHAR(255);` },
      { name: `PROCESSLIST`, code: `SHOW PROCESSLIST;` },
      { name: `SHOW COLUMNS`, code: `SHOW COLUMNS FROM ${nameTable};` },
      { name: `SHOW GRANTS`, code: `SHOW GRANTS FOR ${username}@localhost;` },
      { name: `SHOW TABLES`, code: `SHOW TABLES;` },
      { name: `SHOW DATABASES`, code: `SHOW DATABASES;` },
      { name: `SHOW USERS`, code: `SELECT user, host FROM mysql.user;` },
      { name: `TS CREATE USER`, code: `CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    edad INT
);` },
      { name: `TS CREATE BITACORA`, code: `CREATE TABLE bitacora_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    accion VARCHAR(10), -- 'INSERT' o 'UPDATE'
    nombre_anterior VARCHAR(50),
    apellido_anterior VARCHAR(50),
    edad_anterior INT,
    nombre_nuevo VARCHAR(50),
    apellido_nuevo VARCHAR(50),
    edad_nuevo INT,
    fecha DATETIME
);` },
    { name: `SHOW PROCEDURE`, code: `SHOW PROCEDURE STATUS WHERE Db = '${nameDB}';` },
    { name: `SHOW TRIGGERS `, code: `SHOW TRIGGERS FROM ${nameDB};` },

    ];
  }


   getListQueryTransaction(nameTable:any,username:any,nameDB:any){
    return  [
      { name: `CREATE PROCEDURE`, code: `CREATE PROCEDURE procedimientoUser (
    IN p_id INT,
    IN p_nombre VARCHAR(50),
    IN p_apellido VARCHAR(50),
    IN p_edad INT
)
BEGIN
    IF p_id IS NULL THEN
        -- Insertar nuevo usuario
        INSERT INTO usuario (nombre, apellido, edad)
        VALUES (p_nombre, p_apellido, p_edad);
    ELSE
        -- Verificar si el usuario existe
        IF EXISTS (SELECT 1 FROM usuario WHERE id = p_id) THEN
            -- Hacer update si existe
            UPDATE usuario
            SET nombre = p_nombre,
                apellido = p_apellido,
                edad = p_edad
            WHERE id = p_id;
        ELSE
            -- Insertar si no existe (puedes quitar esto si no quieres insertar en ese caso)
            INSERT INTO usuario (id, nombre, apellido, edad)
            VALUES (p_id, p_nombre, p_apellido, p_edad);
        END IF;
    END IF;
END` },
        { name: `DROP PROCEDURE`, code: `DROP PROCEDURE IF EXISTS procedimientoUser;` },
        { name: `CALL PROCEDURE`, code: `CALL procedimientoUser('Soni', 'Vega', 22);` },
        { name: `CREATE TRIGGER`, code: `CREATE TRIGGER insertar_usuario_log
  AFTER INSERT ON usuario
  FOR EACH ROW
  BEGIN
      INSERT INTO usuario_log(usuario_id, accion, fecha)
      VALUES (NEW.id, 'INSERT', NOW());
  END` },
        { name: `DROP TRIGGER`, code: `DROP TRIGGER IF EXISTS insertar_usuario_log` },
        { name: `TS TRIGGER INSERT`, code: `CREATE TRIGGER trg_usuario_insert
AFTER INSERT ON usuario
FOR EACH ROW
BEGIN
    INSERT INTO bitacora_usuario (
        usuario_id, accion,
        nombre_nuevo, apellido_nuevo, edad_nuevo,
        fecha
    )
    VALUES (
        NEW.id, 'INSERT',
        NEW.nombre, NEW.apellido, NEW.edad,
        NOW()
    );
END;
` },
        { name: `TS TRIGGER UPDATE`, code: `CREATE TRIGGER trg_usuario_update
AFTER UPDATE ON usuario
FOR EACH ROW
BEGIN
    INSERT INTO bitacora_usuario (
        usuario_id, accion,
        nombre_anterior, apellido_anterior, edad_anterior,
        nombre_nuevo, apellido_nuevo, edad_nuevo,
        fecha
    )
    VALUES (
        NEW.id, 'UPDATE',
        OLD.nombre, OLD.apellido, OLD.edad,
        NEW.nombre, NEW.apellido, NEW.edad,
        NOW()
    );
END;` }
    ];
  }

}
