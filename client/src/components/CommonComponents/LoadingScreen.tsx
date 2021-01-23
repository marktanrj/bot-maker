import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const LoadingScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loadingRegister = useSelector((state: RootState) => state.userReducer.loadingRegister);
  const loadingSignIn = useSelector((state: RootState) => state.userReducer.loadingSignIn);
  const loadingCreateBot = useSelector((state: RootState) => state.builderReducer.loadingCreateBot);
  const loadingSaveBot = useSelector((state: RootState) => state.builderReducer.loadingSaveBot);
  const loadingLoadBot = useSelector((state: RootState) => state.builderReducer.loadingLoadBot);
  const loadingBuildBot = useSelector((state: RootState) => state.builderReducer.loadingBuildBot);
  const loadingDeleteBot = useSelector((state: RootState) => state.builderReducer.loadingDeleteBot);
  const loadingGetBotsList = useSelector((state: RootState) => state.builderReducer.loadingGetBotsList);

  let allLoadings = [
    loadingRegister,
    loadingSignIn,
    loadingCreateBot,
    loadingSaveBot,
    loadingLoadBot,
    loadingBuildBot,
    loadingDeleteBot,
    loadingGetBotsList,
  ];

  useEffect(() => {
    allLoadings.every((e) => e === false) ? setIsLoading(false) : setIsLoading(true);
  }, allLoadings);

  return (
    <React.Fragment>
      <div
        id="loading-screen"
        className={`${!isLoading && "hidden"} grid fixed w-full h-full fixed block top-auto left-auto bg-white opacity-50 z-50 `}
      >
        <div className="place-self-center">
          <svg className="animate-spin h-16 w-16 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoadingScreen;
