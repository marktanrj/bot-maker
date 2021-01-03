import React, { ReactElement, useEffect, useState } from "react";
import _ from "lodash";

import PageSelector from "./PageSelector";
import LayoutBuilder from "./LayoutBuilder";
import PreviewPanel from "./PreviewPanel";

export default function BuilderPage(): ReactElement {
  return (
    <div className="grid justify-items-center">
      <div className="grid grid-cols-12 gap-6 min-h-screen pt-16 w-full xl:w-3/4 p-10 pt-24">
        <div className="col-span-3 p-2 rounded-md bg-gray-100 shadow-md">
          <PageSelector />
        </div>
        <div className="col-span-5 p-2 rounded-md bg-gray-100 shadow-md">
          <LayoutBuilder />
        </div>
        <div className="col-span-4 p-2 rounded-md bg-gray-100 shadow-md">
          <PreviewPanel />
        </div>
      </div>
    </div>
  );
}
