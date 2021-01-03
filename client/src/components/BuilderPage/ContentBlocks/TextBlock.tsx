import React, { ReactElement, useEffect } from "react";

export default function TextBlock({ node }: { node: any }): ReactElement {
  return (
    <div>
      <div>{node && node.content && node.content.settings && node.content.settings.text}</div>
    </div>
  );
}
