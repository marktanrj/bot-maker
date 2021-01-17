import React, { ReactElement } from "react";

interface Props {
  handleCreateNewBot: Function;
}

export default function PlusCard({ handleCreateNewBot }: Props): ReactElement {
  return (
    <div
      onClick={() => handleCreateNewBot()}
      className="md:col-span-4 xl:col-span-3 bg-gray-400 hover:bg-gray-500 rounded-2xl h-40 p-3 transition ease-out duration-500 transform hover:scale-105 cursor-pointer grid"
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
  );
}
