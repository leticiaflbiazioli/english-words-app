"use client";

import React, { ReactNode, useState } from "react";

interface TooltipProps {
  children: ReactNode;
  text: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="text-black absolute top-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-gray-100 text-sm rounded px-2 py-1 shadow-lg">
          {text}
        </div>
      )}
    </div>
  );
};
