import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { RankedTester, and, hasOption, isBooleanControl, rankWith } from '@jsonforms/core';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
    selector: 'ToggleControlRenderer',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputSwitchModule,
    ],
    template: `
    <div class="flex align-items-center gap-1" [hidden]="hidden">
      <p-inputSwitch
        [inputId]="id"
        (onChange)="onChange($event)"
        [formControl]="form"/>
      <label [for]="id">{{ label }}</label>
      <small [id]="id + '-error'" class="p-error">{{ error }}</small>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleControlRenderer extends JsonFormsControl {
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

export const toggleControlRendererTester: RankedTester = rankWith(
    2,
    and(isBooleanControl, hasOption('toggle')),
);
