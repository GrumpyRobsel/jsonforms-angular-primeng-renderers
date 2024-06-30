import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { RankedTester, isRangeControl, rankWith } from '@jsonforms/core';
import { SliderModule } from 'primeng/slider';

@Component({
    selector: 'RangeControlRenderer',
    standalone: true,
    imports: [
      SliderModule,
      FormsModule,
      ReactiveFormsModule,
    ],
    template: `
    <div class="flex flex-column gap-2" [hidden]="hidden">
      <label [for]="id">{{ label }}: {{ data }}</label>
      <p-slider
        (onChange)="onChange($event)"
        [formControl]="form"
        [max]="max"
        [min]="min"
        [step]="multipleOf"
        [id]="id"></p-slider>
      <small [id]="id + '-error'" class="p-error">{{ error }}</small>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeControlRenderer extends JsonFormsControl {
    min?: number;
    max?: number;
    multipleOf?: number;
    focused = false;

    constructor(
        jsonformsService: JsonFormsAngularService,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        super(jsonformsService);
    }

    override getEventValue = (event: any) => Number(event.value);
    override mapAdditionalProps() {
      if (this.scopedSchema) {
        this.min = this.scopedSchema.minimum;
        this.max = this.scopedSchema.maximum;
        this.multipleOf = this.scopedSchema.multipleOf || 1;
      }
      this.changeDetectorRef.markForCheck();
    }
}

export const rangeControlRendererTester: RankedTester = rankWith(
    2,
    isRangeControl,
);
