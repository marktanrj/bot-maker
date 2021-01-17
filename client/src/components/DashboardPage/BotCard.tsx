import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../store/store";
import { loadBot } from "../../store/slices/builderSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { setToast } from "../../store/slices/toastSlice";
import { useHistory } from "react-router-dom";

interface Props {
  bot: any;
}

export default ({ bot }: Props) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleLoadBotClick = async (botId: number) => {
    try {
      const res = await dispatch(loadBot({ botId })).then(unwrapResult);
      history.push("/builder");
    } catch (err) {
      dispatch(setToast({ type: "error", message: err }));
    }
  };

  return (
    <div
      className={`md:col-span-4 xl:col-span-3 bg-gray-400 hover:bg-gray-500 rounded-2xl h-40 p-3 transition ease-out duration-500 transform hover:scale-105 cursor-pointer`}
      onClick={() => handleLoadBotClick(bot.id)}
    >
      <p className="text-2xl">{bot.name === "" ? "Untitled" : bot.name}</p>
      <p>Created</p>
      <p>{moment(bot.createdDate).format("L, LT")}</p>
      <p>Updated</p>
      <p>{moment(bot.updatedDate).format("L, LT")}</p>
    </div>
  );
};
