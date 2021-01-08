import JSZip from "jszip";
import { NodeType } from "../../types";
import { startCode } from "../codesnippets/startCode";
import getContentFunction from "./getContentFunction";
import fs from "fs";
import { packageJsonText } from "../codesnippets/packageJson";
import { endCode } from "../codesnippets/endCode";
import { dotenvText } from "../codesnippets/dotenv";

export default (botData: NodeType[]): any => {
  const zip = new JSZip();

  let mainBotCode = ``;
  mainBotCode += startCode;

  let importsCode = ``;
  let bodyCode = ``;

  botData.forEach((page: NodeType) => {
    const contentType = page.content.type;
    const contentFunction = getContentFunction(contentType);

    const nameOfFunction = page.name.split(" ").join("_");
    const settingsObj = page.content.settings;
    const contentFunctionText = contentFunction(nameOfFunction, settingsObj as any);

    zip.file(`controllers/${nameOfFunction}.js`, contentFunctionText);

    importsCode += `const {${nameOfFunction}} = require("./controllers/${nameOfFunction}");\n`;

    const invokers = page.invokers;
    const invokersText = getInvokers(invokers, nameOfFunction);

    bodyCode += invokersText;
  });

  mainBotCode += importsCode;
  mainBotCode += bodyCode;
  mainBotCode += endCode;

  zip.file(`index.js`, mainBotCode);
  zip.file(`package.json`, packageJsonText);
  zip.file(`.env`, dotenvText);

  zip
    .generateNodeStream({ type: "nodebuffer", streamFiles: true })
    .pipe(fs.createWriteStream("out.zip"))
    .on("finish", function () {
      console.log("out.zip written.");
    });
};

function getInvokers(invokers: any, func: any): string {
  const k = invokers.map((item: any) => {
    if (item.type === "command") {
      return `
bot.command(\`/${item.input}\`, ${func});
      `;
    }
  });

  return k.join("\n");
}
