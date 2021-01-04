import React, { ReactElement, ReactNode, useEffect, useState, useCallback, MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { RootState } from "../../../../store/store";
import { addButton, saveBlockButton, updateAllPage } from "../../../../store/slices/builderSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ButtonBlocksSelector, { blockOptionValues } from "./ButtonBlocks";

interface Props {}

export default function ButtonSettings({}: Props): ReactElement {
  const dispatch = useDispatch();
  const [node, setNode] = useState<any>(undefined);

  const selectedPageId = useSelector((state: RootState) => state.builderReducer.selectedPageId);
  const builderData = useSelector((state: RootState) => state.builderReducer.builderData);

  const [buttons, setButtons] = useState<any>(undefined);

  useEffect(() => {
    if (builderData && selectedPageId) {
      const data = builderData.filter((item) => item.id === selectedPageId)[0];
      setButtons(data.buttons);
      setNode(data);
    }
  }, [builderData, selectedPageId]);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = _.cloneDeep(buttons);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setButtons(items);
    dispatch(saveBlockButton(items));
  }

  const onSelectTypeChange = (newType: string, id: string) => {
    let tempButtons = _.cloneDeep(buttons);
    tempButtons = tempButtons.map((item: any) => {
      if (item.id === id) {
        item = {
          ...item,
          type: newType,
          input: "",
        };
      }
      return item;
    });
    dispatch(saveBlockButton(tempButtons));
  };

  const onAddButton = () => {
    dispatch(addButton());
  };

  const onInputTextChange = (valueObj: { name?: string; url?: string; pageId?: string }, id: string) => {
    let tempButtons = _.cloneDeep(buttons);
    tempButtons = tempButtons.map((item: any) => {
      if (item.id === id) {
        item = {
          ...item,
          ...valueObj,
        };
      }
      return item;
    });
    dispatch(saveBlockButton(tempButtons));
  };

  const onDeleteButton = (index: number) => {
    const items = _.cloneDeep(buttons);
    items.splice(index, 1);
    dispatch(saveBlockButton(items));
  };

  const isUrlValid = (url: string): boolean => {
    const urlRegex = new RegExp(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
    );
    const result = urlRegex.test(url);
    return result;
  };

  return (
    <React.Fragment>
      <p className="place-self-center font-bold">Inline Button(s)</p>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="buttons">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {buttons &&
                buttons.map((buttonData: { id: string; name: string; type: string; pageId: string; url?: string }, index: number) => {
                  return (
                    <Draggable key={buttonData.id} draggableId={buttonData.id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-purple-300 m-1 rounded-md p-2`}
                        >
                          <div className="grid grid-cols-12 grid-rows-2 gap-2">
                            <select
                              value={buttonData.type}
                              onChange={(e) => onSelectTypeChange(e.target.value, buttonData.id)}
                              className="col-span-3 rounded-md"
                            >
                              {blockOptionValues &&
                                blockOptionValues.map((item) => {
                                  return (
                                    <option value={item.value} key={item.value}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                            </select>
                            <input
                              type="text"
                              value={buttonData.name}
                              onChange={(e) => onInputTextChange({ name: e.target.value }, buttonData.id)}
                              className="col-span-7 p-1 rounded-md"
                              placeholder="Display Name"
                            />
                            <div className="col-span-1 grid row-span-2">
                              <button onClick={() => onDeleteButton(index)} className="place-self-center">
                                <svg
                                  width="20"
                                  height="20"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  className="self-center"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                            <div className="col-span-1 grid row-span-2">
                              <svg
                                width="20"
                                height="20"
                                className="place-self-center"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                              </svg>
                            </div>
                            {buttonData.type === "website" ? (
                              <input
                                type="text"
                                value={buttonData.url}
                                onChange={(e) => onInputTextChange({ url: e.target.value }, buttonData.id)}
                                className="col-span-10 p-1 rounded-md"
                                placeholder="Website URL"
                              />
                            ) : (
                              <select
                                value={buttonData.pageId}
                                onChange={(e) => onInputTextChange({ pageId: e.target.value }, buttonData.id)}
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
                            )}
                            {buttonData.type === "website" && buttonData.url && !isUrlValid(buttonData.url) && (
                              <div className="col-span-12 rounded-md text-white bg-red-600 px-2">Please enter valid Url</div>
                            )}
                            {buttonData.type === "website" && buttonData.url === "" && (
                              <div className="col-span-12 rounded-md text-white bg-red-600 px-2">Please enter Url</div>
                            )}
                          </div>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <div className="p-1">
        <button onClick={onAddButton} className="rounded-md border-2 border-gray-900 hover:bg-gray-400 w-full">
          Add Button
        </button>
      </div>
    </React.Fragment>
  );
}
