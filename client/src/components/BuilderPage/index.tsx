import React, { ReactElement, useEffect, useState } from "react";
import _ from "lodash";

import PageSelector from "./PageSelector";
import LayoutBuilder from "./LayoutBuilder";

export default function BuilderPage(): ReactElement {
  return (
    <div className="grid justify-items-center">
      <div className="grid grid-cols-12 gap-6 min-h-screen pt-16 w-full xl:w-3/4 p-10 pt-24">
        <div className="col-span-3 p-2 rounded-md bg-gray-100 shadow-md place-self-stretch">
          <PageSelector />
        </div>
        <div className="col-span-5 rounded-md bg-gray-100 shadow-md place-self-stretch">
          <LayoutBuilder />
        </div>
        <div className="col-span-4 rounded-md bg-gray-100 shadow-md place-self-stretch">Settings</div>
      </div>
    </div>
  );
}
