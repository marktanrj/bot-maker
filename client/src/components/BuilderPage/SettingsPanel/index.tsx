import React, { ReactElement } from "react";
import ButtonSettings from "./ButtonSettings";
import InvokerSettings from "./InvokerSettings";

import ContentSettings from "./ContentSettings";

export default function SettingsPanel(): ReactElement {
  return (
    <div className="grid p-2">
      <h3 className="text-xl p-1">Settings</h3>

      <InvokerSettings />

      <hr className="my-3 border-4" />

      <ContentSettings />

      <hr className="my-3 border-4" />

      <ButtonSettings />
    </div>
  );
}
