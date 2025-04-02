interface DataPermisos{
  id:Number,
  nombre:string | '',
  access:boolean | false;
};

export class ListadoPermisos {
  listadoPermisos: DataPermisos[] = [
    { id: 1, nombre: 'ALL PRIVILEGES', access: false },
    { id: 2, nombre: 'SELECT', access: false },
    { id: 3, nombre: 'INSERT', access: false },
    { id: 4, nombre: 'UPDATE', access: false },
    { id: 5, nombre: 'DELETE', access: false },
    { id: 6, nombre: 'CREATE', access: false },
    { id: 7, nombre: 'DROP', access: false },
    { id: 8, nombre: 'ALTER', access: false },
    { id: 9, nombre: 'INDEX', access: false },
    { id: 10, nombre: 'REFERENCES', access: false },
    { id: 11, nombre: 'CREATE TEMPORARY TABLES', access: false },
    { id: 12, nombre: 'LOCK TABLES', access: false },
    { id: 13, nombre: 'EXECUTE', access: false },
    { id: 14, nombre: 'SHOW DATABASES', access: false },
    { id: 15, nombre: 'SUPER', access: false },
    { id: 16, nombre: 'CREATE VIEW', access: false },
    { id: 17, nombre: 'SHOW VIEW', access: false },
    { id: 18, nombre: 'CREATE ROUTINE', access: false },
    { id: 19, nombre: 'ALTER ROUTINE', access: false },
    { id: 21, nombre: 'EVENT', access: false },
    { id: 22, nombre: 'TRIGGER', access: false },
    { id: 23, nombre: 'CREATE TABLESPACE', access: false },
    { id: 24, nombre: 'CREATE ROLE', access: false },
    { id: 25, nombre: 'GRANT OPTION', access: false }
  ];
}
