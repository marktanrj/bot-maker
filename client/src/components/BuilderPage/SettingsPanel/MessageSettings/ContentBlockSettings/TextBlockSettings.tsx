import React, { ReactElement, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

import { saveBlockContent } from "../../../../../store/slices/builderSlice";
import { RootState } from "../../../../../store/store";

interface Props {
  node: any;
}

export default function TextBlockSettings({ node }: Props): ReactElement {
  const dispatch = useDispatch();

  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    if (node) {
      setTextInput(node.content.settings.text);
    }
  }, [node]);

  const debouncedSave = useCallback(
    _.debounce(({ textareaInput }) => {
      dispatch(
        saveBlockContent({
          type: "text",
          settings: {
            text: textareaInput,
          },
        })
      );
    }, 200),
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
      <textarea className="w-full rounded-md p-2" rows={5} value={textInput} onChange={handleTextareaChange} />
    </div>
  );
}
