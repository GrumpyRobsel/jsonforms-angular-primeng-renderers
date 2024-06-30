import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { RankedTester, isBooleanControl, rankWith } from '@jsonforms/core';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    selector: 'BooleanControlRenderer',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CheckboxModule,
    ],
    template: `
    <div class="flex align-items-center gap-1" [hidden]="hidden">
        <p-checkbox
          [inputId]="id"
          [binary]="true"
          (onChange)="onChange($event)"
          [formControl]="form" />
        <label [for]="id">{{ label }}</label>
        <div>
            <small class="p-error">{{ error }}</small>
        </div>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooleanControlRenderer extends JsonFormsControl {
    constructor(
      jsonformsService: JsonFormsAngularService,
      private changeDetectionRef: ChangeDetectorRef
    ) {
      super(jsonformsService);
    }

    override getEventValue = (event: any) => event.checked;

    override mapAdditionalProps() {
        if (!(this.changeDetectionRef as ViewRef).destroyed) {
          this.changeDetectionRef.markForCheck();
        }
    }
}

export const booleanControlRendererTester: RankedTester = rankWith(
    1,
    isBooleanControl,
);
