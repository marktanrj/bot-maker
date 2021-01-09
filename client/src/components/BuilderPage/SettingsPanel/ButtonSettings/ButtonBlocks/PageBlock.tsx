import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";

interface Props {
  buttonData: any;
  onSettingsChange: Function;
}

export default function PageBlock({ buttonData, onSettingsChange }: Props): ReactElement {
  const builderData = useSelector((state: RootState) => state.builderReducer.builderData);

  return (
    <select
      value={buttonData.settings.pageId}
      onChange={(e) => onSettingsChange({ pageId: e.target.value }, buttonData.id)}
      className="col-span-10 p-1 rounded-md"
    >
      {builderData &&
        builderData.map((pageData) => {
          return (
            <option value={pageData.id} key={pageData.id}>
              {pageData.name}
            </option>
          );
        })}
    </select>
  );
}
