
export class QueryConsultasText {

  getListQuery(nameTable:any,username:any){
    return  [
      { name: `SELECT`, code: `SELECT * FROM ${nameTable};` },
      { name: `INSERT`, code: `INSERT INTO ${nameTable} (columna1, columna2) VALUES (valor1, valor2);` },
      { name: `UPDATE`, code: `UPDATE ${nameTable} SET columna1 = valor_nuevo WHERE id = valor_id;` },
      { name: `DELETE`, code: `DELETE FROM ${nameTable} WHERE id = valor_id;` },
      { name: `CREATE TABLE`, code: `CREATE TABLE ? (
  id INT PRIMARY KEY,
  columna1 VARCHAR(255),
  columna2 INT
);` },
      { name: `CREATE TABLE FK`, code: `CREATE TABLE IF NOT EXISTS ? (
  id INT PRIMARY KEY AUTO_INCREMENT,
  otra_id INT NOT NULL,
  columna1 VARCHAR(255), NOT NULL,
  columna2 DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (otra_id) REFERENCES table_name(id)
  ON DELETE CASCADE ON UPDATE CASCADE
);`},
      { name: `DROP TABLE`, code: `DROP TABLE ${nameTable};` },
      { name: `ALTER TABLE`, code: `ALTER TABLE ${nameTable} ADD nueva_columna INT;` },
      { name: `ALTER TABLE CH`, code: `ALTER TABLE ${nameTable} CHANGE COLUMN old_colum new_colum VARCHAR(255);` },
      { name: `PROCESSLIST`, code: `SHOW PROCESSLIST;` },
      { name: `SHOW COLUMNS`, code: `SHOW COLUMNS FROM ${nameTable};` },
      { name: `SHOW GRANTS`, code: `SHOW GRANTS FOR ${username};` },
      { name: `SHOW TABLES`, code: `SHOW TABLES;` },
      { name: `SHOW DATABASES`, code: `SHOW DATABASES;` },

    ];
  }



}
