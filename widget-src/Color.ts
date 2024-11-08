import { alphaBlend } from "apca-w3";

namespace Color {
  export function colorMapper(
    paints: readonly Paint[]
  ): WidgetJSX.SolidPaint[] {
    let solidPaintList: WidgetJSX.SolidPaint[] = [];
    paints.forEach((pp) => {
      solidPaintList.push({
        type: "solid",
        color: {
          r: (pp as SolidPaint).color.r,
          g: (pp as SolidPaint).color.g,
          b: (pp as SolidPaint).color.b,
          a: pp.opacity as number,
        },
      });
    });

    return solidPaintList as WidgetJSX.SolidPaint[];
  }

  export function joinSolidPaints(
    paints: Array<WidgetJSX.SolidPaint>
  ): RGB | WidgetJSX.Color | undefined {
    let calculatedColor: RGB | RGBA | undefined;

    paints.forEach((paint) => {
      if (!calculatedColor) {
        calculatedColor = paint.color as WidgetJSX.Color;
      } else {
        const colorBlend = alphaBlend(
          [
            (paint.color as WidgetJSX.Color).r,
            (paint.color as WidgetJSX.Color).g,
            (paint.color as WidgetJSX.Color).b,
            (paint.color as WidgetJSX.Color).a,
          ],
          [calculatedColor.r, calculatedColor.g, calculatedColor.b]
        );
        calculatedColor = {
          r: colorBlend[0],
          g: colorBlend[1],
          b: colorBlend[2],
        };
      }
    });

    return calculatedColor;
  }

  export function toHex(value: number) {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }

  export function colorToHexString(color: RGB | RGBA) {
    if (color) {
      const hex = [toHex(color.r), toHex(color.g), toHex(color.b)].join("");
      return `#${hex}${
        (color as RGBA).a && (color as RGBA).a !== 1
          ? toHex((color as RGBA).a)
          : ""
      }`;
    } else {
      return "NaN";
    }
  }
}

export default Color;
