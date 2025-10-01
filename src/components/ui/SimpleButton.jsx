"use client";

import React from "react";
import { cn } from "@../lib/utils"; 

export default function SimpleButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  const baseStyles =
    "px-4 py-2 rounded-md font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-400",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-400",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
