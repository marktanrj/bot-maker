import React, { ReactElement, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { RootState } from "../../../store/store";
import { addPage, updateAllPage, updateSelectedPageId } from "../../../store/slices/builderSlice";

export default function PagePanel(): ReactElement {
  const dispatch = useDispatch();

  const builderData = useSelector((state: RootState) => state.builderReducer.builderData);
  const selectedPageId = useSelector((state: RootState) => state.builderReducer.selectedPageId);

  const [pages, setPages] = useState(builderData);

  useEffect(() => {
    if (builderData.length > 0) {
      setPages(_.cloneDeep(builderData));
    }
  }, [builderData]);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = _.cloneDeep(pages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPages(items);
    dispatch(updateAllPage(items));
  }

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>("");

  const onPageSelect = (pageId: string) => {
    if (!isEditing) {
      dispatch(updateSelectedPageId(pageId));
    }
  };

  const onPageAdd = () => {
    dispatch(addPage());
  };

  const onPageEditClick = (pageId: string, name: string) => {
    setIsEditing(pageId);
    setEditingValue(name);
  };

  const onPageSaveClick = (pageId: string) => {
    const items = _.cloneDeep(pages);
    items.forEach((item) => {
      if (item.id === pageId) {
        item.name = editingValue;
      }
      return item;
    });

    setIsEditing(null);
    dispatch(updateAllPage(items));
  };

  const onPageDeleteClick = (pageId: string) => {
    dispatch(updateSelectedPageId("main"));
    const items = _.cloneDeep(pages);
    const newItems = items.filter((item) => item.id !== pageId);
    dispatch(updateAllPage(newItems));
  };

  return (
    <div className="p-2">
      <h3 className="text-xl p-1">Pages</h3>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="pages">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {pages.map(({ id, name }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={selectedPageId === id ? `bg-red-500 m-1 rounded-md p-2` : `bg-red-300 m-1 rounded-md p-2`}
                      >
                        {selectedPageId === id ? (
                          <React.Fragment>
                            {isEditing === null && (
                              <div className="grid grid-cols-5">
                                <p className="col-span-4">{name}</p>
                                <div className="col-span-1 flex">
                                  <button onClick={() => onPageEditClick(id, name)}>
                                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                  </button>
                                  {id === "main" ? (
                                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                      <path
                                        fillRule="evenodd"
                                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  ) : (
                                    <button onClick={() => onPageDeleteClick(id)}>
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
                                  )}
                                </div>
                              </div>
                            )}
                            {isEditing === id && (
                              <div className="grid grid-cols-6 gap-1">
                                <input
                                  className="col-span-5"
                                  type="text"
                                  value={editingValue}
                                  onChange={(e) => setEditingValue(e.target.value)}
                                />
                                <button className="col-span-1" onClick={() => onPageSaveClick(id)}>
                                  <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </div>
                            )}
                          </React.Fragment>
                        ) : (
                          <div className="grid grid-cols-5">
                            <p className={"col-span-5"} onClick={() => onPageSelect(id)}>
                              {name}
                            </p>
                          </div>
                        )}
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
        <button className="rounded-md border-2 border-gray-900 hover:bg-gray-400 w-full" onClick={() => onPageAdd()}>
          Add Page
        </button>
      </div>
    </div>
  );
}
