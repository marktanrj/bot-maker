import React, { ReactElement } from "react";

export default function TextBlock({ data }: { data: any }): ReactElement {
  return (
    <div>
      <div>{data.settings.text}</div>
    </div>
  );
}
