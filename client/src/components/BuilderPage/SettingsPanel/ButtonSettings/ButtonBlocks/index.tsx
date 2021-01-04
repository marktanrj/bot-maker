import React, { ReactElement, useEffect, useState } from "react";

interface Props {
  node: any;
  updateFunctions: any;
}

export default function ButtonBlocksSelector({ node, updateFunctions }: Props): ReactElement {
  // const [buttonType, setButtonType] = useState<string>("");

  // useEffect(() => {
  //   if (node && node.buttons && node.buttons.type) setButtonType(node.buttons.type);
  // }, [node]);

  // if (buttonType === "text") {
  //   return <WebsiteBlock node={node} />;
  // }
  // else if (buttonType === "photo") {
  //   return <PhotoBlockSettings node={node} />;
  // }
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
