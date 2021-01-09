import JSZip from "jszip";
import fs from "fs";

import { NodeType } from "../../types";

import { startCode } from "../codesnippets/startCode";
import { packageJsonText } from "../codesnippets/packageJson";
import { endCode } from "../codesnippets/endCode";
import { dotenvText } from "../codesnippets/dotenv";

import { buildContent } from "./contentManager";
import { buildInvoker } from "./invokerManager";

export default (botData: NodeType[]): any => {
  const zip = new JSZip();

  zip.file(`.env`, dotenvText);
  zip.file(`package.json`, packageJsonText);

  let mainCode = ``;
  mainCode += startCode;

  let importsCode = ``;
  let bodyCode = ``;

  botData.forEach((page: NodeType) => {
    const nameOfFunction = page.name.split(" ").join("_");

    //build content
    const contentData = page.content;
    const contentFunctionText = buildContent({ contentData, nameOfFunction });
    zip.file(`src/${nameOfFunction}.js`, contentFunctionText);

    //add imports
    importsCode += `\nconst {${nameOfFunction}} = require("./src/${nameOfFunction}");\n`;

    //build invokers
    const invokersData = page.invokers;
    const invokersText = buildInvoker({ invokersData, nameOfFunction });
    bodyCode += invokersText;
  });

  mainCode += importsCode;
  mainCode += bodyCode;
  mainCode += endCode;

  zip.file(`index.js`, mainCode);

  zip
    .generateNodeStream({ type: "nodebuffer", streamFiles: true })
    .pipe(fs.createWriteStream("out.zip"))
    .on("finish", function () {
      console.log("out.zip written.");
    });
};
