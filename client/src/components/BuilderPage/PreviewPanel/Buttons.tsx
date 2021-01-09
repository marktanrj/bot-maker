import React, { ReactElement, useEffect, useState } from "react";

interface Props {
  node: any;
}

export default function Buttons({ node }: Props): ReactElement {
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    if (node) setButtons(node.buttons);
  }, [node]);

  return (
    <React.Fragment>
      {buttons &&
        buttons.length > 0 &&
        buttons.map((item: any, index: number) => {
          return (
            <button key={item.id} className="rounded-md text-white font-semibold bg-gray-600 w-full p-2 mt-2">
              {item.displayName ? item.displayName : "Untitled"}
            </button>
          );
        })}
    </React.Fragment>
  );
}
