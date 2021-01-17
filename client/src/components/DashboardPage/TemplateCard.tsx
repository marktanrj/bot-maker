import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useHistory } from "react-router-dom";
import { createBot } from "../../store/slices/builderSlice";
import { setToast } from "../../store/slices/toastSlice";
import { useAppDispatch } from "../../store/store";
import { NodeType } from "../../types";

interface Props {
  title: string;
  description: string;
  color: string;
  template: NodeType[];
}

export default ({ title, description, color, template }: Props) => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleCreateNewBot = async () => {
    try {
      const res = await dispatch(createBot({ builderData: template })).then(unwrapResult);
      history.push("/builder");
    } catch (err) {
      dispatch(setToast({ type: "error", message: err }));
    }
  };

  return (
    <div
      onClick={() => handleCreateNewBot()}
      className={`md:col-span-4 xl:col-span-3 ${color} hover:bg-gray-500 rounded-2xl h-32 p-3 transition ease-out duration-500 transform hover:scale-105 cursor-pointer`}
    >
      <p className="text-2xl">{title}</p>
      <p>{description}</p>
    </div>
  );
};
