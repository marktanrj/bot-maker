import _ from "lodash";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveBlockInvoker } from "../../../../store/slices/builderSlice";
import { RootState } from "../../../../store/store";
import { blockOptionValues } from "./InvokerBlocks";

export default function InvokerSettings(): ReactElement {
  const dispatch = useDispatch();

  const [invokers, setInvokers] = useState<any>(undefined);

  const selectedPageId = useSelector((state: RootState) => state.builderReducer.selectedPageId);
  const builderData = useSelector((state: RootState) => state.builderReducer.builderData);

  useEffect(() => {
    if (builderData && selectedPageId) {
      const data = builderData.filter((item) => item.id === selectedPageId)[0];
      setInvokers(data.invokers);
    }
  }, [builderData, selectedPageId]);

  const onSelectType = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const newType = event.target.value;
    const items = _.cloneDeep(invokers);
    items[index] = {
      ...items[index],
      type: newType,
    };
    dispatch(saveBlockInvoker(items));
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newInput = event.target.value;
    const items = _.cloneDeep(invokers);
    items[index] = {
      ...items[index],
      input: newInput,
    };
    dispatch(saveBlockInvoker(items));
  };

  const onDeleteInvoker = (index: number) => {
    const items = _.cloneDeep(invokers);
    items.splice(index, 1);
    dispatch(saveBlockInvoker(items));
  };

  const onAddInvoker = () => {
    const items = _.cloneDeep(invokers);
    items.push({
      type: "command",
      input: "",
    });
    dispatch(saveBlockInvoker(items));
  };

  return (
    <React.Fragment>
      <p className="place-self-center font-bold">Invoker(s)</p>
      {invokers &&
        invokers.map((item: any, index: number) => {
          return (
            <div key={index} className="grid grid-cols-12 gap-2 my-1 bg-green-300 m-1 rounded-md p-2">
              <select onChange={(e) => onSelectType(e, index)} className="col-span-4 rounded-md" value={item.type}>
                {blockOptionValues &&
                  blockOptionValues.map((item) => {
                    return (
                      <option value={item.value} key={item.value}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
              <input type="text" value={item.input} onChange={(e) => onInputChange(e, index)} className="col-span-7 p-1 rounded-md" />
              <div className="col-span-1 grid">
                <button onClick={() => onDeleteInvoker(index)} className="place-self-center">
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
            </div>
          );
        })}
      <div className="p-1">
        <button onClick={() => onAddInvoker()} className="rounded-md border-2 border-gray-900 hover:bg-gray-400 w-full">
          Add Invoker
        </button>
      </div>
    </React.Fragment>
  );
}
