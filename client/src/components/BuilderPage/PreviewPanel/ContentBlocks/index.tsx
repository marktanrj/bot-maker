import React, { ReactElement, useEffect, useState } from "react";
import TextBlock from "./TextBlock";
import PhotoBlock from "./PhotoBlock";

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
  } else if (contentType === "photo") {
    return <PhotoBlock node={node} />;
  }
  return <div />;
}
