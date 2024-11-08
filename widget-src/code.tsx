import { calcAPCA, fontLookupAPCA } from "apca-w3";
import { score, hex } from "wcag-contrast";
import Color from "./Color";
import rgblind from "./rgblind";
import Icons from "./Icons";

const { widget, getLocalPaintStylesAsync, editorType, constants, variables } = figma
const { useSyncedState, usePropertyMenu, AutoLayout, Text, Ellipse, SVG, Image, useEffect, waitForTask } = widget

const BASE_BACKGROUND_COLOR = figma.editorType === 'figjam' && (figma.constants as any)["colors"] ? (figma.constants as any)["colors"].figJamBase.black : '#000000';
const BASE_FOREGROUND_COLOR = figma.editorType === 'figjam' && (figma.constants as any)["colors"] ? (figma.constants as any)["colors"].figJamBase.white : '#FFFFFF';
const BASE_COLOR_OPTIONS: WidgetPropertyMenuColorSelectorOption[] = [
  {
    option: BASE_BACKGROUND_COLOR,
    tooltip: 'Black'
  },
  {
    option: BASE_FOREGROUND_COLOR,
    tooltip: 'White'
  }
];
const BASE_PROPERTY_MENU_ITEMS: WidgetPropertyMenuItem[] = [
  {
    itemType: 'action',
    propertyName: 'PICK_COLORS',
    tooltip: 'Pick custom colors',
    icon: Icons.Colorize
  }
];
let PropertyMenuItems: WidgetPropertyMenuItem[] = [];
let customPickedBackColor: string | null = null;
let customPickedFrontColor: string | null = null;

function Widget() {
  const [colorOptions, setColorOptions] = useSyncedState<WidgetPropertyMenuColorSelectorOption[]>('colorOptions', BASE_COLOR_OPTIONS);
  const [backColor, setBackColor] = useSyncedState<string>('backColor', BASE_BACKGROUND_COLOR);
  const [frontColor, setFrontColor] = useSyncedState<string>('frontColor', BASE_FOREGROUND_COLOR);
  const [protanopiaPreviewImageSrc, setProtanopiaPreviewImageSrc] = useSyncedState('protanopiaPreviewImageSrc', '');

  function getPropertyMenuItems(colorOptions: WidgetPropertyMenuColorSelectorOption[], selectedBackColor: string = backColor, selectedFrontColor: string = frontColor) {
    const newItems = BASE_PROPERTY_MENU_ITEMS;

    if (colorOptions.length >= 1 && !newItems.find(i => i.itemType === "color-selector" && i.propertyName === "PICK_BACK_COLOR_FROM_LOCALS")) {
      newItems.push(
        {
          itemType: 'color-selector',
          propertyName: 'PICK_BACK_COLOR_FROM_LOCALS',
          tooltip: 'Pick back color',
          options: colorOptions,
          selectedOption: selectedBackColor
        }
      );
    }

    if (colorOptions.length >= 2 && !newItems.find(i => i.itemType === "color-selector" && i.propertyName === "PICK_FRONT_COLOR_FROM_LOCALS")) {
      newItems.push(
        {
          itemType: 'color-selector',
          propertyName: 'PICK_FRONT_COLOR_FROM_LOCALS',
          tooltip: 'Pick front color',
          options: colorOptions,
          selectedOption: selectedFrontColor
        }
      );
    }

    return newItems;
  }

  async function getColorOptionsAsync(): Promise<WidgetPropertyMenuColorSelectorOption[]> {
    let _colorOptions: WidgetPropertyMenuColorSelectorOption[] = [];

    if (editorType === "figma") {
      const paintStyles = await getLocalPaintStylesAsync();
      const colorVariables = await variables.getLocalVariablesAsync("COLOR");

      if (paintStyles && paintStyles.length > 0) {
        let paintStyleColors = paintStyles
          .filter((c) => c.paints.every(p => p.type === "SOLID"))
          .filter((c) => c.paints.every((p) => (p as SolidPaint).color && (p as SolidPaint).color.r && (p as SolidPaint).color.g && (p as SolidPaint).color.b))
          .map((ps) => ({ rgba: Color.joinSolidPaints(Color.colorMapper(ps.paints)), name: ps.name }))
          .map<WidgetPropertyMenuColorSelectorOption>((color) => ({ tooltip: color.name, option: Color.colorToHexString(color.rgba as RGBA).substring(0, 7) }));
        paintStyleColors = paintStyleColors.filter((elem, index) => paintStyleColors.findIndex(obj => obj.option === elem.option) === index);
        _colorOptions.push(...paintStyleColors);
      }

      if (colorVariables && colorVariables.length > 0) {
        let variableColors = (await Promise.all(colorVariables
          .map(async (v) => {
            const collection = await variables.getVariableCollectionByIdAsync(v.variableCollectionId);

            if (collection) {
              const value = v.valuesByMode[collection.defaultModeId] as RGB;
              return { tooltip: v.name, option: Color.colorToHexString(value).substring(0, 7) };
            } else return null;
          }))).filter(c => !!c).map(c => c as WidgetPropertyMenuColorSelectorOption);

        _colorOptions.push(...variableColors);
      }
    } else if (editorType === "figjam") {
      const jamColors = figma.widget.colorMapToOptions(constants.figJamBase || (constants as any).colors.figJamBase);

      if (jamColors && jamColors.length > 0) {
        _colorOptions.push(
          ...jamColors
        );
      }
    }

    _colorOptions.push(
      ...BASE_COLOR_OPTIONS.filter(bc => _colorOptions.find(co => bc.option !== co.option))
    );
    _colorOptions = _colorOptions.filter((elem, index) => elem !== null && _colorOptions.findIndex(obj => obj !== null && obj.option.toLowerCase() === elem.option.toLowerCase()) === index);

    return _colorOptions;
  }

  useEffect(() => {
    waitForTask(new Promise<void>(async (resolve) => {
      figma.ui.onmessage = async (msg) => {
        if (msg.type === 'savePickedColor') {
          customPickedBackColor = msg.data.backColor;
          customPickedFrontColor = msg.data.frontColor;
        }
        figma.closePlugin();
      };

      const _colorOptions = await getColorOptionsAsync();

      if (_colorOptions.length !== colorOptions.length) {

        if (customPickedBackColor) {
          _colorOptions.push({ option: customPickedBackColor, tooltip: 'Manually picked back color' });
        }

        if (customPickedFrontColor) {
          _colorOptions.push({ option: customPickedFrontColor, tooltip: 'Manually picked front color' });
        }

        setColorOptions(_colorOptions);
        PropertyMenuItems = getPropertyMenuItems(_colorOptions);

        if (_colorOptions.length >= 1) {
          setBackColor(_colorOptions[0].option);
        }

        if (_colorOptions.length >= 2) {
          setFrontColor(_colorOptions[1].option);
        }
      }
      resolve();
    }));
  });

  usePropertyMenu(
    PropertyMenuItems,
    (e) => {
      switch (e.propertyName) {
        case "PICK_BACK_COLOR_FROM_LOCALS":
          setBackColor(e.propertyValue as string)
          PropertyMenuItems = getPropertyMenuItems(colorOptions, e.propertyValue as string);
          break;
        case "PICK_FRONT_COLOR_FROM_LOCALS":
          setFrontColor(e.propertyValue as string)
          PropertyMenuItems = getPropertyMenuItems(colorOptions, undefined, e.propertyValue as string);
          break;
        case "PICK_COLORS":
          return new Promise(() => {
            figma.showUI(`
              <style>
                :root {
                  --font-family-ui: "Inter", sans-serif;
                }
                body {
                  font-family: var(--font-family-ui);
                  color: var(--figma-color-text);
                  display: flex;
                  gap: 1rem;
                  margin: 1rem;
                  flex-direction: column;
                }
                label {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  cursor: pointer;
                }
                label:hover {
                  font-weight: bold;
                }
                input[type=color] { 
                  width: 3rem;
                  height: 3rem;
                  cursor: pointer;
                  border: 0;
                  background: none;
                  padding: 0;margin: 0;
                }
                button {
                  background: var(--figma-color-bg-brand);
                  padding: 1rem;
                  border: 0;
                  border-radius: .25rem;
                  color: var(--figma-color-text-onbrand);
                  width: 100%;
                  cursor: pointer;
                }
                button:hover {
                  background: var(--figma-color-bg-brand-hover);
                }
              </style>
              <label>Back color: <input type="color" id="backColor"/></label>
              <label>Front color: <input type="color" id="frontColor"/></label>
              <button onclick="save()">Save</button>
              <script>
                onmessage = (event) => {
                  document.getElementById('frontColor').value = event.data.pluginMessage.frontColor;
                  document.getElementById('backColor').value = event.data.pluginMessage.backColor;
                }
                function save() {
                  const backColor = document.getElementById('backColor').value;
                  const frontColor = document.getElementById('frontColor').value;
                  const message = {pluginMessage: { type: "savePickedColor", data: { backColor, frontColor } } };
                  parent.postMessage(message, '*');
                }
              </script>`, { height: 208, width: 192, themeColors: true, title: "Choose a color..." });
            figma.ui.postMessage({ frontColor, backColor });
          });
        default:
          break;
      }
    },
  );

  const wcag22Contrast = hex(frontColor, backColor);
  const wcag22ContrastFixed = `${wcag22Contrast.toFixed(1)}:1`;
  const wcag22Score = score(wcag22Contrast);
  const wcag22ScoreLightsMap = new Map<string, string>([
    ["AAA", "#39b89a"], ["AA", "#b9eee1"], ["AA Large", "#fec9d7"], ["Fail", "#ff5883"]]);
  const apcaScoreLightsMap = new Map<string, string>([
    ["Lc 90", "#39b89a"], ["Lc 75", "#79d3be"], ["Lc 60", "#b9eee1"], ["Lc 45", "#fec9d7"], ["Lc 30", "#ff91ad"], ["Lc 15", "#ff5883"]]);
  const wcag22ScoreLights = (score: string) => <Ellipse width={16} height={16} fill={wcag22ScoreLightsMap.get(score)}></Ellipse>;
  const apcaScoreLights = (score: string) => <Ellipse width={16} height={16} fill={apcaScoreLightsMap.get(score)}></Ellipse>;

  const apcaContrast = calcAPCA(frontColor, backColor) as number;
  const apcaContrastFixed = apcaContrast.toFixed(2);
  const apcaContrastFontLookup = () => {
    const fontLookup = fontLookupAPCA(apcaContrast);
    return fontLookup.slice(1).map((x, i) => [((i + 1) * 100) as WidgetJSX.FontWeightNumerical, x as number]);
  };
  const apcaScore = (): string => {
    if (calcAPCA(frontColor, backColor) as number >= 90 || calcAPCA(frontColor, backColor) as number <= -90) {
      return `Lc 90`;
    } else if (calcAPCA(frontColor, backColor) as number >= 75 || calcAPCA(frontColor, backColor) as number <= -75) {
      return `Lc 75`;
    } else if (calcAPCA(frontColor, backColor) as number >= 60 || calcAPCA(frontColor, backColor) as number <= -60) {
      return `Lc 60`;
    } else if (calcAPCA(frontColor, backColor) as number >= 45 || calcAPCA(frontColor, backColor) as number <= -45) {
      return `Lc 45`;
    } else if (calcAPCA(frontColor, backColor) as number >= 30 || calcAPCA(frontColor, backColor) as number <= -30) {
      return `Lc 30`;
    } else if (calcAPCA(frontColor, backColor) as number >= 15 || calcAPCA(frontColor, backColor) as number <= -15) {
      return `Lc 15`;
    } else {
      return "Fail";
    }
  };
  const apcaUseCase = (): string => {
    if (calcAPCA(frontColor, backColor) as number >= 90 || calcAPCA(frontColor, backColor) as number <= -90) {
      return `Lc 90 • Preferred level for fluent text and columns of body text with a font no smaller than 18px/weight 300 or 14px/weight 400 (normal), or non-body text with a font no smaller than 12px/400. Also a recommended minimum for extremely thin fonts with a minimum of 24px at weight 200. Lc 90 is a suggested maximum for very large and bold fonts (greater than 36px bold), and large areas of color. Small fonts do not have a maximum.`;
    } else if (calcAPCA(frontColor, backColor) as number >= 75 || calcAPCA(frontColor, backColor) as number <= -75) {
      return `Lc 75 • The minimum level for columns of body text with a font no smaller than 24px/300 weight, 18px/400, 16px/500 and 14px/700. This level may be used with non-body text with a font no smaller than 15px/400. Also, Lc 75 should be considered a minimum for larger for any larger text where readability is important.`;
    } else if (calcAPCA(frontColor, backColor) as number >= 60 || calcAPCA(frontColor, backColor) as number <= -60) {
      return `Lc 60 • The minimum level recommended for content text that is not body, column, or block text. In other words, text you want people to read. The minimums: no smaller than 48px/200, 36px/300, 24px normal weight (400), 21px/500, 18px/600, 16px/700 (bold). These values based on the reference font Helvetica. To use these sizes as body text, add Lc 15.`;
    } else if (calcAPCA(frontColor, backColor) as number >= 45 || calcAPCA(frontColor, backColor) as number <= -45) {
      return `Lc 45 • The minimum for larger, heavier text (36px normal weight or 24px bold) such as headlines, and large text that should be fluently readable but is not body text. This is also the minimum for pictograms with fine details, or smaller outline icons.`;
    } else if (calcAPCA(frontColor, backColor) as number >= 30 || calcAPCA(frontColor, backColor) as number <= -30) {
      return `Lc 30 • The absolute minimum for any text not listed above, including text considered as “spot readable”. This includes placeholder text and disabled element text, and some non-content like a copyright bug. This is also the minimum for large/solid semantic & understandable non-text elements such as “mostly solid” icons or pictograms. Generally no less than 5.5px solid in its smallest dimension.`;
    } else if (calcAPCA(frontColor, backColor) as number >= 15 || calcAPCA(frontColor, backColor) as number <= -15) {
      return `Lc 15 • The absolute minimum for any non-semantic non-text that needs to be discernible, and is no less than 5px (solid) in its smallest dimension. This may include dividers, and in some cases large buttons or thick focus-visible outlines, but does not include fine details which have a higher minimum. Designers should treat anything below this level as invisible, as it will not be visible for many users. This minimum level should be avoided for any items important to the use, understanding, or interaction of the site.`;
    } else {
      return "";
    }
  };

  const protanopiaPreview = rgblind.protanopia(backColor, frontColor);
  const deuteranopiaPreview = rgblind.deuteranopia(backColor, frontColor);
  const tritanopiaPreview = rgblind.tritanopia(backColor, frontColor);

  return (
    <AutoLayout
      verticalAlignItems="start"
      horizontalAlignItems={'center'}
      direction={"horizontal"}
      spacing={40}
      padding={40}
      cornerRadius={16}
      fill="#ffffff"
      stroke="#666666"
      strokeWidth={4}
      width={"hug-contents"}
    >
      <AutoLayout direction="vertical" spacing={16} width="hug-contents">
        <AutoLayout height={128} width={128} fill={backColor} cornerRadius={128} padding={32}>
          <AutoLayout height="fill-parent" width="fill-parent" fill={frontColor} cornerRadius={128}></AutoLayout>
        </AutoLayout>
        {protanopiaPreviewImageSrc ?
          <Image src={protanopiaPreviewImageSrc} width={128} height={128}></Image> : <></>
        }

        <Text fill="#ff91ad" width={"fill-parent"} horizontalAlignText="center" hoverStyle={{ fill: "#ff5883" }} onClick={() => {
          return new Promise(() => {
            figma.showUI(`
            <div style="display: flex; padding: 1rem; gap: 1rem; align-items: center; flex-direction: row; color: var(--figma-color-text, #dddddd); font-family: Inter, sans-serif"><label>Deuteranopia:</label>
            ${protanopiaPreview}
            <label>Protanopia:</label>
            ${deuteranopiaPreview}
            <label>Tritanopia:</label>
            ${tritanopiaPreview}</div>`, { height: 194, width: 852, themeColors: true, title: "Color blindess simulation" });
          })
        }}>Click for color blindness preview</Text>
      </AutoLayout>
      <AutoLayout height="hug-contents" width={328} spacing={16} direction={"vertical"} padding={8} cornerRadius={8} fill="#ffffff">
        <Text>Back color: {customPickedBackColor || backColor} {colorOptions.length > 0 ? colorOptions.find(c => c.option === backColor)?.tooltip as string : ''}</Text>
        <Text>Front color: {customPickedFrontColor || frontColor} {colorOptions.length > 0 ? colorOptions.find(c => c.option === frontColor)?.tooltip as string : ''}</Text>
        <AutoLayout direction="horizontal" spacing={8} width={"fill-parent"}>
          <Text fontWeight={900}>WCAG 2.2</Text>
          <Text>{wcag22ContrastFixed}</Text>
          {wcag22ScoreLights(wcag22Score)}
          <Text>{wcag22Score}</Text>
        </AutoLayout>
        <AutoLayout direction="horizontal" spacing={8} width={"fill-parent"}>
          <Text fontWeight={900}>APCA</Text>
          <Text>{apcaContrastFixed}</Text>
          {apcaScoreLights(apcaScore())}
          <Text>{apcaScore()}</Text>
        </AutoLayout>

        <AutoLayout fill="#eeeeee" padding={16} cornerRadius={8} width="fill-parent">
          <Text width={"fill-parent"}>{apcaUseCase()}</Text>
        </AutoLayout>
      </AutoLayout>

      <AutoLayout direction="vertical" verticalAlignItems="center" spacing={8} width="hug-contents" fill={backColor} padding={16} cornerRadius={8} maxWidth={512} height="hug-contents" maxHeight={512}>
        {apcaContrastFontLookup().map((x) => <Text key={x[0]} fontSize={x[1]} fill={frontColor} fontWeight={x[0] as WidgetJSX.FontWeight}>{x[0]}/{x[1]}px</Text>)}
      </AutoLayout>
    </AutoLayout>
  )
}

widget.register(Widget);
