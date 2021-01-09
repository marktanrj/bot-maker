import { InvokerType } from "../../types";
import { allInvokerFunctionType, generateCommandInvoker, generateTextInvoker } from "../codesnippets/invokersFunctions";

interface buildInvokerProp {
  invokersData: InvokerType[];
  nameOfFunction: string;
}

export const buildInvoker = ({ invokersData, nameOfFunction }: buildInvokerProp): string => {
  const outputArr = invokersData.map((item: InvokerType) => {
    const invokerType = item.type;
    const settingsObj = item.settings as any;

    const generateInvoker = getInvokerFunction(invokerType);
    const invokerFunctionText = generateInvoker(nameOfFunction, settingsObj);
    return invokerFunctionText;
  });

  const outputText = outputArr.join("\n");
  return outputText;
};

function getInvokerFunction(invokerType: string): allInvokerFunctionType {
  switch (invokerType) {
    case "command":
      return generateCommandInvoker;
    case "text":
      return generateTextInvoker;
  }

  return generateCommandInvoker;
}
