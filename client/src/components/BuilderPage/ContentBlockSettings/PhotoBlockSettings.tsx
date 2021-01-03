import React, { ReactElement } from "react";

interface Props {}

export default function PhotoBlockSettings({}: Props): ReactElement {
  return (
    <div>
      <p className="font-semibold">Send Photo Options</p>
      Photo URL
      <input type="text" className="w-full rounded-md p-2" />
      Caption
      <input type="text" className="w-full rounded-md p-2" />
    </div>
  );
}
