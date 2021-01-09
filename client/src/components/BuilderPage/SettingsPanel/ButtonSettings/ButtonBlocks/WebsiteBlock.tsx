import React, { ReactElement, useEffect, useState } from "react";

interface Props {
  buttonData: any;
  onSettingsChange: Function;
}

export default function WebsiteBlock({ buttonData, onSettingsChange }: Props): ReactElement {
  const [error, setError] = useState("");

  useEffect(() => {
    if (buttonData) {
      if (buttonData.settings.url === "") {
        setError("Please enter Url");
      } else {
        const urlRegex = new RegExp(
          /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
        );
        const result = urlRegex.test(buttonData.settings.url);
        if (!result) {
          setError("Please enter valid Url");
        } else {
          setError("");
        }
      }
    }
  }, [buttonData]);

  return (
    <React.Fragment>
      <input
        type="text"
        value={buttonData.settings.url}
        onChange={(e) => onSettingsChange({ url: e.target.value }, buttonData.id)}
        className="col-span-10 p-1 rounded-md"
        placeholder="Website URL"
      />

      {error.length > 0 && <div className="col-span-12 text-red-600 font-semibold">{error}</div>}
    </React.Fragment>
  );
}
