import React from "react";

interface Props {
  bot: any;
}

export default ({ bot }: Props) => {
  return (
    <div
      className={`md:col-span-4 xl:col-span-3 bg-gray-400 hover:bg-gray-500 rounded-2xl h-32 p-3 transition ease-out duration-500 transform hover:scale-105 cursor-pointer`}
    >
      <p className="text-2xl">{bot.name}</p>
      <p>{bot.created}</p>
      <p>{bot.modified}</p>
    </div>
  );
};
