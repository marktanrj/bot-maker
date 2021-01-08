import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNewBotFromScratch } from "../../store/slices/builderSlice";
import BotCard from "./BotCard";
import TemplateCard from "./TemplateCard";

const mybots = [
  {
    id: "1",
    name: "test",
    created: "24-july-2020",
    modified: "26-july-2020",
  },
  {
    id: "2",
    name: "test2",
    created: "24-july-2020",
    modified: "26-july-2020",
  },
];

export default function DashboardPage(): ReactElement {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleCreateNewBot = () => {
    dispatch(createNewBotFromScratch());
    history.push("/builder");
  };

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
          {mybots.map((bot) => {
            return <BotCard bot={bot} />;
          })}
          <div
            onClick={() => handleCreateNewBot()}
            className="md:col-span-4 xl:col-span-3 bg-gray-400 hover:bg-gray-500 rounded-2xl h-32 p-3 transition ease-out duration-500 transform hover:scale-105 cursor-pointer grid"
          >
            <svg
              className="place-self-center opacity-50"
              width="60px"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
