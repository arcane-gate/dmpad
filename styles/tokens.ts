import { createGlobalStyle } from "styled-components";
const bodyFontFamily = `'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont`;

/*
 * #befcdf,
 * #4edda6,
 * #42bf8f,#349b74,#287b5b,#1d6046,#092d20,#faebed,#efb7bd,#ea929c,#e45d72,#c33b54,#992d40,#4c111c,#eeedff,#c3beff,#a89fff,#8677fe,#674dfe,#4b12fe,#210086,#f0eef3,#cbc0db,#b7a2d0,#9f7ac8,#7c6297,#5f4e72,#2a2531,#efeff1,#c6c4cc,#aba9b6,#8c889b,#706984,#5a5071,#2e1d4d,#f6f0c2,#eaca2a,#c3aa33,#9c8a34,#7a6d31,#5e552b,#2b2718 */
/**/

/* Colors */

type Colors = Record<string, string>;

const makeColors = (name: string, h: number, s: number, l: number): Colors => {
  const colors: Colors = {};
  for (let a = 10; a <= 100; a += 10) {
    colors[`${name}-${a}`] = `hsla(${h}, ${s}%, ${l}%, ${a / 100})`;
  }
  return colors;
}

export const white = "#fff";
export const lightGray = "#fcfafc";
export const gray = '#c1c1c1';
export const black = '#222';
export const blues = makeColors('blue', 269, 99, 46);

/* Borders */

export const mainBorder = "1px solid #efeff1";

/* Shadows */

export const depth1 = "1px 4px 16px rgba(0,0,0,0.16)";

const variables = {
  bodyFontFamily,
  editorFontFamily: bodyFontFamily,

  white,
  lightGray,
  gray,
  black,
  ...blues,

  mainBorder,

  depth1,
};

const RootCSS = createGlobalStyle`
  :root {
      ${Object.entries(variables)
    .map(([key, value]) => `--${key}: ${value};`)
    .join("\n")}
  }
`;

export default RootCSS;
