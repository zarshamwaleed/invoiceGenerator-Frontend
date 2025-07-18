import React, { useState, useRef, useEffect } from "react";

export default function InvoiceActions({ invoiceId, status, onDownload, onEdit, onMarkPaid, onDelete, darkMode }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className={`px-4 py-1 rounded border ${
          darkMode
            ? "border-gray-600 bg-gray-700 text-white"
            : "border-gray-300 bg-white text-gray-800"
        }`}
      >
        View
      </button>
      {open && (
        <div
          className={`absolute right-0 mt-2 w-48 z-50 rounded-md shadow-lg ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <button
            onClick={() => onDownload(invoiceId)}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Download
          </button>
          <button
            onClick={() => onEdit(invoiceId)}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Edit
          </button>
          {status !== "Paid" && (
            <button
              onClick={() => onMarkPaid(invoiceId)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Mark as Paid
            </button>
          )}
          <button
            onClick={() => onDelete(invoiceId)}
            className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
