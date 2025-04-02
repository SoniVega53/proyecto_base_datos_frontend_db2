import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-is-empty',
  templateUrl: './is-empty.component.html',
  styleUrl: './is-empty.component.css'
})
export class IsEmptyComponent {

  @Input() title: String = 'Nota';
  @Input() descripcion: String = 'Tu lista de colección está vacía';
}
