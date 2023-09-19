import { Component } from '@angular/core';

@Component({
  selector: 'home-event-previews',
  templateUrl: './event-previews.component.html',
  styleUrls: ['./event-previews.component.scss']
})
export class EventPreviewsComponent {

arrayPrueba: any = [
  {titulo: 'Mercado 1',
  ubicacion: 'Sarria, Barcelona',
  fecha: '10/02/2024'
  },
  {titulo: 'Mercado 2',
  ubicacion: 'Sarria, Barcelona',
  fecha: '10/02/2024'
  },
  {titulo: 'Mercado 3',
  ubicacion: 'Sarria, Barcelona',
  fecha: '10/02/2024'
  },
  {titulo: 'Mercado 4',
  ubicacion: 'Sarria, Barcelona',
  fecha: '10/02/2024'
  },
]

}
