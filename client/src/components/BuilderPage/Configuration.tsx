import React, { ReactElement, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { buildBot, saveBot, updateToken } from "../../store/slices/builderSlice";
import { RootState, useAppDispatch } from "../../store/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { setToast } from "../../store/slices/toastSlice";
import { useSelector } from "react-redux";

export default function Configuration(): ReactElement {
  const dispatch = useAppDispatch();

  const storeBotToken = useSelector((state: RootState) => state.builderReducer.botToken);

  const [token, setToken] = useState("");
  // const [tempToken, setTempToken] = useState("")

  useEffect(() => {
    if (storeBotToken) {
      setToken(storeBotToken);
    }
  }, []);

  const debouceToken = useCallback(
    _.debounce((tokenVal) => {
      dispatch(updateToken(tokenVal));
      console.log(tokenVal);
    }, 100),
    []
  );

  const onHandleTokenChange = (newValue: string) => {
    setToken(newValue);
    debouceToken(newValue);
  };

  const onHandleSaveClick = async () => {
    try {
      await dispatch(saveBot()).then(unwrapResult);
      dispatch(setToast({ type: "success", message: "Bot Saved!" }));
    } catch (err) {
      dispatch(setToast({ type: "error", message: err }));
    }
  };

  const onHandleBuildClick = () => {
    dispatch(buildBot());
  };

  return (
    <div className="grid grid-cols-12 gap-3 rounded-md bg-gray-100 mt-3 p-3 shadow-md">
      <div className="col-span-6 grid">
        <p className="text-lg font-semibold">Bot Token (Optional)</p>
        <input value={token} onChange={(e) => onHandleTokenChange(e.target.value)} className="rounded-md border-2 px-2 py-1" />
      </div>
      <div className="col-span-12">
        <button
          onClick={onHandleSaveClick}
          className="w-32 mt-2 p-2 font-semibold rounded-md text-white bg-green-500 hover:bg-green-600 transition ease-out duration-500 transform hover:scale-105"
        >
          Save
        </button>
        <button
          onClick={onHandleBuildClick}
          className="w-32 mt-2 ml-2 p-2 font-semibold rounded-md text-white bg-red-500 hover:bg-red-600 transition ease-out duration-500 transform hover:scale-105"
        >
          Build
        </button>
      </div>
    </div>
  );
}
