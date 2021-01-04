import React, { ReactElement } from "react";
import TextBlockSettings from "./TextBlockSettings";
import PhotoBlockSettings from "./PhotoBlockSettings";

interface Props {
  contentType: string;
}

export default function ContentBlockSettingsSelector({ contentType }: Props): ReactElement {
  if (contentType === "text") {
    return <TextBlockSettings />;
  } else if (contentType === "photo") {
    return <PhotoBlockSettings />;
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
