import { NodeType } from "../../types";

export const mapPageIdToFunction = (botData: NodeType[]) => {
  const pageIdMapper: { [id: string]: string } = {};
  const usedFunctionNames: string[] = [];

  botData.forEach((page: NodeType) => {
    const defaultName = page.name.split(" ").join("_");
    let nameOfFunction = defaultName;
    if (usedFunctionNames.includes(nameOfFunction)) {
      let num = 1;
      do {
        nameOfFunction = `${defaultName}${num}`;
        num += 1;
      } while (usedFunctionNames.includes(nameOfFunction));
    }
    pageIdMapper[page.id] = nameOfFunction;
    usedFunctionNames.push(nameOfFunction);
  });

  return pageIdMapper;
};
