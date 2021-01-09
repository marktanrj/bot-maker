import React, { ReactElement, useEffect, useState } from "react";
import _ from "lodash";

import PagePanel from "./PagePanel";
import SettingsPanel from "./SettingsPanel";
import PreviewPanel from "./PreviewPanel";
import BotTitle from "./BotTitle";
import Configuration from "./Configuration";

export default function BuilderPage(): ReactElement {
  return (
    <div className="grid justify-items-center">
      <div className="min-h-screen pt-16 w-full xl:w-3/4 p-10 pt-20">
        <BotTitle />
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3 rounded-md bg-gray-100 shadow-md">
            <PagePanel />
          </div>
          <div className="col-span-5 rounded-md bg-gray-100 shadow-md pb-5">
            <SettingsPanel />
          </div>
          <div className="col-span-4 rounded-md bg-gray-100 shadow-md">
            <PreviewPanel />
          </div>
        </div>
        <Configuration />
      </div>
    </div>
  );
}
