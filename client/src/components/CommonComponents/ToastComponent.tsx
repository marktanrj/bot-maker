import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import { RootState } from "../../store/store";
import { removeToast, toastObjectInterface } from "../../store/slices/toastSlice";

export default function ToastComponent(): ReactElement {
  const dispatch = useDispatch();

  const toastObject = useSelector((state: RootState) => state.toastReducer.toastObject);

  useEffect(() => {
    if (toastObject) {
      const toastObj: toastObjectInterface = toastObject!;
      toast(toastObj.message, {
        type: toastObj.type as "default" | "error" | "success" | "info" | "warning" | "dark" | undefined,
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      dispatch(removeToast());
    }
  }, [toastObject]);

  return (
    <React.Fragment>
      <ToastContainer />
    </React.Fragment>
  );
}
