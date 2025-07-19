import React, { useState, useContext, useRef, useEffect } from "react";
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import Footer from "./Footer";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Custom hook for detecting clicks outside an element
// const useOutsideClick = (ref, callback) => {
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (ref.current && !ref.current.contains(event.target)) {
//         callback();
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [ref, callback]);
// };

export default function MyInvoices() {
  const { darkMode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [actionDropdown, setActionDropdown] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const navigate = useNavigate();

  // Refs for dropdowns
  const mainDropdownRef = useRef(null);
  const actionDropdownRef = useRef(null);

  // Use custom hooks for outside click detection
  // useOutsideClick(mainDropdownRef, () => setDropdownOpen(false));
  // useOutsideClick(actionDropdownRef, () => setActionDropdown(null));

  // Fetch invoices
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const fetchInvoices = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/invoices?userId=${user.id}`
        );
        const data = await res.json();
        setInvoices(data);
      } catch (err) {
        console.error("❌ Failed to fetch invoices", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, [user]);

  const handleDeleteInvoice = async (invoiceId) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This invoice will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/invoice/${invoiceId}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setInvoices(invoices.filter((invoice) => invoice._id !== invoiceId));

          Swal.fire({
            title: "✅ Deleted!",
            text: "The invoice has been removed.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          });

        } else {
          console.error("Failed to delete invoice");
          Swal.fire({
            title: "❌ Failed to Delete",
            text: "Please try again.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#d33"
          });
        }

      } catch (err) {
        console.error("Error deleting invoice:", err);
        Swal.fire({
          title: "⚠️ Error",
          text: "An unexpected error occurred while deleting the invoice.",
          icon: "warning",
          confirmButtonText: "OK",
          confirmButtonColor: "#f0ad4e"
        });
      }
    }
  });

  setActionDropdown(null);
};


  const handleTogglePaymentStatus = async (invoice) => {
    try {
      const isPaid = invoice.status === "PAID";
      const updateData = {
        status: isPaid ? "UNPAID" : "PAID",
        balanceDue: isPaid ? invoice.total : 0,
        amountPaid: isPaid ? 0 : invoice.total,
      };

      const res = await fetch(
        `http://localhost:5000/invoice/${invoice.invoiceNumber}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (res.ok) {
        // Update the invoice in state
        setInvoices(
          invoices.map((inv) =>
            inv._id === invoice._id ? { ...inv, ...updateData } : inv
          )
        );
      } else {
  console.error("Failed to update invoice status");
  Swal.fire({
    title: '❌ Failed to Update Status',
    text: 'Unable to update the invoice status. Please try again.',
    icon: 'error',
    confirmButtonText: 'OK',
    confirmButtonColor: '#d33'
  });
}

    } catch (err) {
  console.error("Error updating invoice status:", err);

  Swal.fire({
    title: '⚠️ Error Updating Status',
    text: 'An unexpected error occurred while updating the invoice status.',
    icon: 'warning',
    confirmButtonText: 'OK',
    confirmButtonColor: '#f0ad4e'
  });
}

    setActionDropdown(null);
  };

  // Handle PDF download
const handleDownloadClick = async (e, invoice) => {
  e.preventDefault();
  e.stopPropagation();
  setActionDropdown(null);
  setPdfGenerating(true);

  try {
    const doc = new jsPDF("p", "pt", "a4"); // ✅ Better spacing on A4
    const L = invoice.labels || {}; // dynamic labels fallback

    let y = 40; // more breathing space at top

    // === LOGO + COMPANY NAME ===
    if (invoice.logo) {
      try {
        const logoResponse = await fetch(invoice.logo);
        const logoBlob = await logoResponse.blob();
        const logoUrl = URL.createObjectURL(logoBlob);

        const mimeType = logoBlob.type;
        let imgType = "JPEG";
        if (mimeType.includes("png")) imgType = "PNG";
        if (mimeType.includes("webp")) imgType = "WEBP";

        if (mimeType.includes("avif")) {
          const avifImg = new Image();
          avifImg.src = logoUrl;
          await new Promise((resolve) => (avifImg.onload = resolve));
          const canvas = document.createElement("canvas");
          canvas.width = avifImg.width;
          canvas.height = avifImg.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(avifImg, 0, 0);
          const pngDataUrl = canvas.toDataURL("image/png");
          doc.addImage(pngDataUrl, "PNG", 40, y, 60, 60);
        } else {
          doc.addImage(logoUrl, imgType, 40, y, 60, 60);
        }
      } catch (err) {
        console.error("Logo load failed:", err);
      }
    }

    // === COMPANY NAME ===
    doc.setFont("helvetica", "medium").setFontSize(13);
    doc.setTextColor(50); // ✅ softer dark gray
    doc.text(invoice.from || "", 40, y + 80);

    // === INVOICE HEADER RIGHT ===
    doc.setFontSize(20).setFont("helvetica", "medium"); // ✅ less harsh than bold
    doc.setTextColor(30);
    doc.text(invoice.type || "INVOICE", 550, y + 10, { align: "right" });

    doc.setFontSize(10).setTextColor(90);
    doc.text(`# ${invoice.invoiceNumber || ""}`, 550, y + 25, { align: "right" });

    let headerY = y + 40;
    doc.setFontSize(10).setTextColor(40);

    const labelOffsetX = 470; // shifted a bit left for better layout

    const addRightHeader = (label, value) => {
      doc.setFont("helvetica", "medium");
      doc.setTextColor(50);
      doc.text(`${label}:`, labelOffsetX, headerY, { align: "right" });

      doc.setFont("helvetica", "normal");
      doc.setTextColor(120); // ✅ softer gray for values
      doc.text(value, 550, headerY, { align: "right" });

      headerY += 14; // more line spacing for cleaner look
    };

    if (invoice.date) addRightHeader(L.date || "Date", invoice.date);
    if (invoice.paymentTerms)
      addRightHeader(L.paymentTerms || "Payment Terms", invoice.paymentTerms);
    if (invoice.dueDate)
      addRightHeader(L.dueDate || "Due Date", invoice.dueDate);
    if (invoice.poNumber)
      addRightHeader(L.poNumber || "PO Number", invoice.poNumber);

    // === BILL TO / SHIP TO ===
    y += 120;
    doc.setFontSize(9).setTextColor(100);

    if (invoice.billTo) {
      doc.text((L.billTo || "Bill To") + ":", 40, y);
      doc.setFontSize(11).setTextColor(30).setFont("helvetica", "medium");
      doc.text(invoice.billTo, 40, y + 14);
    }

    if (invoice.shipTo) {
      const shipToX = 480;
      doc.setFontSize(9).setTextColor(100);
      doc.text((L.shipTo || "Ship To") + ":", shipToX, y);
      doc.setFontSize(11).setTextColor(30).setFont("helvetica", "medium");
      doc.text(invoice.shipTo, shipToX, y + 14);
    }

    // === BALANCE DUE BAR (professional style) ===
    y += 40;
    doc.setFillColor(245, 245, 245);
    doc.rect(40, y, 520, 28, "F");

    doc.setFontSize(11).setFont("helvetica", "medium").setTextColor(70);
    doc.text((L.balanceDue || "Balance Due") + ":", 400, y + 18, {
      align: "right",
    });

    doc.setFont("helvetica", "bold").setFontSize(12).setTextColor(20);
    doc.text(
      `${invoice.currency || "kr"}${(
        invoice.balanceDue || invoice.total || 0
      ).toFixed(2)}`,
      540,
      y + 18,
      { align: "right" }
    );

    // === LINE ITEMS TABLE ===
    y += 50;
    const itemHead = [
      [
        L.item || "Item",
        L.quantity || "Qty",
        L.rate || "Rate",
        L.amount || "Amount",
      ],
    ];
    const itemsData = invoice.lineItems.map((item) => [
      item.description || "-",
      item.quantity,
      `${invoice.currency || "kr"}${(item.rate || 0).toFixed(2)}`,
      `${invoice.currency || "kr"}${(item.amount || 0).toFixed(2)}`,
    ]);

    autoTable(doc, {
      startY: y,
      head: itemHead,
      body: itemsData,
      headStyles: {
        fillColor: [30, 30, 30],
        textColor: 255,
        fontStyle: "medium",
        halign: "left",
      },
      bodyStyles: {
        textColor: 50,
      },
      alternateRowStyles: { fillColor: [248, 248, 248] },
      styles: { fontSize: 9, cellPadding: 6 },
      margin: { left: 40, right: 40 },
    });

    // === TOTALS SECTION ===
    let totalsY = doc.lastAutoTable.finalY + 30;
    const totalsLabelX = 280;
    const totalsValueX = 570;

    const addTotalLine = (label, value, emphasize = false) => {
      doc.setFont("helvetica", emphasize ? "medium" : "normal");
      doc.setFontSize(emphasize ? 11 : 10);
      doc.setTextColor(emphasize ? 30 : 80);

      doc.text(label + ":", totalsLabelX, totalsY);
      doc.text(value, totalsValueX, totalsY, { align: "right" });
      totalsY += 16;
    };

    if (invoice.subtotal)
      addTotalLine(
        L.subtotal || "Subtotal",
        `${invoice.currency || "kr"}${(invoice.subtotal || 0).toFixed(2)}`
      );

    if (invoice.shipping)
      addTotalLine(
        L.shipping || "Shipping",
        `${invoice.currency || "kr"}${(invoice.shipping || 0).toFixed(2)}`
      );

    if (invoice.tax)
      addTotalLine(
        `${L.tax || "Tax"} (${invoice.taxRate || 0}%)`,
        `${invoice.currency || "kr"}${invoice.tax.toFixed(2)}`
      );

    if (invoice.discount)
      addTotalLine(
        L.discount || "Discount",
        `-${invoice.currency || "kr"}${invoice.discount.toFixed(2)}`
      );

    addTotalLine(
      L.total || "Total",
      `${invoice.currency || "kr"}${(invoice.total || 0).toFixed(2)}`,
      true
    );

    addTotalLine(
      L.amountPaid || "Amount Paid",
      `${invoice.currency || "kr"}${(invoice.amountPaid || 0).toFixed(2)}`
    );

    addTotalLine(
      L.balanceDue || "Balance Due",
      `${invoice.currency || "kr"}${
        invoice.balanceDue || invoice.total || 0
      }.00`,
      true
    );

    totalsY += 20;

    // === NOTES & TERMS ===
 if (invoice.notes) {
  doc.setFont("helvetica", "medium").setFontSize(10).setTextColor(40);
  doc.text((L.notes || "Notes") + ":", 40, totalsY);

  doc.setFont("helvetica", "normal").setFontSize(9).setTextColor(90);
  const splitNotes = doc.splitTextToSize(invoice.notes, 500);
  doc.text(splitNotes, 40, totalsY + 14);

  // ✅ Increase totalsY after notes content
  totalsY += splitNotes.length * 12 + 10;

  // ✅ Add a 1-line gap after Notes before Terms
  totalsY += 12; 
}

if (invoice.terms) {
  doc.setFont("helvetica", "medium").setFontSize(10).setTextColor(40);
  doc.text((L.terms || "Terms") + ":", 40, totalsY);

  doc.setFont("helvetica", "normal").setFontSize(9).setTextColor(90);
  const splitTerms = doc.splitTextToSize(invoice.terms, 500);
  doc.text(splitTerms, 40, totalsY + 14);

  totalsY += splitTerms.length * 12 + 10;
}

    // === FOOTER ===
    doc.setFontSize(9).setTextColor(120);
    doc.text("Thank you for your business!", 300, 800, { align: "center" });

    // SAVE PDF
    doc.save(`invoice_${invoice.invoiceNumber || "default"}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);

    Swal.fire({
      title: "❌ Failed to Generate PDF",
      text: "Something went wrong while generating the PDF. Please try again.",
      icon: "error",
      confirmButtonText: "OK",
      confirmButtonColor: "#d33",
    });
  } finally {
    setPdfGenerating(false);
  }
};


  return (
    <div
      className={`min-h-[100vh] w-full p-8 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* PDF Loading Overlay */}
      {pdfGenerating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
        </div>
      )}

      <div
        className={`rounded-lg shadow p-6 w-full transition-colors duration-300 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">My Invoices</h1>
          <div className="relative" ref={mainDropdownRef}>
            <div className="flex rounded-md shadow overflow-hidden">
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2"
                onClick={() => navigate("/")}
              >
                New Invoice
              </button>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 border-l border-green-500"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
            {dropdownOpen && (
              <div
                className={`absolute right-0 mt-2 w-48 border rounded-md shadow-lg z-50 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-200"
                }`}
              >
                <button
                  onClick={() => {
                    navigate("/credit-note-template");
                    setDropdownOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  New Credit Note
                </button>
                <button
                  onClick={() => {
                    navigate("/quote-template");
                    setDropdownOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  New Quote
                </button>
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b font-medium">
                  <th className="px-4 py-2">CUSTOMER</th>
                  <th className="px-4 py-2">REFERENCE</th>
                  <th className="px-4 py-2">DATE</th>
                  <th className="px-4 py-2">DUE DATE</th>
                  <th className="px-4 py-2">STATUS</th>
                  <th className="px-4 py-2">TOTAL</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => (
                  <tr key={invoice._id} className="border-b">
                    <td className="px-4 py-3">{invoice.billTo}</td>
                    <td
                      className="px-4 py-3 text-emerald-600 font-medium cursor-pointer"
                      onClick={() =>
                        navigate(`/invoice/${invoice.invoiceNumber}`)
                      }
                    >
                      Invoice #{invoice.invoiceNumber}
                    </td>
                    <td className="px-4 py-3">{invoice.date}</td>
                    <td className="px-4 py-3">{invoice.dueDate}</td>
                    <td className="px-4 py-3">
                      {invoice.balanceDue === 0 ? (
                        <span className="text-emerald-600 bg-emerald-100 px-2 py-1 rounded text-xs font-medium inline-flex items-center">
                          <span className="w-2 h-2 rounded-full bg-emerald-600 mr-1"></span>
                          Paid
                        </span>
                      ) : (
                        <span className="text-yellow-600 bg-yellow-100 px-2 py-1 rounded text-xs font-medium">
                          Unpaid
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {invoice.currency}
                      {(invoice.total || 0).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 relative">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            navigate(`/view-invoice/${invoice.invoiceNumber}`)
                          }
                          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm font-medium"
                        >
                          View
                        </button>

                        <div className="relative" ref={actionDropdownRef}>
                          <button
                            onClick={() =>
                              setActionDropdown((prev) =>
                                prev === index ? null : index
                              )
                            }
                            className={`px-2 py-1 rounded-md transition-colors duration-200 ${
                              darkMode
                                ? "text-gray-300 hover:bg-gray-600 hover:text-white"
                                : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                            }`}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>

                          {actionDropdown === index && (
                            <div
                              className={`absolute right-0 mt-2 w-40 z-50 border rounded-md shadow-md ${
                                darkMode
                                  ? "bg-gray-700 border-gray-600"
                                  : "bg-white border-gray-200"
                              }`}
                            >
                              <button
                                onClick={(e) => handleDownloadClick(e, invoice)}
                                className={`w-full text-left px-4 py-2 text-sm ${
                                  darkMode
                                    ? "hover:bg-gray-600"
                                    : "hover:bg-gray-100"
                                } flex items-center gap-2`}
                                disabled={pdfGenerating}
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                  />
                                </svg>
                                {pdfGenerating
                                  ? "Generating..."
                                  : "Download PDF"}
                              </button>
                             
<Link
  to={{
    pathname: "/signinHomepage",
    search: `?edit=${invoice.invoiceNumber}`,
    state: { invoiceData: invoice } // Pass the entire invoice object as state
  }}
  className={`w-full text-left px-4 py-2 text-sm ${
    darkMode
      ? "hover:bg-gray-600"
      : "hover:bg-gray-100"
  } flex items-center gap-2`}
>
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
  Edit
</Link>

                              <button
                                onClick={() =>
                                  handleTogglePaymentStatus(invoice)
                                }
                                className={`w-full text-left px-4 py-2 text-sm ${
                                  darkMode
                                    ? "hover:bg-gray-600 text-white"
                                    : "hover:bg-gray-100 text-gray-900"
                                } flex items-center gap-2`}
                              >
                                <span className="text-lg">✔️</span>
                                {invoice.status === "PAID"
                                  ? "Mark as Unpaid"
                                  : "Mark as Paid"}
                              </button>
                              <button
                                onClick={() => handleDeleteInvoice(invoice._id)}
                                className={`w-full text-left px-4 py-2 text-sm ${
                                  darkMode
                                    ? "text-red-400 hover:bg-gray-600"
                                    : "text-red-600 hover:bg-red-50"
                                } flex items-center gap-2`}
                              >
                                <span className="text-lg">🗑️</span> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
