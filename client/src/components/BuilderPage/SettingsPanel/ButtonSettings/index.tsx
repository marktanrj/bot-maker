import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { RootState } from "../../../../store/store";
import { addButton, saveAllButton } from "../../../../store/slices/builderSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ButtonWrapper from "./ButtonWrapper";
import { defaultButtonBlocks } from "../../../../defaultvalues/defaultvalues";

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
      setNode(data);
      if (data) {
        setButtons(data.buttons);
      }
    }
  }, [builderData, selectedPageId]);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = _.cloneDeep(buttons);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setButtons(items);
    dispatch(saveAllButton(items));
  }

  const onSelectTypeChange = (newType: string, id: string) => {
    let tempButtons = _.cloneDeep(buttons);
    tempButtons = tempButtons.map((item: any) => {
      if (item.id === id) {
        item = { ...defaultButtonBlocks[newType], id };
      }
      return item;
    });
    dispatch(saveAllButton(tempButtons));
  };

  const onDisplayNameChange = (displayName: string, id: string) => {
    let tempButtons = _.cloneDeep(buttons);
    tempButtons = tempButtons.map((item: any) => {
      if (item.id === id) {
        item = {
          ...item,
          displayName: displayName,
        };
      }
      return item;
    });
    dispatch(saveAllButton(tempButtons));
  };

  const onSettingsChange = (valueObj: { url?: string; pageId?: string }, id: string) => {
    if (buttons) {
      let tempButtons = _.cloneDeep(buttons);
      tempButtons = tempButtons.map((item: any) => {
        if (item.id === id) {
          item = {
            ...item,
            settings: {
              ...valueObj,
            },
          };
        }
        return item;
      });
      dispatch(saveAllButton(tempButtons));
    }
  };

  const onDeleteButton = (index: number) => {
    const items = _.cloneDeep(buttons);
    items.splice(index, 1);
    dispatch(saveAllButton(items));
  };

  const onAddButton = () => {
    dispatch(addButton());
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
                          className={`bg-purple-200 m-1 rounded-md p-2`}
                        >
                          <ButtonWrapper
                            buttonData={buttonData}
                            buttonIndex={index}
                            helperFunctions={{ onSelectTypeChange, onDisplayNameChange, onSettingsChange, onDeleteButton }}
                          />
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
