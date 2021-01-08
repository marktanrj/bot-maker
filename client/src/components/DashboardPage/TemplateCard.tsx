import React from "react";

interface Props {
  title: string;
  description: string;
  color: string;
}

export default ({ title, description, color }: Props) => {
  return (
    <div
      className={`md:col-span-4 xl:col-span-3 ${color} hover:bg-gray-500 rounded-2xl h-32 p-3 transition ease-out duration-500 transform hover:scale-105 cursor-pointer`}
    >
      <p className="text-2xl">{title}</p>
      <p>{description}</p>
    </div>
  );
};
