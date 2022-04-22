import * as THREE from 'three';

type AsciiEffectOptions = {
  resolution?: number;
  scale?: number;
  color?: boolean;
  alpha?: boolean;
  block?: boolean;
  invert?: boolean;
}

export default class AsciiEffect {
    width: number = 200;
    height: number = 200;
    bResolution: number = 0.15;
    iScale: number = 1;
    bColor: boolean = false;
    bAlpha: boolean = false;
    bBlock: boolean = false;
    bInvert: boolean = false;
    oAscii: HTMLTableElement = document.createElement("table");
    domElement: HTMLDivElement = document.createElement("div");
    oCanvas: HTMLCanvasElement = document.createElement("canvas");
    strResolution: "low" | "medium" | "high" = "high";

    fLetterSpacing: number = 0;

    aCharList: string[] = " .:-=+*#%@".split("");

    fResolution: number = 0.5;

    renderer: THREE.WebGLRenderer | null = null;
    constructor(renderer: THREE.WebGLRenderer, charSet?: string, options: AsciiEffectOptions = {}) {
      this.renderer = renderer;

      this.parseOptions(options);
  
      const {strResolution} = this;

      this.domElement.style.cursor = "default";
      this.domElement.appendChild(this.oAscii);
  
      const aDefaultCharList = " .,:;i1tfLCG08@".split("");
      const aDefaultColorCharList = " CGO08@".split("");
  
      this.aCharList = this.bColor ? aDefaultColorCharList : aDefaultCharList;
  
      if (charSet) this.aCharList = charSet.split("");
  
      switch (strResolution) {
        case "low":
          this.fResolution = 0.25;
          break;
        case "medium":
          this.fResolution = 0.5;
          break;
        case "high":
          this.fResolution = 1;
          break;
      }
  
      if (this.bResolution) this.fResolution = this.bResolution;
  
      // adjust letter-spacing for all combinations of scale and resolution to get it to fit the image width.
  
      if (strResolution == "low") {
        switch (this.iScale) {
          case 1:
            this.fLetterSpacing = -1;
            break;
          case 2:
          case 3:
            this.fLetterSpacing = -2.1;
            break;
          case 4:
            this.fLetterSpacing = -3.1;
            break;
          case 5:
            this.fLetterSpacing = -4.15;
            break;
        }
      }
  
      if (strResolution == "medium") {
        switch (this.iScale) {
          case 1:
            this.fLetterSpacing = 0;
            break;
          case 2:
            this.fLetterSpacing = -1;
            break;
          case 3:
            this.fLetterSpacing = -1.04;
            break;
          case 4:
          case 5:
            this.fLetterSpacing = -2.1;
            break;
        }
      }
  
      if (strResolution == "high") {
        switch (this.iScale) {
          case 1:
          case 2:
            this.fLetterSpacing = 0;
            break;
          case 3:
          case 4:
          case 5:
            this.fLetterSpacing = -1;
            break;
        }
      }
    }
    parseOptions = (options: AsciiEffectOptions) => {
      this.bResolution = !options["resolution"] ? 0.15 : options["resolution"]; // Higher for more details
      this.iScale = !options["scale"] ? 1 : options["scale"];
      this.bColor = !options["color"] ? false : options["color"]; // nice but slows down rendering!
      this.bAlpha = !options["alpha"] ? false : options["alpha"]; // Transparency
      this.bBlock = !options["block"] ? false : options["block"]; // blocked characters. like good O dos
      this.bInvert = !options["invert"] ? false : options["invert"]; // black is white, white is black
    }

    setSize = (w: number, h: number) => {
      this.width = w;
      this.height = h;

      this.renderer.setSize(w, h);

      this.initAsciiSize();
    };

    // Throw in ascii library from http://www.nihilogic.dk/labs/jsascii/jsascii.js
  
      /*
       * jsAscii 0.1
       * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
       * MIT License [http://www.nihilogic.dk/licenses/mit-license.txt]
       */
  
      initAsciiSize = () => {
        const iWidth = Math.round(this.width * this.fResolution);
        const iHeight = Math.round(this.height * this.fResolution);
        const fFontSize = (2 / this.fResolution) * this.iScale;
        const fLineHeight = (2 / this.fResolution) * this.iScale;
        const strFont = "courier new, monospace";
  
        this.oCanvas.width = iWidth;
        this.oCanvas.height = iHeight;
        // oCanvas.style.display = "none";
        // oCanvas.style.width = iWidth;
        // oCanvas.style.height = iHeight;
  
        const oImg = this.renderer?.domElement;
        if(!oImg) return;
  
        if (oImg.style.backgroundColor) {
          this.oAscii.rows[0].cells[0].style.backgroundColor =
            oImg.style.backgroundColor;
          this.oAscii.rows[0].cells[0].style.color = oImg.style.color;
        }
  
        this.oAscii.cellSpacing = "0";
        this.oAscii.cellPadding = "0";
  
        const oStyle = this.oAscii.style;
        oStyle.display = "inline";
        oStyle.width = Math.round((iWidth / this.fResolution) * this.iScale) + "px";
        oStyle.height = Math.round((iHeight / this.fResolution) * this.iScale) + "px";
        oStyle.whiteSpace = "pre";
        oStyle.margin = "0px";
        oStyle.padding = "0px";
        oStyle.letterSpacing = this.fLetterSpacing + "px";
        oStyle.fontFamily = strFont;
        oStyle.fontSize = fFontSize + "px";
        oStyle.lineHeight = fLineHeight + "px";
        oStyle.textAlign = "left";
        oStyle.textDecoration = "none";
      }

      asciifyImage = () => {
        const iWidth = Math.round(this.width * this.fResolution);
        const iHeight = Math.round(this.height * this.fResolution);
        const oCtx = this.oCanvas.getContext("2d");
        const oCanvasImg = this.renderer?.domElement;
        if(!oCtx || !oCanvasImg) return;
        oCtx.clearRect(0, 0, iWidth, iHeight);
        oCtx.drawImage(oCanvasImg, 0, 0, iWidth, iHeight);
        const oImgData = oCtx.getImageData(0, 0, iWidth, iHeight).data;
  
        // Coloring loop starts now
        let strChars = "";
  
        // console.time('rendering');
  
        for (let y = 0; y < iHeight; y += 2) {
          for (let x = 0; x < iWidth; x++) {
            const iOffset = (y * iWidth + x) * 4;
  
            const iRed = oImgData[iOffset];
            const iGreen = oImgData[iOffset + 1];
            const iBlue = oImgData[iOffset + 2];
            const iAlpha = oImgData[iOffset + 3];
            let iCharIdx;
  
            let fBrightness;
  
            fBrightness = (0.3 * iRed + 0.59 * iGreen + 0.11 * iBlue) / 255;
            // fBrightness = (0.3*iRed + 0.5*iGreen + 0.3*iBlue) / 255;
  
            if (iAlpha == 0) {
              // should calculate alpha instead, but quick hack :)
              //fBrightness *= (iAlpha / 255);
              fBrightness = 1;
            }
  
            iCharIdx = Math.floor((1 - fBrightness) * (this.aCharList.length - 1));
  
            if (this.bInvert) {
              iCharIdx = this.aCharList.length - iCharIdx - 1;
            }
  
            // good for debugging
            //fBrightness = Math.floor(fBrightness * 10);
            //strThisChar = fBrightness;
  
            let strThisChar = this.aCharList[iCharIdx];
  
            if (strThisChar === undefined || strThisChar == " ")
              strThisChar = "&nbsp;";
  
            if (this.bColor) {
              strChars +=
                "<span style='" +
                "color:rgb(" +
                iRed +
                "," +
                iGreen +
                "," +
                iBlue +
                ");" +
                (this.bBlock
                  ? "background-color:rgb(" +
                    iRed +
                    "," +
                    iGreen +
                    "," +
                    iBlue +
                    ");"
                  : "") +
                (this.bAlpha ? "opacity:" + iAlpha / 255 + ";" : "") +
                "'>" +
                strThisChar +
                "</span>";
            } else {
              strChars += strThisChar;
            }
          }
  
          strChars += "<br/>";
        }
  
        this.oAscii.innerHTML = "<tr><td>" + strChars + "</td></tr>";
      }

    render = (scene: THREE.Scene, camera: THREE.Camera) => {
      if(this.renderer) {
        this.renderer.render(scene, camera);
        this.asciifyImage();
      }
    };

  }