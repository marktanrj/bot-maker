import React, { ReactElement, useEffect, useState } from "react";
import TextBlock from "./TextBlock";

interface Props {
  node: any;
}

export default function ContentBlockSelector({ node }: Props): ReactElement {
  const [contentType, setContentType] = useState<string>("");

  useEffect(() => {
    if (node && node.content) setContentType(node.content.type);
  }, [node]);

  if (contentType === "text") {
    return <TextBlock node={node} />;
  }
  return <div />;
}
