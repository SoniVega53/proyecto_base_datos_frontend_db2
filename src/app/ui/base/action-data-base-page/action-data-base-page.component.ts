import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentMainComponent } from '../../main/component-main/component-main.component';
import Swal from 'sweetalert2';
import { QueryResponseModel } from '../../../entity/QueryResponseModel';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';

@Component({
  selector: 'app-action-data-base-page',
  templateUrl: './action-data-base-page.component.html',
  styleUrl: './action-data-base-page.component.css',
})
export class ActionDataBasePageComponent
  extends ComponentMainComponent
  implements OnInit
{
  @ViewChild('codeEditor') codeEditor!: CodemirrorComponent;
  dataBaseList: any = [];
  nameDataBase = '';
  content = '';
  console_text = '';
  responseQuery:QueryResponseModel[] = [];
  listadoRepuesta: Array<{ [key: string]: any }> = [];
  private clickTimeout: any;
  private clickCount: number = 0;
  numTable: number = 0;

  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  editorOptions = {
    mode: 'sql',
    theme: 'material',
    lineNumbers: true,
    readOnly: false,
    matchBrackets: true,
    autoCloseBrackets: true,
    indentUnit: 2,
    tabSize: 4,
    smartIndent: true,
    lineWrapping: true,
    viewportMargin: Infinity,
  };
  editorOptionsConsole = {
    mode: 'text/plain',
    theme: '',
    lineNumbers: true,
    readOnly: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    indentUnit: 2,
    tabSize: 4,
    smartIndent: true,
    lineWrapping: true,
    viewportMargin: Infinity,
    cursorBlinkRate: -1,
  };
  listActionDB = [
    { name: 'SELECT', code: 'SELECT * FROM ?;' },
    { name: 'INSERT', code: 'INSERT INTO ? (columna1, columna2) VALUES (valor1, valor2);' },
    { name: 'UPDATE', code: 'UPDATE ? SET columna1 = valor_nuevo WHERE id = valor_id;' },
    { name: 'DELETE', code: 'DELETE FROM ? WHERE id = valor_id;' },
    { name: 'CREATE TABLE', code: 'CREATE TABLE ? (\n id INT PRIMARY KEY,\n columna1 VARCHAR(255),\n columna2 INT\n);' },
    { name: 'CREATE TABLE FK', code: `CREATE TABLE IF NOT EXISTS ? (
      id INT PRIMARY KEY AUTO_INCREMENT,
      otra_id INT NOT NULL,
      columna1 DATE NOT NULL,
      columna1 DECIMAL(10,2) NOT NULL,
      FOREIGN KEY (otra_id) REFERENCES table_name(id)
      ON DELETE CASCADE ON UPDATE CASCADE
    );`},
    { name: 'DROP TABLE', code: 'DROP TABLE ?;' },
    { name: 'ALTER TABLE', code: 'ALTER TABLE ? ADD nueva_columna INT;' },
    { name: 'PROCESSLIST', code: 'SHOW PROCESSLIST;' },
    { name: 'SHOW COLUMNS', code: 'SHOW COLUMNS FROM ?;' },
    { name: 'SHOW GRANTS', code: `SHOW GRANTS FOR ${this.username};` },
    { name: 'SHOW TABLES', code: 'SHOW TABLES;' },
  ];

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.nameDataBase = params['database'];
    });
    this.getDataBaseListTable();
  }

  getDataBaseListTable() {
    this.servicecontrol.getListDataBaseTables(this.nameDataBase).subscribe((res) => {
      if (res.code == '400') {
        Swal.fire({
          title: 'Error!',
          text: res?.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      } else {
        this.dataBaseList = res.entity;
      }
    });
  }

  onValueChanged(newValue: string) {
    this.content = newValue;
  }

  actionClick(item: any) {
    if (this.content.length > 0) {
      this.content = this.content.concat('\n').concat(item.code);
    } else {
      this.content = this.content.concat(item.code);
    }
  }

  actionClickLimpiar() {
    this.content = '';
  }

  actionClickLimpiarConsole() {
    this.console_text = '';
    this.listadoRepuesta = [];
  }

  actionClickEjecutar() {
    this.servicecontrol
      .ejecutarQuery(this.content, this.dataBaseList.databaseName)
      .subscribe(
        (res) => {
          if (res.code === '400') {
            Swal.fire({
              title: 'Error!',
              text: res?.message,
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          } else {
            console.log(res);
            this.console_text = '';
            this.responseQuery = res.entity;
            this.responseQuery.map(res =>{
              if(this.console_text.length > 0){
                this.console_text = this.console_text.concat('\n').concat(res.message);
              }else{
                this.console_text = this.console_text.concat(res.message);
              }
              if(res.listadoRepuesta && res.listadoRepuesta.length > 0){
               // this.console_text = this.console_text.concat('\n').concat(JSON.stringify(res.listadoRepuesta));
                this.listadoRepuesta = res.listadoRepuesta;
              }

              if(res.type === 'CREATE' || res.type === 'DROP' || res.type === 'ALTER'){
                  this.getDataBaseListTable();
              }

            })

          }
        },
        (err) => {
          this.console_text = err.error.entity;
          console.error(err.error);

          Swal.fire({
            title: 'Error!',
            text: "Error en la Sintaxis, o el usuario no tiene permisos suficientes",
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      );
  }

  copyToClipboard(text: string) {
    this.clickCount++;

    if (this.clickCount === 1) {
      this.clickTimeout = setTimeout(() => {
        if (this.clickCount === 1) {
          if (this.codeEditor && this.codeEditor.codeMirror) {
            const editor = this.codeEditor.codeMirror;
            const doc = editor.getDoc();
            const cursor = doc.getCursor(); // Obtiene la posición actual del cursor

            doc.replaceRange(text, cursor); // Inserta el texto en la posición actual
            editor.focus(); // Mantiene el foco en el editor
          }
        }
        this.clickCount = 0;
      }, 300);  // Tiempo límite para detectar un doble clic (en milisegundos)
    }
  }

  onDoubleClick(text: string) {
    clearTimeout(this.clickTimeout);
    if (this.codeEditor && this.codeEditor.codeMirror) {
      const editor = this.codeEditor.codeMirror;
      const doc = editor.getDoc();
      const cursor = doc.getCursor(); // Obtiene la posición actual del cursor

      doc.replaceRange(`SELECT * FROM ${text};`, cursor); // Inserta el texto en la posición actual
      editor.focus(); // Mantiene el foco en el editor
      this.clickCount = 0;
    }
  }

  clickPage(num:number,next:boolean = false, pre:boolean = false){
    if (next && this.numTable < this.responseQuery.length - 1) {
      this.numTable = (this.numTable + 1);
    }else if (pre && this.numTable > 0) {
      this.numTable = this.numTable - 1;
    }else{
      this.numTable = (num);
    }
  }
}
