import React, { ReactElement, useCallback, useState } from "react";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { updateBotName } from "../../store/slices/builderSlice";

export default function BotTitle(): ReactElement {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [botName, setBotName] = useState("Bot");

  const debouncedSave = useCallback(
    _.debounce((name) => {
      dispatch(updateBotName(name));
    }, 200),
    []
  );

  const handleBotNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBotName(event.target.value);
    debouncedSave(botName);
  };

  return (
    <div className="grid grid-cols-12 gap-3 text-2xl font-bold rounded-md bg-gray-100 mb-3 p-2 shadow-md">
      {editing ? (
        <React.Fragment>
          <input className="col-span-11 rounded-md" type="text" value={botName} onChange={handleBotNameChange}></input>
          <div className="col-span-1 grid">
            <button className="place-self-center" onClick={() => setEditing(false)}>
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="col-span-11">{botName}</div>
          <div className="col-span-1 grid">
            <button className="place-self-center" onClick={() => setEditing(true)}>
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
