import React, { ReactElement, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

import { saveBlock } from "../../../store/slices/builderSlice";
import { RootState } from "../../../store/store";

export default function PhotoBlockSettings(): ReactElement {
  const dispatch = useDispatch();

  const [urlInput, setUrlInput] = useState("");
  const [captionInput, setCaptionInput] = useState("");

  const selectedPageId = useSelector((state: RootState) => state.builderReducer.selectedPageId);
  const builderData = useSelector((state: RootState) => state.builderReducer.builderData);

  useEffect(() => {
    if (builderData && selectedPageId) {
      const data = builderData.filter((item) => item.id === selectedPageId)[0];
      setUrlInput(data.content.settings.url);
      setCaptionInput(data.content.settings.caption);
    }
  }, [builderData, selectedPageId]);

  const debouncedSave = useCallback(
    _.debounce(({ url, caption }) => {
      console.log({ url, caption, urlInput, captionInput });
      dispatch(
        saveBlock({
          type: "photo",
          settings: {
            url: url || urlInput,
            caption: caption || captionInput,
          },
        })
      );
    }, 300),
    []
  );

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(e.target.value);
    debouncedSave({ url: e.target.value, caption: captionInput });
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaptionInput(e.target.value);
    debouncedSave({ url: urlInput, caption: e.target.value });
  };

  return (
    <div>
      <p className="font-semibold">Send Photo Options</p>
      Photo URL
      <input type="text" className="w-full rounded-md p-2" value={urlInput} onChange={handleUrlChange} />
      Caption
      <textarea className="w-full rounded-md p-2" rows={7} value={captionInput} onChange={handleCaptionChange} />
    </div>
  );
}
