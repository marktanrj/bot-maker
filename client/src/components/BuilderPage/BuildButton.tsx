import React from "react";
import { useDispatch } from "react-redux";
import { buildBot } from "../../store/slices/builderSlice";

interface Props {}

export default (props: Props) => {
  const dispatch = useDispatch();

  const handleBuildClick = () => {
    dispatch(buildBot());
  };

  return (
    <div>
      <button
        onClick={handleBuildClick}
        className="w-32 mt-2 p-2 font-semibold rounded-md text-white bg-red-500 hover:bg-red-600 transition ease-out duration-500 transform hover:scale-105"
      >
        Build
      </button>
    </div>
  );
};
