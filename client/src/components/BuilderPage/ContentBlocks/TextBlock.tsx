import React, { ReactElement, useEffect, useState } from "react";

export default function TextBlock({ node }: { node: any }): ReactElement {
  const hasText = node && node.content && node.content.settings && node.content.settings.text;

  const [text, setText] = useState<JSX.Element | undefined>(undefined);

  useEffect(() => {
    if (hasText) {
      const splitTextWithBreakLines = node.content.settings.text.split("\n").map((caption: string, index: number) => {
        return <div key={index}>{caption === "" ? <br /> : caption}</div>;
      });
      setText(splitTextWithBreakLines);
    }
  }, [node]);

  return (
    <div>
      <div className={hasText ? "p-2" : "h-10"}>{hasText && text}</div>
    </div>
  );
}
