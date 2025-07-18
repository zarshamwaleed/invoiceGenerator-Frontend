import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const InvoicePage = () => {
  const { invoiceNumber } = useParams();
  const { darkMode } = useContext(ThemeContext);  
  const [invoice, setInvoice] = useState(null);

  // ✅ Adjustable alignment constants
  const shipToX = 500; // move Ship To further right
  const labelWidth = 250; // fixed width for totals labels

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch(`http://localhost:5000/invoice/${invoiceNumber}`);
        const data = await response.json();
        setInvoice(data.invoice);
      } catch (error) {
        console.error('Error fetching invoice:', error);
      }
    };
    fetchInvoice();
  }, [invoiceNumber]);

  if (!invoice) return <div>Loading...</div>;

  // ✅ Extract dynamic labels safely
  const L = invoice.labels || {};

  // ✅ Helper: always ensure colon
  const labelWithColon = (label, fallback) => `${label || fallback}:`;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        
        {/* HEADER SECTION */}
        <div className="flex justify-between items-center mb-8">
          <div>
            {invoice.logo && <img src={invoice.logo} alt="Logo" className="w-24" />}
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-bold">
              {invoice.type || "INVOICE"} #{invoice.invoiceNumber}
            </h1>

            {/* Dynamic Labels */}
            <p className="text-sm">
              {labelWithColon(L.date, "Date")} {invoice.date}
            </p>
            <p className="text-sm">
              {labelWithColon(L.paymentTerms, "Payment Terms")} {invoice.paymentTerms}
            </p>
            <p className="text-sm">
              {labelWithColon(L.dueDate, "Due Date")} {invoice.dueDate}
            </p>
            <p className="text-sm">
              {labelWithColon(L.poNumber, "PO Number")} {invoice.poNumber}
            </p>

            <div className="mt-4">
              <p className="text-xl font-semibold">
                {labelWithColon(L.balanceDue, "Balance Due")} {invoice.currency}{invoice.balanceDue}
              </p>
            </div>
          </div>
        </div>

        {/* BILL TO / SHIP TO */}
        <div className="mb-8 grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold">{labelWithColon(L.billTo, "Bill To")}</h2>
            <p>{invoice.billTo}</p>
          </div>
          <div style={{ marginLeft: `${shipToX}px` }}> {/* ✅ Move Ship To further right */}
            <h2 className="text-lg font-semibold">{labelWithColon(L.shipTo, "Ship To")}</h2>
            <p>{invoice.shipTo}</p>
          </div>
        </div>

        {/* LINE ITEMS TABLE */}
        <table className={`w-full table-auto border-collapse mb-8 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left">{L.item || "Item"}</th>
              <th className="px-4 py-2 text-left">{L.quantity || "Quantity"}</th>
              <th className="px-4 py-2 text-left">{L.rate || "Rate"}</th>
              <th className="px-4 py-2 text-left">{L.amount || "Amount"}</th>
            </tr>
          </thead>
          <tbody>
            {invoice.lineItems.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">{invoice.currency}{item.rate}</td>
                <td className="px-4 py-2">{invoice.currency}{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ✅ TOTALS SECTION (aligned labels only) */}
        <div className="text-right mb-8">
          {[
            { label: labelWithColon(L.subtotal, "Subtotal"), value: invoice.subtotal },
            invoice.discount !== undefined && { label: labelWithColon(L.discount, "Discount"), value: invoice.discount },
            invoice.tax !== undefined && { label: `${labelWithColon(L.tax, "Tax")} (${invoice.taxRate || 0}%)`, value: invoice.tax },
            invoice.shipping !== undefined && { label: labelWithColon(L.shipping, "Shipping"), value: invoice.shipping },
            { label: labelWithColon(L.total, "Total"), value: invoice.total, big: true },
            { label: labelWithColon(L.amountPaid, "Amount Paid"), value: invoice.amountPaid },
          ]
            .filter(Boolean)
            .map((item, idx) => (
              <div
                key={idx}
                className={`flex justify-end ${item.big ? "mt-2 text-2xl font-semibold" : "font-semibold"}`}
              >
                {/* ✅ FIXED WIDTH LABEL */}
                <span
                  className="text-right"
                  style={{ display: "inline-block", width: `${labelWidth}px` }}
                >
                  {item.label}
                </span>

                {/* ✅ Values stay right */}
                <span className="ml-4">{invoice.currency}{item.value}</span>
              </div>
            ))}
        </div>

        {/* NOTES & TERMS */}
        <div className="mt-8">
          {invoice.notes && (
            <>
              <h3 className="text-lg font-semibold">{labelWithColon(L.notes, "Notes")}</h3>
              <p>{invoice.notes}</p>
            </>
          )}
        </div>
        <div className="mt-4">
          {invoice.terms && (
            <>
              <h3 className="text-lg font-semibold">{labelWithColon(L.terms, "Terms")}</h3>
              <p>{invoice.terms}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
