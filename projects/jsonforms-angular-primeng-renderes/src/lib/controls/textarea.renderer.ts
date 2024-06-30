import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { RankedTester, isMultiLineControl, rankWith } from '@jsonforms/core';
import { InputTextareaModule } from 'primeng/inputtextarea';


@Component({
    selector: 'TextAreaRenderer',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputTextareaModule,
    ],
    template: `
    <div class="flex flex-column gap-2" [hidden]="hidden">
      <label [for]="id">{{ label }}</label>
      <textarea
        pInputTextarea
        (input)="onChange($event)"
        [id]="id"
        [formControl]="form"
        (focus)="focused = true"
        (focusout)="focused = false"
        [rows]="rows"></textarea>
        <small [id]="id + '-error'" class="p-error">{{ error }}</small>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAreaRenderer extends JsonFormsControl {
    focused = false;
    rows = 5; // TODO: configurable
    constructor(jsonformService: JsonFormsAngularService ) {
        super(jsonformService);
    }
    override getEventValue = (event: any) => event.target.value || undefined;
}

export const textAreaRendererTester: RankedTester = rankWith(
    2,
    isMultiLineControl,
);
