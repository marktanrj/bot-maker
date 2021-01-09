import React, { ReactElement, useEffect, useState } from "react";
import PageBlock from "./PageBlock";
import WebsiteBlock from "./WebsiteBlock";

interface Props {
  buttonData: any;
  onSettingsChange: Function;
}

export default function ButtonBlocksSelector({ buttonData, onSettingsChange }: Props): ReactElement {
  const [buttonType, setButtonType] = useState<string>("");

  useEffect(() => {
    if (buttonData && buttonData.type) setButtonType(buttonData.type);
  }, [buttonData]);

  if (buttonType === "website") {
    return <WebsiteBlock buttonData={buttonData} onSettingsChange={onSettingsChange} />;
  } else if (buttonType === "page") {
    return <PageBlock buttonData={buttonData} onSettingsChange={onSettingsChange} />;
  }
  return <div />;
}

export const blockOptionValues = [
  {
    value: "website",
    name: "Website",
  },
  {
    value: "page",
    name: "Page",
  },
];
