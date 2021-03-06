import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../store/store";
import Buttons from "./Buttons";
import ContentBlockSelector from "./ContentBlocks";

export default function PreviewPanel(): ReactElement {
  const [node, setNode] = useState<any>(undefined);

  const selectedPageId = useSelector((state: RootState) => state.builderReducer.selectedPageId);
  const builderData = useSelector((state: RootState) => state.builderReducer.builderData);
  const botName = useSelector((state: RootState) => state.builderReducer.botName);

  useEffect(() => {
    if (builderData && selectedPageId) {
      const data = builderData.filter((item) => item.id === selectedPageId)[0];
      setNode(data);
    }
  }, [builderData, selectedPageId]);

  return (
    <div>
      <h3 className="text-xl p-3">Preview</h3>
      <div className="grid grid-cols-8 gap-3 bg-blue-900 p-3">
        <div className="col-span-1 self-end rounded-full bg-pink-300 h-10 w-10 grid">
          <div className="place-self-center font-semibold">{botName && botName.length > 0 ? botName.toUpperCase().charAt(0) : "B"}</div>
        </div>
        <div className="col-span-7">
          <div className="bg-blue-600 text-white rounded-t-lg rounded-r-lg min-h-32">
            <ContentBlockSelector node={node} />
          </div>
          <Buttons node={node} />
        </div>
      </div>
    </div>
  );
}
