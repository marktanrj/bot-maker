import React, { ReactElement, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { defaultBotTemplate } from "../../defaultvalues/botTemplates";
import { createBot, getBotsList } from "../../store/slices/builderSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import BotCard from "./BotCard";
import TemplateCard from "./TemplateCard";
import { RootState, useAppDispatch } from "../../store/store";
import { setToast } from "../../store/slices/toastSlice";
import { useSelector } from "react-redux";
import PlusCard from "./PlusCard";

export default function DashboardPage(): ReactElement {
  const dispatch = useAppDispatch();

  const botsList = useSelector((state: RootState) => state.builderReducer.botsList);

  const handleGetBotsList = async () => {
    try {
      const res = await dispatch(getBotsList()).then(unwrapResult);
    } catch (err) {
      dispatch(setToast({ type: "error", message: err }));
    }
  };

  useEffect(() => {
    handleGetBotsList();
  }, []);

  return (
    <div className="pt-24 grid justify-items-center">
      <div className="w-full xl:w-3/5">
        <div className="text-2xl font-bold mb-4">Templates</div>
        <div className="grid grid-cols-12 gap-6">
          <TemplateCard title="Basic Bot" description="Minimal settings to set up and run a bot" color="bg-orange-300" />
          <TemplateCard title="Informational Bot" description="Multiple features and pages" color="bg-blue-300" />
        </div>

        <div className="text-2xl font-bold my-4">My Bots</div>

        <div className="grid grid-cols-12 gap-6">
          {botsList.length > 0 &&
            botsList
              .slice()
              .sort((a, b) => a.createdDate - b.createdDate)
              .map((bot) => {
                return <BotCard key={bot.id} bot={bot} />;
              })}
          <PlusCard />
        </div>
      </div>
    </div>
  );
}
