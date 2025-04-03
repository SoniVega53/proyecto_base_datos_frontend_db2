export class QueryResponseModel {
  message: string = '';
  type: string = '';
  listadoRepuesta: Array<{ [key: string]: any }> = [];

  // constructor(message: string = '', listadoRepuesta: Array<{ [key: string]: any }> = []) {
  //   this.message = message;
  //   this.listadoRepuesta = listadoRepuesta;
  // }
}
