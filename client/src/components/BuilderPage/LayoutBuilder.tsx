import React, { ReactElement, ReactNode, useEffect, useState, useCallback, MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { updateAllPage } from "../../store/slices/builderSlice";
import { RootState } from "../../store/store";
import ContentBlockSettingsSelector, { blockOptionValues, defaultBlockValues } from "./ContentBlockSettings";

export default function LayoutBuilder(): ReactElement {
  const dispatch = useDispatch();

  const selectedPageId = useSelector((state: RootState) => state.builderReducer.selectedPageId);
  const builderData = useSelector((state: RootState) => state.builderReducer.builderData);

  const [selectedContentType, setSelectedContentType] = useState(blockOptionValues[0].value);

  useEffect(() => {
    if (builderData && selectedPageId) {
      const data = builderData.filter((item) => item.id === selectedPageId)[0];
      setSelectedContentType(data.content.type);
    }
  }, [selectedPageId]);

  const onContentTypeChange = (e: any) => {
    const contentType = e.target.value;
    setSelectedContentType(contentType);

    const items = _.cloneDeep(builderData);
    items.forEach((item) => {
      if (item.id === selectedPageId) {
        item.content = defaultBlockValues[contentType];
      }
      return item;
    });

    dispatch(updateAllPage(items));
  };

  return (
    <div className="grid">
      <h3 className="text-xl p-1">Settings</h3>

      <p className="place-self-center font-bold">Invokers</p>
      <hr className="my-3 border-4" />

      <p className="place-self-center font-bold">Message</p>
      <div>
        <p>Content Type</p>
        <select className="w-full rounded-md p-2" value={selectedContentType} onChange={onContentTypeChange}>
          {blockOptionValues.map((item) => {
            return (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            );
          })}
        </select>
        <hr className="my-3" />
        <div className="p-1">
          <ContentBlockSettingsSelector contentType={selectedContentType} />
        </div>
      </div>

      <hr className="my-3 border-4" />

      <p className="place-self-center font-bold">Button(s)</p>
      <button className="rounded-md p-1 my-1 bg-purple-300 hover:bg-red-700 w-full">Add Button</button>
    </div>
  );
}
