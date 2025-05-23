import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentMainComponent } from '../../main/component-main/component-main.component';
import Swal from 'sweetalert2';
import { QueryResponseModel } from '../../../entity/QueryResponseModel';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import { QueryConsultasText } from '../action-data-base-page/QueryConsultasText';

@Component({
  selector: 'app-query-ejecutable-page',
  templateUrl: './query-ejecutable-page.component.html',
  styleUrl: './query-ejecutable-page.component.css',
})
export class QueryEjecutablePageComponent
  extends ComponentMainComponent
  implements OnInit
{
  @ViewChild('codeEditor') codeEditor!: CodemirrorComponent;
  dataBaseList: any = [];
  nameDataBase: string | number = '-1';
  content = '';
  console_text = '';
  nameTable = '?';
  responseQuery: QueryResponseModel[] = [];
  listadoRepuesta: Array<{ [key: string]: any }> = [];
  private clickTimeout: any;
  private clickCount: number = 0;
  numTable: number = 0;
  listActionDB: any = [];
  listDataBase: any[] = [];

  textoTrans="CAMBIAR TRANSACCION"
  isTransaccion:boolean= false;

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

  ngOnInit(): void {
    this.getDataBaseList();
    this.listActionDB = new QueryConsultasText().getListQuery(
      this.nameTable,
      this.username,
      this.dataBaseList.databaseName
    );
  }

  onClickChangeTran = () => {
    this.onChangeQueryList(!this.isTransaccion);
  }

  getDataBaseListTable() {
    this.servicecontrol
      .getListDataBaseTables(this.nameDataBase)
      .subscribe((res) => {
        if (res.code == '400') {
          console.error(res);
        } else {
          this.dataBaseList = res.entity;
        }
      });
  }

  getDataBaseList() {
    this.servicecontrol.getListDataBaseOnly().subscribe((res) => {
      if (res.code != '400') {
        this.listDataBase = res.entity;
      } else {
        Swal.fire({
          title: 'Error!',
          text: res?.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    });
  }

  onValueChanged(newValue: string) {
    this.content = newValue;
  }

  actionClick(item: any) {
    const text_content = this.content.length > 0 ? `\n${item.code}` : item.code;
    this.focusLastLine(text_content);
    console.log(this.nameTable);
  }

  actionClickLimpiar() {
    this.codeEditor.codeMirror?.setValue('');
    this.codeEditor.codeMirror?.scrollTo(0, 0);
    this.codeEditor.codeMirror?.focus();
  }

  actionClickLimpiarConsole() {
    this.console_text = '';
    this.listadoRepuesta = [];
  }

  actionClickEjecutar() {
    if (this.content.length == 0) {
      return;
    }

    if (this.nameDataBase === '-1') {
      this.actionClickEjecutarSinDB();
      return;
    }

    const va = this.obtenerTextoSeleccionado(this.codeEditor);


    this.servicecontrol
      .ejecutarQuery(va.length > 0 ? va:this.content, this.dataBaseList.databaseName)
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
            this.actionClickLimpiarConsole();
            console.log(res);
            this.console_text = '';
            this.responseQuery = res.entity;
            this.responseQuery.map((res) => {
              if (this.console_text.length > 0) {
                this.console_text = this.console_text
                  .concat('\n')
                  .concat(res.message);
              } else {
                this.console_text = this.console_text.concat(res.message);
              }
              if (res.listadoRepuesta && res.listadoRepuesta.length > 0) {
                // this.console_text = this.console_text.concat('\n').concat(JSON.stringify(res.listadoRepuesta));
                this.listadoRepuesta = res.listadoRepuesta;
              }

              if (
                res.type.toUpperCase() === 'CREATE' ||
                res.type.toUpperCase() === 'DROP' ||
                res.type.toUpperCase() === 'ALTER'
              ) {
                this.getDataBaseListTable();
              }
            });
          }
        },
        (err) => {
          this.console_text = err.error.entity;
          console.error(err.error);

          Swal.fire({
            title: 'Error!',
            text: 'Error en la Sintaxis, o el usuario no tiene permisos suficientes',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      );
  }


  actionClickEjecutarSinDB() {
    const va = this.obtenerTextoSeleccionado(this.codeEditor);
    this.servicecontrol
      .ejecutarQueryAll(va.length > 0 ? va:this.content)
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
            this.actionClickLimpiarConsole();
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
            this.focusLastLine(text);
          }
        }
        this.clickCount = 0;
      }, 300);
    }
  }

  onDoubleClick(text: string) {
    clearTimeout(this.clickTimeout);
    if (this.codeEditor && this.codeEditor.codeMirror) {
      const text_content =
        this.content.length > 0
          ? `\nSELECT * FROM ${text};`
          : `SELECT * FROM ${text};`;
      this.focusLastLine(text_content);
      this.clickCount = 0;
    }
  }

  clickPage(num: number, next: boolean = false, pre: boolean = false) {
    if (next && this.numTable < this.responseQuery.length - 1) {
      this.numTable = this.numTable + 1;
    } else if (pre && this.numTable > 0) {
      this.numTable = this.numTable - 1;
    } else {
      this.numTable = num;
    }
  }

  focusLastLine(text: any) {
    if (this.codeEditor?.codeMirror) {
      const editor = this.codeEditor.codeMirror;
      const doc = editor.getDoc();
      const cursor = doc.getCursor();

      doc.replaceRange(text, cursor);
      editor.focus();
      this.codeEditor.codeMirror?.scrollTo(0, this.content.length);
    }
  }

  clickSelectTable(name: any) {
    this.nameTable = name;
    this.onChangeQueryList(false);
  }

  onChangeQueryList(isTransaccion:boolean){
    this.isTransaccion = isTransaccion;
    this.listActionDB = this.isTransaccion ? new QueryConsultasText().getListQueryTransaction(this.nameTable,this.username,
          this.dataBaseList.databaseName) :new QueryConsultasText().getListQuery(this.nameTable,this.username,this.dataBaseList.databaseName);
  }

  onChange(event: Event){
   if(this.nameDataBase !== '' && this.nameDataBase !== '-1'){
    this.getDataBaseListTable();
   }else{
    this.dataBaseList = [];
   }
  }
}
