import React from "react";

const ConfirmationAlertModal = ({
  isOpen,
  type = "confirm", // "confirm" | "alert"
  title = "",
  message = "",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const icon =
    type === "alert" ? (
      <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full">
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2z"
          />
        </svg>
      </div>
    ) : (
      <div className="flex items-center justify-center w-12 h-12 mx-auto bg-yellow-100 rounded-full">
        <svg
          className="w-6 h-6 text-yellow-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-2.5L13.73 4a2 2 0 00-3.46 0L3.34 16.5C2.57 17.33 3.53 19 5.07 19z"
          />
        </svg>
      </div>
    );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full">
        <div className="px-6 py-4">
          {icon}
          <h3 className="mt-3 text-lg font-medium text-gray-900 text-center">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-500 text-center">{message}</p>
        </div>

        <div className="flex justify-end space-x-3 px-6 py-4 bg-gray-50 rounded-b-xl">
          {type === "confirm" && (
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg border border-transparent focus:outline-none focus:ring-2 transition-colors duration-200 ${
              type === "alert"
                ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                : "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationAlertModal;
