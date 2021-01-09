import React, { ReactElement } from "react";

interface Props {
  invokerData: any;
  onInputChange: Function;
  invokerIndex: number;
}

export default function TextBlock({ invokerData, onInputChange, invokerIndex }: Props): ReactElement {
  return (
    <React.Fragment>
      <input
        type="text"
        value={invokerData.text}
        onChange={(e) => onInputChange({ command: e.target.value }, invokerIndex)}
        className="col-span-7 p-1 rounded-md"
      />
    </React.Fragment>
  );
}
