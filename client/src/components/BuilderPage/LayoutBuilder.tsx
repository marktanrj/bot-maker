import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { updateAllPage } from "../../store/slices/builderSlice";
import { RootState } from "../../store/store";
import TextBlock from "./ContentBlocks/TextBlock";

function BlockSelector({ contentItem }: { contentItem: { [x: string]: any } }): ReactElement {
  if (contentItem.type === "text") {
    return <TextBlock data={contentItem} />;
  }
  return <React.Fragment />;
}

export default function LayoutBuilder(): ReactElement {
  const dispatch = useDispatch();

  const selectedPageId = useSelector((state: RootState) => state.builderReducer.selectedPageId);
  const builderData = useSelector((state: RootState) => state.builderReducer.builderData);

  const [botContent, setBotContent] = useState<any>("");

  useEffect(() => {
    if (builderData && selectedPageId) {
      const content = builderData.filter((item) => item.id === selectedPageId)[0];
      setBotContent(content);
      console.log(content);
    }
  }, [builderData, selectedPageId]);

  const [selectedContentType, setSelectedContentType] = useState("text");
  const onContentTypeInsert = () => {
    const items = _.cloneDeep(builderData);
    items.forEach((item) => {
      if (item.id === selectedPageId) {
        if (selectedContentType === "text") {
          item.content.push({
            type: "text",
            settings: {
              text: "Text",
            },
          });
        } else if (selectedContentType === "command") {
          item.content.push({
            type: "command",
            settings: {},
          });
        }
      }
      return item;
    });

    dispatch(updateAllPage(items));
  };

  return (
    <React.Fragment>
      <div>Invokers</div>
      <hr className="my-3" />
      <div>Bot Content</div>
      <div className="rounded-md bg-indigo-200 p-2">
        {botContent &&
          botContent.content &&
          botContent.content.length > 0 &&
          botContent.content.map((contentItem: any, index: number) => {
            return <BlockSelector contentItem={contentItem} key={index} />;
          })}
        <div className="grid grid-cols-3">
          <select className="col-span-2 rounded-md p-1" onChange={(e) => setSelectedContentType(e.target.value)}>
            <option value="text">Text</option>
            <option value="command">Command</option>
          </select>
          <button className="col-span-1 rounded-md p-1 mx-2 bg-red-300 hover:bg-red-700" onClick={() => onContentTypeInsert()}>
            Insert
          </button>
        </div>
      </div>
      <button className="rounded-md p-1 my-1 bg-purple-300 hover:bg-red-700 w-full">Add Button</button>
    </React.Fragment>
  );
}
