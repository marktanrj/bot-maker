import React, { ReactElement, useEffect, useState } from "react";
import TextBlockSettings from "./TextBlockSettings";
import PhotoBlockSettings from "./PhotoBlockSettings";

interface Props {
  node: any;
}

export default function ContentBlockSettingsSelector({ node }: Props): ReactElement {
  const [contentType, setContentType] = useState<string>("");

  useEffect(() => {
    if (node && node.content) setContentType(node.content.type);
  }, [node]);

  if (contentType === "text") {
    return <TextBlockSettings node={node} />;
  } else if (contentType === "photo") {
    return <PhotoBlockSettings node={node} />;
  }
  return <div />;
}

export const blockOptionValues = [
  {
    value: "text",
    name: "Send Text",
  },
  {
    value: "photo",
    name: "Send Photo",
  },
];

export const defaultBlockValues: any = {
  text: {
    type: "text",
    settings: {
      text: "Text",
    },
  },
  photo: {
    type: "photo",
    settings: {
      url: "",
      caption: "",
    },
  },
};
