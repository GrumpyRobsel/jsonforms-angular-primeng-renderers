import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsModule } from '@jsonforms/angular';
import { RankedTester, VerticalLayout, rankWith, uiTypeIs } from '@jsonforms/core';
import { LayoutChildrenRenderPropsPipe, LayoutRenderer } from './layout.renderer';

@Component({
  selector: 'VerticalLayoutRenderer',
  standalone: true,
  imports: [
    JsonFormsModule,
    LayoutChildrenRenderPropsPipe,
  ],
  template: `
    <div [hidden]="hidden" class="flex flex-column gap-2">
      @for (props of uischema | layoutChildrenRenderProps: schema : path; track trackElement) {
        <jsonforms-outlet [renderProps]="props"></jsonforms-outlet>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalLayoutRenderer extends LayoutRenderer<VerticalLayout> {
  constructor(
    jsonFormsService: JsonFormsAngularService,
    changeDetectionRef: ChangeDetectorRef
  ) {
    super(jsonFormsService, changeDetectionRef);
  }
}

export const verticalLayoutTester: RankedTester = rankWith(
  1,
  uiTypeIs('VerticalLayout')
);
