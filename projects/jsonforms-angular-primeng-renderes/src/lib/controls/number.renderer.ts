import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { RankedTester, StatePropsOfControl, isIntegerControl, isNumberControl, or, rankWith } from '@jsonforms/core';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'NumberControlRenderer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputNumberModule,
  ],
  template: `
    <div class="flex flex-column gap-2" [hidden]="hidden">
      <label [for]="id">{{ label }}</label>
        <p-inputNumber
          [formControl]="form"
          (onInput)="onChange($event)"
          [inputId]="id"
          [min]="min"
          [max]="max"
          [step]="multipleOf"
          (onFocus)="focused = true"
          (onBlur)="focused = false"></p-inputNumber>
      <small [id]="id + '-error'" class="p-error">{{ error }}</small>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberControlRenderer extends JsonFormsControl {
  min?: number;
  max?: number;
  multipleOf?: number;
  focused = false;

  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);
  }

  override getEventValue = (event: any) => Number(event.value);

  override mapAdditionalProps(props: StatePropsOfControl) {
    if (this.scopedSchema) {
      const testerContext = {
        rootSchema: this.rootSchema,
        config: props.config,
      };
      const defaultStep = isNumberControl(
        this.uischema,
        this.rootSchema,
        testerContext
      )
        ? 0.1
        : 1;
      this.min = this.scopedSchema.minimum;
      this.max = this.scopedSchema.maximum;
      this.multipleOf = this.scopedSchema.multipleOf || defaultStep;
    }
  }
}

export const numberControlRendererTest: RankedTester = rankWith(
  1,
  or(isNumberControl, isIntegerControl)
);
