import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function LayoutBuilder(): ReactElement {
  const selectedPageId = useSelector((state: RootState) => state.builderReducer.selectedPageId);

  return (
    <div>
      <div>{selectedPageId}</div>
    </div>
  );
}
