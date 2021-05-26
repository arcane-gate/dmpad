import * as THREE from "three";

class AsciiEffect {
  constructor(renderer, charSet = " .:-=+*#%@", options = {}) {
    // ' .,:;=|iI+hHOE#`$';
    // darker bolder character set from https://github.com/saw/Canvas-ASCII-Art/
    // ' .\'`^",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$'.split('');

    // Some ASCII settings

    const bResolution = !options["resolution"] ? 0.15 : options["resolution"]; // Higher for more details
    const iScale = !options["scale"] ? 1 : options["scale"];
    const bColor = !options["color"] ? false : options["color"]; // nice but slows down rendering!
    const bAlpha = !options["alpha"] ? false : options["alpha"]; // Transparency
    const bBlock = !options["block"] ? false : options["block"]; // blocked characters. like good O dos
    const bInvert = !options["invert"] ? false : options["invert"]; // black is white, white is black

    const strResolution = "high";

    let width, height;

    const domElement = document.createElement("div");
    domElement.style.cursor = "default";

    const oAscii = document.createElement("table");
    domElement.appendChild(oAscii);

    let iWidth, iHeight;
    let oImg;

    this.setSize = function (w, h) {
      width = w;
      height = h;

      renderer.setSize(w, h);

      initAsciiSize();
    };

    this.render = function (scene, camera) {
      renderer.render(scene, camera);
      asciifyImage(renderer, oAscii);
    };

    this.domElement = domElement;

    // Throw in ascii library from http://www.nihilogic.dk/labs/jsascii/jsascii.js

    /*
     * jsAscii 0.1
     * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
     * MIT License [http://www.nihilogic.dk/licenses/mit-license.txt]
     */

    function initAsciiSize() {
      iWidth = Math.round(width * fResolution);
      iHeight = Math.round(height * fResolution);

      oCanvas.width = iWidth;
      oCanvas.height = iHeight;
      // oCanvas.style.display = "none";
      // oCanvas.style.width = iWidth;
      // oCanvas.style.height = iHeight;

      oImg = renderer.domElement;

      if (oImg.style.backgroundColor) {
        oAscii.rows[0].cells[0].style.backgroundColor =
          oImg.style.backgroundColor;
        oAscii.rows[0].cells[0].style.color = oImg.style.color;
      }

      oAscii.cellSpacing = 0;
      oAscii.cellPadding = 0;

      const oStyle = oAscii.style;
      oStyle.display = "inline";
      oStyle.width = Math.round((iWidth / fResolution) * iScale) + "px";
      oStyle.height = Math.round((iHeight / fResolution) * iScale) + "px";
      oStyle.whiteSpace = "pre";
      oStyle.margin = "0px";
      oStyle.padding = "0px";
      oStyle.letterSpacing = fLetterSpacing + "px";
      oStyle.fontFamily = strFont;
      oStyle.fontSize = fFontSize + "px";
      oStyle.lineHeight = fLineHeight + "px";
      oStyle.textAlign = "left";
      oStyle.textDecoration = "none";
    }

    const aDefaultCharList = " .,:;i1tfLCG08@".split("");
    const aDefaultColorCharList = " CGO08@".split("");
    const strFont = "courier new, monospace";

    const oCanvasImg = renderer.domElement;

    const oCanvas = document.createElement("canvas");
    if (!oCanvas.getContext) {
      return;
    }

    const oCtx = oCanvas.getContext("2d");
    if (!oCtx.getImageData) {
      return;
    }

    let aCharList = bColor ? aDefaultColorCharList : aDefaultCharList;

    if (charSet) aCharList = charSet;

    let fResolution = 0.5;

    switch (strResolution) {
      case "low":
        fResolution = 0.25;
        break;
      case "medium":
        fResolution = 0.5;
        break;
      case "high":
        fResolution = 1;
        break;
    }

    if (bResolution) fResolution = bResolution;

    // Setup dom

    const fFontSize = (2 / fResolution) * iScale;
    const fLineHeight = (2 / fResolution) * iScale;

    // adjust letter-spacing for all combinations of scale and resolution to get it to fit the image width.

    let fLetterSpacing = 0;

    if (strResolution == "low") {
      switch (iScale) {
        case 1:
          fLetterSpacing = -1;
          break;
        case 2:
        case 3:
          fLetterSpacing = -2.1;
          break;
        case 4:
          fLetterSpacing = -3.1;
          break;
        case 5:
          fLetterSpacing = -4.15;
          break;
      }
    }

    if (strResolution == "medium") {
      switch (iScale) {
        case 1:
          fLetterSpacing = 0;
          break;
        case 2:
          fLetterSpacing = -1;
          break;
        case 3:
          fLetterSpacing = -1.04;
          break;
        case 4:
        case 5:
          fLetterSpacing = -2.1;
          break;
      }
    }

    if (strResolution == "high") {
      switch (iScale) {
        case 1:
        case 2:
          fLetterSpacing = 0;
          break;
        case 3:
        case 4:
        case 5:
          fLetterSpacing = -1;
          break;
      }
    }

    // can't get a span or div to flow like an img element, but a table works?

    // convert img element to ascii

    function asciifyImage(canvasRenderer, oAscii) {
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

          iCharIdx = Math.floor((1 - fBrightness) * (aCharList.length - 1));

          if (bInvert) {
            iCharIdx = aCharList.length - iCharIdx - 1;
          }

          // good for debugging
          //fBrightness = Math.floor(fBrightness * 10);
          //strThisChar = fBrightness;

          let strThisChar = aCharList[iCharIdx];

          if (strThisChar === undefined || strThisChar == " ")
            strThisChar = "&nbsp;";

          if (bColor) {
            strChars +=
              "<span style='" +
              "color:rgb(" +
              iRed +
              "," +
              iGreen +
              "," +
              iBlue +
              ");" +
              (bBlock
                ? "background-color:rgb(" +
                  iRed +
                  "," +
                  iGreen +
                  "," +
                  iBlue +
                  ");"
                : "") +
              (bAlpha ? "opacity:" + iAlpha / 255 + ";" : "") +
              "'>" +
              strThisChar +
              "</span>";
          } else {
            strChars += strThisChar;
          }
        }

        strChars += "<br/>";
      }

      oAscii.innerHTML = "<tr><td>" + strChars + "</td></tr>";

      // console.timeEnd('rendering');

      // return oAscii;
    }
  }
}

const D10 = (radius) => {
  const sides = 10;
  const vertices = [
    [0, 0, 1],
    [0, 0, -1],
  ].flat();

  for (let i = 0; i < sides; ++i) {
    const b = (i * Math.PI * 2) / sides;
    vertices.push(-Math.cos(b), -Math.sin(b), 0.105 * (i % 2 ? 1 : -1));
  }

  const faces = [
    [0, 2, 3],
    [0, 3, 4],
    [0, 4, 5],
    [0, 5, 6],
    [0, 6, 7],
    [0, 7, 8],
    [0, 8, 9],
    [0, 9, 10],
    [0, 10, 11],
    [0, 11, 2],
    [1, 3, 2],
    [1, 4, 3],
    [1, 5, 4],
    [1, 6, 5],
    [1, 7, 6],
    [1, 8, 7],
    [1, 9, 8],
    [1, 10, 9],
    [1, 11, 10],
    [1, 2, 11],
  ].flat();
  const args = [vertices, faces, radius, 0];
  return new THREE.PolyhedronGeometry(...args);
};

let camera, controls, scene, renderer, effect, die, start;

const dice = {
  d20: (size = 200) => new THREE.IcosahedronGeometry(size, 0),
  d10: (size = 200) => D10(size),
  d100: (size = 200) => D10(size),
  d6: (size = 200) =>
    new THREE.BoxGeometry(size * 1.25, size * 1.25, size * 1.25),
  d8: (size = 200) => new THREE.OctahedronGeometry(size, 0),
  d4: (size = 200) => new THREE.TetrahedronGeometry(size, 0),
};

function init(element, dieType = "d20") {
  const size = 100;
  const width = size;
  const height = size;
  camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
  camera.position.y = size + size / 3;
  camera.position.z = size * 2;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(255, 255, 255);

  const pointLight1 = new THREE.PointLight(0xffffff, 0.25);
  pointLight1.position.set(size + 150, size + 150, size + 150);
  pointLight1.castShadow = true;
  pointLight1.shadow.mapSize.width = 512; // default
  pointLight1.shadow.mapSize.height = 512; // default
  pointLight1.shadow.camera.near = 0.5; // default
  pointLight1.shadow.camera.far = 500; // default

  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xffffff, 0.25);
  pointLight2.position.set(
    -1 * (size + 150),
    -1 * (size + 150),
    -1 * (size + 150)
  );
  scene.add(pointLight2);

  const dieFunc = dice[dieType] ? dice[dieType] : dice["d20"];

  die = new THREE.Mesh(
    dieFunc(size - size / 10),
    new THREE.MeshPhongMaterial()
  );
  die.castShadow = true;
  scene.add(die);

  const geometry = new THREE.PlaneGeometry(size, size);
  const material = new THREE.ShadowMaterial();
  const plane = new THREE.Mesh(geometry, material);
  plane.position.y = 0;
  plane.receiveShadow = true;
  scene.add(plane);

  renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(width, height);

  effect = new AsciiEffect(renderer, " .:H#░▒▓█", {
    resolution: 0.25,
  });
  effect.setSize(width, height);
  effect.domElement.style.color = "black";
  element.innerHTML = "";
  element.appendChild(effect.domElement);
  start = Date.now();
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  const timer = Date.now() - start;

  die.position.y = Math.abs(Math.sin(timer * 0.002)) * 150 + 100;
  die.rotation.x = timer * 0.003;
  die.rotation.z = timer * 0.002;

  effect.render(scene, camera);
}

export default init;
