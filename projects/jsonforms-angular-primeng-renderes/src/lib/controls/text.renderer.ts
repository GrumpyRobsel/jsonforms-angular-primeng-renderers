import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { RankedTester, isStringControl, rankWith } from '@jsonforms/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'TextControlRenderer',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="flex flex-column gap-2" [hidden]="hidden">
      <label [for]="id">{{ label }}</label>
      <input
          pInputText
          [type]="getType()"
          (input)="onChange($event)"
          [id]="id"
          [formControl]="form"
          (focus)="focused = true"
          (focusout)="focused = false"/>
      <small [id]="id + '-error'" class="p-error">{{ error }}</small>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextControlRenderer extends JsonFormsControl {
  focused = false;
  constructor(jsonFormsService: JsonFormsAngularService) {
    super(jsonFormsService);
  }
  override getEventValue = (event: any) => event.target.value || undefined;
  getType = (): string => {
    if (this.uischema.options && this.uischema.options['format']) {
      return this.uischema.options['format'];
    }
    if (this.scopedSchema && this.scopedSchema.format) {
      switch (this.scopedSchema.format) {
        case 'email':
          return 'email';
        case 'tel':
          return 'tel';
        default:
          return 'text';
      }
    }
    return 'text';
  };
}

export const textControlRendererTester: RankedTester = rankWith(
  1,
  isStringControl,
);
