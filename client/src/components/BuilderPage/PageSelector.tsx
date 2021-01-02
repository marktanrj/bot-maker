import React, { ReactElement, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { RootState } from "../../store/store";
import { addPage, updateAllPage, updateSelectedPageId } from "../../store/slices/builderSlice";

export default function PageSelector(): ReactElement {
  const dispatch = useDispatch();

  const pageValues = useSelector((state: RootState) => state.builderReducer.pageValues);

  const [pages, setPages] = useState(pageValues);

  useEffect(() => {
    if (pageValues.length > 0) {
      setPages(_.cloneDeep(pageValues));
    }
  }, [pageValues]);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = _.cloneDeep(pages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPages(items);
    dispatch(updateAllPage(items));
  }

  const [selectedPageId, setSelectedPageId] = useState<string>("main");

  const onPageSelect = (pageId: string) => {
    setSelectedPageId(pageId);
    dispatch(updateSelectedPageId(pageId));
  };

  const onPageAdd = () => {
    dispatch(addPage({ name: `Untitled`, content: "" }));
  };

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>("");

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

  return (
    <React.Fragment>
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
                        onClick={() => onPageSelect(id)}
                      >
                        {selectedPageId === id ? (
                          <React.Fragment>
                            {isEditing === null && (
                              <div className="grid grid-cols-5">
                                <p className={"col-span-4"}>{name}</p>
                                <button
                                  className="col-span-1 border-2 border-gray-700 rounded-md"
                                  onClick={() => onPageEditClick(id, name)}
                                >
                                  Edit
                                </button>
                              </div>
                            )}
                            {isEditing === id && (
                              <div className="grid grid-cols-5">
                                <input
                                  className="col-span-4"
                                  type="text"
                                  value={editingValue}
                                  onChange={(e) => setEditingValue(e.target.value)}
                                />
                                <button className="col-span-1 border-2 border-gray-700 rounded-md" onClick={() => onPageSaveClick(id)}>
                                  Save
                                </button>
                              </div>
                            )}
                          </React.Fragment>
                        ) : (
                          <div className="grid grid-cols-5">
                            <p className={"col-span-5"}>{name}</p>
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
      <button className="rounded-md bg-gray-500 p-2 m-1" onClick={() => onPageAdd()}>
        Add Page
      </button>
    </React.Fragment>
  );
}
