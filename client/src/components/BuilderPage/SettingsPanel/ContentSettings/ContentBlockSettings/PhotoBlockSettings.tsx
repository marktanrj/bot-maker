import React, { ReactElement, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { useDispatch } from "react-redux";

import { saveContent } from "../../../../../store/slices/builderSlice";

interface Props {
  node: any;
}

export default function PhotoBlockSettings({ node }: Props): ReactElement {
  const dispatch = useDispatch();

  const [urlInput, setUrlInput] = useState("");
  const [captionInput, setCaptionInput] = useState("");

  useEffect(() => {
    if (node) {
      setUrlInput(node.content.settings.url);
      setCaptionInput(node.content.settings.caption);
    }
  }, [node]);

  const debouncedSave = useCallback(
    _.debounce(({ url, caption }) => {
      dispatch(
        saveContent({
          type: "photo",
          settings: {
            url: url || urlInput,
            caption: caption || captionInput,
          },
        })
      );
    }, 200),
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
      <input type="text" className="w-full rounded-md border-2 p-2" value={urlInput} onChange={handleUrlChange} />
      Caption
      <textarea className="w-full rounded-md border-2 p-2" rows={7} value={captionInput} onChange={handleCaptionChange} />
    </div>
  );
}
