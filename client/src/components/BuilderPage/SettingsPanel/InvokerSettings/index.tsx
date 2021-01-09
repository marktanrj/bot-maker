import _ from "lodash";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAllInvoker, addInvoker } from "../../../../store/slices/builderSlice";
import { RootState } from "../../../../store/store";
import InvokerBlocksSelector, { blockOptionValues } from "./InvokerBlocks/";

export default function InvokerSettings(): ReactElement {
  const dispatch = useDispatch();

  const [invokers, setInvokers] = useState<any>(undefined);

  const selectedPageId = useSelector((state: RootState) => state.builderReducer.selectedPageId);
  const builderData = useSelector((state: RootState) => state.builderReducer.builderData);

  useEffect(() => {
    if (builderData && selectedPageId) {
      const data = builderData.filter((item) => item.id === selectedPageId)[0];
      if (data) {
        setInvokers(data.invokers);
      }
    }
  }, [builderData, selectedPageId]);

  const onSelectType = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const newType = event.target.value;
    const items = _.cloneDeep(invokers);
    items[index] = {
      ...items[index],
      type: newType,
    };
    dispatch(saveAllInvoker(items));
  };

  const onInputChange = (valueObj: { text?: string; command?: string }, index: number) => {
    const items = _.cloneDeep(invokers);
    items[index] = {
      ...items[index],
      settings: {
        ...valueObj,
      },
    };
    dispatch(saveAllInvoker(items));
  };

  const onDeleteInvoker = (index: number) => {
    const items = _.cloneDeep(invokers);
    items.splice(index, 1);
    dispatch(saveAllInvoker(items));
  };

  const onAddInvoker = () => {
    dispatch(addInvoker());
  };

  return (
    <React.Fragment>
      <p className="place-self-center font-bold">Invoker(s)</p>
      {invokers &&
        invokers.map((invokerData: any, invokerIndex: number) => {
          return (
            <div key={invokerData.id} className="grid grid-cols-12 gap-2 my-1 bg-green-300 m-1 rounded-md p-2">
              <select onChange={(e) => onSelectType(e, invokerIndex)} className="col-span-4 rounded-md" value={invokerData.type}>
                {blockOptionValues &&
                  blockOptionValues.map((invokerData) => {
                    return (
                      <option value={invokerData.value} key={invokerData.value}>
                        {invokerData.name}
                      </option>
                    );
                  })}
              </select>
              <InvokerBlocksSelector invokerData={invokerData} invokerIndex={invokerIndex} onInputChange={onInputChange} />
              <div className="col-span-1 grid">
                <button onClick={() => onDeleteInvoker(invokerIndex)} className="place-self-center">
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
