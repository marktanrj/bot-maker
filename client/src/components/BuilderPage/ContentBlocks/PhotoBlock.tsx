import React, { ReactElement, useEffect, useState } from "react";

export default function PhotoBlock({ node }: { node: any }): ReactElement {
  const hasImage = node && node.content && node.content.settings && node.content.settings.url;
  const hasCaption = node && node.content && node.content.settings && node.content.settings.caption;

  const [caption, setCaption] = useState<JSX.Element | undefined>(undefined);

  useEffect(() => {
    if (hasCaption) {
      const splitTextWithBreakLines = node.content.settings.caption.split("\n").map((caption: string, index: number) => {
        return <div key={index}>{caption === "" ? <br /> : caption}</div>;
      });
      setCaption(splitTextWithBreakLines);
    }
  }, [node]);

  return (
    <div>
      <div className={hasImage ? "" : "p-3"}>
        {hasImage && <img className={`rounded-t-lg ${hasCaption ? "" : "rounded-r-lg"}`} src={node.content.settings.url} />}
      </div>
      <div className={hasCaption ? "p-2" : ""}>{hasCaption && caption}</div>
    </div>
  );
}
