import { Base64 } from "js-base64";

namespace rgblind {
  const svgTemplate = (
    backColor: string,
    frontColor: string,
    filterName: string
  ): string => `<g filter="url(#${filterName})">
    <rect width="128" height="128" rx="64" fill="${backColor}"/>
    <rect x="32" y="32" width="64" height="64" rx="32" fill="${frontColor}"/>
</g>`;

  export const svgToBase64 = (svgSource: string): string => {
    const decoded = decodeURI(encodeURIComponent(svgSource));

    return `data:image/svg+xml;base64,${Base64.encode(decoded)}`;
  };

  export const svgDataUrl = (svgSource: string): string => {
    return `data:image/svg+xml;charset=UTF-8,${svgSource}`;
  };

  export const protanopia = (
    backColor: string,
    frontColor: string
  ): string => `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="128" height="128" viewBox="0 0 128 128" fill="none">
  ${svgTemplate(backColor, frontColor, "filter_protanopia")}
  <defs>
    <filter id="filter_protanopia" x="0" y="0" width="128" height="128" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feColorMatrix type="matrix"
        values="0.1135	0.8905	-0.0019	0	-0.0021
                0.1130	0.8865	0.0002	0		0.0003
                0.0017	-0.0017	1		0		0
                0 		0 		0 		1 		0"/>
    </filter>
    </defs>
</svg>`;

  export const deuteranopia = (
    backColor: string,
    frontColor: string
  ): string => `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="128" height="128" viewBox="0 0 128 128" fill="none">
  ${svgTemplate(backColor, frontColor, "filter_deuteranopia")}
  <defs>
    <filter id="filter_deuteranopia" x="0" y="0" width="128" height="128" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feColorMatrix type="matrix"
        values="0.2936	0.7096	-0.0015	0		-0.0017
                0.2923	0.7064	0.0006	0		0.0007
                -0.0231	0.0232	0.9999	0		0
                0 		0 		0 		1 		0
            "/>
    </filter>
    </defs>
</svg>`;

  export const tritanopia = (
    backColor: string,
    frontColor: string
  ): string => `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="128" height="128" viewBox="0 0 128 128" fill="none">
  ${svgTemplate(backColor, frontColor, "filter_tritanopia")}
  <defs>
    <filter id="filter_tritanopia" x="0" y="0" width="128" height="128" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feColorMatrix type="matrix"
        values="0.95 	0.05 	0 		0 		0
                0 		0.433	0.567	0		0
                0		0.475	0.525	0		0
                0		0		0		1		0
            "/>
    </filter>
    </defs>
</svg>`;
}

export default rgblind;
