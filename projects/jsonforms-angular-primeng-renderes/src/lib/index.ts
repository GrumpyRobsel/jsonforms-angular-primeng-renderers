import { RankedTester } from "@jsonforms/core"
import {
  BooleanControlRenderer,
  NumberControlRenderer,
  RangeControlRenderer,
  TextAreaRenderer,
  TextControlRenderer,
  ToggleControlRenderer,
  booleanControlRendererTester,
  numberControlRendererTest,
  rangeControlRendererTester,
  textAreaRendererTester,
  textControlRendererTester,
  toggleControlRendererTester,
} from "./controls"
import {
  HorizontalLayoutRenderer,
  VerticalLayoutRenderer,
  horizontalLayoutTester,
  verticalLayoutTester,
} from "./layouts"

export const primengRenderers: {
  tester: RankedTester,
  renderer: any,
}[] = [
  // controls
  { tester: booleanControlRendererTester, renderer: BooleanControlRenderer },
  { tester: textControlRendererTester, renderer: TextControlRenderer },
  { tester: textAreaRendererTester, renderer: TextAreaRenderer },
  { tester: numberControlRendererTest, renderer: NumberControlRenderer },
  { tester: rangeControlRendererTester, renderer: RangeControlRenderer },
  { tester: toggleControlRendererTester, renderer: ToggleControlRenderer },
  // layouts
  { tester: verticalLayoutTester, renderer: VerticalLayoutRenderer },
  { tester: horizontalLayoutTester, renderer: HorizontalLayoutRenderer },
]
