import React, { ReactElement, useEffect, useState } from "react";
import TextBlock from "./TextBlock";
import CommandBlock from "./CommandBlock";

interface Props {
  invokerData: any;
  onInputChange: Function;
  invokerIndex: number;
}

export default function InvokerBlocksSelector({ invokerData, onInputChange, invokerIndex }: Props): ReactElement {
  const [invokerType, setInvokerType] = useState<string>("");

  useEffect(() => {
    if (invokerData && invokerData.type) setInvokerType(invokerData.type);
  }, [invokerData]);

  if (invokerType === "text") {
    return <TextBlock invokerData={invokerData} invokerIndex={invokerIndex} onInputChange={onInputChange} />;
  } else if (invokerType === "command") {
    return <CommandBlock invokerData={invokerData} invokerIndex={invokerIndex} onInputChange={onInputChange} />;
  }
  return <div />;
}

export const blockOptionValues = [
  {
    value: "command",
    name: "Command",
  },
  {
    value: "text",
    name: "Text",
  },
];
