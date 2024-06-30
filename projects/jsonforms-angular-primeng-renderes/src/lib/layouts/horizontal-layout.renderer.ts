import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { JsonFormsAngularService, JsonFormsModule } from '@jsonforms/angular';
import {
  HorizontalLayout,
  RankedTester,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { LayoutChildrenRenderPropsPipe, LayoutRenderer } from './layout.renderer';

@Component({
  selector: 'HorizontalLayoutRenderer',
  standalone: true,
  imports: [
    JsonFormsModule,
    LayoutChildrenRenderPropsPipe,
  ],
  template: `
    <div [hidden]="hidden" class="flex flex-row gap-2">
      @for (props of uischema | layoutChildrenRenderProps : schema : path; track trackElement) {
      <jsonforms-outlet [renderProps]="props"></jsonforms-outlet>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalLayoutRenderer extends LayoutRenderer<HorizontalLayout> {
  constructor(
    jsonFormsService: JsonFormsAngularService,
    changeDetectionRef: ChangeDetectorRef
  ) {
    super(jsonFormsService, changeDetectionRef);
  }
}
export const horizontalLayoutTester: RankedTester = rankWith(
  1,
  uiTypeIs('HorizontalLayout')
);
