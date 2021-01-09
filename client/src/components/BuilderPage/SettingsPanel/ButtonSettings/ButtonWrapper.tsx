import _ from "lodash";
import React, { ReactElement } from "react";
import ButtonBlocksSelector, { blockOptionValues } from "./ButtonBlocks";

interface Props {
  buttonData: any;
  buttonIndex: number;
  helperFunctions: {
    onSelectTypeChange: Function;
    onDisplayNameChange: Function;
    onSettingsChange: Function;
    onDeleteButton: Function;
  };
}

export default function ButtonWrapper({
  buttonData,
  buttonIndex,
  helperFunctions: { onSelectTypeChange, onDisplayNameChange, onSettingsChange, onDeleteButton },
}: Props): ReactElement {
  return (
    <div className="grid grid-cols-12 grid-rows-2 gap-2">
      <select value={buttonData.type} onChange={(e) => onSelectTypeChange(e.target.value, buttonData.id)} className="col-span-3 rounded-md">
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
        value={buttonData.displayName}
        onChange={(e) => onDisplayNameChange(e.target.value, buttonData.id)}
        className="col-span-7 p-1 rounded-md"
        placeholder="Display Name"
      />
      <div className="col-span-1 grid row-span-2">
        <button onClick={() => onDeleteButton(buttonIndex)} className="place-self-center">
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
      <ButtonBlocksSelector buttonData={buttonData} onSettingsChange={onSettingsChange} />
    </div>
  );
}
