import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { JsonFormsModule } from '@jsonforms/angular';
import { UISchemaElement } from '@jsonforms/core';
import { primengRenderers } from '../../../jsonforms-angular-primeng-renderes/src/public-api';
import schemaAsset from '../assets/schema.json';
import uischemaAsset from '../assets/uischema.json';
import dataAsset from './data';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    JsonFormsModule,
    JsonPipe,
  ],
  template: `
    <h1>JsonForms PrimeNG Test!</h1>
    <jsonforms
      [(data)]="data"
      [renderers]="renderes"
      [schema]="schema"
      [uischema]="uischema"
    ></jsonforms>

    <div>
      <h2>Data</h2>
      {{ data | json }}
    </div>
  `,
})
export class AppComponent {
  readonly renderes = [
    ...primengRenderers,
  ];

  readonly data = dataAsset;

  readonly schema = schemaAsset;

  readonly uischema = uischemaAsset as UISchemaElement;

}
