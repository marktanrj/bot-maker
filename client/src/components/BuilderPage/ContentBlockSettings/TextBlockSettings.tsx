import React, { ReactElement, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

import { saveTextBlock } from "../../../store/slices/builderSlice";
import { RootState } from "../../../store/store";

interface Props {}

export default function TextBlockSettings({}: Props): ReactElement {
  const dispatch = useDispatch();

  const [textInput, setTextInput] = useState("");

  const selectedPageId = useSelector((state: RootState) => state.builderReducer.selectedPageId);
  const builderData = useSelector((state: RootState) => state.builderReducer.builderData);

  useEffect(() => {
    if (builderData && selectedPageId) {
      const data = builderData.filter((item) => item.id === selectedPageId)[0];
      setTextInput(data.content.settings.text);
    }
  }, [builderData, selectedPageId]);

  const debouncedSave = useCallback(
    _.debounce(({ textareaInput }) => {
      console.log("savetext");
      dispatch(
        saveTextBlock({
          type: "text",
          settings: {
            text: textareaInput,
          },
        })
      );
    }, 300),
    []
  );

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
    debouncedSave({ textareaInput: e.target.value });
  };

  return (
    <div>
      <p className="font-semibold">Send Text Options</p>
      Text
      <textarea className="w-full rounded-md p-2" rows={7} value={textInput} onChange={handleTextareaChange} />
    </div>
  );
}
