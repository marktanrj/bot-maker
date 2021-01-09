import React, { ReactElement, ReactNode, useEffect, useState, useCallback, MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import ContentBlockSettingsSelector, { blockOptionValues } from "./ContentBlockSettings";
import { RootState } from "../../../../store/store";
import { updateAllPage } from "../../../../store/slices/builderSlice";
import { defaultMessageBlocks } from "../../../../defaultvalues/defaultvalues";

interface Props {}

export default function ContentSettings({}: Props): ReactElement {
  const dispatch = useDispatch();
  const [node, setNode] = useState<any>(undefined);

  const selectedPageId = useSelector((state: RootState) => state.builderReducer.selectedPageId);
  const builderData = useSelector((state: RootState) => state.builderReducer.builderData);

  useEffect(() => {
    if (builderData && selectedPageId) {
      const data = builderData.filter((item) => item.id === selectedPageId)[0];
      setNode(data);
      setSelectedContentType(data.content.type);
    }
  }, [builderData, selectedPageId]);

  const [selectedContentType, setSelectedContentType] = useState(blockOptionValues[0].value);

  const onContentTypeChange = (e: any) => {
    const contentType = e.target.value;
    setSelectedContentType(contentType);
    const items = _.cloneDeep(builderData);
    items.forEach((item) => {
      if (item.id === selectedPageId) {
        item.content = defaultMessageBlocks[contentType];
      }
      return item;
    });
    dispatch(updateAllPage(items));
  };

  return (
    <React.Fragment>
      <p className="place-self-center font-bold">Content</p>
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
          <ContentBlockSettingsSelector node={node} />
        </div>
      </div>
    </React.Fragment>
  );
}
