import React, { ReactElement, useEffect, useState } from "react";

interface Props {
  node: any;
}

export default function InvokerBlocks({ node }: Props): ReactElement {
  const [contentType, setContentType] = useState<string>("");

  useEffect(() => {
    if (node && node.content) setContentType(node.content.type);
  }, [node]);

  // if (contentType === "text") {
  //   return <TextBlockSettings node={node} />;
  // } else if (contentType === "photo") {
  //   return <PhotoBlockSettings node={node} />;
  // }
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
